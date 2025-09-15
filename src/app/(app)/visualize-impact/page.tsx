'use client';

import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Users,
  ShieldAlert,
  BarChart,
  Check,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

export default function ChangeImpactVisualizationPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-headline">
              Impact Visualization: CR-0012
            </h1>
            <p className="text-muted-foreground">
              Substitute roofing material for Downtown Skyscraper
            </p>
          </div>
          <Badge variant="outline">In Review</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Approve & Implement</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Cost-Benefit Analysis
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$25,000</div>
            <p className="text-xs text-muted-foreground">
              Estimated net value increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Implementation Timeline
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5 Days</div>
            <p className="text-xs text-muted-foreground">
              Estimated schedule impact
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Profile Change
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">Neutral</div>
            <p className="text-xs text-muted-foreground">
              No significant change in project risk
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4">
        {/* Comparison Views */}
        <div className="col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Views</CardTitle>
              <CardDescription>
                Analyze the "before" and "after" impact of this change.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Budget Comparison */}
              <div>
                <h3 className="mb-2 font-semibold">Budget Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground">Before</p>
                    <p className="text-lg font-bold font-code">$1,250,000</p>
                    <p className="text-xs text-muted-foreground">
                      Original work package budget
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary p-4">
                    <p className="text-muted-foreground">After</p>
                    <p className="text-lg font-bold font-code text-primary">
                      $1,265,200
                    </p>
                    <p className="text-xs text-muted-foreground">
                      New estimated budget
                    </p>
                  </div>
                </div>
              </div>
              {/* Schedule Comparison */}
              <div>
                <h3 className="mb-2 font-semibold">Schedule Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Gantt chart comparison coming soon.
                </p>
              </div>
              {/* Resource Comparison */}
              <div>
                <h3 className="mb-2 font-semibold">Resource Impact</h3>
                 <p className="text-sm text-muted-foreground">
                  Resource allocation chart coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Plan */}
        <div className="col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Procure New Materials</p>
                  <p className="text-xs text-muted-foreground">Est. 2 days</p>
                </div>
              </div>
              <Separator />
               <div className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-semibold">Update Site Logistics</p>
                  <p className="text-xs text-muted-foreground">Est. 1 day</p>
                </div>
              </div>
               <Separator />
               <div className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Execute Work</p>
                  <p className="text-xs text-muted-foreground">Est. 2 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Communication Plan</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Coming Soon.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
