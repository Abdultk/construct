
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
  BarChart as BarChartIcon,
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart as RechartsLineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line as RechartsLine } from 'recharts';

type AnalysisTool = 'Cost Modeling' | 'ROI Calculation' | 'Replacement Analysis' | 'Budget Planning' | null;

const costTrendData = [
  { year: '2023', capex: 450, opex: 50 },
  { year: '2024', capex: 0, opex: 60 },
  { year: '2025', capex: 0, opex: 65 },
  { year: '2026', capex: 0, opex: 70 },
  { year: '2027', capex: 75, opex: 80 }, // Replacement/Upgrade cost
  { year: '2028', capex: 0, opex: 85 },
  { year: '2029', capex: 0, opex: 90 },
];

const benchmarkData = [
    { name: 'Energy (kWh/yr)', yourAsset: 12000, industryAvg: 15000 },
    { name: 'Maint. Cost ($/yr)', yourAsset: 5000, industryAvg: 4000 },
    { name: 'Uptime (%)', yourAsset: 99.5, industryAvg: 98.0 },
];

const chartConfig = {
  capex: {
    label: "CAPEX",
    color: "hsl(var(--chart-1))",
  },
  opex: {
    label: "OPEX",
    color: "hsl(var(--chart-2))",
  },
  yourAsset: {
    label: "Your Asset",
    color: "hsl(var(--primary))",
  },
  industryAvg: {
    label: "Industry Avg.",
    color: "hsl(var(--secondary))",
  },
};

export default function LifecycleCostAnalysisPage() {
  const [selectedTool, setSelectedTool] = useState<AnalysisTool>(null);

  const analysisTools = [
    { id: 'Cost Modeling' as const, icon: Calculator, variant: 'secondary' as const },
    { id: 'ROI Calculation' as const, icon: DollarSign, variant: 'outline' as const },
    { id: 'Replacement Analysis' as const, icon: Repeat, variant: 'outline' as const },
    { id: 'Budget Planning' as const, icon: BarChartIcon, variant: 'outline' as const },
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
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
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
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <RechartsLineChart data={costTrendData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => `$${value}k`} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <RechartsLine dataKey="capex" type="monotone" stroke={chartConfig.capex.color} strokeWidth={2} dot={true} />
                        <RechartsLine dataKey="opex" type="monotone" stroke={chartConfig.opex.color} strokeWidth={2} dot={false} />
                    </RechartsLineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Benchmark Comparison</CardTitle>
                <CardDescription>Asset performance vs. industry standards.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <BarChart data={benchmarkData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} angle={-30} textAnchor="end" height={50}/>
                        <YAxis />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="yourAsset" fill={chartConfig.yourAsset.color} radius={4} />
                        <Bar dataKey="industryAvg" fill={chartConfig.industryAvg.color} radius={4} />
                    </BarChart>
                 </ChartContainer>
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
