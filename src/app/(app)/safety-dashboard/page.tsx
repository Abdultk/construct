
'use client';

import {
  Shield,
  CalendarDays,
  UserCheck,
  HardHat,
  Map,
  Plus,
  Bell,
  Phone,
  BarChart,
  CheckCircle,
  Siren,
  BriefcaseMedical,
  DoorOpen,
  Camera,
  Video,
  Mic,
  MapPin,
  Send,
  Calendar as CalendarIcon,
  AlertTriangle,
  ArrowRight,
  ListChecks,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Inspection = {
  type: string;
  inspector: string;
  date: Date;
};

type OpenIssue = {
    id: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
    assignee: string;
};

export default function SafetyDashboardPage() {
  const [trainingDate, setTrainingDate] = useState<Date>();
  const { toast } = useToast();
  const sitePlanImage = PlaceHolderImages.find(p => p.id === 'site-plan-map');
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [openIssues, setOpenIssues] = useState<OpenIssue[]>([
      { id: 'NCF-001', description: 'Leaking pipe joint at column C4.', severity: 'High', assignee: 'Bob Miller' },
      { id: 'NCF-002', description: 'Incorrect panel alignment on facade.', severity: 'Medium', assignee: 'Diana Green' },
  ]);

  const nearMisses = [
    { id: 'NMR-001', area: 'Sector B - Scaffolding', description: 'Tool dropped from height, landed near worker.', date: '2024-07-28' },
    { id: 'NMR-002', area: 'Loading Bay 1', description: 'Forklift operated too close to excavation edge.', date: '2024-07-25' },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      default: return 'secondary';
    }
  };

  const handleScheduleInspection = (type: string, inspector: string, date: Date | undefined) => {
    if (type && inspector && date) {
      setInspections(prev => [...prev, { type, inspector, date }]);
      toast({
        title: 'Inspection Scheduled',
        description: `The ${type} for ${format(date, 'PPP')} has been scheduled.`,
      });
    }
  };

  const handleResolveIssue = (id: string) => {
    setOpenIssues(prev => prev.filter(issue => issue.id !== id));
    toast({
        title: 'Issue Resolved',
        description: `Issue ${id} has been marked as resolved.`,
    });
  }

  const handleSubmit = (title: string, description: string) => {
    toast({
      title,
      description,
    });
  }

  const InspectionDialogContent = () => {
    const [inspectionType, setInspectionType] = useState('');
    const [inspector, setInspector] = useState('');
    const [inspectionDate, setInspectionDate] = useState<Date>();

    return (
        <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Safety Inspection</DialogTitle>
              <DialogDescription>
                Fill out the details to schedule a new safety inspection.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="inspection-type">Inspection Type</Label>
                <Select value={inspectionType} onValueChange={setInspectionType}>
                  <SelectTrigger id="inspection-type">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Site Walkthrough">Site Walkthrough</SelectItem>
                    <SelectItem value="PPE Compliance Check">PPE Compliance Check</SelectItem>
                    <SelectItem value="Equipment Inspection">Equipment Inspection</SelectItem>
                    <SelectItem value="Hazard Assessment">Hazard Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inspector">Assigned Inspector</Label>
                <Select value={inspector} onValueChange={setInspector}>
                  <SelectTrigger id="inspector">
                    <SelectValue placeholder="Select inspector..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Diana Green (Safety Officer)">Diana Green (Safety Officer)</SelectItem>
                    <SelectItem value="Charlie Davis (Architect)">Charlie Davis (Architect)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Inspection Date</Label>
                 <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !inspectionDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {inspectionDate ? format(inspectionDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={inspectionDate}
                        onSelect={setInspectionDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => handleScheduleInspection(inspectionType, inspector, inspectionDate)}>Confirm Schedule</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Safety Dashboard</h1>
          <p className="text-muted-foreground">
            Project: Downtown Skyscraper
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="p-2 text-base">
            <Shield className="mr-2 h-5 w-5 text-green-500" />
            Safety Score: 98/100
          </Badge>
          <Button variant="destructive">
            <Phone className="mr-2 h-4 w-4" />
            Emergency
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Days Without Incident
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">124</div>
            <p className="text-xs text-muted-foreground">Record: 210 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Safety Issues
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{openIssues.length}</div>
            <p className="text-xs text-muted-foreground">{openIssues.filter(i => i.severity === 'High').length} High, {openIssues.filter(i => i.severity === 'Medium').length} Medium</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Status</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">100%</div>
            <p className="text-xs text-muted-foreground">All crews compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Inspections</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{inspections.filter(i => i.date < new Date()).length}</div>
            <p className="text-xs text-muted-foreground">
              Out of {inspections.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Incident Map</CardTitle>
            <CardDescription>
              Site layout with risk zones and incident locations.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] rounded-lg bg-muted p-0 relative overflow-hidden">
            {sitePlanImage && (
              <Image 
                src={sitePlanImage.imageUrl}
                alt="Site Plan"
                layout="fill"
                objectFit="cover"
                data-ai-hint={sitePlanImage.imageHint}
              />
            )}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute top-[40%] left-[60%]">
                            <Siren className="h-6 w-6 text-red-500 animate-pulse" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">Open Safety Issue: NCF-001</p>
                        <p>Leaking pipe joint at column C4.</p>
                    </TooltipContent>
                </Tooltip>
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute top-[65%] left-[30%]">
                            <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="font-bold">Near-Miss Reported</p>
                        <p>Forklift operated too close to excavation edge.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Action Panel</CardTitle>
            <CardDescription>
              Manage safety-related tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Schedule Safety Inspection
                </Button>
              </DialogTrigger>
              <InspectionDialogContent />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <Siren className="mr-2 h-4 w-4" /> Report New Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Siren className="h-6 w-6 text-destructive" /> New Incident
                    Report
                  </DialogTitle>
                  <DialogDescription>
                    Project: Downtown Skyscraper - {new Date().toLocaleString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
                  <Card className="bg-destructive/10 border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive">
                        Immediate Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-2">
                      <Button
                        variant="destructive"
                        className="flex-col h-16 text-xs"
                      >
                        <Phone className="h-5 w-5 mb-1" />
                        <span>Emergency Contact</span>
                      </Button>
                       <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-col h-16 text-xs border-destructive text-destructive hover:bg-destructive/20"
                          >
                            <BriefcaseMedical className="h-5 w-5 mb-1" />
                            <span>First Aid Guide</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <BriefcaseMedical /> First Aid Guide
                            </DialogTitle>
                            <DialogDescription>
                              Basic first aid for common construction site injuries. This is not a substitute for professional medical advice.
                            </DialogDescription>
                          </DialogHeader>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                              <AccordionTrigger>Cuts and Scrapes</AccordionTrigger>
                              <AccordionContent>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Stop the bleeding by applying gentle pressure with a clean cloth.</li>
                                  <li>Clean the wound with water.</li>
                                  <li>Apply an antibiotic ointment.</li>
                                  <li>Cover the wound with a bandage.</li>
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                              <AccordionTrigger>Burns (Minor)</AccordionTrigger>
                              <AccordionContent>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Cool the burn. Hold under cool (not cold) running water for about 10 minutes.</li>
                                  <li>Remove rings or other tight items from the burned area.</li>
                                  <li>Don't break blisters.</li>
                                  <li>Apply lotion, such as one with aloe vera.</li>
                                  <li>Bandage the burn loosely.</li>
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-3">
                              <AccordionTrigger>Eye Injuries (Debris)</AccordionTrigger>
                              <AccordionContent>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li>Do NOT rub the eye.</li>
                                  <li>Use an eyewash station or clean water to flush the eye.</li>
                                  <li>Try to blink to allow tears to wash out the particle.</li>
                                  <li>If the particle is still there, cover the eye and seek medical attention.</li>
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                              <AccordionTrigger>Sprains and Strains</AccordionTrigger>
                              <AccordionContent>
                                 <p className="font-bold mb-2">Follow R.I.C.E. procedure:</p>
                                <ol className="list-decimal list-inside space-y-2">
                                  <li><strong>Rest:</strong> Stop activity and rest the injured area.</li>
                                  <li><strong>Ice:</strong> Apply an ice pack for 15-20 minutes every 2-3 hours.</li>
                                  <li><strong>Compression:</strong> Use a compression bandage to reduce swelling.</li>
                                  <li><strong>Elevation:</strong> Keep the injured limb elevated above heart level.</li>
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        className="flex-col h-16 text-xs border-destructive text-destructive hover:bg-destructive/20"
                      >
                        <DoorOpen className="h-5 w-5 mb-1" />
                        <span>Evacuation Plan</span>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="incident-type">Incident Type</Label>
                          <Select>
                            <SelectTrigger id="incident-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="injury">Injury</SelectItem>
                              <SelectItem value="near-miss">
                                Near Miss
                              </SelectItem>
                              <SelectItem value="property-damage">
                                Property Damage
                              </SelectItem>
                              <SelectItem value="environmental">
                                Environmental
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="severity">Severity</Label>
                          <Select>
                            <SelectTrigger id="severity">
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (Minor)</SelectItem>
                              <SelectItem value="medium">
                                Medium (Moderate)
                              </SelectItem>
                              <SelectItem value="high">High (Serious)</SelectItem>
                              <SelectItem value="critical">
                                Critical (Severe)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personnel">Personnel Involved</Label>
                        <Input
                          id="personnel"
                          placeholder="Names and roles of people involved"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description & Timeline
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what happened, when, and where. Include sequence of events."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Evidence Collection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg border-dashed border-2 text-center">
                        <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop files
                        </p>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline">
                          <Camera className="mr-2 h-4 w-4" />
                          Photo
                        </Button>
                        <Button variant="outline">
                          <Video className="mr-2 h-4 w-4" />
                          Video
                        </Button>
                        <Button variant="outline">
                          <Mic className="mr-2 h-4 w-4" />
                          Statement
                        </Button>
                        <Button variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          Mark Location
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Incident Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <UserCheck className="mr-2 h-4 w-4" /> Assign Training
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Safety Training</DialogTitle>
                  <DialogDescription>
                    Select a topic and assign it to a team member or crew.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="training-topic">Training Topic</Label>
                    <Select>
                      <SelectTrigger id="training-topic">
                        <SelectValue placeholder="Select a topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fall-protection">Fall Protection</SelectItem>
                        <SelectItem value="electrical-safety">Electrical Safety</SelectItem>
                        <SelectItem value="confined-space">Confined Space Entry</SelectItem>
                        <SelectItem value="first-aid">First Aid & CPR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assign To</Label>
                    <Select>
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select member or crew..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crew-a">Crew A (All Members)</SelectItem>
                        <SelectItem value="crew-b">Crew B (All Members)</SelectItem>
                        <SelectItem value="bob-miller">Bob Miller (Site Engineer)</SelectItem>
                        <SelectItem value="charlie-davis">Charlie Davis (Architect)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Completion Due Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !trainingDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {trainingDate ? format(trainingDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={trainingDate}
                            onSelect={setTrainingDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                   <DialogClose asChild>
                    <Button onClick={() => handleSubmit('Training Assigned', 'The safety training has been assigned and notified.')}>Confirm Assignment</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" /> Log Equipment Check
                </Button>
              </DialogTrigger>
               <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Equipment Safety Check</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipment-id">Equipment ID / Name</Label>
                    <Input id="equipment-id" placeholder="e.g., Crane C-02, Excavator EX-01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-status">Status</Label>
                    <Select>
                      <SelectTrigger id="check-status">
                        <SelectValue placeholder="Select check status..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                        <SelectItem value="maintenance">Needs Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-notes">Notes / Comments</Label>
                    <Textarea id="check-notes" placeholder="Add any observations or notes..." />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => handleSubmit('Check Logged', 'The equipment check has been recorded.')}>Log Check</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" /> Create Hazard Alert
                </Button>
              </DialogTrigger>
               <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Hazard Alert</DialogTitle>
                  <DialogDescription>
                    Notify relevant personnel of a potential hazard on site.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                   <div className="space-y-2">
                    <Label htmlFor="hazard-description">Hazard Description</Label>
                    <Textarea id="hazard-description" placeholder="e.g., Water spill in Sector B, unsecured scaffolding..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hazard-location">Location</Label>
                    <Input id="hazard-location" placeholder="e.g., Floor 5, near column G-8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hazard-severity">Severity Level</Label>
                     <Select>
                      <SelectTrigger id="hazard-severity">
                        <SelectValue placeholder="Select severity..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="destructive" onClick={() => handleSubmit('Hazard Alert Sent', 'The alert has been broadcast to all relevant site personnel.')}>Send Alert</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle>Upcoming Inspections</CardTitle>
                <CardDescription>Scheduled safety walkthroughs and checks.</CardDescription>
            </CardHeader>
            <CardContent>
                {inspections.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inspections.map((inspection, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{inspection.type}</TableCell>
                                    <TableCell>{format(inspection.date, 'PPP')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming inspections scheduled.</p>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Open Safety Issues</CardTitle>
                <CardDescription>Unresolved safety non-conformances.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Issue</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {openIssues.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className="font-semibold">{item.id}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getSeverityBadge(item.severity)}>{item.severity}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <Button variant="destructive" size="sm" onClick={() => handleResolveIssue(item.id)}>Resolve</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1">
        <Card>
            <CardHeader>
                <CardTitle>Near-Miss Reports</CardTitle>
                <CardDescription>A log of reported near-miss incidents.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nearMisses.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>
                                    <p>{item.description}</p>
                                    <p className="text-xs text-muted-foreground">{item.area}</p>
                                </TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">Review <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    