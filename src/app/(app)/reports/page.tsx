
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  FilePlus,
  HardHat,
  ChevronDown,
  Calendar as CalendarIcon,
  Zap,
  CheckCircle,
  Wrench,
  LineChart as LineChartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


export default function ReportsPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const projectsAtRisk = projects.filter(p => p.status === 'At Risk' || p.status === 'Delayed');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  
    const submissions = [
        {
          id: 'DPR-0728',
          type: 'Progress Report',
          submittedBy: 'J. Smith (Foreman)',
          status: 'Pending Review',
        },
        {
          id: 'PHT-0112',
          type: 'Site Photo',
          submittedBy: 'J. Smith (Foreman)',
          status: 'AI Analyzed',
        },
        {
          id: 'INR-0034',
          type: 'Incident Report',
          submittedBy: 'M. Lee (Safety)',
          status: 'High Priority',
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
        case 'Pending Review':
            return 'outline';
        case 'AI Analyzed':
            return 'secondary';
        case 'High Priority':
            return 'destructive';
        default:
            return 'default';
        }
    };
    
    const getReviewLink = (type: string) => {
        switch (type) {
        case 'Progress Report':
            return '/progress-entry';
        case 'Site Photo':
            return '/progress-entry'; // Or a dedicated gallery page if it exists
        case 'Incident Report':
            return '/incident-reporting';
        default:
            return '#';
        }
    };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Reporting Dashboard
          </h1>
          <p className="text-muted-foreground">
            Portfolio performance, daily reports, and analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                    date.to ? (
                        <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                        </>
                    ) : (
                        format(date.from, "LLL dd, y")
                    )
                    ) : (
                    <span>Pick a date</span>
                    )}
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                 <div className="p-2 border-t">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">Quick Select <ChevronDown className="ml-auto h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setDate({ from: new Date(), to: new Date() })}>Today</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setDate({ from: addDays(new Date(), -6), to: new Date() })}>Last 7 Days</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setDate({ from: addDays(new Date(), -29), to: new Date() })}>Last 30 Days</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                </PopoverContent>
            </Popover>
          <Button asChild>
            <Link href="/reports/builder">
              <FilePlus className="mr-2 h-4 w-4" /> New Custom Report
            </Link>
          </Button>
        </div>
      </div>

       <div className="grid grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" /> Field Submissions
              </CardTitle>
              <CardDescription>
                Reports and updates from the field for the selected date range.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-code">{sub.id}</TableCell>
                      <TableCell>{sub.type}</TableCell>
                      <TableCell>{sub.submittedBy}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(sub.status)}>
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={getReviewLink(sub.type)}>
                            Review <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" /> Progress & Cost Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Summary of progress and financial impact for the selected period.
                </p>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">
                    Work Completed
                  </p>
                  <p className="text-xl font-bold">$125,000</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground">
                    Schedule Variance
                  </p>
                  <p className="text-xl font-bold text-green-500">+0.5 days</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" /> Administrative Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Items requiring administrative review and approval.
                </p>
                <Link href="/payment-certificate">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex justify-between">
                      <p className="font-semibold">Pending Invoices</p>
                      <p className="font-bold">3</p>
                    </div>
                  </div>
                </Link>
                <Link href="/change-orders">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex justify-between">
                          <p className="font-semibold">Change Orders to Review</p>
                          <p className="font-bold">1</p>
                      </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 space-y-4 lg:col-span-4">
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> AI Priority Briefing
              </CardTitle>
              <CardDescription>
                Top items to focus on based on AI analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Risk: Schedule Delay</p>
                    <p className="text-sm text-muted-foreground">
                      Concrete pump has a 78% probability of requiring
                      unscheduled maintenance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  <div>
                    <p className="font-semibold">Opportunity: Cost Saving</p>
                    <p className="text-sm text-muted-foreground">
                      Re-sequencing drywall and electrical work could reduce
                      labor costs by 5%.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                  <div>
                    <p className="font-semibold">Positive Trend: Safety</p>
                    <p className="text-sm text-muted-foreground">
                      PPE compliance has increased by 15% in the last week.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
