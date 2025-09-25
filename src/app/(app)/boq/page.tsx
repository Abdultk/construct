
'use client';

import {
  Download,
  Edit,
  Filter,
  GitBranch,
  History,
  Plus,
  Search,
  Upload,
  Wand2,
  ChevronDown,
  Loader2,
  Lightbulb,
  FileEdit,
  CheckCircle,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  BookCheck,
  MoreHorizontal,
  Trash2,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, useRef, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { validateBoq, type ValidateBoqOutput } from '@/ai/flows/validate-boq';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


type BoqItem = {
  id: string;
  description: string;
  unit: string;
  quantity: number | string;
  rate: number | string;
  amount: number;
  isParent: boolean;
  costCode?: string;
};

type ChangeLog = {
    itemId: string;
    date: string;
    user: string;
    avatar: string;
    action: string;
    details: string;
    originalValue?: any;
    newValue?: any;
};

const initialBoqItems: BoqItem[] = [
  {
    id: '1.0',
    description: 'Site Preparation',
    unit: '',
    quantity: '',
    rate: '',
    amount: 150000,
    isParent: true,
    costCode: '01-00-00',
  },
  {
    id: '1.1',
    description: 'Clearing and Grubbing of the entire site area, including removal of all vegetation, debris, and topsoil to a depth of 150mm. This includes disposal of all materials off-site in an environmentally approved manner.',
    unit: 'LS',
    quantity: 1,
    rate: 50000,
    amount: 50000,
    isParent: false,
    costCode: '01-51-00',
  },
  {
    id: '1.2',
    description: 'Bulk excavation for building foundations and basement levels. Includes shoring and dewatering as required per geotechnical report. All excavated material to be stockpiled on-site for later use as backfill or disposed of off-site.',
    unit: 'm³',
    quantity: 2000,
    rate: 50,
    amount: 100000,
    isParent: false,
  },
  {
    id: '2.0',
    description: 'Concrete Works',
    unit: '',
    quantity: '',
    rate: '',
    amount: 750000,
    isParent: true,
    costCode: '03-00-00',
  },
];

const changeHistory: ChangeLog[] = [
    { itemId: '1.2', date: '2024-07-28', user: 'A. Johnson', avatar: 'https://picsum.photos/seed/10/32/32', action: 'edit', details: 'Changed quantity from 1800 to 2000.', originalValue: 1800, newValue: 2000 },
    { itemId: '1.2', date: '2024-07-27', user: 'B. Miller', avatar: 'https://picsum.photos/seed/11/32/32', action: 'status', details: 'Status updated to Pending.' },
    { itemId: '1.1', date: '2024-07-26', user: 'A. Johnson', avatar: 'https://picsum.photos/seed/10/32/32', action: 'status', details: 'Status updated to Approved.' },
    { itemId: '2.0', date: '2024-07-25', user: 'C. Davis', avatar: 'https://picsum.photos/seed/12/32/32', action: 'create', details: 'Item created.' },
];

const boqStandards = {
  "International": ["NRM", "CESMM4", "POMI", "SMM7", "UNIFORMAT II", "MasterFormat", "Uniclass"],
  "Regional": ["ASTM E1557 (US)", "DIN 276 (Germany)", "IS 1200 (India)", "AS 3846 (Australia)", "SANS 1921 (South Africa)", "MMHW (Malaysia)", "Nigerian Building Code"],
  "Custom": ["Enterprise Standard", "Project Specific"]
}

export default function BoqDataGridPage() {
  const [boqItems, setBoqItems] = useState<BoqItem[]>(initialBoqItems);
  const [selectedItem, setSelectedItem] = useState<BoqItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [aiValidationEnabled, setAiValidationEnabled] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidateBoqOutput | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string>('Auto-Detect');
  const { toast } = useToast();
  const importInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRemoveItem = (idToRemove: string) => {
    setBoqItems(currentItems => currentItems.filter(item => item.id !== idToRemove));
    toast({
      title: 'Item Removed',
      description: `Item with ID ${idToRemove} has been removed.`,
    });
    if (selectedItem?.id === idToRemove) {
      setSelectedItem(null);
    }
  };


  const formatNumber = (num: number | string | undefined | null) => {
    if (typeof num !== 'number') return num;
    if (isClient) {
        return num.toLocaleString();
    }
    return String(num);
  }

  const recalculateParentAmounts = (items: BoqItem[]) => {
    return items.map(item => {
      if (item.isParent) {
        const newAmount = items
          .filter(i => !i.isParent && i.id.startsWith(item.id + '.'))
          .reduce((sum, child) => sum + child.amount, 0);
        return { ...item, amount: newAmount };
      }
      return item;
    });
  };

  const handleAddItem = (newItemData: Omit<BoqItem, 'amount'>) => {
    const amount = (typeof newItemData.quantity === 'number' && typeof newItemData.rate === 'number')
      ? newItemData.quantity * newItemData.rate
      : 0;

    const newItem: BoqItem = { ...newItemData, amount };

    let newItems = [...boqItems];
    const parentIndex = newItems.findIndex(item => item.id === newItem.id.split('.').slice(0, -1).join('.'));
    
    if (parentIndex !== -1) {
        const lastChildIndex = newItems.map(i => i.id).lastIndexOf(newItems.filter(i => i.id.startsWith(newItems[parentIndex].id + '.')).pop()?.id || newItems[parentIndex].id);
        newItems.splice(lastChildIndex + 1, 0, newItem);
    } else {
        newItems.push(newItem);
    }

    setBoqItems(recalculateParentAmounts(newItems));
    setIsAddOpen(false);
  };
  
  const handleEditItem = (updatedItemData: BoqItem) => {
    let newItems = boqItems.map(item =>
      item.id === updatedItemData.id ? updatedItemData : item
    );
    
    setBoqItems(recalculateParentAmounts(newItems));
    setIsEditOpen(false);
    toast({
      title: 'Item Updated',
      description: `Item "${updatedItemData.id}" has been updated.`
    });
  };

  const handleAiValidationToggle = async (checked: boolean) => {
    setAiValidationEnabled(checked);
    if (checked) {
      setIsValidating(true);
      setValidationResult(null);
      try {
        const result = await validateBoq({
          items: boqItems.map(i => ({
            id: i.id,
            description: i.description,
            unit: i.unit,
            quantity: typeof i.quantity === 'number' ? i.quantity : undefined,
            rate: typeof i.rate === 'number' ? i.rate : undefined,
            isParent: i.isParent,
            costCode: i.costCode,
          })),
          boqStandard: selectedStandard !== 'Auto-Detect' ? selectedStandard : undefined,
        });
        setValidationResult(result);
        if (result.detectedStandard && selectedStandard === 'Auto-Detect') {
          toast({
            title: 'BOQ Standard Detected',
            description: `AI identified the standard as ${result.detectedStandard}. If this is incorrect, please select the right standard and re-run validation to help our AI learn.`,
          });
        } else if (selectedStandard !== 'Auto-Detect') {
             toast({
                title: "Preference Logged",
                description: `Your preference for ${selectedStandard} has been noted and will improve future recommendations.`
            });
        }
      } catch (error) {
        console.error("AI Validation failed", error);
        toast({
          variant: 'destructive',
          title: 'AI Validation Failed',
          description: 'There was an error while validating the BOQ.',
        });
        setAiValidationEnabled(false);
      } finally {
        setIsValidating(false);
      }
    } else {
      setValidationResult(null);
    }
  };

  const getValidationForId = (id: string) => {
    return validationResult?.anomalies.find(a => a.itemId === id);
  }
  
  const handleExport = () => {
    const headers = ['id', 'description', 'unit', 'quantity', 'rate', 'amount', 'isParent'];
    const csvContent = [
      headers.join(','),
      ...boqItems.map(item => headers.map(header => JSON.stringify(item[header as keyof BoqItem])).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    link.href = URL.createObjectURL(blob);
    link.download = `boq-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Export Successful',
      description: 'The BOQ data has been exported to CSV.',
    });
  };

  const handleImportClick = () => {
    importInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would parse the CSV/XLSX file here
      // For this demo, we'll just show a toast message and enable validation
      toast({
        title: 'Import Successful',
        description: `"${file.name}" has been loaded. You can now run AI Validation.`,
      });
      handleAiValidationToggle(true);
    }
    // Reset file input
    if (event.target) {
        event.target.value = '';
    }
  };

  const AddItemForm = () => {
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rate, setRate] = useState('');
    const [costCode, setCostCode] = useState('');

    const handleSubmit = () => {
        handleAddItem({
            id,
            description,
            isParent,
            unit,
            quantity: isParent ? '' : Number(quantity),
            rate: isParent ? '' : Number(rate),
            costCode: costCode || undefined,
        });
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New BOQ Item</DialogTitle>
                <DialogDescription>Enter the details for the new item.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2">
                    <Switch id="is-parent" checked={isParent} onCheckedChange={setIsParent} />
                    <Label htmlFor="is-parent">Is this a parent item?</Label>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="item-id">Item ID</Label>
                        <Input id="item-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g., 2.1"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="item-cost-code">Cost Code (Optional)</Label>
                        <Input id="item-cost-code" value={costCode} onChange={(e) => setCostCode(e.target.value)} placeholder="e.g., 03-30-00"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea id="item-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Formwork for columns"/>
                </div>
                {!isParent && (
                     <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="item-unit">Unit</Label>
                            <Input id="item-unit" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="e.g., m²"/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="item-quantity">Quantity</Label>
                            <Input id="item-quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 500"/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="item-rate">Rate</Label>
                            <Input id="item-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 150"/>
                        </div>
                    </div>
                )}
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Item</Button>
            </DialogFooter>
        </DialogContent>
    );
  }
  
  const EditItemForm = ({ item }: { item: BoqItem }) => {
    const [description, setDescription] = useState(item.description);
    const [unit, setUnit] = useState(item.unit);
    const [quantity, setQuantity] = useState(String(item.quantity));
    const [rate, setRate] = useState(String(item.rate));
    const [costCode, setCostCode] = useState(item.costCode || '');
  
    const handleSubmit = () => {
      const updatedQuantity = item.isParent ? '' : Number(quantity);
      const updatedRate = item.isParent ? '' : Number(rate);
      const newAmount = typeof updatedQuantity === 'number' && typeof updatedRate === 'number'
        ? updatedQuantity * updatedRate
        : item.amount;
  
      handleEditItem({
        ...item,
        description,
        unit,
        quantity: updatedQuantity,
        rate: updatedRate,
        amount: newAmount,
        costCode: costCode || undefined,
      });
    };
  
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit BOQ Item: {item.id}</DialogTitle>
          <DialogDescription>
            Modify the details for this item.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-cost-code">Cost Code (Optional)</Label>
            <Input id="edit-cost-code" value={costCode} onChange={(e) => setCostCode(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {!item.isParent && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-unit">Unit</Label>
                <Input id="edit-unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">Quantity</Label>
                <Input id="edit-quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rate">Rate</Label>
                <Input id="edit-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    );
  };

  const getHistoryIcon = (action: string) => {
    switch (action) {
      case 'edit': return <FileEdit className="h-4 w-4 text-blue-500" />;
      case 'status': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'create': return <Plus className="h-4 w-4 text-purple-500" />;
      default: return <History className="h-4 w-4" />;
    }
  }

  const selectedItemHistory = selectedItem ? changeHistory.filter(c => c.itemId === selectedItem.id) : [];

  const getCostImpact = () => {
    if (!selectedItem || selectedItem.isParent) return null;

    const quantityChange = changeHistory.find(c => c.itemId === selectedItem.id && c.action === 'edit' && c.originalValue !== undefined);

    if (!quantityChange) return null;
    
    const rate = typeof selectedItem.rate === 'number' ? selectedItem.rate : 0;
    const originalAmount = quantityChange.originalValue * rate;
    const currentAmount = selectedItem.amount;
    const variance = currentAmount - originalAmount;

    return {
        originalAmount,
        currentAmount,
        variance,
    }
  }

  const costImpact = getCostImpact();


  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Bill of Quantities (BOQ)
          </h1>
          <p className="text-muted-foreground">
            Project: Downtown Skyscraper
          </p>
        </div>
        <div className="flex items-center gap-2">
            <input type="file" ref={importInputRef} className="hidden" onChange={handleFileImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            <Button variant="outline" className="hidden sm:flex" onClick={handleImportClick}>
                <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline" className="hidden sm:flex" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </DialogTrigger>
            <AddItemForm />
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* BOQ Grid */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          {/* Toolbar */}
          <Card>
            <CardContent className="flex flex-col sm:flex-row items-center justify-between p-3 gap-2">
              <div className="flex items-center gap-2 overflow-x-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search items..." className="pl-8 w-40 sm:w-auto" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            <BookCheck className="mr-2 h-4 w-4" />
                            Standard: {selectedStandard}
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <History className="mr-2 h-4 w-4" />
                      Version: 2.1
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Version: 2.1 (Current)</DropdownMenuItem>
                    <DropdownMenuItem>Version: 2.0</DropdownMenuItem>
                    <DropdownMenuItem>Version: 1.5</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="ai-validate-toggle">AI Validation</Label>
                <Switch id="ai-validate-toggle" checked={aiValidationEnabled} onCheckedChange={handleAiValidationToggle} disabled={isValidating}/>
                {isValidating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Wand2 className="h-5 w-5 text-ai-accent" />}
              </div>
            </CardContent>
          </Card>

          {validationResult && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>
                AI Validation Summary {validationResult.detectedStandard && `(Standard: ${validationResult.detectedStandard})`}
              </AlertTitle>
              <AlertDescription>
                {validationResult.summary}
              </AlertDescription>
            </Alert>
          )}

          {/* Grid Interface */}
          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead className="w-24">Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-28 hidden xl:table-cell">Cost Code</TableHead>
                  <TableHead className="w-20 hidden sm:table-cell">Unit</TableHead>
                  <TableHead className="w-24 text-right hidden md:table-cell">Quantity</TableHead>
                  <TableHead className="w-24 text-right hidden md:table-cell">Rate</TableHead>
                  <TableHead className="w-32 text-right">Amount</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boqItems.map((item) => {
                  const anomaly = getValidationForId(item.id);
                  return (
                    <TableRow
                      key={item.id}
                      className={`cursor-pointer ${
                        item.isParent ? 'bg-muted/50' : ''
                      } ${selectedItem?.id === item.id ? 'bg-muted' : ''} ${anomaly ? 'bg-yellow-500/10' : ''}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <TableCell
                        className={`font-medium font-code ${item.isParent ? '' : 'pl-8'}`}
                      >
                        {item.id}
                      </TableCell>
                      <TableCell>
                        <p className={`${item.isParent ? 'font-semibold' : 'font-normal'} ${selectedItem?.id === item.id ? 'whitespace-pre-wrap' : 'truncate'}`}>
                          {item.description}
                        </p>
                        {anomaly && (
                          <p className="text-xs text-yellow-600 mt-1">
                            <Wand2 className="inline-block h-3 w-3 mr-1" />
                            <span className="font-semibold">{anomaly.anomaly}:</span> {anomaly.suggestion}
                            {anomaly.suggestedCostCode && ` (Suggested Code: ${anomaly.suggestedCostCode})`}
                          </p>
                        )}
                      </TableCell>
                       <TableCell className="font-code hidden xl:table-cell">{item.costCode || '-'}</TableCell>
                      <TableCell className="hidden sm:table-cell">{item.unit}</TableCell>
                      <TableCell className="text-right font-code hidden md:table-cell">
                        {formatNumber(item.quantity)}
                      </TableCell>
                      <TableCell className="text-right font-code hidden md:table-cell">
                        {formatNumber(item.rate)}
                      </TableCell>
                      <TableCell className="text-right font-bold font-code">
                        ${formatNumber(item.amount)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedItem(item)}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                               <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                </DropdownMenuItem>
                               </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                           <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove the BOQ item "{item.id} - {item.description}". This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveItem(item.id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
                {selectedItem ? (
                    <CardDescription>ID: {selectedItem.id}</CardDescription>
                ) : (
                    <CardDescription>Select an item to view details</CardDescription>
                )}
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-semibold">Description</p>
                      <p className="text-muted-foreground whitespace-pre-wrap">{selectedItem.description}</p>
                    </div>
                    <Separator />
                    {!selectedItem.isParent && (
                        <>
                             <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Quantity</span>
                                <span className='font-medium'>{formatNumber(selectedItem.quantity)} {selectedItem.unit}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Rate</span>
                                <span className='font-medium'>${formatNumber(selectedItem.rate)} / {selectedItem.unit}</span>
                            </div>
                        </>
                    )}
                     <div className='flex justify-between pt-2 border-t'>
                        <span className='font-bold'>Total Amount</span>
                        <span className='font-bold'>${formatNumber(selectedItem.amount)}</span>
                    </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select an item to see its details.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Historical Changes</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedItemHistory.length > 0 ? (
                <div className="space-y-4">
                  {selectedItemHistory.map((change, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="flex flex-col items-center">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={change.avatar} />
                            <AvatarFallback>{change.user.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {index < selectedItemHistory.length - 1 && <div className="w-px h-full bg-border my-1"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                           {getHistoryIcon(change.action)}
                           <p className="font-semibold">{change.details}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{change.user} on {change.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {selectedItem ? 'No history for this item.' : 'Select an item to view its history.'}
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {costImpact ? (
                <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Original Cost</span>
                        <span className="font-code">${formatNumber(costImpact.originalAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Current Cost</span>
                        <span className="font-code">${formatNumber(costImpact.currentAmount)}</span>
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between font-bold">
                        <span>Variance</span>
                        <div className={`flex items-center font-code ${costImpact.variance > 0 ? 'text-destructive' : 'text-green-600'}`}>
                            {costImpact.variance > 0 ? <TrendingUp className="mr-2 h-4 w-4" /> : <TrendingDown className="mr-2 h-4 w-4" />}
                            <span>${formatNumber(costImpact.variance)}</span>
                        </div>
                    </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {selectedItem ? 'No cost changes recorded for this item.' : 'Select an item to see its cost impact.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {selectedItem && <EditItemForm item={selectedItem} />}
      </Dialog>
    </div>
  );
}

    

    