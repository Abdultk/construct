
'use client';
import {
    ArrowUpRight,
    CircleDollarSign,
    CreditCard,
    Download,
    LineChart,
    Wallet,
    TrendingDown
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

export default function FinancialDashboardPage() {
    const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
    }).format(value);

    const recentTransactions = [
        { id: 'TRN001', project: 'Downtown Skyscraper', category: 'Materials', amount: 75000, status: 'Approved' },
        { id: 'TRN002', project: 'Suburban Housing', category: 'Labor', amount: 120000, status: 'Pending' },
        { id: 'TRN003', project: 'Interstate Bridge', category: 'Equipment', amount: 25000, status: 'Approved' },
        { id: 'TRN004', project: 'Hospital Wing', category: 'Subcontractor', amount: 200000, status: 'Rejected' },
    ]

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Financial Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget vs. Spent</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(457000000)} / {formatCurrency(770000000)}</div>
            <p className="text-xs text-muted-foreground">59% of total budget utilized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Committed Costs</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(85200000)}</div>
            <p className="text-xs text-muted-foreground">Costs for signed contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(12500000)}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow Projection</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{formatCurrency(298000000)}</div>
            <p className="text-xs text-muted-foreground">Projected balance in 6 months</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Cost Breakdown, Earned Value Analysis, Payment Schedule, and Variance Analysis Coming Soon.</p>
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
                        <TableCell className="text-right font-code">{formatCurrency(transaction.amount)}</TableCell>
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
