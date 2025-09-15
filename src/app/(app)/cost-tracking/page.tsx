
'use client';

import {
  Calendar,
  ChevronDown,
  Download,
  Edit,
  Filter,
  Search,
  Wand2,
} from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

export default function CostTrackingPage() {
  const transactions = [
    {
      id: 'TRN001',
      project: 'Downtown Skyscraper',
      category: 'Materials',
      amount: 75000,
      status: 'Approved',
      date: '2024-07-15',
    },
    {
      id: 'TRN002',
      project: 'Suburban Housing',
      category: 'Labor',
      amount: 120000,
      status: 'Pending',
      date: '2024-07-14',
    },
    {
      id: 'TRN003',
      project: 'Interstate Bridge',
      category: 'Equipment',
      amount: 25000,
      status: 'Approved',
      date: '2024-07-13',
    },
    {
      id: 'TRN004',
      project: 'Hospital Wing',
      category: 'Subcontractor',
      amount: 200000,
      status: 'Rejected',
      date: '2024-07-12',
    },
    {
      id: 'TRN005',
      project: 'Downtown Skyscraper',
      category: 'Labor',
      amount: 35000,
      status: 'Approved',
      date: '2024-07-11',
    },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'secondary';
      case 'Pending':
        return 'outline';
      default:
        return 'destructive';
    }
  };


  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Cost Tracking</h1>
          <p className="text-muted-foreground">
            Detailed cost analysis across all projects.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="secondary">
            <Edit className="mr-2 h-4 w-4" /> Bulk Edit
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Filters Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>All time</span>
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Cost Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>All Categories</span>
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>Materials</DropdownMenuItem>
                    <DropdownMenuItem>Labor</DropdownMenuItem>
                    <DropdownMenuItem>Equipment</DropdownMenuItem>
                    <DropdownMenuItem>Subcontractor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label>Work Package</Label>
                 <Input placeholder="Search WBS code..." />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="ai-anomaly-toggle" />
                <Label htmlFor="ai-anomaly-toggle">AI Anomaly Detection</Label>
                <Wand2 className="h-4 w-4 text-ai-accent" />
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Analysis Panel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-3">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8" />
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                    <TableHead className="w-12"><Checkbox /></TableHead>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-medium font-code">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.project}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-code">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

    