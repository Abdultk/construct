
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
  ChevronDown,
  Info,
  SlidersHorizontal,
  TestTube2,
  TrendingUp,
  Wand2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export default function ForecastingDashboardPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Predictive Forecasting
          </h1>
          <p className="text-muted-foreground">
            Analyze future project performance and financial outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-2 p-2 text-base">
            <TrendingUp className="h-5 w-5 text-ai-accent" />
            <span className="font-bold">Forecast Confidence: 88%</span>
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Model: Gemini 2.5 Pro
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Gemini 2.5 Pro</DropdownMenuItem>
              <DropdownMenuItem>Gemini 2.0</DropdownMenuItem>
              <DropdownMenuItem>Historical Trend</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary">
            <TestTube2 className="mr-2 h-4 w-4" />
            Compare Scenarios
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Charts */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Cost Projection Timeline</CardTitle>
              <CardDescription>
                Forecasted costs with confidence intervals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chart Coming Soon.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>
                Compare potential outcomes of different scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chart Coming Soon.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Variables</CardTitle>
              <CardDescription>Adjust inputs to refine forecasts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inflation-rate">
                  Assumed Inflation Rate (%)
                </Label>
                <Slider
                  id="inflation-rate"
                  defaultValue={[2.5]}
                  max={10}
                  step={0.1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material-cost">Material Cost Index</Label>
                <Input id="material-cost" defaultValue="112.5" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="labor-availability">Labor Availability</Label>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        <span>Normal</span>
                        <ChevronDown />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem>High</DropdownMenuItem>
                        <DropdownMenuItem>Normal</DropdownMenuItem>
                        <DropdownMenuItem>Low (Shortage)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Rerun Forecast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border p-3">
                <p className="text-sm font-medium">
                  Pre-purchase steel in Q3 to mitigate a projected 8% price
                  increase in Q4.
                </p>
                 <p className="text-xs text-muted-foreground pt-1">Confidence: 92%</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-sm font-medium">
                  Consider a secondary concrete supplier to reduce risk of
                  delivery delays in October.
                </p>
                 <p className="text-xs text-muted-foreground pt-1">Confidence: 78%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
