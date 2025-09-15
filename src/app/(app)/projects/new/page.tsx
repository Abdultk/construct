
'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, DollarSign, Upload, Users, List, GanttChartSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProjectSetupPage() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 4;

  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-full max-w-4xl">
        <Card className="w-full">
          <CardHeader>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Step {step} of {totalSteps}
              </p>
              <Progress value={progress} className="h-2" />
            </div>
            <CardTitle>New Project Setup</CardTitle>
            <CardDescription>
                {step === 1 && "Start by providing the basic details of your new project."}
                {step === 2 && "Assign team members and define their roles for this project."}
                {step === 3 && "Import your Bill of Quantities (BOQ) or Work Breakdown Structure (WBS) for AI-powered validation and analysis."}
                {step === 4 && "Review and establish the project baseline, including budget, milestones, and initial risk assessment."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Project Name</Label>
                        <Input id="project-name" placeholder="e.g., Downtown Skyscraper" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="project-type">Project Type</Label>
                        <Select>
                        <SelectTrigger id="project-type">
                            <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea id="project-description" placeholder="A brief description of the project." />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="client-info">Client Information</Label>
                        <Input id="client-info" placeholder="Client name or contact" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contract-value">Contract Value</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="contract-value" type="number" placeholder="e.g., 1000000" className="pl-8" />
                            <Select defaultValue="NGN">
                                <SelectTrigger className="absolute right-1 top-1/2 -translate-y-1/2 w-24 h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NGN">NGN</SelectItem>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                    <SelectItem value="JPY">JPY</SelectItem>
                                    <SelectItem value="CAD">CAD</SelectItem>
                                    <SelectItem value="AUD">AUD</SelectItem>
                                    <SelectItem value="CHF">CHF</SelectItem>
                                    <SelectItem value="CNY">CNY</SelectItem>
                                    <SelectItem value="INR">INR</SelectItem>
                                    <SelectItem value="BRL">BRL</SelectItem>
                                    <SelectItem value="ZAR">ZAR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
              </div>
            )}
             {step > 1 && (
                <div className="flex items-center justify-center h-60 bg-muted rounded-md">
                    <p className="text-muted-foreground">Step {step} content coming soon...</p>
                </div>
            )}
            <div className="flex justify-between mt-8">
                <div>
                    {step > 1 ? (
                        <Button variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2" />
                            Previous
                        </Button>
                    ) : (
                         <Button variant="outline" asChild>
                            <Link href="/projects">Cancel</Link>
                        </Button>
                    )}
                </div>

              {step < totalSteps ? (
                <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2" />
              </Button>
              ) : (
                <Button>Finish Setup & Initialize Project</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
