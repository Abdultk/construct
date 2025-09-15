
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
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type BoqItem = {
  id: string;
  description: string;
  unit: string;
  quantity: number | string;
  rate: number | string;
  amount: number;
  status: 'Approved' | 'Pending' | 'In Review' | 'Rejected';
  isParent: boolean;
};

const initialBoqItems: BoqItem[] = [
  {
    id: '1.0',
    description: 'Site Preparation',
    unit: '',
    quantity: '',
    rate: '',
    amount: 150000,
    status: 'Approved',
    isParent: true,
  },
  {
    id: '1.1',
    description: 'Clearing and Grubbing',
    unit: 'LS',
    quantity: 1,
    rate: 50000,
    amount: 50000,
    status: 'Approved',
    isParent: false,
  },
  {
    id: '1.2',
    description: 'Excavation and Earthwork',
    unit: 'm³',
    quantity: 2000,
    rate: 50,
    amount: 100000,
    status: 'Pending',
    isParent: false,
  },
  {
    id: '2.0',
    description: 'Concrete Works',
    unit: '',
    quantity: '',
    rate: '',
    amount: 750000,
    status: 'In Review',
    isParent: true,
  },
];

export default function BoqDataGridPage() {
  const [boqItems, setBoqItems] = useState<BoqItem[]>(initialBoqItems);
  const [selectedItem, setSelectedItem] = useState<BoqItem | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'secondary';
      case 'Pending':
        return 'outline';
      case 'In Review':
        return 'default';
      default:
        return 'destructive';
    }
  };

  const handleAddItem = (newItemData: Omit<BoqItem, 'amount'>) => {
    const amount = (typeof newItemData.quantity === 'number' && typeof newItemData.rate === 'number')
      ? newItemData.quantity * newItemData.rate
      : 0;

    const newItem: BoqItem = {
        ...newItemData,
        amount: newItemData.isParent ? 0 : amount,
        status: 'Pending',
    };

    const parentIndex = boqItems.findIndex(item => item.id === newItem.id.split('.').slice(0, -1).join('.'));

    let newItems = [...boqItems];
    if (parentIndex !== -1) {
        newItems.splice(parentIndex + 1, 0, newItem);
    } else {
        newItems.push(newItem);
    }

    setBoqItems(newItems);
    setIsAddOpen(false);
  };
  
  const AddItemForm = () => {
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [rate, setRate] = useState('');

    const handleSubmit = () => {
        handleAddItem({
            id,
            description,
            isParent,
            unit,
            quantity: isParent ? '' : Number(quantity),
            rate: isParent ? '' : Number(rate)
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
                <div className="space-y-2">
                    <Label htmlFor="item-id">Item ID</Label>
                    <Input id="item-id" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g., 2.1"/>
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
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
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
        <div className="col-span-9 flex flex-col gap-4">
          {/* Toolbar */}
          <Card>
            <CardContent className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search items..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Bulk Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
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
                <Switch id="ai-validate-toggle" />
                <Wand2 className="h-5 w-5 text-ai-accent" />
              </div>
            </CardContent>
          </Card>

          {/* Grid Interface */}
          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead className="w-24">Item</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Unit</TableHead>
                  <TableHead className="w-24 text-right">Quantity</TableHead>
                  <TableHead className="w-24 text-right">Rate</TableHead>
                  <TableHead className="w-32 text-right">Amount</TableHead>
                  <TableHead className="w-28 text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boqItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`cursor-pointer ${
                      item.isParent ? 'bg-muted/50' : ''
                    } ${selectedItem?.id === item.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <TableCell
                      className={`font-medium font-code ${item.isParent ? '' : 'pl-8'}`}
                    >
                      {item.id}
                    </TableCell>
                    <TableCell
                      className={`font-semibold ${item.isParent ? '' : 'font-normal'}`}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right font-code">
                      {item.quantity?.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-code">
                      {typeof item.rate === 'number'
                        ? item.rate.toLocaleString()
                        : item.rate}
                    </TableCell>
                    <TableCell className="text-right font-bold font-code">
                      {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-3 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>{selectedItem ? `${selectedItem.id} - ${selectedItem.description}` : "Select an item to view details"}</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-4 text-sm">
                    <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Status</span>
                        <Badge variant={getStatusBadge(selectedItem.status)}>{selectedItem.status}</Badge>
                    </div>
                    {!selectedItem.isParent && (
                        <>
                             <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Quantity</span>
                                <span className='font-medium'>{selectedItem.quantity?.toLocaleString()} {selectedItem.unit}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-muted-foreground'>Rate</span>
                                <span className='font-medium'>${typeof selectedItem.rate === 'number' ? selectedItem.rate.toLocaleString() : selectedItem.rate} / {selectedItem.unit}</span>
                            </div>
                        </>
                    )}
                     <div className='flex justify-between pt-2 border-t'>
                        <span className='font-bold'>Total Amount</span>
                        <span className='font-bold'>${selectedItem.amount.toLocaleString()}</span>
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
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
