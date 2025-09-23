
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, ListChecks, Bug, BarChart, HardHat, ShieldCheck, Percent, MoreVertical, CalendarIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar as RechartsBar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type Checklist = {
  title: string;
  items: string[];
};

const checklists: Checklist[] = [
    { title: 'Concrete Pour Checklist', items: ['Verify formwork is clean and oiled', 'Check rebar placement and cover', 'Confirm concrete mix design', 'Monitor slump test results', 'Ensure proper vibration'] },
    { title: 'Electrical Rough-in Checklist', items: ['Check box placement against plans', 'Verify wire gauge is correct for circuit', 'Ensure proper grounding', 'Check for secure connections', 'Confirm circuit breaker ratings'] },
];


export default function QualityControlPage() {
  const { toast } = useToast();
  const [activeChecklist, setActiveChecklist] = React.useState<Checklist | null>(null);
  const [isCreateChecklistOpen, setIsCreateChecklistOpen] = React.useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = React.useState("");
  const [newChecklistItems, setNewChecklistItems] = React.useState("");
  
  const [isNewInspectionOpen, setIsNewInspectionOpen] = React.useState(false);
  const [newInspectionType, setNewInspectionType] = React.useState('');
  const [newInspectionLocation, setNewInspectionLocation] = React.useState('');
  const [newInspectionInspector, setNewInspectionInspector] = React.useState('');
  const [newInspectionChecklist, setNewInspectionChecklist] = React.useState('');
  const [newInspectionDate, setNewInspectionDate] = React.useState<Date>();

  
  const defects = [
    { id: 'NCF-001', area: 'Floor 3 - Plumbing', description: 'Leaking pipe joint at column C4.', severity: 'High', status: 'Open', assignee: { name: 'Bob Miller', avatar: 'https://picsum.photos/seed/11/100/100'}, dueDate: '2024-08-05'},
    { id: 'NCF-002', area: 'Facade - Panel 7B', description: 'Incorrect panel alignment.', severity: 'Medium', status: 'In Progress', assignee: { name: 'D. Green', avatar: 'https://picsum.photos/seed/13/100/100'}, dueDate: '2024-08-10'},
    { id: 'NCF-003', area: 'Lobby - Drywall', description: 'Minor surface scratches near entrance.', severity: 'Low', status: 'Resolved', assignee: { name: 'C. Davis', avatar: 'https://picsum.photos/seed/12/100/100'}, dueDate: '2024-07-30'},
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'destructive';
      case 'In Progress': return 'outline';
      case 'Resolved': return 'secondary';
      default: return 'outline';
    }
  };

   const defectsBySeverity = React.useMemo(() => {
    const data = defects.reduce((acc, defect) => {
      if (!acc[defect.severity]) {
        acc[defect.severity] = 0;
      }
      acc[defect.severity]++;
      return acc;
    }, {} as Record<string, number>);

    return [
      { severity: 'High', count: data.High || 0, fill: 'hsl(var(--destructive))' },
      { severity: 'Medium', count: data.Medium || 0, fill: 'hsl(var(--primary))' },
      { severity: 'Low', count: data.Low || 0, fill: 'hsl(var(--secondary))' },
    ];
  }, [defects]);

  const chartConfig = {
    count: {
      label: 'Defects',
    },
  };

  const handleCreateChecklist = () => {
    if (newChecklistTitle && newChecklistItems) {
      // In a real app, you'd save this to a backend.
      // For now, we just show a toast.
      toast({
        title: 'Checklist Created',
        description: `"${newChecklistTitle}" has been created successfully.`,
      });
      setIsCreateChecklistOpen(false);
      setNewChecklistTitle('');
      setNewChecklistItems('');
    }
  };

  const handleNewInspection = () => {
    if (newInspectionType && newInspectionLocation && newInspectionInspector && newInspectionChecklist && newInspectionDate) {
      toast({
        title: 'Inspection Created',
        description: `A new ${newInspectionType.toLowerCase()} inspection has been scheduled for ${format(newInspectionDate, 'PPP')}.`,
      });
      setIsNewInspectionOpen(false);
      // Reset form fields
      setNewInspectionType('');
      setNewInspectionLocation('');
      setNewInspectionInspector('');
      setNewInspectionChecklist('');
      setNewInspectionDate(undefined);
    } else {
        toast({
            variant: 'destructive',
            title: 'Missing Information',
            description: 'Please fill out all fields to create an inspection.',
        });
    }
  };


  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Quality Management
          </h1>
          <p className="text-muted-foreground">
            Manage inspections, defects, and quality metrics for Downtown Skyscraper.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Dialog open={isNewInspectionOpen} onOpenChange={setIsNewInspectionOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Inspection
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Quality Inspection</DialogTitle>
                        <DialogDescription>
                            Schedule a new inspection and assign it to a team member.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="inspection-type">Inspection Type</Label>
                            <Input id="inspection-type" placeholder="e.g., Final Paint Inspection" value={newInspectionType} onChange={(e) => setNewInspectionType(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="inspection-location">Location</Label>
                            <Input id="inspection-location" placeholder="e.g., Level 5, West Wing" value={newInspectionLocation} onChange={(e) => setNewInspectionLocation(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inspection-inspector">Inspector</Label>
                            <Select value={newInspectionInspector} onValueChange={setNewInspectionInspector}>
                                <SelectTrigger id="inspection-inspector">
                                    <SelectValue placeholder="Select an inspector" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                                    <SelectItem value="Bob Miller">Bob Miller</SelectItem>
                                    <SelectItem value="Charlie Davis">Charlie Davis</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inspection-checklist">Checklist</Label>
                             <Select value={newInspectionChecklist} onValueChange={setNewInspectionChecklist}>
                                <SelectTrigger id="inspection-checklist">
                                    <SelectValue placeholder="Select a checklist" />
                                </SelectTrigger>
                                <SelectContent>
                                    {checklists.map(cl => <SelectItem key={cl.title} value={cl.title}>{cl.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="inspection-date">Date</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !newInspectionDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {newInspectionDate ? format(newInspectionDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={newInspectionDate}
                                    onSelect={setNewInspectionDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleNewInspection}>Schedule Inspection</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Non-Conformances</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 High, 3 Medium</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Inspections</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Structural steel weld check</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Compliance</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">On all recent site audits</p>
          </CardContent>
        </Card>
      </div>

      {/* Defect Registry */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
                <CardTitle>Defect Registry (Punch List)</CardTitle>
                <CardDescription>
                Track and manage all identified defects and issues.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search defects..." className="pl-8" />
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"><Checkbox /></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                   <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defects.map((defect) => (
                  <TableRow key={defect.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-medium font-code">{defect.id}</TableCell>
                    <TableCell>
                      <p className="font-semibold">{defect.description}</p>
                      <p className="text-xs text-muted-foreground">{defect.area}</p>
                    </TableCell>
                    <TableCell><Badge variant={getSeverityBadge(defect.severity)}>{defect.severity}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusBadge(defect.status)}>{defect.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarImage src={defect.assignee.avatar} />
                            <AvatarFallback>{defect.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{defect.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{defect.dueDate}</TableCell>
                    <TableCell>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign Corrective Action</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
      
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Checklists &amp; Standards</CardTitle>
                    <CardDescription>Manage quality standards and inspection templates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {checklists.map(checklist => (
                        <Button key={checklist.title} variant="outline" className="w-full justify-start" onClick={() => setActiveChecklist(checklist)}>
                            <ListChecks className="mr-2 h-4 w-4" /> {checklist.title}
                        </Button>
                    ))}
                    <Dialog open={isCreateChecklistOpen} onOpenChange={setIsCreateChecklistOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="w-full justify-start">
                                <Plus className="mr-2 h-4 w-4" /> Create New Checklist
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Checklist</DialogTitle>
                                <DialogDescription>
                                    Define a new checklist for quality inspections.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="checklist-title">Checklist Title</Label>
                                    <Input id="checklist-title" placeholder="e.g., HVAC Installation Checklist" value={newChecklistTitle} onChange={(e) => setNewChecklistTitle(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="checklist-items">Checklist Items</Label>
                                    <Textarea id="checklist-items" placeholder="Enter one item per line..." rows={5} value={newChecklistItems} onChange={(e) => setNewChecklistItems(e.target.value)} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreateChecklist}>Save Checklist</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reporting &amp; Analytics</CardTitle>
                <CardDescription>
                  Visualize defect trends by severity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <RechartsBarChart
                    accessibilityLayer
                    data={defectsBySeverity}
                    margin={{
                      top: 5,
                      right: 5,
                      left: -20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="severity"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      allowDecimals={false}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <RechartsBar dataKey="count" radius={4}>
                      {defectsBySeverity.map((item) => (
                        <div key={item.severity} />
                      ))}
                    </RechartsBar>
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
        </div>

        {/* View Checklist Dialog */}
        <Dialog open={!!activeChecklist} onOpenChange={(isOpen) => !isOpen && setActiveChecklist(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{activeChecklist?.title}</DialogTitle>
                    <DialogDescription>
                        Review the items for this quality checklist.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-4 my-4">
                    {activeChecklist?.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <Checkbox id={`item-${index}`} />
                            <Label htmlFor={`item-${index}`} className="font-normal">{item}</Label>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setActiveChecklist(null)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
