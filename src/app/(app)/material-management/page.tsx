
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
  Upload,
  History,
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
import { Pie, PieChart, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/lib/data';
import Link from 'next/link';

type InventoryItem = {
    id: string;
    name: string;
    category: 'Structural' | 'Concrete' | 'Electrical' | 'Finishes' | 'Plumbing';
    stock: string;
    location: string;
    status: 'In Stock' | 'Low Stock' | 'Ordered';
    expiry: string | null;
    value: number;
};

const inventoryData: InventoryItem[] = [
    { id: 'STL-001', name: 'Structural Steel Beams', category: 'Structural', stock: '25 Tons', location: 'Yard A', status: 'In Stock', expiry: null, value: 75000 },
    { id: 'CEM-003', name: 'Portland Cement (Type II)', category: 'Concrete', stock: '500 bags', location: 'Silo 2', status: 'In Stock', expiry: '2024-09-15', value: 25000 },
    { id: 'WIR-007', name: '12-Gauge Electrical Wire', category: 'Electrical', stock: '5 rolls', location: 'Warehouse 1, Bay 3', status: 'Low Stock', expiry: null, value: 5000 },
    { id: 'DRY-002', name: '1/2" Drywall Sheets', category: 'Finishes', stock: '150 sheets', location: 'Floor 5', status: 'Ordered', expiry: null, value: 7500 },
    { id: 'PIPE-015', name: '4" PVC Pipe', category: 'Plumbing', stock: '80 lengths', location: 'Yard B', status: 'In Stock', expiry: null, value: 4000 },
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

const usageData = [
    { month: 'Jan', usage: 30 },
    { month: 'Feb', usage: 45 },
    { month: 'Mar', usage: 40 },
    { month: 'Apr', usage: 50 },
    { month: 'May', usage: 48 },
    { month: 'Jun', usage: 55 },
];


export default function MaterialManagementPage() {
    const { toast } = useToast();
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [selectedProject, setSelectedProject] = useState(projects[0]);

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
          <h1 className="text-2xl font-bold font-headline">Material &amp; Waste Management</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto text-muted-foreground hover:text-foreground">
                   <span>Project: {selectedProject.name}</span>
                   <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {projects.map(project => (
                    <DropdownMenuItem key={project.id} onSelect={() => setSelectedProject(project)}>
                        {project.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <ShoppingBag className="mr-2 h-4 w-4" /> New P.O.
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Purchase Order</DialogTitle>
                  <DialogDescription>Create and send a new purchase order to a supplier.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="po-supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger id="po-supplier"><SelectValue placeholder="Select a supplier..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dangote">Dangote Industries PLC</SelectItem>
                        <SelectItem value="local-steel">Local Steel Mill</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Materials</Label>
                    <div className="rounded-md border p-2 space-y-2">
                        <p className="text-sm text-muted-foreground">Add materials to this order.</p>
                        <Button variant="secondary" size="sm"><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                  <Button onClick={() => toast({title: "Purchase Order Sent"})}>Send P.O.</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" /> Report Waste
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Material Waste</DialogTitle>
                  <DialogDescription>Log wasted materials for tracking and analysis.</DialogDescription>
                </DialogHeader>
                 <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="waste-material">Material</Label>
                    <Select>
                      <SelectTrigger id="waste-material"><SelectValue placeholder="Select a material..." /></SelectTrigger>
                      <SelectContent>
                        {inventoryData.map(i => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="waste-qty">Quantity Wasted</Label>
                      <Input id="waste-qty" type="number" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="waste-reason">Reason</Label>
                       <Select>
                          <SelectTrigger id="waste-reason"><SelectValue placeholder="Select reason..." /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="damage">Damage</SelectItem>
                            <SelectItem value="over-cutting">Over-cutting</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="spillage">Spillage</SelectItem>
                            <SelectItem value="theft">Theft/Loss</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Photo Evidence (Optional)</Label>
                    <Input type="file" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                  <Button onClick={() => toast({title: "Waste Reported"})}>Log Waste</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Barcode className="mr-2 h-4 w-4" /> Check-in/out
                </Button>
              </DialogTrigger>
               <DialogContent>
                <DialogHeader>
                  <DialogTitle>Material Check-in / Check-out</DialogTitle>
                  <DialogDescription>Scan a barcode or manually enter material details.</DialogDescription>
                </DialogHeader>
                 <div className="space-y-4 py-4">
                    <Button variant="outline" className="w-full h-24">
                        <Barcode className="h-10 w-10 text-muted-foreground" />
                    </Button>
                    <div className="space-y-2">
                      <Label htmlFor="check-material">Material</Label>
                      <Input id="check-material" placeholder="Enter material ID or name..." />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="check-qty">Quantity</Label>
                          <Input id="check-qty" type="number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="check-action">Action</Label>
                          <Select>
                              <SelectTrigger id="check-action"><SelectValue placeholder="Select action..." /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="check-in">Check-in (Add to stock)</SelectItem>
                                <SelectItem value="check-out">Check-out (Deduct from stock)</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                    </div>
                 </div>
                 <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={() => toast({title: "Inventory Updated"})}>Confirm</Button>
                 </DialogFooter>
              </DialogContent>
            </Dialog>
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
                        <CardDescription>Real-time stock levels for {selectedProject.name}.</CardDescription>
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
                             <TableRow key={item.id} className="cursor-pointer" onClick={() => setSelectedItem(item)}>
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
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setSelectedItem(item);}}>
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setSelectedItem(item)}>View Details</DropdownMenuItem>
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
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/budget-establishment">
                           <BarChart className="mr-2 h-4 w-4" /> View Full Forecast
                        </Link>
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
        <Drawer open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-4xl">
                <DrawerHeader>
                    <DrawerTitle>{selectedItem?.name} ({selectedItem?.id})</DrawerTitle>
                    <DrawerDescription>Detailed view of inventory item.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{selectedItem?.stock}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
                                <Boxes className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">${selectedItem?.value.toLocaleString()}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Location</CardTitle>
                                <Warehouse className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">{selectedItem?.location}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Expiry</CardTitle>
                                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">{selectedItem?.expiry || 'N/A'}</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5" /> Usage Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={{ usage: { label: 'Usage', color: 'hsl(var(--primary))' } }} className="h-40 w-full">
                                    <LineChart data={usageData} margin={{ left: -20, right: 20}}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line dataKey="usage" type="monotone" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Procurement History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>P.O. #</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Qty</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>PO-0567</TableCell>
                                            <TableCell>2024-06-15</TableCell>
                                            <TableCell>100 bags</TableCell>
                                        </TableRow>
                                         <TableRow>
                                            <TableCell>PO-0412</TableCell>
                                            <TableCell>2024-05-12</TableCell>
                                            <TableCell>200 bags</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                </div>
            </DrawerContent>
        </Drawer>
    </div>
  );
}

    