
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
  ArrowUpRight,
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  FilePlus,
  Filter,
} from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const kpis = {
    totalValue: 552500000,
    projectCount: 5,
    budgetVariance: -2.5,
    scheduleVariance: 1.2,
  };

  const projectsAtRisk = [
    { name: 'Suburban Housing', reason: 'Budget Overrun', variance: '-8%' },
    { name: 'City General Hospital', reason: 'Schedule Delay', variance: '+12 days' },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Executive Reporting Dashboard
          </h1>
          <p className="text-muted-foreground">
            High-level portfolio performance and analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter by Date Range
          </Button>
          <Button asChild>
            <Link href="/reports/builder">
              <FilePlus className="mr-2 h-4 w-4" /> New Report
            </Link>
          </Button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(kpis.totalValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {kpis.projectCount} active projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Budget Variance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                kpis.budgetVariance < 0 ? 'text-destructive' : 'text-green-600'
              }`}
            >
              {kpis.budgetVariance}%
            </div>
            <p className="text-xs text-muted-foreground">
              Cost Performance Index (CPI): 0.98
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Schedule Variance
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                kpis.scheduleVariance < 0
                  ? 'text-destructive'
                  : 'text-green-600'
              }`}
            >
              {kpis.scheduleVariance}%
            </div>
            <p className="text-xs text-muted-foreground">
              Schedule Performance Index (SPI): 1.01
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Projects at Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsAtRisk.length}</div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Historical Performance</CardTitle>
            <CardDescription>
              Budget vs. Actuals over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chart coming soon.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Benchmark Analysis</CardTitle>
            <CardDescription>
              Project performance against industry benchmarks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chart coming soon.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Exception Reporting */}
      <Card>
        <CardHeader>
          <CardTitle>Exception Reporting</CardTitle>
          <CardDescription>
            Active issues requiring management review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsAtRisk.map((project) => (
                <TableRow key={project.name}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{project.reason}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-code text-destructive">
                    {project.variance}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
