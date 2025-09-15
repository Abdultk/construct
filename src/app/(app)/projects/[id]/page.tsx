
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
  Trello,
  Briefcase,
  File,
  User,
  Paperclip,
  Wand2,
  Lightbulb,
  ShieldAlert,
  TrendingUp,
  Clock,
  ThumbsUp,
  ListTodo
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

  const stakeholders = [
    { name: 'Client ABC Corp.', role: 'Client', avatar: 'https://picsum.photos/seed/31/100/100' },
    { name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://picsum.photos/seed/10/100/100' },
    { name: 'Bob Miller', role: 'Lead Architect', avatar: 'https://picsum.photos/seed/11/100/100' },
  ];

  const recentActivity = [
    { avatar: 'https://picsum.photos/seed/10/100/100', fallback: 'OM', name: 'Olivia Martin', action: 'Approved change order #12.', time: '5m ago' },
    { avatar: 'https://picsum.photos/seed/11/100/100', fallback: 'JL', name: 'Jackson Lee', action: 'Marked task "Foundation Pour" as complete.', time: '15m ago' },
    { avatar: 'https://picsum.photos/seed/12/100/100', fallback: 'CD', name: 'Charlie Davis', action: 'Uploaded new blueprint "Floor-Plan-Rev3".', time: '1h ago' },
  ];
  
  const documents = [
      { name: "Project Charter.pdf", type: "Document" },
      { name: "Architectural_Plans_v2.dwg", type: "CAD" },
      { name: "Geotechnical_Report.pdf", type: "Report" },
  ]

  const aiRecommendations = [
      { icon: TrendingUp, text: 'Re-sequence drywall and electrical work to save 3 project days.', type: 'Schedule' },
      { icon: ShieldAlert, text: 'High probability of rain next week. Secure waterproofing materials now.', type: 'Risk' },
      { icon: Lightbulb, text: 'Consider pre-fabricated bathroom pods to accelerate interior fit-out.', type: 'Opportunity' },
  ]


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
                <CardContent className='space-y-4'>
                    {stakeholders.map(s => (
                        <div key={s.name} className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={s.avatar} alt={s.name} data-ai-hint="person face" />
                                <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{s.name}</p>
                                <p className="text-xs text-muted-foreground">{s.role}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Document Library</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                     {documents.map(doc => (
                        <Button key={doc.name} variant="outline" className='w-full justify-start text-sm'>
                            <Paperclip className="mr-2 h-4 w-4" />
                            <span className="truncate">{doc.name}</span>
                        </Button>
                    ))}
                     <Button variant="secondary" size="sm" className="w-full">View All</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                 <CardContent className="grid gap-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={activity.avatar} alt="Avatar" data-ai-hint="user portrait" />
                                <AvatarFallback>{activity.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">{activity.name}</p>
                                <p className="text-sm text-muted-foreground">{activity.action}</p>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                                {activity.time}
                            </div>
                        </div>
                    ))}
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
                <CardHeader className="flex flex-row items-center justify-between pb-4">
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
                <CardContent className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Schedule Variance</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">+3 Days</div>
                            <p className="text-xs text-muted-foreground">Ahead of schedule</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tasks to Complete</CardTitle>
                            <ListTodo className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-xs text-muted-foreground">Out of 250 total tasks</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-3 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <p>Facade Completion</p>
                        <p className="text-muted-foreground">Aug 30, 2024</p>
                    </div>
                     <div className="flex items-center justify-between">
                        <p>Core & Shell Handover</p>
                        <p className="text-muted-foreground">Oct 15, 2024</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                     <div className="flex items-start justify-between">
                        <p>Change Order CR-0012</p>
                        <Badge variant="outline">Awaiting Review</Badge>
                    </div>
                      <div className="flex items-start justify-between">
                        <p>Payment Cert. #004</p>
                        <Badge variant="outline">Awaiting Review</Badge>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Change Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <p>Approved</p>
                        <p className="font-bold">5</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Pending</p>
                        <p className="font-bold">1</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2 className="h-5 w-5 text-ai-accent" /> AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {aiRecommendations.map((rec, index) => (
                         <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <rec.icon className="h-5 w-5 flex-shrink-0 text-ai-accent mt-1" />
                            <div>
                                <p className="text-sm font-medium">{rec.text}</p>
                                <Badge variant="secondary" className="mt-1">{rec.type}</Badge>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/ai-insights">View All Insights</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
