
'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, Building, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Logo } from '@/components/logo';

export default function CompanySetupPage() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 4;

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <Card className="w-full">
          <CardHeader>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Step {step} of {totalSteps}
              </p>
              <Progress value={progress} className="h-2" />
            </div>
            <CardTitle>Company Setup</CardTitle>
            <CardDescription>
                {step === 1 && "Let's start with some basic information about your company."}
                {step === 2 && "Define project templates to streamline your workflow."}
                {step === 3 && "Set up user roles and permissions for your team."}
                {step === 4 && "Integrate with your existing tools and software."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="e.g. Acme Construction" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry-type">Industry Type</Label>
                    <Select>
                      <SelectTrigger id="industry-type">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    <RadioGroup defaultValue="1-50" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-50" id="size-1" />
                        <Label htmlFor="size-1">1-50</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="51-200" id="size-2" />
                        <Label htmlFor="size-2">51-200</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="201+" id="size-3" />
                        <Label htmlFor="size-3">201+</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Logo</Label>
                    <div className="flex items-center justify-center w-full">
                        <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" />
                        </Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location / Timezone</Label>
                    <Input id="location" placeholder="e.g. New York / EST" />
                  </div>
                </div>
              </div>
            )}
             {step > 1 && (
                <div className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Step {step} content coming soon...</p>
                </div>
            )}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                <ArrowLeft className="mr-2" />
                Previous
              </Button>
              {step < totalSteps ? (
                <Button onClick={nextStep}>
                Next
                <ArrowRight className="ml-2" />
              </Button>
              ) : (
                <Button>Finish Setup</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
