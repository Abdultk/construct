
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
  LayoutGrid
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projects } from '@/lib/data';

export default function KanbanBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const columns = [
    { title: 'To Do', tasks: [
        { id: 'task-1', title: 'Draft initial blueprints', priority: 'High', assignee: 'https://picsum.photos/seed/3/32/32', attachments: 2, comments: 3, dueDate: '2024-08-15', aiEstimate: '3 days' },
        { id: 'task-2', title: 'Procure steel beams', priority: 'Medium', assignee: 'https://picsum.photos/seed/4/32/32', attachments: 1, comments: 1, dueDate: '2024-08-20' },
    ]},
    { title: 'In Progress', tasks: [
        { id: 'task-3', title: 'Foundation pouring', priority: 'High', assignee: 'https://picsum.photos/seed/5/32/32', attachments: 4, comments: 5, dueDate: '2024-08-10', isCritical: true },
    ]},
    { title: 'In Review', tasks: [
        { id: 'task-4', title: 'Electrical wiring plan', priority: 'Medium', assignee: 'https://picsum.photos/seed/6/32/32', attachments: 1, comments: 2, dueDate: '2024-08-05' },
    ]},
    { title: 'Completed', tasks: [
        { id: 'task-5', title: 'Site survey', priority: 'Low', assignee: 'https://picsum.photos/seed/7/32/32', attachments: 3, comments: 1, dueDate: '2024-07-30' },
    ]},
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      default: return 'outline';
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/projects/${project.id}`}>
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
            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                <AvatarImage src="https://picsum.photos/seed/3/32/32" alt="User" />
                <AvatarFallback>U1</AvatarFallback>
            </Avatar>
             <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                <AvatarImage src="https://picsum.photos/seed/4/32/32" alt="User" />
                <AvatarFallback>U2</AvatarFallback>
            </Avatar>
             <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                <AvatarFallback>+3</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="secondary">AI Balance</Button>
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
                            <AvatarImage src={task.assignee} alt="Assignee" />
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
