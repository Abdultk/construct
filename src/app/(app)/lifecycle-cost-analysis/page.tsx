
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
  Calculator,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

type AnalysisTool = 'Cost Modeling' | 'ROI Calculation' | 'Replacement Analysis' | 'Budget Planning' | null;

export default function LifecycleCostAnalysisPage() {
  const [selectedTool, setSelectedTool] = useState<AnalysisTool>(null);

  const analysisTools = [
    { id: 'Cost Modeling' as const, icon: Calculator, variant: 'secondary' as const },
    { id: 'ROI Calculation' as const, icon: DollarSign, variant: 'outline' as const },
    { id: 'Replacement Analysis' as const, icon: Repeat, variant: 'outline' as const },
    { id: 'Budget Planning' as const, icon: BarChart, variant: 'outline' as const },
  ];

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
              {analysisTools.map(tool => (
                <Button
                  key={tool.id}
                  variant={tool.variant}
                  size="lg"
                  className="h-20 flex-col items-start p-4"
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <tool.icon className="h-6 w-6 mb-2" />
                  <p className="font-semibold">{tool.id}</p>
                </Button>
              ))}
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

      <Dialog open={!!selectedTool} onOpenChange={(isOpen) => !isOpen && setSelectedTool(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTool}</DialogTitle>
            <DialogDescription>
              This feature is under development.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8 text-center text-muted-foreground">
            <p>Analysis interface for {selectedTool} will be available here soon.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
