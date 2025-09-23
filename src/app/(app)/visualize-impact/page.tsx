
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
  CheckSquare,
  Repeat,
  Lightbulb,
  FileSignature,
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

    const communicationPlan = {
        internal: [
            { name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://picsum.photos/seed/10/100/100', status: 'Acknowledged' },
            { name: 'Engineering Dept.', role: 'Technical Review', avatar: 'https://picsum.photos/seed/32/100/100', status: 'Acknowledged' },
            { name: 'Finance Team', role: 'Cost Review', avatar: 'https://picsum.photos/seed/33/100/100', status: 'Notified' },
        ],
        external: [
            { name: 'Client ABC Corp.', role: 'Client', avatar: 'https://picsum.photos/seed/31/100/100', status: 'Notified' },
            { name: 'City Permits Office', role: 'Regulatory', avatar: 'https://picsum.photos/seed/34/100/100', status: 'Pending' },
        ]
    };

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

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Cost-Benefit Analysis
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">+$15,200</div>
            <p className="text-xs text-muted-foreground">
              Estimated direct cost increase
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
              Quality Impact
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
             <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">Spec Compliance</p>
                <Badge variant="secondary">Meets Standards</Badge>
            </div>
             <p className="text-xs text-muted-foreground">
              Rework Risk: <span className="font-semibold">Low (15%)</span>
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance & Legal
            </CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">Contract Compliance</p>
                <Badge variant="secondary">Compliant</Badge>
            </div>
             <p className="text-xs text-muted-foreground">
              Regulatory Adherence: <span className="font-semibold">No issues</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4">
        {/* Comparison Views */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
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
                <h3 className="mb-2 font-semibold">Resource & Quality Impact</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Resource Workload Change</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                         <div className="flex items-center gap-2 text-sm">
                           <TrendingUp className="h-4 w-4 text-destructive" />
                           <span className="font-semibold">Roofing Team:</span>
                           <span>+40 man-hours ($8,000)</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                           <TrendingDown className="h-4 w-4 text-green-600" />
                           <span className="font-semibold">Logistics:</span>
                           <span>-8 man-hours (-$1,600)</span>
                         </div>
                      </CardContent>
                    </Card>
                     <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Quality & Compliance</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                         <div className="flex items-center gap-2 text-sm">
                           <CheckSquare className="h-4 w-4 text-green-600" />
                           <span className="font-semibold">Compliance:</span>
                           <span>Meets all specs</span>
                         </div>
                         <div className="flex items-center gap-2 text-sm">
                           <Repeat className="h-4 w-4 text-yellow-500" />
                           <span className="font-semibold">Rework Risk:</span>
                           <span>Low (15%)</span>
                         </div>
                      </CardContent>
                    </Card>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Plan */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Impact Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div className="flex justify-between items-center">
                    <span className="font-semibold">Overall Risk Level</span>
                    <Badge variant="default" className="bg-yellow-500">Medium</Badge>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Key Risk Drivers:</h4>
                    <p><strong>Technical:</strong> New material requires different installation technique.</p>
                    <p><strong>Commercial:</strong> Potential for subcontractor price variation.</p>
                </div>
                <Separator />
                 <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="text-ai-accent" /> AI Mitigation Strategy:</h4>
                    <p>Allocate a 5% contingency on the new material cost. Schedule a mandatory pre-installation training session with the subcontractor to minimize workmanship risk.</p>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Communication Plan</CardTitle>
              <CardDescription>Key stakeholders to be notified.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <div>
                    <h4 className="text-sm font-semibold mb-2">Internal Stakeholders</h4>
                    <div className="space-y-3">
                        {communicationPlan.internal.map(person => (
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
                    </div>
                </div>
                <Separator />
                 <div>
                    <h4 className="text-sm font-semibold mb-2">External Stakeholders</h4>
                    <div className="space-y-3">
                        {communicationPlan.external.map(person => (
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
                    </div>
                </div>
                 <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      toast({
                        title: 'Notifications Sent',
                        description:
                          'All relevant stakeholders have been notified of this change.',
                      })
                    }
                  >
                    <MessageSquare className="mr-2 h-4 w-4" /> Notify All
                  </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

  

    