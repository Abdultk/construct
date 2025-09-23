
'use client';
import {
    ArrowUpRight,
    CircleDollarSign,
    CreditCard,
    Download,
    TrendingDown,
    Gauge,
    AlertTriangle,
    Wallet,
    TrendingUp
} from 'lucide-react';
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
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, Pie, PieChart, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const budgetVsActualData = [
  { name: "Substructure", budget: 450000, actual: 475000 },
  { name: "Superstructure", budget: 1250000, actual: 1200000 },
  { name: "Facade", budget: 800000, actual: 850000 },
  { name: "MEP", budget: 950000, actual: 925000 },
  { name: "Finishes", budget: 600000, actual: 580000 },
  { name: "Sitework", budget: 300000, actual: 310000 },
];

const earnedValueData = [
    { name: 'Jan', pv: 100, ev: 100, ac: 110 },
    { name: 'Feb', pv: 200, ev: 210, ac: 220 },
    { name: 'Mar', pv: 300, ev: 305, ac: 310 },
    { name: 'Apr', pv: 400, ev: 380, ac: 410 },
    { name: 'May', pv: 500, ev: 490, ac: 500 },
    { name: 'Jun', pv: 600, ev: 580, ac: 610 },
    { name: 'Jul', pv: 700, ev: 710, ac: 700 },
];

const cashFlowData = [
    { name: 'Jan', inflow: 400, outflow: 240, net: 160 },
    { name: 'Feb', inflow: 300, outflow: 140, net: 160 },
    { name: 'Mar', inflow: 200, outflow: 580, net: -380 },
    { name: 'Apr', inflow: 278, outflow: 390, net: -112 },
    { name: 'May', inflow: 189, outflow: 480, net: -291 },
    { name: 'Jun', inflow: 239, outflow: 380, net: -141 },
    { name: 'Jul', inflow: 349, outflow: 430, net: -81 },
];

const chartConfig = {
    budget: {
      label: "Budget",
      color: "hsl(var(--secondary))",
    },
    actual: {
      label: "Actual",
      color: "hsl(var(--primary))",
    },
    pv: {
        label: "Planned Value (PV)",
        color: "hsl(var(--secondary))",
    },
    ev: {
        label: "Earned Value (EV)",
        color: "hsl(var(--primary))",
    },
    ac: {
        label: "Actual Cost (AC)",
        color: "hsl(var(--destructive))",
    },
    inflow: {
        label: "Cash Inflow",
        color: "hsl(var(--chart-2))",
    },
    outflow: {
        label: "Cash Outflow",
        color: "hsl(var(--chart-1))",
    },
    net: {
        label: "Net Cash Flow",
        color: "hsl(var(--primary))",
    },
    substructure: { label: 'Substructure', color: 'hsl(var(--chart-1))' },
    superstructure: { label: 'Superstructure', color: 'hsl(var(--chart-2))' },
    facade: { label: 'Facade', color: 'hsl(var(--chart-3))' },
    mep: { label: 'MEP', color: 'hsl(var(--chart-4))' },
    finishes: { label: 'Finishes', color: 'hsl(var(--chart-5))' },
    sitework: { label: 'Sitework', color: 'hsl(var(--muted))' },
};

const costBreakdownData = budgetVsActualData.map(item => ({
    name: item.name,
    value: item.actual,
    fill: chartConfig[item.name.toLowerCase() as keyof typeof chartConfig]?.color || 'hsl(var(--muted))',
}));

const budgetVariancesData = [
  { workPackage: '4.1.2 - Labor', project: 'Suburban Housing', budget: 95000, actual: 120000 },
  { workPackage: '3.2.1 - Facade Materials', project: 'Downtown Skyscraper', budget: 800000, actual: 850000 },
  { workPackage: '5.5.4 - MEP Subcontractor', project: 'Hospital Wing', budget: 950000, actual: 925000 },
  { workPackage: '2.3.1 - Bridge Deck', project: 'Interstate Bridge', budget: 1500000, actual: 1550000 },
  { workPackage: '3.1.1 - Sitework Materials', project: 'Suburban Housing', budget: 300000, actual: 310000 },
];


export default function BudgetEstablishmentPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const formatCurrency = (value: number) => {
        if (!isClient) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(value);
        }
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact",
            compactDisplay: "short",
        }).format(value);
    }
     const formatCurrencyFull = (value: number) => {
        if (!isClient) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value); }
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    };

    const recentTransactions = [
        { id: 'TRN001', project: 'Downtown Skyscraper', category: 'Materials', amount: 75000, status: 'Approved' },
        { id: 'TRN002', project: 'Suburban Housing', category: 'Labor', amount: 120000, status: 'Pending' },
        { id: 'TRN003', project: 'Interstate Bridge', category: 'Equipment', amount: 25000, status: 'Approved' },
        { id: 'TRN004', project: 'Hospital Wing', category: 'Subcontractor', amount: 200000, status: 'Rejected' },
    ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Budget & Cost Control</h1>
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2 text-base p-2">
                <Gauge className='h-5 w-5 text-green-500' />
                <span className='font-bold'>Budget Health: 82%</span>
            </Badge>
             <Button variant="destructive" size="sm" asChild>
                <Link href="/cost-tracking?anomalies=true">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    2 AI Anomalies
                </Link>
            </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(770000000)}</div>
            <p className="text-xs text-muted-foreground">Across all active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent to Date</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(457000000)}</div>
             <Progress value={59} className="h-2 mt-1" />
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Committed Costs</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(85200000)}</div>
            <p className="text-xs text-muted-foreground">For signed contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(227800000)}</div>
             <p className="text-xs text-muted-foreground">30% of total budget</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Budget vs. Actual</CardTitle>
                 <CardDescription>Comparison of budgeted and actual costs by work category for Downtown Skyscraper.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart data={budgetVsActualData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} angle={-45} textAnchor="end" height={60} />
                        <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="budget" fill={chartConfig.budget.color} radius={4} />
                        <Bar dataKey="actual" fill={chartConfig.actual.color} radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
                <CardDescription>Proportion of actual costs by work category for Downtown Skyscraper.</CardDescription>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
                 <ChartContainer config={chartConfig} className="min-h-[250px] w-full aspect-square">
                    <PieChart accessibilityLayer>
                         <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                formatter={(value) => formatCurrencyFull(value as number)}
                                hideLabel
                            />}
                        />
                        <Pie
                            data={costBreakdownData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            strokeWidth={5}
                            activeIndex={0}
                        >
                             {costBreakdownData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Earned Value Analysis</CardTitle>
                <CardDescription>PV, EV, and AC for Downtown Skyscraper.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <LineChart data={earnedValueData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `$${value}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <Line dataKey="pv" type="monotone" stroke={chartConfig.pv.color} strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        <Line dataKey="ev" type="monotone" stroke={chartConfig.ev.color} strokeWidth={2} dot={false} />
                        <Line dataKey="ac" type="monotone" stroke={chartConfig.ac.color} strokeWidth={2} dot={false} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Cash Flow Projection</CardTitle>
                 <CardDescription>Monthly cash inflow, outflow, and net balance.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <AreaChart data={cashFlowData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `$${value}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <Area type="monotone" dataKey="inflow" stackId="1" stroke={chartConfig.inflow.color} fill={chartConfig.inflow.color} />
                        <Area type="monotone" dataKey="outflow" stackId="1" stroke={chartConfig.outflow.color} fill={chartConfig.outflow.color} />
                        <Line type="monotone" dataKey="net" stroke={chartConfig.net.color} strokeWidth={2} dot={true} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle>Budget Variances</CardTitle>
            <CardDescription>
                Top variances by work package across all projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Work Package</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Budget</TableHead>
                        <TableHead className="text-right">Actual</TableHead>
                        <TableHead className="text-right">Variance ($)</TableHead>
                        <TableHead className="text-right">Variance (%)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {budgetVariancesData.map(item => {
                        const variance = item.actual - item.budget;
                        const variancePercentage = (variance / item.budget) * 100;
                        return (
                            <TableRow key={item.workPackage}>
                                <TableCell className="font-medium">{item.workPackage}</TableCell>
                                <TableCell>{item.project}</TableCell>
                                <TableCell className="text-right font-code">{formatCurrencyFull(item.budget)}</TableCell>
                                <TableCell className="text-right font-code">{formatCurrencyFull(item.actual)}</TableCell>
                                <TableCell className={`text-right font-code ${variance > 0 ? 'text-destructive' : 'text-green-600'}`}>
                                    {variance > 0 ? <TrendingUp className="inline-block h-4 w-4 mr-1" /> : <TrendingDown className="inline-block h-4 w-4 mr-1" />}
                                    {formatCurrencyFull(variance)}
                                </TableCell>
                                <TableCell className={`text-right font-code ${variance > 0 ? 'text-destructive' : 'text-green-600'}`}>
                                    {variancePercentage.toFixed(2)}%
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>AI-Detected Anomalies</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                    <TrendingDown className="h-6 w-6 text-yellow-500" />
                    <div>
                        <p className="font-semibold text-sm">Unusual Labor Costs</p>
                        <p className="text-xs text-muted-foreground">Project "Suburban Housing" shows 25% higher labor costs this month compared to the average.</p>
                    </div>
                </div>
                 <div className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                    <TrendingDown className="h-6 w-6 text-red-500" />
                    <div>
                        <p className="font-semibold text-sm">Potential Budget Overrun</p>
                        <p className="text-xs text-muted-foreground">"Hospital Wing" is trending 15% over budget. Immediate review recommended.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              A log of recent financial activities across all projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                        <TableCell className="font-medium font-code">{transaction.id}</TableCell>
                        <TableCell>{transaction.project}</TableCell>
                        <TableCell className='hidden md:table-cell'>{transaction.category}</TableCell>
                        <TableCell>
                             <Badge
                                variant={
                                    transaction.status === "Approved"
                                    ? "secondary"
                                    : transaction.status === "Pending"
                                    ? "outline"
                                    : "destructive"
                                }
                                >
                                {transaction.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right font-code">{formatCurrencyFull(transaction.amount)}</TableCell>
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
