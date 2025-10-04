
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreVertical,
  Search,
  ChevronDown,
  Download,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  DollarSign,
  MapPin,
  Filter,
  PlusCircle,
  Upload,
  User,
  Building,
  CheckCircle,
  HelpCircle,
  BarChartIcon,
  Briefcase,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Link from 'next/link';

const materialPrices = [
  { id: 'CEM-01', name: 'Dangote Cement (50kg)', category: 'Cement', location: 'Lagos (Island)', price: 10500, unit: 'bag', trend: 'up', source: 'Verified Supplier', confidence: 98 },
  { id: 'CEM-02', name: 'BUA Cement (50kg)', category: 'Cement', location: 'Abuja (Garki)', price: 9800, unit: 'bag', trend: 'stable', source: 'Crowdsourced', confidence: 85 },
  { id: 'STL-01', name: '12mm Iron Rod', category: 'Steel', location: 'Port Harcourt', price: 1200000, unit: 'ton', trend: 'up', source: 'Verified Supplier', confidence: 99 },
  { id: 'SND-01', name: 'Sharp Sand', category: 'Aggregates', location: 'Lagos (Mainland)', price: 45000, unit: 'trip', trend: 'down', source: 'Crowdsourced', confidence: 76 },
  { id: 'GRN-01', name: 'Granite (3/4 inch)', category: 'Aggregates', location: 'Abuja (Maitama)', price: 250000, unit: '20 tons', trend: 'stable', source: 'Verified Supplier', confidence: 95 },
  { id: 'BLK-01', name: '6-inch Sandcrete Block', category: 'Blocks', location: 'Kano', price: 550, unit: 'piece', trend: 'up', source: 'Crowdsourced', confidence: 81 },
];

const priceHistoryData = [
  { date: 'Jan', price: 8500 },
  { date: 'Feb', price: 8700 },
  { date: 'Mar', price: 9200 },
  { date: 'Apr', price: 9100 },
  { date: 'May', price: 9800 },
  { date: 'Jun', price: 10200 },
  { date: 'Jul', price: 10500 },
];

const chartConfig = {
  price: {
    label: "Price (NGN)",
    color: "hsl(var(--primary))",
  },
};

export default function PriceIntelligencePage() {
  const [locationFilter, setLocationFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const { toast } = useToast();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
  };
  
  const getTrend = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <div className="w-4 h-0.5 bg-muted-foreground"></div>;
  };
  
  const getConfidenceColor = (score: number) => {
    if (score > 90) return "text-green-500";
    if (score > 80) return "text-yellow-500";
    return "text-orange-500";
  }
  
  const handleSubmitPrice = () => {
    toast({
        title: "Price Submitted",
        description: "Thank you for your contribution! Your submission is being verified.",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Price Intelligence</h1>
          <p className="text-muted-foreground">
            Dynamic local price feeds for construction materials.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/suppliers">
                    <Briefcase className="mr-2 h-4 w-4" /> For Suppliers
                </Link>
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary"><PlusCircle className="mr-2 h-4 w-4" /> Submit Price</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit a Price</DialogTitle>
                        <DialogDescription>
                            Help the community by contributing a recent material price you've encountered.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="material-name">Material Name</Label>
                            <Input id="material-name" placeholder="e.g., Dangote Cement (50kg)" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="material-price">Price (NGN)</Label>
                                <Input id="material-price" type="number" placeholder="10500" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="material-unit">Unit</Label>
                                <Input id="material-unit" placeholder="bag" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="material-location">Location</Label>
                            <Input id="material-location" placeholder="e.g., Lagos (Island)" />
                        </div>
                        <div className="space-y-2">
                            <Label>Receipt/Invoice (Optional)</Label>
                             <div className="flex items-center justify-center w-full">
                                <Label htmlFor="receipt-file" className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                                    </div>
                                    <Input id="receipt-file" type="file" className="hidden" />
                                </Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                           <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={handleSubmitPrice}>Submit for Verification</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cement Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(10150)}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Steel Price Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1200000)}/ton</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Price Driver</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground text-ai-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold">Exchange Rate</div>
            <p className="text-xs text-muted-foreground">USD/NGN correlation: 0.85</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations Tracked</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Lagos, Abuja, PH, Kano, Onitsha</p>
          </CardContent>
        </Card>
      </div>
      
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Historical Price Trend: Dangote Cement</CardTitle>
                <CardDescription>Price per bag in Lagos (Island) over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                    <LineChart data={priceHistoryData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} domain={['dataMin - 500', 'dataMax + 500']} />
                        <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)}/>} />
                        <Line dataKey="price" type="monotone" stroke={chartConfig.price.color} strokeWidth={2} dot={true} />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-ai-accent" /> AI Insights & Forecast</CardTitle>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="rounded-lg border bg-blue-500/10 p-4">
                    <p className="font-semibold text-sm flex items-center gap-2"><TrendingUp className="text-blue-500" /> Price Forecast</p>
                    <p className="text-xs text-muted-foreground">Cement prices are projected to <strong>increase by 3-5%</strong> in the next 30 days due to seasonal demand.</p>
                </div>
                 <div className="rounded-lg border bg-yellow-500/10 p-4">
                    <p className="font-semibold text-sm flex items-center gap-2">Anomaly Detected</p>
                    <p className="text-xs text-muted-foreground">Sharp sand price in Lagos has <strong>dropped by 10%</strong>, deviating from the national upward trend. This may be a temporary supplier discount.</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/budget-establishment">
                    <BarChartIcon className="mr-2 h-4 w-4" /> View Full Market Analysis
                  </Link>
                </Button>
            </CardContent>
        </Card>
       </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Material Prices</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>
              Real-time price data aggregated from multiple sources.
            </CardDescription>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search materials..." className="pl-8" />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Location <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>All</DropdownMenuItem>
                        <DropdownMenuItem>Lagos (Island)</DropdownMenuItem>
                        <DropdownMenuItem>Lagos (Mainland)</DropdownMenuItem>
                        <DropdownMenuItem>Abuja (Garki)</DropdownMenuItem>
                        <DropdownMenuItem>Port Harcourt</DropdownMenuItem>
                        <DropdownMenuItem>Kano</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-center">Confidence</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Trend (7d)</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materialPrices.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-code">{item.category}</p>
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Badge variant={item.source === 'Verified Supplier' ? 'secondary' : 'outline'} className="gap-1.5 pl-1.5">
                        {item.source === 'Verified Supplier' ? <Building className="h-3 w-3" /> : <User className="h-3 w-3" />}
                        {item.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip>
                      <TooltipTrigger>
                        <span className={`font-semibold ${getConfidenceColor(item.confidence)}`}>{item.confidence}%</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Confidence is based on source reputation, price verification, and recency.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-right font-code font-semibold">{formatCurrency(item.price)} <span className="text-muted-foreground">/ {item.unit}</span></TableCell>
                  <TableCell className="flex justify-center items-center h-12">{getTrend(item.trend)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Price History</DropdownMenuItem>
                        <DropdownMenuItem>Set Price Alert</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Report Inaccuracy</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  );
}
