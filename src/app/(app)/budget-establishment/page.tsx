
'use client';
import {
    ArrowUpRight,
    CircleDollarSign,
    CreditCard,
    Download,
    LineChart,
    Wallet,
    TrendingDown,
    Gauge,
    AlertTriangle
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
             <Button variant="destructive" size="sm">
                <AlertTriangle className="mr-2 h-4 w-4" />
                2 AI Anomalies
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
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Earned Value Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Cash Flow Projection</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
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
             <p className="text-sm text-muted-foreground">Table Coming Soon.</p>
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

    