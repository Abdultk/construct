
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
              Energy consumption over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chart coming soon.
            </p>
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
            <p className="text-sm text-muted-foreground">
              Chart coming soon.
            </p>
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
              <CardTitle className='text-base'>Cost Projections</CardTitle>
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
