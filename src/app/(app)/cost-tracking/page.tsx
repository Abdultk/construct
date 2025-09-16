
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
import { useState, useEffect, useMemo } from 'react';

type Transaction = {
  id: string;
  project: string;
  category: 'Materials' | 'Labor' | 'Equipment' | 'Subcontractor';
  wbs: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
  isAnomaly?: boolean;
};

const allTransactions: Transaction[] = [
    { id: 'TRN001', project: 'Downtown Skyscraper', category: 'Materials', wbs: '3.2.1', amount: 75000, status: 'Approved', date: '2024-07-15', isAnomaly: false },
    { id: 'TRN002', project: 'Suburban Housing', category: 'Labor', wbs: '4.1.2', amount: 120000, status: 'Pending', date: '2024-07-14', isAnomaly: true },
    { id: 'TRN003', project: 'Interstate Bridge', category: 'Equipment', wbs: '2.3.1', amount: 25000, status: 'Approved', date: '2024-07-13', isAnomaly: false },
    { id: 'TRN004', project: 'Hospital Wing', category: 'Subcontractor', wbs: '5.5.4', amount: 200000, status: 'Rejected', date: '2024-07-12', isAnomaly: false },
    { id: 'TRN005', project: 'Downtown Skyscraper', category: 'Labor', wbs: '4.1.1', amount: 35000, status: 'Approved', date: '2024-07-11', isAnomaly: false },
    { id: 'TRN006', project: 'Suburban Housing', category: 'Materials', wbs: '3.1.1', amount: 55000, status: 'Approved', date: '2024-07-10', isAnomaly: true },
];

export default function CostTrackingPage() {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [wbsFilter, setWbsFilter] = useState('');
  const [showAnomalies, setShowAnomalies] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      const matchesSearch = searchTerm === '' || 
        Object.values(t).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchesWbs = wbsFilter === '' || t.wbs.startsWith(wbsFilter);
      const matchesAnomaly = !showAnomalies || t.isAnomaly;

      return matchesSearch && matchesCategory && matchesWbs && matchesAnomaly;
    });
  }, [searchTerm, categoryFilter, wbsFilter, showAnomalies]);
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(filteredTransactions.map(t => t.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(id);
    } else {
      newSelectedRows.delete(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const isAllSelected = selectedRows.size > 0 && selectedRows.size === filteredTransactions.length;
  const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < filteredTransactions.length;


  const formatCurrency = (value: number) => {
    if (!isClient) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  }
  
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
          <Button variant="outline" disabled={selectedRows.size === 0}>
            <Download className="mr-2 h-4 w-4" /> Export ({selectedRows.size})
          </Button>
          <Button variant="secondary" disabled={selectedRows.size === 0}>
            <Edit className="mr-2 h-4 w-4" /> Bulk Edit ({selectedRows.size})
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
                      <span>{categoryFilter}</span>
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => setCategoryFilter('All')}>All Categories</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter('Materials')}>Materials</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter('Labor')}>Labor</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter('Equipment')}>Equipment</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCategoryFilter('Subcontractor')}>Subcontractor</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label htmlFor='wbs-filter'>Work Package</Label>
                 <Input id="wbs-filter" placeholder="Search WBS code..." value={wbsFilter} onChange={e => setWbsFilter(e.target.value)}/>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="ai-anomaly-toggle" checked={showAnomalies} onCheckedChange={setShowAnomalies} />
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
                <Input placeholder="Search transactions..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                    <TableHead className="w-12">
                        <Checkbox 
                            onCheckedChange={handleSelectAll}
                            checked={isAllSelected}
                            aria-label="Select all rows"
                        />
                    </TableHead>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                   <TableHead>WBS</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} data-state={selectedRows.has(transaction.id) && "selected"} className={transaction.isAnomaly ? 'bg-yellow-500/10' : ''}>
                    <TableCell>
                        <Checkbox 
                            onCheckedChange={(checked) => handleRowSelect(transaction.id, !!checked)}
                            checked={selectedRows.has(transaction.id)}
                            aria-label={`Select row ${transaction.id}`}
                        />
                    </TableCell>
                    <TableCell className="font-medium font-code">
                      {transaction.id}
                      {transaction.isAnomaly && <Wand2 className="h-3 w-3 inline-block ml-1 text-ai-accent" />}
                    </TableCell>
                    <TableCell>{transaction.project}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-code">
                      {transaction.wbs}
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

    