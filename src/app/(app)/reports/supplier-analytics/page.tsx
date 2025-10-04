
'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
import {
    ArrowLeft,
    Download,
    DollarSign,
    Package,
    Users,
    TrendingUp,
    BarChart2,
    PieChart,
} from 'lucide-react';
import Link from 'next/link';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, Pie, PieChart as RechartsPieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 12000000 },
  { month: 'Feb', revenue: 15000000 },
  { month: 'Mar', revenue: 14000000 },
  { month: 'Apr', revenue: 18000000 },
  { month: 'May', revenue: 22000000 },
  { month: 'Jun', revenue: 25000000 },
  { month: 'Jul', revenue: 28000000 },
];

const topProductsData = [
  { name: 'Dangote Cement', sales: 12500000, fill: 'hsl(var(--chart-1))' },
  { name: '12mm Iron Rod', sales: 8500000, fill: 'hsl(var(--chart-2))' },
  { name: 'Granite (3/4 inch)', sales: 5000000, fill: 'hsl(var(--chart-3))' },
  { name: 'Sharp Sand', sales: 2000000, fill: 'hsl(var(--chart-4))' },
];

const topCustomersData = [
    { name: 'ConstructCo', orders: 15, value: 8200000 },
    { name: 'BuildRight Inc.', orders: 12, value: 5500000 },
    { name: 'MegaStructures Ltd.', orders: 8, value: 3100000 },
];

export default function SupplierAnalyticsPage() {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
    };

    const chartConfig = {
        revenue: { label: "Revenue", color: "hsl(var(--primary))" },
    };

    return (
        <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/suppliers">
                        <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold font-headline">Supplier Analytics</h1>
                        <p className="text-muted-foreground">Detailed performance report for Dangote Industries PLC.</p>
                    </div>
                </div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Report</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(124700000)}</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last year</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders (YTD)</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">384</div>
                    <p className="text-xs text-muted-foreground">+18.2% from last year</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(324740)}</div>
                    <p className="text-xs text-muted-foreground">+1.9% from last year</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Customers (YTD)</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12</div>
                    <p className="text-xs text-muted-foreground">New accounts acquired this year</p>
                </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Monthly revenue over the current year.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                        <LineChart data={revenueData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                            <Line type="monotone" dataKey="revenue" stroke={chartConfig.revenue.color} strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5" /> Top Performing Products</CardTitle>
                        <CardDescription>Sales distribution by product.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-64 w-full">
                            <RechartsPieChart>
                                <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)} />} />
                                <Pie data={topProductsData} dataKey="sales" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={5}>
                                     {topProductsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </RechartsPieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Top Customers</CardTitle>
                        <CardDescription>Your most valuable customers by order value.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead className="text-right">Total Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topCustomersData.map((customer) => (
                                    <TableRow key={customer.name}>
                                        <TableCell className="font-medium">{customer.name}</TableCell>
                                        <TableCell>{customer.orders}</TableCell>
                                        <TableCell className="text-right font-code">{formatCurrency(customer.value)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
