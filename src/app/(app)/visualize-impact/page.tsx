
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
  ThumbsUp,
  MessageSquare,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ChangeImpactVisualizationPage() {
    const { toast } = useToast();

    const communicationPlan = [
        { name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://picsum.photos/seed/10/100/100', status: 'Acknowledged' },
        { name: 'Client ABC Corp.', role: 'Client', avatar: 'https://picsum.photos/seed/31/100/100', status: 'Notified' },
        { name: 'Structural Team', role: 'Engineering', avatar: 'https://picsum.photos/seed/32/100/100', status: 'Pending' },
    ];

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Acknowledged': return 'secondary';
            case 'Notified': return 'default';
            default: return 'outline';
        }
    }
    
    const handleApprove = () => {
        toast({
            title: 'Change Order Approved',
            description: 'CR-0012 has been approved and the implementation plan is now active.',
        });
    }


  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/change-orders">
                <ArrowLeft className="h-4 w-4" />
            </Link>
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
          <Button variant="secondary" onClick={handleApprove}>Approve & Implement</Button>
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
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground mb-2">Before: Original Timeline</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Phase 1</span>
                      <Progress value={100} className="h-3" />
                      <span className="text-xs">20 Days</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Roofing</span>
                      <Progress value={100} className="h-3" />
                      <span className="text-xs">15 Days</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Phase 3</span>
                      <Progress value={100} className="h-3" />
                      <span className="text-xs">30 Days</span>
                    </div>
                  </div>
                   <div className="rounded-lg border p-4 border-primary">
                    <p className="text-sm text-muted-foreground mb-2">After: New Timeline</p>
                     <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Phase 1</span>
                      <Progress value={100} className="h-3" />
                      <span className="text-xs">20 Days</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Roofing</span>
                      <Progress value={100} className="h-3 bg-primary/20" />
                      <span className="text-xs font-bold">20 Days (+5)</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <span className="text-xs w-24">Phase 3</span>
                      <Progress value={100} className="h-3" />
                      <span className="text-xs">30 Days</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Resource Comparison */}
              <div>
                <h3 className="mb-2 font-semibold">Resource Impact</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Affected Resources</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">Roofing Subcontractor</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">Crane Operator</span>
                          </div>
                      </CardContent>
                    </Card>
                     <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Workload Change</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                         <div className="flex items-center gap-2 text-sm">
                           <TrendingUp className="h-4 w-4 text-destructive" />
                           <span className="font-semibold">Roofing Team:</span>
                           <span>+40 man-hours</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                           <TrendingDown className="h-4 w-4 text-green-600" />
                           <span className="font-semibold">Logistics:</span>
                           <span>-8 man-hours</span>
                         </div>
                      </CardContent>
                    </Card>
                 </div>
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
              <CardDescription>Key stakeholders to be notified.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {communicationPlan.map(person => (
                    <div key={person.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium">{person.name}</p>
                                <p className="text-xs text-muted-foreground">{person.role}</p>
                            </div>
                        </div>
                        <Badge variant={getStatusBadgeVariant(person.status)}>{person.status}</Badge>
                    </div>
                ))}
                 <Button variant="outline" className="w-full"><MessageSquare className="mr-2 h-4 w-4" /> Notify All</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
