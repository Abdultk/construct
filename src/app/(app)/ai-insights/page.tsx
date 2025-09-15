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
  AlertTriangle,
  FileText
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

export default function AiInsightsPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            AI Insights Dashboard
          </h1>
          <p className="text-muted-foreground">
            Intelligence-focused analysis and recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary">
            <TestTube2 className="mr-2 h-4 w-4" />
            What-If Scenarios
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Panels */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-yellow-500" /> Predictive Alerts</CardTitle>
              <CardDescription>
                Proactive risk predictions and opportunity identification.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg space-y-1">
                    <p className="font-semibold text-sm">Risk: Schedule Delay</p>
                    <p className="text-xs text-muted-foreground">Concrete supplier shows high probability of late delivery, potentially delaying foundation work by 3-5 days.</p>
                    <Badge variant="outline">Confidence: 85%</Badge>
                </div>
                 <div className="p-3 border rounded-lg space-y-1">
                    <p className="font-semibold text-sm">Opportunity: Cost Saving</p>
                    <p className="text-xs text-muted-foreground">Steel prices are projected to drop 4% next month. Delaying procurement could save an estimated $50,000.</p>
                    <Badge variant="outline">Confidence: 78%</Badge>
                </div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wand2 className="h-5 w-5 text-ai-accent" /> AI Recommendations</CardTitle>
              <CardDescription>
                Actionable suggestions for project optimization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                 <div className="rounded-md border p-3">
                    <p className="text-sm font-medium">
                        <span className="font-semibold text-primary">Process Improvement:</span> Expedite permit submissions for HVAC to run in parallel with electrical inspections, saving an estimated 5 project days.
                    </p>
                </div>
                <div className="rounded-md border p-3">
                    <p className="text-sm font-medium">
                        <span className="font-semibold text-primary">Cost Optimization:</span> Re-allocate crane usage during off-peak hours to reduce rental costs by up to 15%.
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Tools</CardTitle>
              <CardDescription>Drill down into project data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><TrendingUp className="mr-2 h-4 w-4" /> Impact Analysis</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="mr-2 h-4 w-4" /> Correlation Analysis</Button>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Cost Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Chart Coming Soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
