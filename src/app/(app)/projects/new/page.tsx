
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, DollarSign, Upload, Users, List, GanttChartSquare, Trash2, UserPlus, CheckCircle, Lightbulb, ShieldAlert, BarChart3, FileIcon, ChevronDown, BookCheck, FileText, Package, Palette, Image as ImageIcon, Building, Home, HardHat } from 'lucide-react';
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';


type TeamMember = {
    email: string;
    role: string;
    name: string;
    avatar: string;
};

const boqStandards = {
  "International": ["NRM", "CESMM4", "POMI", "SMM7", "UNIFORMAT II", "MasterFormat", "Uniclass"],
  "Regional": ["ASTM E1557 (US)", "DIN 276 (Germany)", "IS 1200 (India)", "AS 3846 (Australia)", "SANS 1921 (South Africa)", "MMHW (Malaysia)", "Nigerian Building Code"],
  "Custom": ["Enterprise Standard", "Project Specific", "Hybrid Model"]
}

const projectThemes = [
    { name: 'Default', colors: ['bg-primary', 'bg-secondary', 'bg-accent'] },
    { name: 'Ocean', colors: ['bg-blue-500', 'bg-blue-100', 'bg-teal-300'] },
    { name: 'Forest', colors: ['bg-green-600', 'bg-green-100', 'bg-amber-400'] },
    { name: 'Sunset', colors: ['bg-orange-500', 'bg-yellow-100', 'bg-red-400'] },
    { name: 'Mono', colors: ['bg-gray-800', 'bg-gray-200', 'bg-gray-400'] },
];

const templates = [
  {
    name: 'Commercial High-Rise',
    icon: Building,
    description: 'A standard template for multi-story commercial building projects.',
    includes: ['Standard WBS', 'BOQ Template', 'Core Team Roles', 'Document Set'],
  },
  {
    name: 'Residential Development',
    icon: Home,
    description: 'For single-family or multi-family housing projects.',
    includes: ['Phased WBS', 'Cost Codes', 'Standard Roles', 'Permit Docs'],
  },
  {
    name: 'Infrastructure Project',
    icon: HardHat,
    description: 'Template for large-scale infrastructure like bridges or roads.',
    includes: ['Regulatory WBS', 'CESMM4 BOQ', 'Compliance Docs'],
  },
];


export default function ProjectSetupPage() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 5;
  const router = useRouter();
  const { toast } = useToast();

  // Step 1 State
  const [projectName, setProjectName] = React.useState('');
  const [projectType, setProjectType] = React.useState('');
  const [otherProjectType, setOtherProjectType] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const [projectScope, setProjectScope] = React.useState('');
  const [projectDeliverables, setProjectDeliverables] = React.useState('');
  const [clientInfo, setClientInfo] = React.useState('');
  const [contractType, setContractType] = React.useState('');
  const [contractValue, setContractValue] = React.useState('');
  const [currency, setCurrency] = React.useState('USD');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [projectPicture, setProjectPicture] = React.useState<File | null>(null);
  const [selectedTheme, setSelectedTheme] = React.useState('Default');

  // Step 2 State
  const [selectedTemplate, setSelectedTemplate] = React.useState('Commercial High-Rise');

  // Step 3 State
  const [teamMembers, setTeamMembers] = React.useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = React.useState('');
  const [newMemberRole, setNewMemberRole] = React.useState('');

  // Step 4 State
  const [boqFile, setBoqFile] = React.useState<File | null>(null);
  const [wbsFile, setWbsFile] = React.useState<File | null>(null);
  const [selectedStandard, setSelectedStandard] = React.useState('Auto-Detect');

  // Step 5 State
  const [budgetAllocation, setBudgetAllocation] = React.useState({
    materials: '40',
    labor: '35',
    equipment: '15',
    overheads: '10'
  });

  const handleBudgetAllocationChange = (category: keyof typeof budgetAllocation, value: string) => {
    setBudgetAllocation(prev => ({ ...prev, [category]: value }));
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'boq' | 'wbs' | 'picture') => {
      if (e.target.files && e.target.files.length > 0) {
          if (fileType === 'boq') {
              setBoqFile(e.target.files[0]);
          } else if (fileType === 'wbs'){
              setWbsFile(e.target.files[0]);
          } else if (fileType === 'picture') {
              setProjectPicture(e.target.files[0]);
          }
      }
  }

  const renderFileUpload = (fileType: 'boq' | 'wbs') => {
    const file = fileType === 'boq' ? boqFile : wbsFile;
    const acceptedFiles = fileType === 'boq' ? 'XLSX, CSV (MAX. 10MB)' : 'MPP, XER, XML (MAX. 5MB)';
    const title = fileType === 'boq' ? 'Bill of Quantities' : 'Work Breakdown Structure';
    
    if (file) {
      return (
        <Card className="border-solid">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg bg-muted">
              <FileIcon className="w-10 h-10 text-green-500" />
              <p className="mt-2 font-semibold text-foreground">{file.name}</p>
              <Badge variant="secondary" className="mt-2">Validated</Badge>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="border-dashed h-full">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <Label htmlFor={`${fileType}-file`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-muted-foreground">{acceptedFiles}</p>
              </div>
              <Input id={`${fileType}-file`} type="file" className="hidden" onChange={(e) => handleFileChange(e, fileType)} />
            </Label>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                {step === 2 && "Choose a template to kickstart your project with a predefined structure."}
                {step === 3 && "Assign team members and define their roles for this project."}
                {step === 4 && "Import your Bill of Quantities (BOQ) or Work Breakdown Structure (WBS) for AI-powered validation and analysis."}
                {step === 5 && "Review and establish the project baseline, including budget, milestones, and initial risk assessment."}
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
                            <SelectItem value="oil-and-gas">Oil and Gas</SelectItem>
                            <SelectItem value="energy">Energy</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                        </Select>
                        {projectType === 'others' && (
                            <Input 
                                id="other-project-type" 
                                placeholder="Please specify project type" 
                                className="mt-2"
                                value={otherProjectType}
                                onChange={e => setOtherProjectType(e.target.value)}
                             />
                        )}
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Project Picture</Label>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                            {projectPicture ? (
                                <img src={URL.createObjectURL(projectPicture)} alt="Project Preview" className="w-full h-full object-cover rounded-md"/>
                            ) : (
                                <ImageIcon className="w-10 h-10 text-muted-foreground" />
                            )}
                        </div>
                        <Label htmlFor="picture-file" className="text-primary underline cursor-pointer">
                            Upload a picture
                        </Label>
                        <Input id="picture-file" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'picture')} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Project Theme</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {projectThemes.map(theme => (
                            <div key={theme.name} className={cn("rounded-md border-2 p-2 cursor-pointer", selectedTheme === theme.name ? 'border-primary' : 'border-transparent')} onClick={() => setSelectedTheme(theme.name)}>
                                <div className="flex justify-center space-x-1">
                                    {theme.colors.map((color, index) => (
                                        <div key={index} className={cn("w-5 h-5 rounded-full", color)}></div>
                                    ))}
                                </div>
                                <p className="text-center text-sm mt-2">{theme.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="project-description">Project Description</Label>
                    <Textarea id="project-description" placeholder="A brief description of the project." value={projectDescription} onChange={e => setProjectDescription(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="project-scope">Scope of Project</Label>
                    <Textarea id="project-scope" placeholder="Describe the high-level scope of work." value={projectScope} onChange={e => setProjectScope(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="project-deliverables">Key Deliverables</Label>
                    <Textarea id="project-deliverables" placeholder="List the main project deliverables." value={projectDeliverables} onChange={e => setProjectDeliverables(e.target.value)} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="client-info">Client Information</Label>
                        <Input id="client-info" placeholder="Client name or contact" value={clientInfo} onChange={e => setClientInfo(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contract-type">Contract Type</Label>
                        <Select value={contractType} onValueChange={setContractType}>
                            <SelectTrigger id="contract-type">
                                <SelectValue placeholder="Select contract type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fixed-price">Fixed Price (Lump Sum)</SelectItem>
                                <SelectItem value="cost-plus">Cost-Plus</SelectItem>
                                <SelectItem value="time-and-materials">Time & Materials (T&M)</SelectItem>
                                <SelectItem value="gmp">Guaranteed Maximum Price (GMP)</SelectItem>
                                <SelectItem value="unit-price">Unit Price</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="NGN">NGN</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
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
                <Card className="border-ai-accent/50 bg-ai-accent/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Lightbulb className="h-6 w-6 text-ai-accent" />
                    <div>
                      <h4 className="font-semibold">AI Recommended: Commercial High-Rise</h4>
                      <p className="text-sm text-muted-foreground">Based on your project type ('{projectType || 'Commercial'}') and scope, this template is the best fit.</p>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card
                      key={template.name}
                      className={cn("cursor-pointer", selectedTemplate === template.name ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50')}
                      onClick={() => setSelectedTemplate(template.name)}
                    >
                      <CardHeader>
                        <template.icon className="w-8 h-8 mb-2 text-primary" />
                        <CardTitle>{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </CardContent>
                      <CardFooter>
                         <div className="flex flex-wrap gap-2">
                            {template.includes.map(item => <Badge key={item} variant="secondary">{item}</Badge>)}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {step === 3 && (
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
                                <SelectItem value="Staff">Staff</SelectItem>
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
             {step === 4 && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>BOQ Configuration</CardTitle>
                            <CardDescription>Select your BOQ standard to ensure accurate AI validation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Card className="border-ai-accent/50 bg-ai-accent/10">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <Lightbulb className="h-6 w-6 text-ai-accent" />
                                    <div>
                                        <h4 className="font-semibold">AI Recommended: NRM</h4>
                                        <p className="text-sm text-muted-foreground">Based on your project type ({projectType || 'Commercial'}) and region, NRM is the suggested standard for highest accuracy.</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Quick Select:</span>
                                <Button variant={selectedStandard === 'NRM' ? 'secondary' : 'outline'} size="sm" onClick={() => setSelectedStandard('NRM')}>NRM</Button>
                                <Button variant={selectedStandard === 'MasterFormat' ? 'secondary' : 'outline'} size="sm" onClick={() => setSelectedStandard('MasterFormat')}>MasterFormat</Button>
                                <Button variant={selectedStandard === 'CESMM4' ? 'secondary' : 'outline'} size="sm" onClick={() => setSelectedStandard('CESMM4')}>CESMM4</Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <BookCheck className="mr-2 h-4 w-4" />
                                            {selectedStandard === 'Auto-Detect' ? 'Browse All' : selectedStandard}
                                            <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setSelectedStandard('Auto-Detect')}>Auto-Detect</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        {Object.entries(boqStandards).map(([groupName, standards]) => (
                                            <DropdownMenuSub key={groupName}>
                                                <DropdownMenuSubTrigger>{groupName}</DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    {standards.map(standard => (
                                                        <DropdownMenuItem key={standard} onClick={() => setSelectedStandard(standard)}>
                                                            {standard}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            {selectedStandard === 'Hybrid Model' && (
                                <Card className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <p className="text-sm text-muted-foreground">
                                            You've selected a Hybrid Model. The AI will analyze your BOQ to identify sections corresponding to different standards and apply the appropriate validation rules for each part.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                             {selectedStandard === 'Enterprise Standard' && (
                                <Card className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Your organization's custom "Enterprise Standard" will be applied. The AI has been trained on your specific format and vocabulary.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFileUpload('boq')}
                        {renderFileUpload('wbs')}
                    </div>
                     <p className="text-xs text-muted-foreground text-center">Our AI will automatically validate your documents for inconsistencies and potential cost-saving opportunities.</p>
                </div>
            )}
            {step === 5 && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div><span className="font-semibold">Project Name:</span> {projectName || 'N/A'}</div>
                                <div><span className="font-semibold">Project Type:</span> {projectType === 'others' ? otherProjectType : projectType || 'N/A'}</div>
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
                                    <span className="font-semibold">{boqFile?.name || 'BOQ not uploaded'}</span>
                                    {boqFile && <Badge variant="secondary">Validated</Badge>}
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
                                    <div className="flex items-center justify-between gap-2">
                                        <Label htmlFor="budget-materials" className="flex-shrink-0">Materials</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                id="budget-materials"
                                                type="number"
                                                value={budgetAllocation.materials}
                                                onChange={(e) => handleBudgetAllocationChange('materials', e.target.value)}
                                                className="h-8 w-20 text-right"
                                            />
                                            <span className="text-muted-foreground">%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <Label htmlFor="budget-labor" className="flex-shrink-0">Labor</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                id="budget-labor"
                                                type="number"
                                                value={budgetAllocation.labor}
                                                onChange={(e) => handleBudgetAllocationChange('labor', e.target.value)}
                                                className="h-8 w-20 text-right"
                                            />
                                            <span className="text-muted-foreground">%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <Label htmlFor="budget-equipment" className="flex-shrink-0">Equipment</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                id="budget-equipment"
                                                type="number"
                                                value={budgetAllocation.equipment}
                                                onChange={(e) => handleBudgetAllocationChange('equipment', e.target.value)}
                                                className="h-8 w-20 text-right"
                                            />
                                            <span className="text-muted-foreground">%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <Label htmlFor="budget-overheads" className="flex-shrink-0">Overheads</Label>
                                        <div className="flex items-center gap-1">
                                            <Input
                                                id="budget-overheads"
                                                type="number"
                                                value={budgetAllocation.overheads}
                                                onChange={(e) => handleBudgetAllocationChange('overheads', e.target.value)}
                                                className="h-8 w-20 text-right"
                                            />
                                            <span className="text-muted-foreground">%</span>
                                        </div>
                                    </div>
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
