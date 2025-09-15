
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, ListChecks, Bug, BarChart } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export default function QualityControlPage() {
  const inspections = [
    {
      id: 'INSP-001',
      area: 'Floor 3 - Electrical',
      status: 'Pass',
      inspector: 'A. Johnson',
      date: '2024-07-28',
    },
    {
      id: 'INSP-002',
      area: 'Floor 3 - Plumbing',
      status: 'Fail',
      inspector: 'B. Miller',
      date: '2024-07-27',
    },
    {
      id: 'INSP-003',
      area: 'Facade - Panel Installation',
      status: 'Pending',
      inspector: 'A. Johnson',
      date: '2024-07-29',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pass':
        return 'secondary';
      case 'Fail':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Quality Control
          </h1>
          <p className="text-muted-foreground">
            Manage inspections, defects, and quality metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Inspection Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Inspection Checklists</CardTitle>
              <ListChecks className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Upcoming and recent quality inspections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">ID</TableHead>
                  <TableHead>Area / Scope</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inspections.map((insp) => (
                  <TableRow key={insp.id}>
                    <TableCell className="font-medium font-code">{insp.id}</TableCell>
                    <TableCell>{insp.area}</TableCell>
                    <TableCell>{insp.inspector}</TableCell>
                    <TableCell>{insp.date}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(insp.status)}>
                        {insp.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>Quality Metrics</CardTitle>
                <BarChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
                High-level quality performance indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <h3 className="text-sm font-medium">Defect Trends</h3>
                <p className="text-sm text-muted-foreground">Chart coming soon.</p>
             </div>
             <div>
                <h3 className="text-sm font-medium">Rework Statistics</h3>
                <p className="text-sm text-muted-foreground">Chart coming soon.</p>
             </div>
              <div>
                <h3 className="text-sm font-medium">Compliance Tracking</h3>
                <p className="text-sm text-muted-foreground">Tracker coming soon.</p>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Defect Registry */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Defect Registry (Punch List)</CardTitle>
            <Bug className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardDescription>
            Track and manage all identified defects and issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Defect registry table and management tools coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
