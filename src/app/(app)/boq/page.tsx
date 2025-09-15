
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function BoqDataGridPage() {
  const boqItems = [
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
          <Button variant="secondary">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
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
                    className={item.isParent ? 'bg-muted/50' : ''}
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
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right font-code">
                      {item.rate}
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
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Select an item to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Item details will be shown here.
              </p>
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
