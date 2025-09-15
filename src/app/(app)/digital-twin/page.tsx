
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
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export default function DigitalTwinViewerPage() {
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
        <div className="col-span-9 flex flex-col gap-2">
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
                 <CardContent className="flex h-full items-center justify-center p-6 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">Interactive 3D model viewer coming soon.</p>
                </CardContent>
            </Card>
        </div>

        {/* Right Panels */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5" /> Information</CardTitle>
              <CardDescription>Details for selected element</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select an element in the model to see its details, sensor readings, and history.
              </p>
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
