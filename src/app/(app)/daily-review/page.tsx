'use client';

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ClipboardCheck,
  HardHat,
  LineChart,
  TrendingUp,
  Wrench,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function DailyReviewPage() {
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

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Daily Management Review
          </h1>
          <p className="text-muted-foreground">
            Project: Downtown Skyscraper - {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">View Project Dashboard</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="col-span-12 space-y-4 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardHat className="h-5 w-5" /> Overnight Field Submissions
              </CardTitle>
              <CardDescription>
                Review all reports and updates from the field submitted in the
                last 24 hours.
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
                        <Button variant="ghost" size="sm">
                          Review <ArrowRight className="ml-2 h-4 w-4" />
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
                  <LineChart className="h-5 w-5" /> Progress & Cost Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Summary of yesterday's progress and its financial impact.
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
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between">
                    <p className="font-semibold">Pending Invoices</p>
                    <p className="font-bold">3</p>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                    <div className="flex justify-between">
                        <p className="font-semibold">Change Orders to Review</p>
                        <p className="font-bold">1</p>
                    </div>
                </div>
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
                Top items to focus on today based on AI analysis.
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
