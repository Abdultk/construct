
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
  Paperclip,
  FileCheck,
  ArrowRight,
  Image as ImageIcon,
  File as FileIcon,
  X,
  Undo2,
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
import { useState, useRef }from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { format } from 'date-fns';

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [signatureDate, setSignatureDate] = useState<Date | null>(null);


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
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(prev => [...prev, ...Array.from(event.target.files!)]);
      toast({
          title: "File(s) Attached",
          description: `${event.target.files.length} file(s) have been attached.`
      })
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setAttachments(prev => prev.filter(file => file.name !== fileName));
  };


  const handleSubmit = () => {
    setIsSubmitted(true);
    toast({
        title: 'Progress Report Submitted',
        description: 'The daily progress has been logged and synced.',
    });
  }
  
  const handleSign = () => {
    setIsSigned(true);
    setSignatureDate(new Date());
  }

  const handleClearSignature = () => {
    setIsSigned(false);
    setSignatureDate(null);
  }

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
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}><Camera className="mr-2 h-4 w-4" />Attach Photo</Button>
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
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept="image/*,video/*,.pdf,.doc,.docx"
            />
            {attachments.length === 0 ? (
                <div 
                    className='p-4 rounded-lg border-dashed border-2 text-center cursor-pointer hover:bg-muted/50'
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip className='mx-auto h-8 w-8 text-muted-foreground' />
                    <p className='mt-2 text-sm text-muted-foreground'>No files attached yet.</p>
                    <p className='text-xs text-muted-foreground'>Drag & drop or browse files.</p>
                </div>
            ) : (
                 <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                        <div className="flex items-center gap-3 truncate">
                          {file.type.startsWith('image/') ? (
                             <Image
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-md object-cover"
                                unoptimized
                              />
                          ) : (
                            <div className="h-10 w-10 flex items-center justify-center bg-muted rounded-md">
                                <FileIcon className="h-6 w-6" />
                            </div>
                          )}
                          <div className='truncate'>
                            <span className="text-sm font-medium truncate block">{file.name}</span>
                            <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveFile(file.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
            )}
            <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}><Camera className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon"><Mic className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon"><Video className="h-5 w-5" /></Button>
            </div>
        </CardContent>
      </Card>

      {isSubmitted ? (
         <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Next Step: Financials
              </CardTitle>
              <CardDescription>
                Based on the reported progress, a new interim payment certificate can be generated.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild className="w-full">
                    <Link href="/payment-certificate">
                        Generate Interim Payment Certificate <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
          </Card>
      ) : (
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
                {isSigned ? (
                  <div className='p-4 rounded-lg border-2 border-green-500 bg-green-500/10 relative'>
                    <svg className="w-full h-16" viewBox="0 0 300 80">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M20,50 C40,70 60,30 80,50 S120,70 140,50 S180,30 200,50 S240,70 260,50"
                      />
                    </svg>
                     <div className="text-center mt-2">
                        <p className="font-semibold text-sm">John Smith (Foreman)</p>
                        <p className="text-xs text-muted-foreground">Signed on {signatureDate ? format(signatureDate, 'PPP, p') : 'N/A'}</p>
                    </div>
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleClearSignature}>
                        <Undo2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                    <div 
                        className='p-8 rounded-lg border-dashed border-2 text-center bg-muted cursor-pointer hover:border-primary'
                        onClick={handleSign}
                    >
                        <Pen className='mx-auto h-8 w-8 text-muted-foreground' />
                        <p className="text-sm text-muted-foreground mt-2">Click to sign</p>
                    </div>
                )}
            </div>
            <Button className="w-full" size="lg" onClick={handleSubmit} disabled={!isSigned}>Submit Daily Report</Button>
            <p className='text-center text-sm text-muted-foreground'>{isOnline ? 'Report will be submitted and synced.' : 'Report will be saved locally and synced when online.'}</p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}




    