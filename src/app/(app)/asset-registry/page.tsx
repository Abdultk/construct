
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  Download,
  Plus,
  Wrench,
  FileText,
  MoreVertical,
  ChevronDown,
  Paperclip,
  TrendingUp,
  X,
  History,
  Tool,
  CalendarIcon,
  Check,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { useState, useMemo, useRef, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type Asset = {
  id: string;
  name: string;
  category: 'HVAC' | 'Plumbing' | 'Mechanical' | 'Electrical';
  location: string;
  status: 'Operational' | 'Needs Repair' | 'Under Maintenance' | 'Decommissioned';
  nextMaintenance: string;
  manufacturer: string;
  installDate: string;
  performance: number;
};

const initialAssets: Asset[] = [
    {
      id: 'AHU-01',
      name: 'Air Handling Unit',
      category: 'HVAC',
      location: 'Roof - Zone A',
      status: 'Operational',
      nextMaintenance: '2024-09-15',
      manufacturer: 'Carrier',
      installDate: '2023-01-20',
      performance: 98,
    },
    {
      id: 'PMP-03',
      name: 'Water Pump',
      category: 'Plumbing',
      location: 'Basement - Mech Room',
      status: 'Needs Repair',
      nextMaintenance: '2024-08-01',
      manufacturer: 'Grundfos',
      installDate: '2023-02-10',
      performance: 65,
    },
    {
      id: 'ELEV-02',
      name: 'Elevator Car #2',
      category: 'Mechanical',
      location: 'Core Shaft B',
      status: 'Under Maintenance',
      nextMaintenance: '2024-08-10',
      manufacturer: 'Otis',
      installDate: '2023-03-05',
      performance: 85,
    },
    {
      id: 'SWGR-01',
      name: 'Main Switchgear',
      category: 'Electrical',
      location: 'Basement - Elec Room',
      status: 'Operational',
      nextMaintenance: '2025-01-15',
      manufacturer: 'Siemens',
      installDate: '2023-01-15',
      performance: 99,
    },
];

const initialDocs: File[] = [
    new File([], "Operation_Manual.pdf"),
    new File([], "Warranty_Certificate.pdf"),
]

const assetHistory = {
  'AHU-01': [
    { date: subMonths(new Date(), 1), type: 'Routine Inspection', details: 'All systems nominal. Filters cleaned.' },
    { date: subMonths(new Date(), 4), type: 'Preventive Maintenance', details: 'Replaced fan belt. Lubricated motor.' },
  ],
  'PMP-03': [
    { date: subDays(new Date(), 5), type: 'Repair', details: 'Seal leak detected. Awaiting parts.' },
    { date: subMonths(new Date(), 2), type: 'Routine Inspection', details: 'Minor corrosion noted on housing.' },
  ],
   'ELEV-02': [
    { date: subDays(new Date(), 2), type: 'Scheduled Maintenance', details: 'Annual safety inspection and cable lubrication.' },
  ],
  'SWGR-01': [
     { date: subMonths(new Date(), 6), type: 'Routine Inspection', details: 'Infrared scan normal. All breakers functional.' },
  ]
};

export default function AssetRegistryPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(assets[0]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const { toast } = useToast();
  const [documents, setDocuments] = useState<File[]>(initialDocs);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
        const matchesSearch = searchTerm === '' || 
            Object.values(asset).some(val => 
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(asset.category);
        return matchesSearch && matchesCategory;
    });
  }, [assets, searchTerm, categoryFilter]);

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(prev => 
        prev.includes(category) 
            ? prev.filter(c => c !== category) 
            : [...prev, category]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'secondary';
      case 'Needs Repair':
        return 'destructive';
       case 'Under Maintenance':
        return 'default';
      default:
        return 'outline';
    }
  };
  
  const handleAddAsset = (newAsset: Omit<Asset, 'performance'>) => {
    setAssets(prev => [...prev, { ...newAsset, performance: 100 }]);
    setIsAddOpen(false);
     toast({
      title: 'Asset Added',
      description: `Asset "${newAsset.name}" has been successfully registered.`,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocuments(prev => [...prev, ...Array.from(event.target.files!)]);
      toast({
        title: `${event.target.files.length} file(s) attached.`,
      });
       if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setDocuments(prev => prev.filter(file => file.name !== fileName));
  };
  
  const handleExportData = () => {
    const headers = Object.keys(assets[0]);
    const csvContent = [
      headers.join(','),
      ...assets.map(asset => headers.map(header => JSON.stringify(asset[header as keyof Asset])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = `asset-registry-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Export Successful',
      description: 'The asset registry has been exported to CSV.',
    });
  };

  const AddItemForm = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Asset['category'] | ''>('');
    const [location, setLocation] = useState('');
    const [nextMaintenance, setNextMaintenance] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [installDate, setInstallDate] = useState('');

    const handleSubmit = () => {
        if (!id || !name || !category) {
            toast({ variant: 'destructive', title: 'Missing Information', description: 'Please fill out all required fields.' });
            return;
        }
        handleAddAsset({
            id,
            name,
            category,
            location,
            status: 'Operational',
            nextMaintenance,
            manufacturer,
            installDate
        });
    }

    return (
         <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>Enter the details for the new asset.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="asset-id">Asset ID</Label>
                        <Input id="asset-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g., PMP-04"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="asset-name">Asset Name</Label>
                        <Input id="asset-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Chiller Pump"/>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="asset-category">Category</Label>
                     <select id="asset-category" value={category} onChange={(e) => setCategory(e.target.value as Asset['category'])} className="w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                        <option value="" disabled>Select a category</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="asset-location">Location</Label>
                    <Input id="asset-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Penthouse Mech Room"/>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="asset-manufacturer">Manufacturer</Label>
                        <Input id="asset-manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} placeholder="e.g., Trane"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="asset-installDate">Installation Date</Label>
                        <Input id="asset-installDate" type="date" value={installDate} onChange={(e) => setInstallDate(e.target.value)}/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="asset-nextMaintenance">Next Maintenance Date</Label>
                    <Input id="asset-nextMaintenance" type="date" value={nextMaintenance} onChange={(e) => setNextMaintenance(e.target.value)}/>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Asset</Button>
            </DialogFooter>
        </DialogContent>
    );
  }

  const ScheduleMaintenanceDialog = ({ asset, children }: { asset: Asset, children: React.ReactNode }) => {
    const [maintenanceType, setMaintenanceType] = useState('Routine Inspection');
    const [date, setDate] = useState<Date>();
    
    const handleSchedule = () => {
        if (!date) {
            toast({ variant: 'destructive', title: 'Please select a date.'});
            return;
        }
        toast({
            title: 'Maintenance Scheduled',
            description: `${maintenanceType} for ${asset.name} scheduled for ${format(date, 'PPP')}.`,
        });
    };

    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Maintenance</DialogTitle>
            <DialogDescription>Create a new work order for {asset.name} ({asset.id}).</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
             <div className="space-y-2">
                <Label>Maintenance Type</Label>
                <Select value={maintenanceType} onValueChange={setMaintenanceType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Routine Inspection">Routine Inspection</SelectItem>
                    <SelectItem value="Preventive Maintenance">Preventive Maintenance</SelectItem>
                    <SelectItem value="Repair">Repair</SelectItem>
                    <SelectItem value="Calibration">Calibration</SelectItem>
                  </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label>Scheduled Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Add any specific instructions or notes..." />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
             <DialogClose asChild>
                <Button onClick={handleSchedule}>Schedule</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  const ViewHistoryDialog = ({ asset, children }: { asset: Asset, children: React.ReactNode }) => {
    const history = assetHistory[asset.id as keyof typeof assetHistory] || [];
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Maintenance History</DialogTitle>
                    <DialogDescription>Review the history for {asset.name} ({asset.id}).</DialogDescription>
                </DialogHeader>
                 <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                    {history.length > 0 ? history.map((entry, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="p-2 rounded-full bg-muted">
                                    {entry.type === 'Repair' ? <Wrench className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                                </div>
                                {index < history.length - 1 && <div className="w-px h-full bg-border my-1"></div>}
                            </div>
                            <div className="flex-1 pb-4">
                                <p className="font-semibold text-sm">{entry.type}</p>
                                <p className="text-xs text-muted-foreground">{format(entry.date, 'PPP')}</p>
                                <p className="text-sm mt-1">{entry.details}</p>
                            </div>
                        </div>
                    )) : <p className="text-sm text-muted-foreground text-center">No history available for this asset.</p>}
                 </div>
            </DialogContent>
        </Dialog>
    )
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Asset Registry</h1>
          <p className="text-muted-foreground">
            Manage all facility assets for Downtown Skyscraper.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Asset
                </Button>
            </DialogTrigger>
            <AddItemForm />
          </Dialog>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Grid */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> 
                        Category
                        {categoryFilter.length > 0 && <Badge variant="secondary" className="ml-2">{categoryFilter.length}</Badge>}
                        <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {['HVAC', 'Plumbing', 'Mechanical', 'Electrical'].map(cat => (
                            <DropdownMenuCheckboxItem key={cat} checked={categoryFilter.includes(cat)} onCheckedChange={() => handleCategoryFilterChange(cat)}>
                                {cat}
                            </DropdownMenuCheckboxItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setCategoryFilter([])}>Clear Filters</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow 
                    key={asset.id} 
                    className={`cursor-pointer ${selectedAsset?.id === asset.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <TableCell className="font-medium font-code">
                      {asset.id}
                    </TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.nextMaintenance}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedAsset(asset)}>View Details</DropdownMenuItem>
                           <ScheduleMaintenanceDialog asset={asset}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Schedule Maintenance</DropdownMenuItem>
                           </ScheduleMaintenanceDialog>
                           <ViewHistoryDialog asset={asset}>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View History</DropdownMenuItem>
                           </ViewHistoryDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Details Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-4 overflow-y-auto pr-2">
          {selectedAsset ? (
            <>
            <Card>
                <CardHeader>
                <CardTitle>{selectedAsset.name}</CardTitle>
                <CardDescription>{selectedAsset.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-sm">
                        <div className='flex justify-between items-center p-3 rounded-md bg-muted'>
                            <span className='font-semibold'>Status</span>
                            <Badge variant={getStatusBadge(selectedAsset.status)}>{selectedAsset.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1"><p className="text-muted-foreground">Category</p><p className="font-medium">{selectedAsset.category}</p></div>
                            <div className="space-y-1"><p className="text-muted-foreground">Location</p><p className="font-medium">{selectedAsset.location}</p></div>
                            <div className="space-y-1"><p className="text-muted-foreground">Manufacturer</p><p className="font-medium">{selectedAsset.manufacturer}</p></div>
                            <div className="space-y-1"><p className="text-muted-foreground">Install Date</p><p className="font-medium">{selectedAsset.installDate}</p></div>
                        </div>
                        <Card>
                            <CardHeader className='pb-2'>
                                <CardTitle className='text-base flex items-center gap-2'><TrendingUp /> Performance</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-muted-foreground">Health Score</span>
                                    <span className="text-xl font-bold">{selectedAsset.performance}%</span>
                                </div>
                                <Progress value={selectedAsset.performance} className="h-2 mt-1" />
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter>
                    <ScheduleMaintenanceDialog asset={selectedAsset}>
                        <Button variant="outline" className="w-full justify-start"><Wrench className="mr-2 h-4 w-4" /> Schedule Maintenance</Button>
                    </ScheduleMaintenanceDialog>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        multiple
                        onChange={handleFileChange}
                    />
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-2 truncate">
                                <Paperclip className="h-4 w-4" />
                                <span className="text-sm truncate">{doc.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFile(doc.name)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="secondary" className="w-full justify-start" onClick={() => fileInputRef.current?.click()}>
                        <Plus className="mr-2 h-4 w-4" /> Attach Document
                    </Button>
                </CardContent>
            </Card>
            </>
          ) : (
             <Card className="flex flex-col items-center justify-center text-center h-full">
                <CardHeader>
                    <CardTitle>Select an Asset</CardTitle>
                    <CardDescription>
                        Select an asset from the list to see comprehensive information, maintenance history, and performance metrics.
                    </CardDescription>
                </CardHeader>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
}
