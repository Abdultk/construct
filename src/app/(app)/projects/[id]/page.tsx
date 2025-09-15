
'use client'

import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Gauge,
  MoreVertical,
  Star,
  Users,
  GanttChartSquare,
  Trello
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/data';
import Link from 'next/link';
import {
  ProgressCircular,
  ProgressCircularLabel,
} from '@/components/ui/progress-circular';

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const getHealthScoreColor = (score: number) => {
    if (score > 90) return 'text-green-500';
    if (score > 75) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-500';
      case 'At Risk':
        return 'bg-yellow-500';
      case 'Delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
            <h1 className="truncate pr-2 font-headline text-xl">
                {project.name}
            </h1>
             <Badge variant={project.status === 'On Track' ? 'secondary' : project.status === 'At Risk' ? 'outline' : 'destructive'}>{project.status}</Badge>
             <Badge variant="outline">Construction Phase</Badge>
        </div>
        <div className='ml-auto flex items-center gap-2'>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold">Health Score:</span>
                 <span
                  className={`font-bold text-lg ${getHealthScoreColor(
                    project.budgetHealth
                  )}`}
                >
                  {project.budgetHealth}%
                </span>
                 <Badge variant="secondary">AI Confidence: 92%</Badge>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive'>Archive</DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Panel */}
        <div className="lg:col-span-3 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Key Information</CardTitle>
                </CardHeader>
                 <CardContent className='text-sm space-y-2'>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date</span>
                        <span>Jan 15, 2023</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Est. Completion</span>
                        <span>Dec 20, 2024</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Project Manager</span>
                        <span>Alice Johnson</span>
                    </div>
                 </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Stakeholders</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Document Library</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
        </div>

        {/* Center Panel */}
        <div className="lg:col-span-6 space-y-4">
           <div className='grid grid-cols-3 gap-4'>
                <Card>
                    <CardHeader className='items-center pb-2'>
                         <CardTitle className="text-base">Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ProgressCircular value={project.completionPercentage} size="lg">
                            <ProgressCircularLabel className="text-2xl font-bold">
                                {project.completionPercentage}%
                            </ProgressCircularLabel>
                        </ProgressCircular>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className='items-center pb-2'>
                         <CardTitle className="text-base">Cost Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center">Chart Coming Soon</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className='items-center pb-2'>
                         <CardTitle className="text-base">Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground text-center">Heatmap Coming Soon</p>
                    </CardContent>
                </Card>
           </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Schedule Performance</CardTitle>
                    <div className='flex items-center gap-2'>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/projects/${project.id}/kanban`}>
                                <Trello className="mr-2 h-4 w-4" />
                                View Board
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/projects/${project.id}/gantt`}>
                                <GanttChartSquare className="mr-2 h-4 w-4" />
                                View Gantt Chart
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Interactive Gantt chart coming soon</p>
                </CardContent>
            </Card>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Change Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
