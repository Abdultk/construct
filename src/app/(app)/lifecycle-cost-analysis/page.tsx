
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
  DollarSign,
  Download,
  BarChart,
  LineChart,
  Repeat,
  Calculator
} from 'lucide-react';

export default function LifecycleCostAnalysisPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Lifecycle Cost Analysis</h1>
          <p className="text-muted-foreground">
            Analyze the total cost of ownership for facility assets.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost of Ownership (TCO)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              For selected asset category
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Initial Cost (CAPEX)</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$450K</div>
            <p className="text-xs text-muted-foreground">
              37.5% of TCO
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operating Cost (OPEX)</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$600K</div>
            <p className="text-xs text-muted-foreground">
              50% of TCO
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance & Repair</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$150K</div>
            <p className="text-xs text-muted-foreground">
              12.5% of TCO
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Cost Breakdown Trend</CardTitle>
                <CardDescription>CAPEX vs. OPEX over time.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Benchmark Comparison</CardTitle>
                <CardDescription>Asset performance vs. industry standards.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Analysis Tools */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Analysis Tools</CardTitle>
                <CardDescription>Model costs, calculate ROI, and plan for the future.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <Button variant="secondary" size="lg" className="h-20 flex-col items-start p-4">
                    <Calculator className="h-6 w-6 mb-2" />
                    <p className="font-semibold">Cost Modeling</p>
                </Button>
                 <Button variant="outline" size="lg" className="h-20 flex-col items-start p-4">
                    <DollarSign className="h-6 w-6 mb-2" />
                    <p className="font-semibold">ROI Calculation</p>
                </Button>
                 <Button variant="outline" size="lg" className="h-20 flex-col items-start p-4">
                    <Repeat className="h-6 w-6 mb-2" />
                    <p className="font-semibold">Replacement Analysis</p>
                </Button>
                 <Button variant="outline" size="lg" className="h-20 flex-col items-start p-4">
                    <BarChart className="h-6 w-6 mb-2" />
                    <p className="font-semibold">Budget Planning</p>
                </Button>
            </CardContent>
        </Card>
        
        {/* Reporting */}
        <Card>
            <CardHeader>
                <CardTitle>Reporting</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Reporting tools coming soon.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
