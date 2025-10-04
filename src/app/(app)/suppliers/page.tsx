
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreVertical,
  Search,
  PlusCircle,
  FileText,
  DollarSign,
  Star,
  Download,
  Upload,
  BarChart2,
  Inbox,
  PackageCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productListings = [
  { id: 'CEM-01', name: 'Dangote Cement (50kg)', price: 10500, unit: 'bag', stock: 'In Stock', status: 'Published' },
  { id: 'STL-01', name: '12mm Iron Rod', price: 1200000, unit: 'ton', stock: 'In Stock', status: 'Published' },
  { id: 'BLK-01', name: '6-inch Sandcrete Block', price: 550, unit: 'piece', stock: 'Low Stock', status: 'Unlisted' },
];

const incomingRFQs = [
  { id: 'RFQ-0125', buyer: 'ConstructCo', items: 3, deadline: '2024-08-15', status: 'New' },
  { id: 'RFQ-0124', buyer: 'BuildRight Inc.', items: 1, deadline: '2024-08-10', status: 'Viewed' },
  { id: 'RFQ-0123', buyer: 'MegaStructures Ltd.', items: 5, deadline: '2024-08-08', status: 'Quoted' },
];

const orderVolumeData = [
  { month: 'Jan', orders: 35 },
  { month: 'Feb', orders: 42 },
  { month: 'Mar', orders: 55 },
  { month: 'Apr', orders: 50 },
  { month: 'May', orders: 65 },
  { month: 'Jun', orders: 72 },
  { month: 'Jul', orders: 80 },
];

const chartConfig = {
    orders: {
        label: "Orders",
        color: "hsl(var(--primary))",
    },
};

export default function SupplierDashboardPage() {
    const { toast } = useToast();
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
    };
    
    const handleAddProduct = () => {
        toast({
            title: "Product Added",
            description: "Your new product has been added to your catalog and is now visible to buyers.",
        });
        setIsAddProductOpen(false);
    };

    const handleBulkUpload = () => {
        toast({
            title: "Upload Processing",
            description: "Your file is being processed. You will be notified upon completion.",
        });
        setIsBulkUploadOpen(false);
    };

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                <h1 className="text-2xl font-bold font-headline">Supplier Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, Dangote Industries PLC.
                </p>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Bulk Upload</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Bulk Upload Products</DialogTitle>
                                <DialogDescription>
                                    Upload a CSV or Excel file to add or update multiple products at once.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="flex items-center justify-center w-full">
                                    <Label htmlFor="bulk-upload-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">CSV, XLSX (MAX. 5MB)</p>
                                        </div>
                                        <Input id="bulk-upload-file" type="file" className="hidden" />
                                    </Label>
                                </div>
                                <Button variant="link" className="w-full">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download CSV Template
                                </Button>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleBulkUpload}>Upload & Process</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Product</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>Enter the details for your new product listing.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">Product Name</Label>
                                    <Input id="product-name" placeholder="e.g., Dangote Cement (50kg)" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="product-category">Category</Label>
                                    <Select>
                                        <SelectTrigger id="product-category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cement">Cement</SelectItem>
                                            <SelectItem value="steel">Steel</SelectItem>
                                            <SelectItem value="aggregates">Aggregates</SelectItem>
                                            <SelectItem value="blocks">Blocks</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="product-price">Price (NGN)</Label>
                                        <Input id="product-price" type="number" placeholder="10500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="product-unit">Unit</Label>
                                        <Input id="product-unit" placeholder="bag" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="product-stock">Stock Status</Label>
                                    <Select>
                                        <SelectTrigger id="product-stock">
                                            <SelectValue placeholder="Select stock status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in-stock">In Stock</SelectItem>
                                            <SelectItem value="low-stock">Low Stock</SelectItem>
                                            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                            <SelectItem value="pre-order">Pre-Order</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleAddProduct}>Add Product</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue (30d)</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(15200000)}</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New RFQs</CardTitle>
                    <Inbox className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Awaiting your quote</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fulfilled Orders (30d)</CardTitle>
                    <PackageCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">80</div>
                    <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">4.8 / 5.0</div>
                    <p className="text-xs text-muted-foreground">Based on 125 reviews</p>
                </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>My Product Listings</CardTitle>
                        <CardDescription>Manage your product catalog and pricing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productListings.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-xs text-muted-foreground font-code">{item.id}</p>
                                        </TableCell>
                                        <TableCell className="font-code font-semibold">{formatCurrency(item.price)} / {item.unit}</TableCell>
                                        <TableCell>
                                            <Badge variant={item.stock === 'In Stock' ? 'secondary' : 'destructive'}>{item.stock}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={item.status === 'Published' ? 'default' : 'outline'}>{item.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit Product</DropdownMenuItem>
                                                <DropdownMenuItem>Update Price</DropdownMenuItem>
                                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Unlist Product</DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Incoming RFQs</CardTitle>
                        <CardDescription>Respond to requests for quotation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomingRFQs.map(rfq => (
                                    <TableRow key={rfq.id}>
                                        <TableCell>
                                            <p className="font-medium">{rfq.buyer}</p>
                                            <p className="text-xs text-muted-foreground">{rfq.items} item(s)</p>
                                        </TableCell>
                                        <TableCell><Badge variant={rfq.status === 'New' ? 'destructive' : 'outline'}>{rfq.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div>
                        <h3 className="text-md font-semibold">Order Volume Trend (Last 6 Months)</h3>
                         <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                            <LineChart data={orderVolumeData} accessibilityLayer margin={{ top: 20, left: -20, right: 10 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => String(value)} />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line dataKey="orders" type="monotone" stroke={chartConfig.orders.color} strokeWidth={2} dot={true} />
                            </LineChart>
                        </ChartContainer>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold">Pricing Competitiveness</h3>
                        <div className="space-y-4 mt-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                    <p>Dangote Cement</p>
                                    <p className="font-semibold text-green-600">5% Below Market Avg.</p>
                                </div>
                                <Separator />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center text-sm">
                                    <p>12mm Iron Rod</p>
                                    <p className="font-semibold text-yellow-500">Matches Market Avg.</p>
                                </div>
                                <Separator />
                            </div>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="secondary">View Full Analytics Report</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
