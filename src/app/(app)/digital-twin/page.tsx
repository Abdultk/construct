
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
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Ruler,
  PenSquare,
  SlidersHorizontal,
  History,
  AlertTriangle,
  Download,
  Share,
  Info,
  Thermometer,
  Zap,
  Droplets,
  TrendingUp,
  BarChart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const sensors = [
    { id: 'TEMP-01', name: 'Concrete Slab Temperature', value: '25°C', status: 'Normal', trend: 'up', type: 'hvac' },
    { id: 'VIB-02', name: 'Crane Vibration', value: '0.5g', status: 'Alert', trend: 'down', type: 'mechanical' },
    { id: 'HUM-01', name: 'Basement Humidity', value: '60%', status: 'Normal', trend: 'stable', type: 'hvac' },
    { id: 'STR-03', name: 'Steel Beam Strain', value: '350µε', status: 'Warning', trend: 'up', type: 'structural' },
    { id: 'ELEC-01', name: 'Main Power Draw', value: '450kW', status: 'Normal', trend: 'stable', type: 'electrical' },
    { id: 'PLMB-01', name: 'Water Flow Rate', value: '15L/s', status: 'Normal', trend: 'stable', type: 'plumbing' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Normal': return 'text-green-500';
        case 'Warning': return 'text-yellow-500';
        case 'Alert': return 'text-red-500';
        default: return 'text-muted-foreground';
    }
}

const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
    return <BarChart className="h-4 w-4 text-gray-500" />;
}


export default function DigitalTwinViewerPage() {
    const twinImage = PlaceHolderImages.find(p => p.id === 'digital-twin-wireframe');

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Digital Twin Viewer</h1>
          <p className="text-muted-foreground">Project: Downtown Skyscraper</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><Share className="mr-2 h-4 w-4" /> Share View</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Data</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main 3D Viewport */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-2">
            {/* Toolbar */}
            <Card>
                <CardContent className="flex items-center gap-2 p-2">
                    <Button variant="ghost" size="icon"><ZoomIn /></Button>
                    <Button variant="ghost" size="icon"><ZoomOut /></Button>
                    <Button variant="ghost" size="icon"><RotateCw /></Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="icon"><Layers /></Button>
                    <Button variant="ghost" size="icon"><Ruler /></Button>
                    <Button variant="ghost" size="icon"><PenSquare /></Button>
                </CardContent>
            </Card>
            {/* Viewport */}
            <Card className="flex-1">
                 <CardContent className="flex h-full items-center justify-center p-0 bg-muted/50 rounded-lg overflow-hidden">
                    {twinImage && (
                        <Image
                            src={twinImage.imageUrl}
                            alt="Digital Twin Model"
                            width={1200}
                            height={900}
                            data-ai-hint={twinImage.imageHint}
                            className="w-full h-full object-cover"
                        />
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Panels */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Layers className="h-5 w-5" /> Live IoT Data & Overlays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                <Label htmlFor="hvac-switch" className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <span>HVAC System</span>
                </Label>
                <Switch id="hvac-switch" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="electrical-switch" className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Electrical</span>
                </Label>
                <Switch id="electrical-switch" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="plumbing-switch" className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Plumbing</span>
                </Label>
                <Switch id="plumbing-switch" />
              </div>
              <Separator />
               <div className="space-y-2">
                 {sensors.map(sensor => (
                    <div key={sensor.id} className="p-2 border rounded-md">
                        <div className="flex justify-between items-center text-xs">
                            <p className="font-semibold">{sensor.name}</p>
                            {getTrendIcon(sensor.trend)}
                        </div>
                        <div className="flex justify-between items-baseline">
                             <p className={`text-lg font-bold ${getStatusColor(sensor.status)}`}>{sensor.value}</p>
                             <p className="text-xs text-muted-foreground">{sensor.id}</p>
                        </div>
                    </div>
                ))}
               </div>
            </CardContent>
          </Card>
           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Active Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="rounded-lg border border-destructive/50 p-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Crane Vibration Exceeds Threshold</p>
                            <Badge variant="destructive">Critical</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Sensor VIB-02 - 2 mins ago</p>
                    </div>
                     <div className="rounded-lg border border-yellow-500/50 p-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Steel Beam Strain Anomaly</p>
                            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-500/80">Warning</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Sensor STR-03 - 15 mins ago</p>
                    </div>
                    <Button variant="outline" className="w-full">
                        <History className="mr-2 h-4 w-4" /> View Alert History
                    </Button>
                </CardContent>
            </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5" /> Controls</CardTitle>
               <CardDescription>Simulate and analyze scenarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="time-slider">Historical View</Label>
                 <Slider id="time-slider" defaultValue={[100]} max={100} step={1} />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Past</span>
                    <span>Present</span>
                 </div>
              </div>
              <Separator />
               <Button variant="secondary" className="w-full justify-start"><History className="mr-2 h-4 w-4" /> Simulate Scenario</Button>
               <Button variant="outline" className="w-full justify-start"><AlertTriangle className="mr-2 h-4 w-4" /> Configure Alerts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
