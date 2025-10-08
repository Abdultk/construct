
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  ChevronDown,
  Download,
  Edit,
  Filter,
  Search,
  Wand2,
  X,
  Info,
  FileCheck,
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';
import { projects } from '@/lib/data';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';

type Transaction = {
  id: string;
  project: string;
  projectId: string;
  category: 'Materials' | 'Labor' | 'Equipment' | 'Subcontractor';
  description: string;
  wbs: string;
  amount: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
  isAnomaly?: boolean;
  anomalyReason?: string;
};

const allTransactions: Transaction[] = [
    { id: 'TRN001', project: 'Downtown Skyscraper', projectId: 'proj-001', category: 'Materials', description: 'Purchase of structural steel beams', wbs: '3.2.1', amount: 75000, status: 'Approved', date: '2024-07-15', isAnomaly: false },
    { id: 'TRN002', project: 'Suburban Housing', projectId: 'proj-002', category: 'Labor', description: 'Overtime pay for foundation crew', wbs: '4.1.2', amount: 120000, status: 'Pending', date: '2024-07-14', isAnomaly: true, anomalyReason: 'Amount is 50% higher than category average for this project.' },
    { id: 'TRN003', project: 'Interstate Bridge', projectId: 'proj-003', category: 'Equipment', description: 'Rental of heavy-duty crane', wbs: '2.3.1', amount: 25000, status: 'Approved', date: '2024-07-13', isAnomaly: false },
    { id: 'TRN004', project: 'Hospital Wing', projectId: 'proj-004', category: 'Subcontractor', description: 'Payment for HVAC installation (Milestone 1)', wbs: '5.5.4', amount: 200000, status: 'Rejected', date: '2024-07-12', isAnomaly: false },
    { id: 'TRN005', project: 'Downtown Skyscraper', projectId: 'proj-001', category: 'Labor', description: 'Weekly payroll for site workers', wbs: '4.1.1', amount: 35000, status: 'Approved', date: '2024-07-11', isAnomaly: false },
    { id: 'TRN006', project: 'Suburban Housing', projectId: 'proj-002', category: 'Materials', description: 'Emergency purchase of waterproofing membrane', wbs: '3.1.1', amount: 55000, status: 'Approved', date: '2024-07-10', isAnomaly: true, anomalyReason: 'This purchase deviates from the typical procurement cycle.' },
    { id: 'TRN007', project: 'Downtown Skyscraper', projectId: 'proj-001', category: 'Equipment', description: 'Generator fuel delivery', wbs: '2.4.1', amount: 15000, status: 'Approved', date: '2024-06-25', isAnomaly: false },
    { id: 'TRN008', project: 'Coastal Wind Farm', projectId: 'proj-005', category: 'Subcontractor', description: 'Payment for turbine foundation casting', wbs: '6.1.1', amount: 550000, status: 'Approved', date: '2024-06-20', isAnomaly: false },
];

const formatCurrency = (value: number, isClient: boolean) => {
    if (!isClient) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', compactDisplay: 'short' }).format(value);
};

const formatCurrencyFull = (value: number, isClient: boolean) => {
    if (!isClient) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value); }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
};

function CostTrackingContent() {
  const searchParams = useSearchParams();
  const anomaliesParam = searchParams.get('anomalies');

  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [wbsFilter, setWbsFilter] = useState('');
  const [showAnomalies, setShowAnomalies] = useState(anomaliesParam === 'true');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    setIsClient(true);
    setShowAnomalies(anomaliesParam === 'true');
  }, [anomaliesParam]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      const transactionDate = new Date(t.date);
      const matchesSearch = searchTerm === '' || 
        Object.values(t).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchesProject = projectFilter === 'All' || t.projectId === projectFilter;
      const matchesDate = !dateRange || !dateRange.from || !dateRange.to || (transactionDate >= dateRange.from && transactionDate <= dateRange.to);
      const matchesWbs = wbsFilter === '' || t.wbs.startsWith(wbsFilter);
      const matchesAnomaly = !showAnomalies || t.isAnomaly;

      return matchesSearch && matchesCategory && matchesProject && matchesDate && matchesWbs && matchesAnomaly;
    });
  }, [searchTerm, categoryFilter, projectFilter, dateRange, wbsFilter, showAnomalies]);

  const analysisData = useMemo(() => {
    const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryBreakdown = filteredTransactions.reduce((acc, t) => {
        const category = acc.find(item => item.name === t.category);
        if (category) {
            category.value += t.amount;
        } else {
            acc.push({ name: t.category, value: t.amount, fill: '' });
        }
        return acc;
    }, [] as { name: string; value: number, fill: string }[]);
    
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];
    categoryBreakdown.forEach((item, index) => {
      item.fill = colors[index % colors.length];
    });

    const transactionCount = filteredTransactions.length;
    const averageTransactionValue = transactionCount > 0 ? totalAmount / transactionCount : 0;
    const anomalyCount = filteredTransactions.filter(t => t.isAnomaly).length;

    return {
        totalAmount,
        transactionCount,
        averageTransactionValue,
        anomalyCount,
        categoryBreakdown,
    };
  }, [filteredTransactions]);
  
  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
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
  
  const getStatusBadge = (status: string | undefined) => {
    if (!status) return 'outline';
    switch (status) {
      case 'Approved': return 'secondary';
      case 'Pending': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Cost Tracking</h1>
          <p className="text-muted-foreground">Detailed cost analysis across all projects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={selectedRows.size === 0}><Download className="mr-2 h-4 w-4" /> Export ({selectedRows.size})</Button>
          <Button variant="secondary" disabled={selectedRows.size === 0}><Edit className="mr-2 h-4 w-4" /> Bulk Edit ({selectedRows.size})</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        <div className="col-span-12 lg:col-span-3 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}` : format(dateRange.from, "LLL dd, y")
                      ) : ( <span>Pick a date range</span> )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Project</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span>{projectFilter === 'All' ? 'All Projects' : projects.find(p => p.id === projectFilter)?.name}</span><ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onClick={() => setProjectFilter('All')}>All Projects</DropdownMenuItem>
                    {projects.map(p => <DropdownMenuItem key={p.id} onClick={() => setProjectFilter(p.id)}>{p.name}</DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label>Cost Category</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between"><span>{categoryFilter}</span><ChevronDown /></Button>
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
            <CardHeader><CardTitle>Analysis Panel</CardTitle><CardDescription>Summary of filtered transactions.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg border bg-muted p-2">
                        <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                        <p className="text-xl font-bold">{formatCurrency(analysisData.totalAmount, isClient)}</p>
                    </div>
                     <div className="rounded-lg border bg-muted p-2">
                        <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                        <p className="text-xl font-bold">{analysisData.transactionCount}</p>
                    </div>
                     <div className="rounded-lg border bg-muted p-2">
                        <p className="text-sm font-medium text-muted-foreground">Avg. Value</p>
                        <p className="text-xl font-bold">{formatCurrency(analysisData.averageTransactionValue, isClient)}</p>
                    </div>
                     <div className="rounded-lg border bg-muted p-2">
                        <p className="text-sm font-medium text-muted-foreground">Anomalies</p>
                        <p className="text-xl font-bold text-destructive">{analysisData.anomalyCount}</p>
                    </div>
                </div>
                 <div>
                    <h4 className="text-sm font-medium mb-2">Cost by Category</h4>
                    {analysisData.categoryBreakdown.length > 0 ? (
                        <ChartContainer config={{}} className="mx-auto aspect-square h-40">
                        <PieChart><ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel formatter={(value) => formatCurrencyFull(value as number, isClient)} />} /><Pie data={analysisData.categoryBreakdown} dataKey="value" nameKey="name" >{analysisData.categoryBreakdown.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.fill} /> ))}</Pie></ChartContainer>
                    ) : ( <p className="text-sm text-muted-foreground text-center py-8">No data to display.</p> )}
                 </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <Card><CardContent className="flex items-center justify-between p-3"><div className="relative w-full max-w-sm"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Search transactions..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div></CardContent></Card>
          <div className="flex-1 overflow-auto rounded-md border">
            <TooltipProvider>
            <Table>
              <TableHeader className="sticky top-0 bg-card"><TableRow><TableHead className="w-12"><Checkbox onCheckedChange={handleSelectAll} checked={isAllSelected} aria-label="Select all rows" /></TableHead><TableHead className="w-[100px]">ID</TableHead><TableHead>Project</TableHead><TableHead>Category</TableHead><TableHead>WBS</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead></TableRow></TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} data-state={selectedRows.has(transaction.id) && "selected"} className={`cursor-pointer ${transaction.isAnomaly ? 'bg-yellow-500/10' : ''}`} onClick={() => setSelectedTransaction(transaction)}>
                    <TableCell onClick={(e) => e.stopPropagation()}><Checkbox onCheckedChange={(checked) => handleRowSelect(transaction.id, !!checked)} checked={selectedRows.has(transaction.id)} aria-label={`Select row ${transaction.id}`} /></TableCell>
                    <TableCell className="font-medium font-code">
                      {transaction.id}
                      {transaction.isAnomaly && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-1"><Wand2 className="h-3 w-3 inline-block text-ai-accent" /></span>
                          </TooltipTrigger>
                          <TooltipContent><p>{transaction.anomalyReason}</p></TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>{transaction.project}</TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                    <TableCell className="hidden md:table-cell font-code">{transaction.wbs}</TableCell>
                    <TableCell className="hidden md:table-cell">{transaction.date}</TableCell>
                    <TableCell><Badge variant={getStatusBadge(transaction.status)}>{transaction.status}</Badge></TableCell>
                    <TableCell className="text-right font-code">{formatCurrencyFull(transaction.amount, isClient)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <Drawer open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>Transaction Details: {selectedTransaction?.id}</DrawerTitle>
              <DrawerDescription>Comprehensive details for the selected cost item.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
               {selectedTransaction?.isAnomaly && (
                 <Card className="border-yellow-500/50 bg-yellow-500/10">
                   <CardHeader className="flex-row gap-2 space-y-0"><Wand2 className="h-5 w-5 text-ai-accent" /><CardTitle>AI Anomaly Detected</CardTitle></CardHeader>
                   <CardContent><p>{selectedTransaction.anomalyReason}</p></CardContent>
                 </Card>
               )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-1"><div className="text-muted-foreground">Project</div><div className="font-medium">{selectedTransaction?.project}</div></div>
                    <div className="space-y-1"><div className="text-muted-foreground">Category</div><div className="font-medium">{selectedTransaction?.category}</div></div>
                    <div className="space-y-1"><div className="text-muted-foreground">WBS Code</div><div className="font-medium font-code">{selectedTransaction?.wbs}</div></div>
                    <div className="space-y-1"><div className="text-muted-foreground">Status</div><div><Badge variant={getStatusBadge(selectedTransaction?.status)}>{selectedTransaction?.status}</Badge></div></div>
                </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="space-y-1"><div className="text-muted-foreground">Date</div><div className="font-medium">{selectedTransaction?.date}</div></div>
                    <div className="space-y-1 col-span-2"><div className="text-muted-foreground">Amount</div><div className="font-medium text-lg font-code">{formatCurrencyFull(selectedTransaction?.amount || 0, isClient)}</div></div>
                </div>
                 <div className="space-y-1 text-sm">
                    <div className="text-muted-foreground">Description</div>
                    <div className="font-medium">{selectedTransaction?.description}</div>
                </div>
                {selectedTransaction && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${selectedTransaction.projectId}/documents`}>
                        View Related Documents
                        </Link>
                    </Button>
                    <Button variant="secondary" size="sm" asChild>
                        <Link href="/payment-certificate">
                            <FileCheck className="mr-2 h-4 w-4" />
                            View Payment Certificate
                        </Link>
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default function CostTrackingPage() {
  return (
    <Suspense>
      <CostTrackingContent />
    </Suspense>
  )
}
