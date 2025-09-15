
'use client'

import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  Star,
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/data';
import Link from 'next/link';

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

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to projects</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <h1 className="truncate pr-2 font-headline text-lg">
                {project.name}
              </h1>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {projects.map((p) => (
              <DropdownMenuItem key={p.id} asChild>
                <Link href={`/projects/${p.id}`}>{p.name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Project Overview Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phase</span>
              <span className="font-medium">Construction</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-medium">
                {project.completionPercentage}%
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Health Score</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${getHealthScoreColor(
                    project.budgetHealth
                  )}`}
                >
                  {project.budgetHealth}%
                </span>
                <Badge variant="secondary">AI Confidence: 92%</Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-medium">Jan 15, 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Milestone</span>
                <span className="font-medium">Structural Steel</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Est. Completion</span>
                <span className="font-medium">Dec 20, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Critical Metrics Row */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Status
                </CardTitle>
                <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">On Track</div>
                <p className="text-xs text-muted-foreground">
                  $42M of $100M spent
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Schedule Perf.
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">
                  -5 days
                </div>
                <p className="text-xs text-muted-foreground">Behind schedule</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quality Score
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-2xl font-bold">
                  4.8
                  <Star className="ml-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on 12 inspections
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Safety</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">
                  Days without incident
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Central Panel</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Gantt Chart, Resource Utilization, Weather Impact Coming Soon</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
         <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
        </Card>
         <Card className="md:col-span-1">
            <CardHeader>
                <CardTitle>Right Sidebar</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Change Orders, Approvals, Activity Feed Coming Soon</p>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
