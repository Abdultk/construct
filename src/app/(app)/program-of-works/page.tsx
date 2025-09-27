
'use client';

import {
  Filter,
  Search,
  Plus,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  GitMerge,
  ChevronRight,
  Package,
  ChevronDown,
  Users,
  Calendar,
  CalendarIcon,
  ToyBrick,
  ArrowRight,
  Upload,
  Lightbulb,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useEffect, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, formatDistanceToNow, isValid } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';


type Material = {
  name: string;
  quantity: string;
  spec: string;
};

type WbsItem = {
  id: string;
  name: string;
  isCritical?: boolean;
  predecessor?: { id: string, name: string };
  successor?: { id: string, name: string };
  children?: WbsItem[];
  status: 'Not Started' | 'In Progress' | 'Completed' | 'At Risk';
  startDate: Date;
  endDate: Date;
  progress: number;
  resources: { name: string, avatar: string }[];
  materials?: Material[];
};

const initialWbsItems: WbsItem[] = [
    { id: '1', name: 'Project Initiation', status: 'Completed', startDate: new Date('2024-07-01'), endDate: new Date('2024-07-10'), progress: 100, resources: [{ name: 'A. Johnson', avatar: 'https://picsum.photos/seed/10/32/32'}] },
    { id: '1.1', name: 'Feasibility Study', successor: {id: '1.2', name: 'Project Charter'}, status: 'Completed', startDate: new Date('2024-07-01'), endDate: new Date('2024-07-05'), progress: 100, resources: [{ name: 'A. Johnson', avatar: 'https://picsum.photos/seed/10/32/32'}] }, 
    { id: '1.2', name: 'Project Charter', predecessor: {id: '1.1', name: 'Feasibility Study'}, successor: {id: '2.1', name: 'Schematic Design'}, status: 'Completed', startDate: new Date('2024-07-06'), endDate: new Date('2024-07-10'), progress: 100, resources: [{ name: 'A. Johnson', avatar: 'https://picsum.photos/seed/10/32/32'}, { name: 'B. Miller', avatar: 'https://picsum.photos/seed/11/32/32'}] },
    { id: '2', name: 'Design & Planning', status: 'In Progress', startDate: new Date('2024-07-11'), endDate: new Date('2024-08-20'), progress: 75, resources: [{ name: 'B. Miller', avatar: 'https://picsum.photos/seed/11/32/32'}, { name: 'C. Davis', avatar: 'https://picsum.photos/seed/12/32/32'}], children: [
        { id: '2.1', name: 'Schematic Design', predecessor: {id: '1.2', name: 'Project Charter'}, successor: {id: '2.2', name: 'Permit Application'}, status: 'Completed', startDate: new Date('2024-07-11'), endDate: new Date('2024-08-05'), progress: 100, resources: [{ name: 'B. Miller', avatar: 'https://picsum.photos/seed/11/32/32'}] }, 
        { id: '2.2', name: 'Permit Application', predecessor: {id: '2.1', name: 'Schematic Design'}, successor: {id: '3.1', name: 'Foundation'}, status: 'In Progress', startDate: new Date('2024-08-06'), endDate: new Date('2024-08-20'), progress: 60, resources: [{ name: 'C. Davis', avatar: 'https://picsum.photos/seed/12/32/32'}] }
    ] },
    { id: '3', name: 'Construction', status: 'In Progress', startDate: new Date('2024-08-21'), endDate: new Date('2024-10-30'), progress: 10, resources: [{ name: 'D. M.', avatar: 'https://picsum.photos/seed/13/32/32'}, { name: 'E. N.', avatar: 'https://picsum.photos/seed/14/32/32'}], children: [
        { id: '3.1', name: 'Foundation', isCritical: true, predecessor: {id: '2.2', name: 'Permit Application'}, successor: {id: '3.2', name: 'Superstructure'}, status: 'In Progress', startDate: new Date('2024-08-21'), endDate: new Date('2024-09-10'), progress: 20, resources: [{ name: 'D. M.', avatar: 'https://picsum.photos/seed/13/32/32'}], materials: [
            { name: 'Concrete', quantity: '1500 m³', spec: 'Grade C35/45' },
            { name: 'Reinforcement Steel', quantity: '75 Tons', spec: 'Grade B500B' }
        ] }, 
        { id: '3.2', name: 'Superstructure', predecessor: {id: '3.1', name: 'Foundation'}, status: 'Not Started', startDate: new Date('2024-09-11'), endDate: new Date('2024-10-30'), progress: 5, resources: [{ name: 'E. N.', avatar: 'https://picsum.photos/seed/14/32/32'}], materials: [
             { name: 'Structural Steel', quantity: '250 Tons', spec: 'S355JR' }
        ] }
    ] },
    { id: '4', name: 'Project Closeout', status: 'Not Started', startDate: new Date('2024-11-01'), endDate: new Date('2024-11-15'), progress: 0, resources: [] }
];

export default function ProgramOfWorksPage() {
  const [wbsItems, setWbsItems] = useState<WbsItem[]>(initialWbsItems);
  const [selectedItem, setSelectedItem] = useState<WbsItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    setSelectedItem(flattenWbs(initialWbsItems)[0] ?? null)
  }, []);

  const flattenWbs = (items: WbsItem[]): WbsItem[] => {
    return items.reduce((acc, item) => {
      acc.push(item);
      if (item.children) {
        acc.push(...flattenWbs(item.children));
      }
      return acc;
    }, [] as WbsItem[]);
  };


  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectItem = (item: WbsItem) => {
    setSelectedItem(item);
  };
  
  const handleAddItem = (newItemData: Omit<WbsItem, 'status' | 'progress' | 'resources'> & { parentId?: string }) => {
    const newItem: WbsItem = {
      ...newItemData,
      status: 'Not Started',
      progress: 0,
      resources: [],
    };
    
    if (newItemData.parentId) {
      const addRecursively = (items: WbsItem[]): WbsItem[] => {
        return items.map(item => {
          if (item.id === newItemData.parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem]
            };
          }
          if (item.children) {
            return { ...item, children: addRecursively(item.children) };
          }
          return item;
        });
      };
      setWbsItems(addRecursively(wbsItems));
      setExpandedItems(prev => ({...prev, [newItemData.parentId!]: true}));
    } else {
      setWbsItems([...wbsItems, newItem]);
    }

    setIsAddOpen(false);
  };

  const updateWbsItem = (id: string, updates: Partial<WbsItem>) => {
    const updateRecursively = (items: WbsItem[]): WbsItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        if (item.children) {
          return { ...item, children: updateRecursively(item.children) };
        }
        return item;
      });
    };
    const updatedItems = updateRecursively(wbsItems);
    setWbsItems(updatedItems);
    if (selectedItem?.id === id) {
        setSelectedItem(prev => prev ? { ...prev, ...updates } : null);
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'secondary';
      case 'In Progress': return 'default';
      case 'At Risk': return 'destructive';
      default: return 'outline';
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: 'Import Successful',
        description: `"${file.name}" is being processed. The program will be updated shortly.`,
      });
    }
    if (event.target) {
        event.target.value = '';
    }
  };


  const WbsItemRow = ({ item, level }: { item: WbsItem, level: number }) => {
    const isExpanded = expandedItems[item.id] ?? false;

    return (
      <>
        <div 
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer ${selectedItem?.id === item.id ? 'bg-muted' : ''}`}
          style={{ paddingLeft: `${level * 1.5}rem`}}
          onClick={() => handleSelectItem(item)}
        >
          {item.children && item.children.length > 0 ? (
            <div className="w-4" onClick={(e) => { e.stopPropagation(); toggleExpand(item.id); }}>
                {isExpanded ? ( <ChevronDown className="h-4 w-4 shrink-0" /> ) : ( <ChevronRight className="h-4 w-4 shrink-0" /> )}
            </div>
          ) : (
            <span className='w-4'></span>
          )}
          <Package className="h-4 w-4" />
          <span className={`font-medium text-sm ${item.children ? '' : 'font-normal'} ${item.isCritical ? 'text-destructive' : ''}`}>
            {item.id} - {item.name}
          </span>
        </div>
        {isExpanded && item.children && (
          <div>
            {item.children.map(child => (
              <WbsItemRow key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </>
    );
  };

    const AddItemForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(selectedItem?.id || '');
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleSubmit = () => {
        if (!id || !name || !startDate || !endDate) return;
        handleAddItem({
            id,
            name,
            parentId: parentId || undefined,
            startDate,
            endDate,
        });
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Work Package</DialogTitle>
                <DialogDescription>Enter the details for the new package.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                 <div className="space-y-2">
                    <Label htmlFor="item-parentId">Parent ID (optional)</Label>
                    <Input id="item-parentId" value={parentId} onChange={(e) => setParentId(e.target.value)} placeholder="e.g., 3.2"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-id">Item ID</Label>
                    <Input id="item-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g., 3.2.1"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-name">Name</Label>
                    <Input id="item-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Install Windows"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Package</Button>
            </DialogFooter>
        </DialogContent>
    );
  }

  const DependencyNode = ({ item, type }: { item: {id: string, name: string} | undefined, type: 'Predecessor' | 'Successor' | 'Current'}) => {
    if (!item) {
        return (
            <Card className="border-dashed w-48 h-24 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">None</p>
            </Card>
        );
    }
    return (
        <Card className={`w-48 text-center ${type === 'Current' ? 'border-primary border-2' : ''}`}>
            <CardHeader className="p-2">
                <CardTitle className="text-sm">{type}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                 <p className="text-sm font-semibold truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground font-code">{item.id}</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Program of Works</h1>
          <p className="text-muted-foreground">Project: Downtown Skyscraper</p>
        </div>
        <div className="flex items-center gap-2">
            <input type="file" ref={importInputRef} className="hidden" onChange={handleFileImport} accept=".mpp,.mpt,.xlsx,.csv,.pdf,.xer,.xml" />
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Import Program</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Import Program of Works</DialogTitle>
                        <DialogDescription>
                            Upload your project schedule file. Our AI will automatically process and validate it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                         <div
                            className="flex items-center justify-center w-full"
                            onClick={() => importInputRef.current?.click()}
                        >
                            <Label htmlFor="program-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">MPP, XER, XLSX, PDF, XML, etc.</p>
                                </div>
                            </Label>
                        </div>
                        <Card className="bg-ai-accent/10 border-ai-accent/50">
                            <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                                <Lightbulb className="h-5 w-5 text-ai-accent" />
                                <div>
                                    <CardTitle className="text-base">AI-Powered Processing</CardTitle>
                                    <CardDescription className="text-ai-accent/90">
                                        Your file will be automatically analyzed for:
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                               <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Data validation (dates, durations, relationships)</li>
                                    <li>Resource and dependency extraction</li>
                                    <li>Risk identification for unusual dependencies</li>
                                    <li>Optimization suggestions</li>
                               </ul>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary"><Plus className="mr-2 h-4 w-4" /> Add Work Package</Button>
            </DialogTrigger>
            <AddItemForm />
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Left Panel: Tree View */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-4">
          <Card className='h-full overflow-y-auto'>
             <CardHeader>
                <CardTitle>Program Hierarchy</CardTitle>
                 <div className="relative pt-2">
                  <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search packages..." className="pl-8 h-9" />
                </div>
                 <div className='flex items-center gap-2 pt-2'>
                    <Button variant="outline" size="sm"><ArrowUpWideNarrow className='mr-2 h-4 w-4' /> Expand</Button>
                    <Button variant="outline" size="sm"><ArrowDownWideNarrow className='mr-2 h-4 w-4' /> Collapse</Button>
                 </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {wbsItems.map(item => (
                  <WbsItemRow key={item.id} item={item} level={item.id.split('.').length-1} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Panel: Details */}
        <div className="col-span-12 md:col-span-8 lg:col-span-6 flex flex-col gap-4 overflow-y-auto pr-2">
           <Card>
            <CardHeader>
                <CardTitle>Work Package Details: {selectedItem ? `${selectedItem.name} (${selectedItem.id})` : 'None'}</CardTitle>
                <CardDescription>Detailed information for the selected work package.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {selectedItem && isClient ? (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Status</p>
                                <Badge variant={getStatusBadge(selectedItem.status)}>{selectedItem.status}</Badge>
                            </div>
                             <div className="space-y-1">
                                <p className="text-muted-foreground">Start Date</p>
                                <p className="font-medium">{format(selectedItem.startDate, 'MMM d, yyyy')}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-muted-foreground">End Date</p>
                                <p className="font-medium">{format(selectedItem.endDate, 'MMM d, yyyy')}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-muted-foreground">Duration</p>
                                <p className="font-medium">{formatDistanceToNow(selectedItem.endDate)}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                                    <Users className="w-5 h-5" />
                                    <CardTitle className='text-base'>Resource Requirements</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {selectedItem.resources.length > 0 ? selectedItem.resources.map(res => (
                                        <div key={res.name} className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={res.avatar} />
                                                <AvatarFallback>{res.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{res.name}</span>
                                        </div>
                                    )) : <p className="text-sm text-muted-foreground">No resources assigned.</p>}
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center gap-2 space-y-0">
                                    <Calendar className="w-5 h-5" />
                                    <CardTitle className='text-base'>Progress Tracking</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-muted-foreground">Completion</span>
                                        <span className="text-xl font-bold">{selectedItem.progress}%</span>
                                    </div>
                                    <Progress value={selectedItem.progress} />
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-base'>Material Specifications</CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                               {selectedItem?.materials && selectedItem.materials.length > 0 ? (
                                 selectedItem.materials.map((mat, index) => (
                                    <div key={index} className="p-3 rounded-md border text-sm">
                                        <div className="flex items-center gap-2 font-semibold">
                                            <ToyBrick className="h-4 w-4 text-muted-foreground" />
                                            <span>{mat.name}</span>
                                        </div>
                                        <div className="pl-6">
                                            <p><strong>Qty:</strong> {mat.quantity}</p>
                                            <p><strong>Spec:</strong> {mat.spec}</p>
                                        </div>
                                    </div>
                                 ))
                               ) : (
                                <p className="text-sm text-muted-foreground">
                                    {selectedItem ? 'No materials specified for this package.' : 'Select a package to see materials.'}
                                </p>
                               )}
                            </CardContent>
                          </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className='text-base'>Dependencies</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" disabled={!selectedItem}><GitMerge className="mr-2 h-4 w-4" /> Visualize</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle>Dependency Visualization</DialogTitle>
                                            <DialogDescription>
                                                Visual flow of the direct dependencies for: <span className="font-semibold">{selectedItem.name}</span>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="py-8">
                                            <div className="flex items-center justify-center">
                                                <DependencyNode item={selectedItem.predecessor} type="Predecessor" />
                                                <div className="relative mx-2">
                                                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                                                    <Badge variant="outline" className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">FS</Badge>
                                                </div>
                                                <DependencyNode item={{id: selectedItem.id, name: selectedItem.name}} type="Current" />
                                                <div className="relative mx-2">
                                                    <ArrowRight className="h-8 w-8 text-muted-foreground" />
                                                    <Badge variant="outline" className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">FS</Badge>
                                                </div>
                                                <DependencyNode item={selectedItem.successor} type="Successor" />
                                            </div>
                                             <Card className="mt-6 bg-ai-accent/10 border-ai-accent/50">
                                                <CardHeader className="flex-row items-center gap-2 space-y-0">
                                                    <Lightbulb className="h-5 w-5 text-ai-accent" />
                                                    <CardTitle className="text-base">AI Recommendations</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm">Consider a <strong>Start-to-Start</strong> relationship with 'Successor Task' and a 2-day lead time to accelerate the schedule. This could save an estimated 3 project days.</p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                 <Table>
                                    <TableHeader>
                                        <TableRow>
                                        <TableHead>Type</TableHead>
                                        <TableHead>WBS Code</TableHead>
                                        <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedItem.predecessor ? (
                                            <TableRow>
                                                <TableCell><Badge variant="outline">Predecessor</Badge></TableCell>
                                                <TableCell className='font-code'>{selectedItem.predecessor.id}</TableCell>
                                                <TableCell>{selectedItem.predecessor.name}</TableCell>
                                            </TableRow>
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-muted-foreground text-center">No predecessor</TableCell>
                                            </TableRow>
                                        )}
                                        {selectedItem.successor ? (
                                             <TableRow>
                                                <TableCell><Badge variant="outline">Successor</Badge></TableCell>
                                                <TableCell className='font-code'>{selectedItem.successor.id}</TableCell>
                                                <TableCell>{selectedItem.successor.name}</TableCell>
                                            </TableRow>
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-muted-foreground text-center">No successor</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <div className="text-center text-muted-foreground py-10">
                        Select a work package from the hierarchy to see its details.
                    </div>
                )}
            </CardContent>
           </Card>
        </div>

        {/* Properties Panel */}
        <div className="col-span-12 md:col-span-12 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {selectedItem ? (
                <div className="space-y-4 text-sm">
                    <div className="space-y-2">
                        <Label htmlFor="prop-name">Name</Label>
                        <Input
                            id="prop-name"
                            value={selectedItem.name}
                            onChange={(e) => updateWbsItem(selectedItem.id, { name: e.target.value })}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="prop-status">Status</Label>
                        <Select
                            value={selectedItem.status}
                            onValueChange={(value: WbsItem['status']) => updateWbsItem(selectedItem.id, { status: value })}
                        >
                            <SelectTrigger id="prop-status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Not Started">Not Started</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="At Risk">At Risk</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-normal">
                                    {isValid(selectedItem.startDate) ? format(selectedItem.startDate, 'P') : 'Pick date'}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedItem.startDate}
                                        onSelect={(date) => date && updateWbsItem(selectedItem.id, { startDate: date })}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                         <div className="space-y-2">
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-normal">
                                    {isValid(selectedItem.endDate) ? format(selectedItem.endDate, 'P') : 'Pick date'}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedItem.endDate}
                                        onSelect={(date) => date && updateWbsItem(selectedItem.id, { endDate: date })}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Progress: {selectedItem.progress}%</Label>
                        <Slider
                            value={[selectedItem.progress]}
                            onValueChange={(value) => updateWbsItem(selectedItem.id, { progress: value[0] })}
                            max={100}
                            step={1}
                        />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label htmlFor="critical-path-switch" className="flex flex-col gap-y-1.5">
                            <span>Critical Path</span>
                             <span className="font-normal leading-snug text-muted-foreground text-xs">
                                Mark this as a critical task.
                            </span>
                        </Label>
                        <Switch
                            id="critical-path-switch"
                            checked={selectedItem.isCritical}
                            onCheckedChange={(checked) => updateWbsItem(selectedItem.id, { isCritical: checked })}
                        />
                    </div>
                </div>
               ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Select a package to edit properties.</p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    