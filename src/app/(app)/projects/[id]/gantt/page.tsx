
'use client';

import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Filter,
  Share,
  Plus,
  Maximize
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

export default function GanttChartPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }
  
  const wbsItems = [
    { id: '1', name: 'Project Initiation', progress: 100, resource: 'A.J.', dep: '' },
    { id: '1.1', name: 'Feasibility Study', progress: 100, resource: 'A.J.', dep: '', isChild: true },
    { id: '2', name: 'Design & Planning', progress: 75, resource: 'B.K.', dep: '1' },
    { id: '2.1', name: 'Schematic Design', progress: 90, resource: 'B.K.', dep: '1.1', isChild: true },
    { id: '2.2', name: 'Permit Application', progress: 60, resource: 'C.L.', dep: '2.1', isChild: true },
    { id: '3', name: 'Construction', progress: 10, resource: 'D.M.', dep: '2.2' },
    { id: '3.1', name: 'Foundation', progress: 20, resource: 'D.M.', dep: '2.2', isChild: true, isCritical: true },
    { id: '3.2', name: 'Superstructure', progress: 5, resource: 'E.N.', dep: '3.1', isChild: true, isCritical: true },
  ]

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
                Gantt Chart: {project.name}
            </h1>
        </div>
        <div className='ml-auto flex items-center gap-2'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Month View
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Day</DropdownMenuItem>
                    <DropdownMenuItem>Week</DropdownMenuItem>
                    <DropdownMenuItem>Month</DropdownMenuItem>
                    <DropdownMenuItem>Year</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
             <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
            </Button>
             <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
            </Button>
             <Button variant="secondary">AI Optimize</Button>
             <Button variant="ghost" size="icon">
                <Maximize />
             </Button>
        </div>
      </div>
      
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* WBS Sidebar */}
        <Card className="col-span-4 overflow-y-auto">
          <CardHeader>
            <CardTitle>Work Breakdown Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground py-1">
                    <div className="w-1/2 font-semibold">Task Name</div>
                    <div className="w-1/4 font-semibold text-center">Resource</div>
                    <div className="w-1/4 font-semibold text-center">Deps</div>
                </div>
                {wbsItems.map(item => (
                    <div key={item.id} className={`flex items-center p-2 rounded-md hover:bg-muted ${item.isChild ? 'ml-4' : 'bg-muted/50'}`}>
                        <div className="w-1/2">
                            <p className={`truncate font-medium ${item.isCritical ? 'text-destructive' : ''}`}>{item.name}</p>
                            <Progress value={item.progress} className="h-1 mt-1" />
                        </div>
                        <div className="w-1/4 text-center">
                            <Badge variant="outline">{item.resource}</Badge>
                        </div>
                        <div className="w-1/4 text-center text-muted-foreground">{item.dep}</div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Timeline */}
        <Card className="col-span-8 overflow-x-auto overflow-y-hidden">
            <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-[500px] w-[2000px]">
                    <p className="text-muted-foreground">Interactive timeline coming soon.</p>
                    {/* Grid background */}
                    <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/50"></div>
                </div>
            </CardContent>
        </Card>

        {/* Right Panel placeholder - can be implemented in future */}
        {/* <div className="col-span-3 space-y-4">
             <Card>
                <CardHeader><CardTitle>Task Details</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Select a task to see details</p></CardContent>
            </Card>
        </div> */}
      </div>
    </div>
  );
}
