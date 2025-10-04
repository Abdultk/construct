
'use client';

import {
  Package,
  Trash2,
  AlertTriangle,
  Boxes,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Download,
  BarChart,
  Lightbulb,
  Barcode,
  ShoppingBag,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  FileText,
  Warehouse,
  CalendarDays,
  MoreVertical,
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
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


const inventoryData = [
    { id: 'STL-001', name: 'Structural Steel Beams', category: 'Structural', stock: '25 Tons', location: 'Yard A', status: 'In Stock', expiry: null },
    { id: 'CEM-003', name: 'Portland Cement (Type II)', category: 'Concrete', stock: '500 bags', location: 'Silo 2', status: 'In Stock', expiry: '2024-09-15' },
    { id: 'WIR-007', name: '12-Gauge Electrical Wire', category: 'Electrical', stock: '5 rolls', location: 'Warehouse 1, Bay 3', status: 'Low Stock', expiry: null },
    { id: 'DRY-002', name: '1/2" Drywall Sheets', category: 'Finishes', stock: '150 sheets', location: 'Floor 5', status: 'Ordered', expiry: null },
    { id: 'PIPE-015', name: '4" PVC Pipe', category: 'Plumbing', stock: '80 lengths', location: 'Yard B', status: 'In Stock', expiry: null },
];

const wasteData = [
  { name: 'Over-cutting', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'Damage', value: 30, fill: 'hsl(var(--chart-2))' },
  { name: 'Expired', value: 10, fill: 'hsl(var(--chart-4))' },
  { name: 'Theft/Loss', value: 5, fill: 'hsl(var(--chart-5))' },
  { name: 'Spillage', value: 15, fill: 'hsl(var(--muted))' },
];

const recentWasteItems = [
    { name: 'Drywall Sheets', amount: '15 sheets', reason: 'Water Damage' },
    { name: 'Portland Cement', amount: '20 bags', reason: 'Expired' },
    { name: 'Structural Steel', amount: '0.5 Ton', reason: 'Cutting Error' },
]


export default function MaterialManagementPage() {
    const { toast } = useToast();

    const handleActionClick = (action: string) => {
        toast({
            title: `${action} Initiated`,
            description: `The workflow for "${action}" has been started.`,
        });
    };

    const getStatusBadge = (status: string) => {
        switch(status) {
            case 'In Stock': return 'secondary';
            case 'Low Stock': return 'destructive';
            case 'Ordered': return 'outline';
            default: return 'outline';
        }
    }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Material & Waste Management</h1>
          <p className="text-muted-foreground">
            Track inventory, analyze waste, and optimize material flow.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleActionClick('New Purchase Order')}>
              <ShoppingBag className="mr-2 h-4 w-4" /> New P.O.
            </Button>
            <Button variant="outline" onClick={() => handleActionClick('Report Waste')}>
              <Trash2 className="mr-2 h-4 w-4" /> Report Waste
            </Button>
            <Button onClick={() => handleActionClick('Material Check-in')}>
              <Barcode className="mr-2 h-4 w-4" /> Check-in/out
            </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <Boxes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">Across all sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Rate</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stockout Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overstock Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$55K</div>
            <p className="text-xs text-muted-foreground">Potential carrying costs</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                 <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Digital Inventory Dashboard</CardTitle>
                        <CardDescription>Real-time stock levels for Downtown Skyscraper.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search materials..." className="pl-8" />
                        </div>
                        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    </div>
                 </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Material</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Expiry</TableHead>
                            <TableHead className="w-12"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventoryData.map(item => (
                             <TableRow key={item.id}>
                                <TableCell>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground font-code">{item.id}</p>
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="font-medium">{item.stock}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell><Badge variant={getStatusBadge(item.status)}>{item.status}</Badge></TableCell>
                                <TableCell>{item.expiry || 'N/A'}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <div className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-ai-accent" /> AI-Powered Forecasting</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="rounded-lg border bg-blue-500/10 p-4">
                        <p className="font-semibold text-sm flex items-center gap-2"><TrendingUp className="text-blue-500" /> Usage Forecast</p>
                        <p className="text-xs text-muted-foreground">Next 7 days: <strong>120 sheets of drywall</strong> and <strong>50 bags of cement</strong> required for Floor 6 fit-out.</p>
                    </div>
                     <div className="rounded-lg border bg-yellow-500/10 p-4">
                        <p className="font-semibold text-sm flex items-center gap-2"><AlertTriangle className="text-yellow-500" /> Over-ordering Alert</p>
                        <p className="text-xs text-muted-foreground">P.O. #582 for <strong>300 rolls of electrical wire</strong> exceeds forecast by 40%. Recommend reducing order to 180 rolls.</p>
                    </div>
                    <Button variant="outline" className="w-full">
                        <BarChart className="mr-2 h-4 w-4" /> View Full Forecast
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Loss Minimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                         <div className="flex items-center gap-3">
                            <Warehouse className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold text-sm">Storage Conditions</p>
                                <p className="text-xs text-muted-foreground">Silo 2 Humidity: 45% (Optimal)</p>
                            </div>
                        </div>
                        <Badge variant="secondary">Normal</Badge>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3">
                         <div className="flex items-center gap-3">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold text-sm">FIFO Alert</p>
                                <p className="text-xs text-muted-foreground">Use cement from Batch #C-08 (Expires Aug 30) before Batch #C-12.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
       </div>
       <Card>
            <CardHeader>
                <CardTitle>Usage vs. Waste Analytics</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-1">
                     <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie data={wasteData} dataKey="value" nameKey="name" innerRadius={50} strokeWidth={5}>
                                {wasteData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
                 <div className="lg:col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Material</TableHead>
                                <TableHead>Wasted Amount</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentWasteItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-destructive">{item.amount}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell className="text-right">
                                         <Button variant="ghost" size="sm">
                                            Details <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </div>
            </CardContent>
       </Card>
    </div>
  );
}
