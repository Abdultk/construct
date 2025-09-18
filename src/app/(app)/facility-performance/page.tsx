
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  BarChart,
  AreaChart,
  Thermometer,
  Users,
  Power,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LineChart as RechartsLineChart,
  AreaChart as RechartsAreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const historicalData = [
  { month: 'Jan', consumption: 18.5 },
  { month: 'Feb', consumption: 17.2 },
  { month: 'Mar', consumption: 16.8 },
  { month: 'Apr', consumption: 16.5 },
  { month: 'May', consumption: 15.8 },
  { month: 'Jun', consumption: 15.1 },
  { month: 'Jul', consumption: 15.0 },
];

const seasonalData = [
  { month: 'Jan', heating: 400, cooling: 10 },
  { month: 'Feb', heating: 350, cooling: 15 },
  { month: 'Mar', heating: 250, cooling: 50 },
  { month: 'Apr', heating: 100, cooling: 150 },
  { month: 'May', heating: 20, cooling: 300 },
  { month: 'Jun', heating: 5, cooling: 400 },
  { month: 'Jul', heating: 0, cooling: 450 },
]

const chartConfig = {
    consumption: {
        label: "kWh/m²",
        color: "hsl(var(--primary))",
    },
    heating: {
        label: "Heating Days",
        color: "hsl(var(--chart-1))",
    },
    cooling: {
        label: "Cooling Days",
        color: "hsl(var(--chart-2))",
    },
}

export default function FacilityPerformancePage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Facility Performance Analytics
          </h1>
          <p className="text-muted-foreground">
            Post-handover monitoring for Downtown Skyscraper.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Efficiency</CardTitle>
            <Power className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 kWh/m²</div>
            <p className="text-xs text-muted-foreground">
              -5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Space Utilization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Peak hours average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Environmental
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22°C / 45% RH</div>
            <p className="text-xs text-muted-foreground">Within optimal range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Performance</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">HVAC uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Historical Performance</CardTitle>
              <LineChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Energy consumption over the last 7 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <RechartsLineChart data={historicalData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="consumption"
                  type="monotone"
                  stroke={chartConfig.consumption.color}
                  strokeWidth={2}
                  dot={true}
                />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Seasonal Variations</CardTitle>
              <AreaChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardDescription>
              Comparison of heating vs. cooling degree days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <RechartsAreaChart data={seasonalData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Area type="monotone" dataKey="heating" stackId="1" stroke={chartConfig.heating.color} fill={chartConfig.heating.color} />
                <Area type="monotone" dataKey="cooling" stackId="1" stroke={chartConfig.cooling.color} fill={chartConfig.cooling.color} />
              </RechartsAreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Predictive Insights</CardTitle>
            <Wand2 className="h-5 w-5 text-ai-accent" />
          </div>
          <CardDescription>
            AI-driven recommendations for optimization and maintenance.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className='text-base'>Maintenance Predictions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Air Handler Unit #3 shows a 75% probability of filter blockage in the next 30 days.</p>
            </CardContent>
          </Card>
           <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className='text-base'>Performance Forecasts</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Projected energy costs for next quarter are 8% higher due to anticipated heatwave.</p>
            </CardContent>
          </Card>
           <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className='text-base'>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Adjusting thermostat by 1°C could result in an estimated annual saving of $15,000.</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
