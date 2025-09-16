
'use client';

import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Filter,
  Share,
  Plus,
  Maximize,
  Loader2,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';

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
import {
  optimizeProjectSchedule,
  type OptimizeProjectScheduleOutput,
} from '@/ai/flows/optimize-project-schedule';
import { useToast } from '@/hooks/use-toast';

type View = 'Day' | 'Week' | 'Month' | 'Year';

export default function GanttChartPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const project = projects.find((p) => p.id === id);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] =
    useState<OptimizeProjectScheduleOutput | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState<View>('Month');
  const { toast } = useToast();

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
  ];

  const startDate = wbsItems.reduce(
    (min, item) => (item.start < min ? item.start : min),
    wbsItems[0].start
  );
  const endDate = wbsItems.reduce(
    (max, item) => (item.end > max ? item.end : max),
    wbsItems[0].end
  );
  const totalDays = differenceInDays(endDate, startDate) + 1;
  
  const getDayWidth = () => {
    switch (view) {
        case 'Day': return 80;
        case 'Week': return 60;
        case 'Month': return 40;
        case 'Year': return 20;
        default: return 40;
    }
  }
  const dayWidth = getDayWidth();

  const months = [];
  let currentMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  while (currentMonth <= endDate) {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    let startDayOfMonth = 1;
    let daysToShow = daysInMonth;

    if (
      currentMonth.getMonth() === startDate.getMonth() &&
      currentMonth.getFullYear() === startDate.getFullYear()
    ) {
      startDayOfMonth = startDate.getDate();
      daysToShow = daysInMonth - startDate.getDate() + 1;
    }

    if (
      currentMonth.getMonth() === endDate.getMonth() &&
      currentMonth.getFullYear() === endDate.getFullYear()
    ) {
      daysToShow = endDate.getDate() - startDayOfMonth + 1;
      if (
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear()
      ) {
        daysToShow = endDate.getDate() - startDate.getDate() + 1;
      }
    }

    months.push({
      name: format(currentMonth, 'MMMM yyyy'),
      days: daysToShow,
    });
    currentMonth = addDays(currentMonth, daysInMonth);
  }

  const days = Array.from({ length: totalDays }, (_, i) => addDays(startDate, i));

  const handleAiOptimize = async () => {
    setIsOptimizing(true);
    setOptimizationResult(null);
    try {
      const scheduleData = JSON.stringify(
        wbsItems.map((item) => ({
          id: item.id,
          name: item.name,
          start: item.start.toISOString().split('T')[0],
          end: item.end.toISOString().split('T')[0],
          dependencies: item.dep,
          resource: item.resource,
          progress: item.progress,
        })),
        null,
        2
      );
      // Simulate fetching live risk data from AI Insights
      const liveRiskData = "Current predictive alerts indicate a 78% probability of concrete pump maintenance issues and a projected 4% drop in steel prices next month.";
      const result = await optimizeProjectSchedule({
        projectScheduleData: scheduleData,
        historicalData: liveRiskData
      });
      setOptimizationResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error optimizing schedule:', error);
       toast({
        variant: 'destructive',
        title: 'AI Optimization Failed',
        description: 'Could not optimize the schedule at this time.',
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
        title: `Gantt Chart: ${project.name}`,
        text: `Check out the project schedule for ${project.name}.`,
        url: window.location.href,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            toast({
                title: 'Shared Successfully',
                description: 'The Gantt chart has been shared.',
            });
        } else {
             await navigator.clipboard.writeText(window.location.href);
            toast({
                title: 'Link Copied',
                description: 'The link to the Gantt chart has been copied to your clipboard.',
            });
        }
    } catch (error) {
        console.error('Error sharing:', error);
        toast({
            variant: 'destructive',
            title: 'Sharing Failed',
            description: 'Could not share the Gantt chart at this time.',
        });
    }
  };
  
  const handleFilter = () => {
    // Placeholder for filter functionality
    console.log('Filter button clicked');
    toast({
        title: 'Filter Not Implemented',
        description: 'This feature is coming soon!',
    });
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
            Gantt Chart: {project.name}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                {view} View
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setView('Day')}>Day</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('Week')}>Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('Month')}>Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView('Year')}>Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Button variant="secondary" onClick={handleAiOptimize} disabled={isOptimizing}>
              {isOptimizing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                'AI Optimize'
              )}
            </Button>
            {optimizationResult && (
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>AI Schedule Optimization</DialogTitle>
                  <DialogDescription>
                    The AI has analyzed the project schedule and suggests the following adjustments.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    {optimizationResult.delayPredictions && (
                         <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                    Predicted Delays
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{optimizationResult.delayPredictions}</p>
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-ai-accent" />
                                Suggested Adjustments
                            </CardTitle>
                        </CardHeader>
                         <CardContent>
                             <p className="text-sm whitespace-pre-wrap">{optimizationResult.suggestedAdjustments}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Optimized Schedule (Raw)</CardTitle>
                        </CardHeader>
                         <CardContent className="bg-muted p-4 rounded-md">
                             <p className="text-xs text-muted-foreground whitespace-pre-wrap font-code">{optimizationResult.optimizedSchedule}</p>
                        </CardContent>
                    </Card>
                </div>
              </DialogContent>
            )}
          </Dialog>
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
              <div className="flex items-center py-1 text-muted-foreground">
                <div className="w-1/2 font-semibold">Task Name</div>
                <div className="w-1/4 text-center font-semibold">Resource</div>
                <div className="w-1/4 text-center font-semibold">Deps</div>
              </div>
              {wbsItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center rounded-md p-2 hover:bg-muted ${
                    item.isChild ? 'ml-4' : 'bg-muted/50'
                  }`}
                >
                  <div className="w-1/2">
                    <p
                      className={`truncate font-medium ${
                        item.isCritical ? 'text-destructive' : ''
                      }`}
                    >
                      {item.name}
                    </p>
                    <Progress value={item.progress} className="mt-1 h-1" />
                  </div>
                  <div className="w-1/4 text-center">
                    <Badge variant="outline">{item.resource}</Badge>
                  </div>
                  <div className="w-1/4 text-center text-muted-foreground">
                    {item.dep}
                  </div>
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
            <CardContent className="relative">
              <div
                className="relative"
                style={{ width: `${totalDays * dayWidth}px` }}
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-card">
                  <div className="flex h-10">
                    {months.map((month, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center border-b border-r"
                        style={{ width: `${month.days * dayWidth}px` }}
                      >
                        <span className="text-sm font-semibold">
                          {month.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-8">
                    {days.map((day, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center border-r"
                        style={{ width: `${dayWidth}px` }}
                      >
                        <span className="text-xs text-muted-foreground">
                          {format(day, 'd')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Rows */}
                <div className="relative">
                  {wbsItems.map((item, index) => {
                    const left =
                      differenceInDays(item.start, startDate) * dayWidth;
                    const width =
                      differenceInDays(item.end, item.start) * dayWidth;
                    return (
                      <div
                        key={item.id}
                        className="flex h-12 items-center border-b border-dashed"
                      >
                        <div
                          style={{ left: `${left}px`, width: `${width}px` }}
                          className={`absolute flex h-8 items-center rounded-md ${
                            item.isCritical
                              ? 'bg-destructive/70'
                              : 'bg-primary/80'
                          }`}
                        >
                          <div
                            style={{ width: `${item.progress}%` }}
                            className={`h-full rounded-md ${
                              item.isCritical ? 'bg-destructive' : 'bg-primary'
                            }`}
                          ></div>
                          <span className="absolute left-2 truncate pr-2 text-xs text-white">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {/* Grid lines */}
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="absolute top-0 h-full border-r"
                      style={{ left: `${index * dayWidth}px`, zIndex: -1 }}
                    ></div>
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

    