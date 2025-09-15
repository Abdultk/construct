
'use client';

import {
  ArrowLeft,
  Filter,
  MoreHorizontal,
  Plus,
  Users,
  Paperclip,
  MessageSquare,
  Clock,
  LayoutGrid,
  Loader2,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { projects } from '@/lib/data';
import {
  balanceTeamWorkload,
  type BalanceTeamWorkloadOutput,
} from '@/ai/flows/balance-team-workload';

export default function KanbanBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const project = projects.find((p) => p.id === id);
  const [isBalancing, setIsBalancing] = useState(false);
  const [balanceResult, setBalanceResult] =
    useState<BalanceTeamWorkloadOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!project) {
    notFound();
  }

  const teamMembers = [
    { id: 'user-1', name: 'Alice', avatar: 'https://picsum.photos/seed/3/32/32' },
    { id: 'user-2', name: 'Bob', avatar: 'https://picsum.photos/seed/4/32/32' },
    { id: 'user-3', name: 'Charlie', avatar: 'https://picsum.photos/seed/5/32/32' },
    { id: 'user-4', name: 'David', avatar: 'https://picsum.photos/seed/6/32/32' },
    { id: 'user-5', name: 'Eve', avatar: 'https://picsum.photos/seed/7/32/32' },
  ];

  const columns = [
    { title: 'To Do', tasks: [
        { id: 'task-1', title: 'Draft initial blueprints', priority: 'High', assigneeId: 'user-1', attachments: 2, comments: 3, dueDate: '2024-08-15', aiEstimate: '3 days' },
        { id: 'task-2', title: 'Procure steel beams', priority: 'Medium', assigneeId: 'user-2', attachments: 1, comments: 1, dueDate: '2024-08-20' },
    ]},
    { title: 'In Progress', tasks: [
        { id: 'task-3', title: 'Foundation pouring', priority: 'High', assigneeId: 'user-3', attachments: 4, comments: 5, dueDate: '2024-08-10', isCritical: true },
    ]},
    { title: 'In Review', tasks: [
        { id: 'task-4', title: 'Electrical wiring plan', priority: 'Medium', assigneeId: 'user-4', attachments: 1, comments: 2, dueDate: '2024-08-05' },
    ]},
    { title: 'Completed', tasks: [
        { id: 'task-5', title: 'Site survey', priority: 'Low', assigneeId: 'user-5', attachments: 3, comments: 1, dueDate: '2024-07-30' },
    ]},
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  }

  const handleAiBalance = async () => {
    setIsBalancing(true);
    setBalanceResult(null);
    try {
      const allTasks = columns.flatMap(col => col.tasks);
      const result = await balanceTeamWorkload({
        tasks: allTasks.map(t => ({
          ...t,
          dueDate: t.dueDate || undefined,
          aiEstimate: t.aiEstimate || undefined,
          isCritical: t.isCritical || undefined,
        })),
        teamMembers: teamMembers.map(m => ({ id: m.id, name: m.name })),
      });
      setBalanceResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error balancing workload:', error);
      // You could show a toast notification here for the error
    } finally {
      setIsBalancing(false);
    }
  };

  const getAssigneeAvatar = (assigneeId: string) => {
    return teamMembers.find(m => m.id === assigneeId)?.avatar || '';
  }


  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/projects/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Project</span>
          </Link>
        </Button>
        <div>
          <h1 className="truncate pr-2 font-headline text-xl">
            Kanban Board: {project.name}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
           <Button variant="outline">
            <LayoutGrid className="mr-2 h-4 w-4" />
            Group by
          </Button>
          <div className="flex -space-x-2 overflow-hidden">
            {teamMembers.slice(0,2).map(member => (
              <Avatar key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
             <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                <AvatarFallback>+{teamMembers.length > 2 ? teamMembers.length - 2 : 0}</AvatarFallback>
            </Avatar>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" onClick={handleAiBalance} disabled={isBalancing}>
                {isBalancing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Balancing...
                  </>
                ) : (
                  'AI Balance'
                )}
              </Button>
            </DialogTrigger>
            {balanceResult && (
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-ai-accent" /> AI Workload Balancing</DialogTitle>
                  <DialogDescription>
                    The AI has analyzed the team's workload and suggests these reassignments for better balance.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{balanceResult.recommendations}</p>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div key={col.title} className="w-80 shrink-0">
            <Card className="h-full bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">{col.title}</CardTitle>
                <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="px-2 py-1">{col.tasks.length}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 overflow-y-auto pt-2">
                {col.tasks.map((task) => (
                  <Card key={task.id} className="cursor-grab active:cursor-grabbing">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <p className={`text-sm font-medium ${task.isCritical ? 'text-destructive' : ''}`}>{task.title}</p>
                        <Badge variant={getPriorityBadge(task.priority)}>{task.priority}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.comments}</span>
                          </div>
                        </div>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={getAssigneeAvatar(task.assigneeId)} alt="Assignee" />
                            <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                      {task.aiEstimate && (
                        <p className="text-xs text-ai-accent">AI Estimate: {task.aiEstimate}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                 <Button variant="link" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add task
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
