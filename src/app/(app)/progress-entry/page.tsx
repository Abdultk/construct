
'use client';

import {
  MapPin,
  CheckCircle,
  Wifi,
  WifiOff,
  Camera,
  Mic,
  Video,
  Pen,
  Paperclip
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

type WorkPackage = {
  id: string;
  name: string;
  progress: number;
  totalQuantity: string;
  completedToday?: string;
  notes?: string;
};

const initialWorkPackages: WorkPackage[] = [
    { id: '3.1.1', name: 'Excavation', progress: 80, totalQuantity: '600 m³' },
    { id: '3.1.2', name: 'Formwork', progress: 40, totalQuantity: '700 m²' },
    { id: '3.1.3', name: 'Rebar Installation', progress: 25, totalQuantity: '50 Tons' },
];

export default function ProgressEntryPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [workPackages, setWorkPackages] = useState<WorkPackage[]>(initialWorkPackages);

  const handleProgressChange = (id: string, newProgress: number[]) => {
    setWorkPackages(prev => 
      prev.map(pkg => pkg.id === id ? { ...pkg, progress: newProgress[0] } : pkg)
    );
  };

  const handleInputChange = (id: string, field: 'completedToday' | 'notes', value: string) => {
    setWorkPackages(prev => 
      prev.map(pkg => pkg.id === id ? { ...pkg, [field]: value } : pkg)
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto">
      {/* Header */}
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex flex-col">
            <h2 className="font-bold font-headline">Daily Progress Report</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>Downtown Skyscraper - {new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className='gap-2'>
              <CheckCircle className="h-4 w-4 text-green-500" />
              GPS Verified
            </Badge>
            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Package List */}
      <Card>
        <CardHeader>
          <CardTitle>Work Packages</CardTitle>
          <CardDescription>Update progress for today's work.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {workPackages.map((pkg) => (
              <AccordionItem key={pkg.id} value={pkg.id}>
                <AccordionTrigger>
                  <div className='flex justify-between w-full pr-4'>
                    <span className="font-medium">{pkg.id} - {pkg.name}</span>
                    <span className="text-muted-foreground">{pkg.progress}%</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Progress: {pkg.progress}%</Label>
                    <Slider 
                      defaultValue={[pkg.progress]} 
                      max={100} 
                      step={5} 
                      onValueChange={(value) => handleProgressChange(pkg.id, value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity Completed Today</Label>
                    <Input 
                      placeholder={`e.g., 50 ${pkg.totalQuantity.split(' ')[1]}`}
                      value={pkg.completedToday || ''}
                      onChange={(e) => handleInputChange(pkg.id, 'completedToday', e.target.value)}
                    />
                     <p className="text-xs text-muted-foreground">
                        Total quantity for this package is {pkg.totalQuantity}.
                    </p>
                  </div>
                   <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea 
                      placeholder="Add any notes or comments..."
                      value={pkg.notes || ''}
                      onChange={(e) => handleInputChange(pkg.id, 'notes', e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm"><Camera className="mr-2 h-4 w-4" />Attach Photo</Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Evidence Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence & Attachments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className='p-4 rounded-lg border-dashed border-2 text-center'>
                <Paperclip className='mx-auto h-8 w-8 text-muted-foreground' />
                <p className='mt-2 text-sm text-muted-foreground'>Photo gallery, videos, and notes will appear here.</p>
                <p className='text-xs text-muted-foreground'>Drag & drop or browse files.</p>
            </div>
            <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon"><Camera className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon"><Mic className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon"><Video className="h-5 w-5" /></Button>
            </div>
        </CardContent>
      </Card>

      {/* Submit Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Finalize & Submit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="check-safety" />
              <Label htmlFor="check-safety">Safety checks completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="check-quality" />
              <Label htmlFor="check-quality">Quality standards met</Label>
            </div>
          </div>
           <div className="space-y-2">
            <Label>Foreman Signature</Label>
            <div className='p-8 rounded-lg border-dashed border-2 text-center bg-muted'>
                 <Pen className='mx-auto h-8 w-8 text-muted-foreground' />
                <p className="text-sm text-muted-foreground mt-2">Digital signature pad coming soon.</p>
            </div>
          </div>
          <Button className="w-full" size="lg">Submit Daily Report</Button>
          <p className='text-center text-sm text-muted-foreground'>{isOnline ? 'Report will be submitted and synced.' : 'Report will be saved locally and synced when online.'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
