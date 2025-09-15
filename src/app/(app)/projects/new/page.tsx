
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, DollarSign, Upload, Users, List, GanttChartSquare, Trash2, UserPlus, CheckCircle, Lightbulb, ShieldAlert, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { projects } from '@/lib/data';

type TeamMember = {
    email: string;
    role: string;
    name: string;
    avatar: string;
};

export default function ProjectSetupPage() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 4;
  const router = useRouter();
  const { toast } = useToast();

  // Step 1 State
  const [projectName, setProjectName] = React.useState('');
  const [projectType, setProjectType] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [clientInfo, setClientInfo] = React.useState('');
  const [contractValue, setContractValue] = React.useState('');
  const [currency, setCurrency] = React.useState('NGN');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  // Step 2 State
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = React.useState('');
  const [newMemberRole, setNewMemberRole] = React.useState('');

  const nextStep = () => setStep((prev) => (prev < totalSteps ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const progress = (step / totalSteps) * 100;

  const handleAddMember = () => {
    if (newMemberEmail && newMemberRole) {
      const name = newMemberEmail.split('@')[0].replace('.', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
      const newMember: TeamMember = {
        email: newMemberEmail,
        role: newMemberRole,
        name: name,
        avatar: `https://picsum.photos/seed/${Math.random()}/40/40`,
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberEmail('');
      setNewMemberRole('');
    }
  };

  const handleRemoveMember = (emailToRemove: string) => {
    setTeamMembers(teamMembers.filter(member => member.email !== emailToRemove));
  };
  
  const handleFinishSetup = () => {
    // In a real app, you would send this data to your backend to create the project.
    // For this prototype, we'll just show a success message and redirect.
    const newProject = {
        id: `proj-${String(projects.length + 1).padStart(3, '0')}`,
        name: projectName || 'New Project',
        status: 'On Track',
        portfolioValue: Number(contractValue) || 0,
        budgetHealth: 100, // Initial health
        completionPercentage: 0,
        budget: Number(contractValue) || 0,
        spent: 0,
        riskLevel: 'Low',
    };

    // This is a mock way to add to the list. This won't persist across page reloads.
    projects.push(newProject);
    
    toast({
        title: "Project Initialized!",
        description: `"${newProject.name}" has been created successfully.`,
    });

    router.push('/projects');
  };


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
                        <Input id="project-name" placeholder="e.g., Downtown Skyscraper" value={projectName} onChange={e => setProjectName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="project-type">Project Type</Label>
                        <Select value={projectType} onValueChange={setProjectType}>
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
                    <Textarea id="project-description" placeholder="A brief description of the project." value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="client-info">Client Information</Label>
                        <Input id="client-info" placeholder="Client name or contact" value={clientInfo} onChange={e => setClientInfo(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contract-value">Contract Value</Label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input id="contract-value" type="number" placeholder="e.g., 1000000" className="pl-8" value={contractValue} onChange={e => setContractValue(e.target.value)} />
                             <Select value={currency} onValueChange={setCurrency}>
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
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4 rounded-lg border p-4">
                  <h3 className="font-semibold">Invite Team Members</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <Label htmlFor="member-email" className="sr-only">Email</Label>
                        <Input
                            id="member-email"
                            type="email"
                            placeholder="member@example.com"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="member-role" className="sr-only">Role</Label>
                        <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                            <SelectTrigger id="member-role" className="w-full md:w-[180px]">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Project Manager">Project Manager</SelectItem>
                                <SelectItem value="Site Engineer">Site Engineer</SelectItem>
                                <SelectItem value="Architect">Architect</SelectItem>
                                <SelectItem value="Quantity Surveyor">Quantity Surveyor</SelectItem>
                                <SelectItem value="Safety Officer">Safety Officer</SelectItem>
                                <SelectItem value="Foreman">Foreman</SelectItem>
                                <SelectItem value="Subcontractor">Subcontractor</SelectItem>
                                <SelectItem value="Client">Client</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={handleAddMember} disabled={!newMemberEmail || !newMemberRole}>
                      <UserPlus className="mr-2" /> Add Member
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Project Team ({teamMembers.length})</h3>
                  <Separator />
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {teamMembers.length > 0 ? teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.email)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No team members added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
             {step === 3 && (
                 <div className="space-y-6">
                    <Tabs defaultValue="boq" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="boq">
                                <List className="mr-2 h-4 w-4" />
                                Import BOQ
                            </TabsTrigger>
                            <TabsTrigger value="wbs">
                                <GanttChartSquare className="mr-2 h-4 w-4" />
                                Import WBS
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="boq">
                             <Card className="border-dashed">
                                <CardHeader className="items-center text-center">
                                    <CardTitle>Import Bill of Quantities</CardTitle>
                                    <CardDescription>Upload your BOQ file (e.g., Excel, CSV) to get started.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center w-full">
                                        <Label htmlFor="boq-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">XLSX, CSV (MAX. 10MB)</p>
                                            </div>
                                            <Input id="boq-file" type="file" className="hidden" />
                                        </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4 text-center">Our AI will automatically validate your BOQ for inconsistencies and potential cost-saving opportunities.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                         <TabsContent value="wbs">
                             <Card className="border-dashed">
                                <CardHeader className="items-center text-center">
                                    <CardTitle>Import Work Breakdown Structure</CardTitle>
                                    <CardDescription>Upload your WBS file (e.g., MS Project, Primavera) to build your schedule.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center w-full">
                                        <Label htmlFor="wbs-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-muted-foreground">MPP, XER, XML (MAX. 5MB)</p>
                                            </div>
                                            <Input id="wbs-file" type="file" className="hidden" />
                                        </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-4 text-center">Our AI will analyze your schedule to predict potential delays and suggest optimizations.</p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            )}
            {step === 4 && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div><span className="font-semibold">Project Name:</span> {projectName || 'N/A'}</div>
                                <div><span className="font-semibold">Project Type:</span> {projectType || 'N/A'}</div>
                                <div><span className="font-semibold">Start Date:</span> {startDate ? format(startDate, "PPP") : 'N/A'}</div>
                                <div><span className="font-semibold">End Date:</span> {endDate ? format(endDate, "PPP") : 'N/A'}</div>
                                <div><span className="font-semibold">Contract Value:</span> {currency} {Number(contractValue).toLocaleString() || 'N/A'}</div>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-muted-foreground"/>
                                    <span className="font-semibold">{teamMembers.length} Team Members</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <List className="h-5 w-5 text-muted-foreground"/>
                                    <span className="font-semibold">BOQ.xlsx</span>
                                    <Badge variant="secondary">Validated</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>AI-Generated Baseline</CardTitle>
                            <CardDescription>Initial analysis based on the data provided.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-semibold flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-ai-accent" /> Initial Budget Allocation</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Materials</span> <span className="font-medium">40%</span></div>
                                    <div className="flex justify-between"><span>Labor</span> <span className="font-medium">35%</span></div>
                                    <div className="flex justify-between"><span>Equipment</span> <span className="font-medium">15%</span></div>
                                    <div className="flex justify-between"><span>Overheads</span> <span className="font-medium">10%</span></div>
                                </div>
                            </div>
                             <div className="space-y-4">
                                <h4 className="font-semibold flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-ai-accent" /> Initial Risk Assessment</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Badge variant="destructive" className="mt-1">High</Badge>
                                        <span>Risk of material price volatility for steel.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Badge variant="default" className="mt-1">Medium</Badge>
                                        <span>Potential for permit delays based on historical data.</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                         <CardFooter>
                             <div className="space-y-4 w-full">
                                <h4 className="font-semibold flex items-center"><GanttChartSquare className="mr-2 h-5 w-5 text-ai-accent" /> Key Milestones</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span className="font-medium">Foundation Complete:</span>
                                        <span>Q3 2024</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span className="font-medium">Structure Topped Out:</span>
                                        <span>Q1 2025</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span className="font-medium">Project Handover:</span>
                                        <span>Q4 2025</span>
                                    </div>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
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
                <Button onClick={handleFinishSetup}>Finish Setup & Initialize Project</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    