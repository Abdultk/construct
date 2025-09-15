
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
import { differenceInDays, format, addDays } from 'date-fns';

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
    { id: '1', name: 'Project Initiation', progress: 100, resource: 'A.J.', dep: '', start: new Date('2024-07-01'), end: new Date('2024-07-10') },
    { id: '1.1', name: 'Feasibility Study', progress: 100, resource: 'A.J.', dep: '', isChild: true, start: new Date('2024-07-01'), end: new Date('2024-07-10') },
    { id: '2', name: 'Design & Planning', progress: 75, resource: 'B.K.', dep: '1', start: new Date('2024-07-11'), end: new Date('2024-08-20') },
    { id: '2.1', name: 'Schematic Design', progress: 90, resource: 'B.K.', dep: '1.1', isChild: true, start: new Date('2024-07-11'), end: new Date('2024-08-05') },
    { id: '2.2', name: 'Permit Application', progress: 60, resource: 'C.L.', dep: '2.1', isChild: true, start: new Date('2024-08-06'), end: new Date('2024-08-20') },
    { id: '3', name: 'Construction', progress: 10, resource: 'D.M.', dep: '2.2', start: new Date('2024-08-21'), end: new Date('2024-10-30') },
    { id: '3.1', name: 'Foundation', progress: 20, resource: 'D.M.', dep: '2.2', isChild: true, isCritical: true, start: new Date('2024-08-21'), end: new Date('2024-09-10') },
    { id: '3.2', name: 'Superstructure', progress: 5, resource: 'E.N.', dep: '3.1', isChild: true, isCritical: true, start: new Date('2024-09-11'), end: new Date('2024-10-30') },
  ]

  const startDate = wbsItems.reduce((min, item) => item.start < min ? item.start : min, wbsItems[0].start);
  const endDate = wbsItems.reduce((max, item) => item.end > max ? item.end : max, wbsItems[0].end);
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const dayWidth = 40;

  const months = [];
  let currentMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (currentMonth <= endDate) {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    let startDayOfMonth = 1;
    let daysToShow = daysInMonth;

    if (currentMonth.getMonth() === startDate.getMonth() && currentMonth.getFullYear() === startDate.getFullYear()) {
        startDayOfMonth = startDate.getDate();
        daysToShow = daysInMonth - startDate.getDate() + 1;
    }
    
    if (currentMonth.getMonth() === endDate.getMonth() && currentMonth.getFullYear() === endDate.getFullYear()) {
        daysToShow = endDate.getDate() - startDayOfMonth + 1;
        if(startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
            daysToShow = endDate.getDate() - startDate.getDate() + 1;
        }
    }
    
    months.push({ name: format(currentMonth, 'MMMM yyyy'), days: daysToShow });
    currentMonth = addDays(currentMonth, daysInMonth);
  }

  const days = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i));

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
        <div className="col-span-8 overflow-auto">
          <Card className="h-full">
            <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className='relative'>
                 <div className="relative" style={{ width: `${totalDays * dayWidth}px` }}>
                    {/* Header */}
                    <div className="sticky top-0 z-10 bg-card">
                        <div className="flex h-10">
                            {months.map((month, index) => (
                                <div key={index} className="flex items-center justify-center border-r border-b" style={{ width: `${month.days * dayWidth}px` }}>
                                    <span className="font-semibold text-sm">{month.name}</span>
                                </div>
                            ))}
                        </div>
                         <div className="flex h-8">
                            {days.map((day, index) => (
                                <div key={index} className="flex items-center justify-center border-r" style={{ width: `${dayWidth}px` }}>
                                    <span className="text-xs text-muted-foreground">{format(day, 'd')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                     {/* Rows */}
                    <div className="relative">
                       {wbsItems.map((item, index) => {
                            const left = differenceInDays(item.start, startDate) * dayWidth;
                            const width = differenceInDays(item.end, item.start) * dayWidth;
                            return (
                                <div key={item.id} className="h-12 flex items-center border-b border-dashed">
                                    <div style={{ left: `${left}px`, width: `${width}px`}} className={`absolute h-8 rounded-md ${item.isCritical ? 'bg-destructive/70' : 'bg-primary/80'} flex items-center`}>
                                        <div style={{width: `${item.progress}%`}} className={`h-full rounded-md ${item.isCritical ? 'bg-destructive' : 'bg-primary'}`}></div>
                                        <span className="absolute left-2 text-xs text-white truncate pr-2">{item.name}</span>
                                    </div>
                                </div>
                            )
                       })}
                       {/* Grid lines */}
                       {days.map((day, index) => (
                           <div key={index} className="absolute top-0 h-full border-r" style={{ left: `${index * dayWidth}px`, zIndex: -1 }}></div>
                       ))}
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
