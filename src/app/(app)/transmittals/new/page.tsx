
'use client';

import { ArrowLeft, Send, Plus, Paperclip, Trash2, CalendarIcon, Users, FileText, Check, Package, User, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useState, useRef, ChangeEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const steps = [
    { id: 1, name: 'Transmittal Details' },
    { id: 2, name: 'Select Documents' },
    { id: 3, name: 'Manage Recipients' },
    { id: 4, name: 'Review & Submit' },
];

type LibraryDoc = {
  id: string;
  name: string;
  revision: string;
  status: string;
};

const documentLibrary: LibraryDoc[] = [
    { id: 'STR-DWG-005', name: 'STR-DWG-005_Rev2.pdf', revision: '2.0', status: 'Approved' },
    { id: 'STR-DWG-006', name: 'STR-DWG-006_Rev1.pdf', revision: '1.0', status: 'Approved' },
    { id: 'ARC-PLN-010', name: 'ARC-PLN-010_Rev4.dwg', revision: '4.0', status: 'Under Review' },
    { id: 'SPE-GEN-001', name: 'General Specifications.docx', revision: '3.1', status: 'Approved' },
];


export default function NewTransmittalPage() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 State
  const [subject, setSubject] = useState('For Approval: Structural Drawings - Phase 2');
  const [purpose, setPurpose] = useState('for-approval');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [remarks, setRemarks] = useState('');
  const [template, setTemplate] = useState('');

  // Step 2 State
  const [selectedDocs, setSelectedDocs] = useState<LibraryDoc[]>([documentLibrary[0], documentLibrary[1]]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 3 State
  const [recipientsTo, setRecipientsTo] = useState<string>('architect');
  const [recipientsCc, setRecipientsCc] = useState<string>('qs');


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: `upl-${file.name}`,
        name: file.name,
        revision: '1.0',
        status: 'New'
      }));
      const uniqueNewFiles = newFiles.filter(nf => !selectedDocs.some(sd => sd.name === nf.name));
      setSelectedDocs(prev => [...prev, ...uniqueNewFiles]);
    }
  };
  
  const handleSelectDoc = (doc: LibraryDoc, checked: boolean | 'indeterminate') => {
      if (checked) {
          setSelectedDocs(prev => [...prev, doc]);
      } else {
          setSelectedDocs(prev => prev.filter(d => d.id !== doc.id));
      }
  }


  const handleRemoveFile = (docId: string) => {
    setSelectedDocs(prev => prev.filter(doc => doc.id !== docId));
  };
  
  const handleSubmit = () => {
    toast({
        title: "Transmittal Sent",
        description: "The document transmittal has been successfully sent for review.",
    });
  }

  const nextStep = () => setCurrentStep(prev => (prev < steps.length ? prev + 1 : prev));
  const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="flex flex-1 flex-col gap-4 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/transmittals">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-headline">New Document Transmittal</h1>
            <p className="text-muted-foreground">Project: Downtown Skyscraper</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={currentStep !== steps.length}>
          <Send className="mr-2 h-4 w-4" /> Send Transmittal
        </Button>
      </div>

       {/* Stepper */}
      <div className="space-y-4">
        <Progress value={progressValue} className="h-2" />
        <div className="flex justify-between">
            {steps.map(step => (
                 <div key={step.id} className="flex items-center gap-2">
                    <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs", currentStep >= step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                        {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                    </div>
                    <span className={cn("text-sm", currentStep >= step.id ? "font-semibold" : "text-muted-foreground")}>{step.name}</span>
                 </div>
            ))}
        </div>
      </div>

      <div className="flex-1">
        {currentStep === 1 && (
            <Card>
                <CardHeader>
                    <CardTitle>Step 1: Transmittal Details</CardTitle>
                    <CardDescription>Select the purpose, priority, and workflow for this transmittal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="transmittal-template">Template (Optional)</Label>
                        <Select value={template} onValueChange={setTemplate}>
                            <SelectTrigger id="transmittal-template">
                                <SelectValue placeholder="Start with a template..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="shop-drawing">Shop Drawing Submittal</SelectItem>
                                <SelectItem value="rfi-response">RFI Response</SelectItem>
                                <SelectItem value="weekly-progress">Weekly Progress Submittal</SelectItem>
                                <SelectItem value="closeout-package">Closeout Package</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transmittal-subject">Subject</Label>
                        <Input id="transmittal-subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="transmittal-type">Purpose of Submission</Label>
                            <Select value={purpose} onValueChange={setPurpose}>
                                <SelectTrigger id="transmittal-type">
                                <SelectValue placeholder="Select purpose..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="for-approval">For Approval</SelectItem>
                                    <SelectItem value="for-review">For Review and Comment</SelectItem>
                                    <SelectItem value="for-information">For Information</SelectItem>
                                    <SelectItem value="for-construction">For Construction</SelectItem>
                                    <SelectItem value="for-record">For Record</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Response Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={(d) => d && setDueDate(d)}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transmittal-remarks">Remarks</Label>
                        <Textarea id="transmittal-remarks" placeholder="Add any comments or instructions for the recipient..." rows={4} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                    </div>
                </CardContent>
            </Card>
        )}
        {currentStep === 2 && (
             <Card>
                <CardHeader>
                    <CardTitle>Step 2: Document Selection</CardTitle>
                    <CardDescription>Attach documents from your project library or upload new files.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                     <div className="min-h-[200px] rounded-lg border flex flex-col">
                        <div className="p-2 border-b">
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                <Plus className="mr-2 h-4 w-4" /> Add/Upload Document
                            </Button>
                        </div>
                         <div className="flex-1 p-2 max-h-80 overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-10"></TableHead>
                                        <TableHead>Document Name</TableHead>
                                        <TableHead>Revision</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documentLibrary.map((doc) => (
                                        <TableRow key={doc.id}>
                                            <TableCell>
                                                <Checkbox 
                                                    checked={selectedDocs.some(d => d.id === doc.id)}
                                                    onCheckedChange={(checked) => handleSelectDoc(doc, checked)}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{doc.name}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{doc.revision}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={doc.status === 'Approved' ? 'secondary' : 'default'}>{doc.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm mb-2">Selected for Transmittal ({selectedDocs.length})</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto border rounded-md p-2">
                             {selectedDocs.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
                                    <div className="flex items-center gap-2 truncate">
                                    <Paperclip className="h-4 w-4" />
                                    <span className="text-sm truncate">{doc.name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFile(doc.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {selectedDocs.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No documents selected.</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
         {currentStep === 3 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" /> Step 3: Recipient Management
                    </CardTitle>
                    <CardDescription>Choose recipients by role or individual contact.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="recipients-to">To</Label>
                        <Select value={recipientsTo} onValueChange={setRecipientsTo}>
                            <SelectTrigger id="recipients-to">
                                <SelectValue placeholder="Select primary recipients..." />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="client">Client ABC Corp.</SelectItem>
                               <SelectItem value="architect">Lead Architect (Bob Miller)</SelectItem>
                               <SelectItem value="structural-eng">Structural Engineer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="recipients-cc">Cc (Carbon Copy)</Label>
                        <Select value={recipientsCc} onValueChange={setRecipientsCc}>
                            <SelectTrigger id="recipients-cc">
                                <SelectValue placeholder="Select others to notify..." />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="pm">Project Manager (Alice Johnson)</SelectItem>
                               <SelectItem value="qs">Quantity Surveyor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
         )}
         {currentStep === 4 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Check className="h-5 w-5" />Step 4: Review & Submit</CardTitle>
                    <CardDescription>Review the transmittal details before sending.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4 rounded-md border p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div><p className="text-muted-foreground">Subject</p><p className="font-semibold">{subject}</p></div>
                            <div><p className="text-muted-foreground">Purpose</p><p className="font-semibold">{purpose.replace('-',' ')}</p></div>
                            <div><p className="text-muted-foreground">Due Date</p><p className="font-semibold">{dueDate ? format(dueDate, "PPP") : 'N/A'}</p></div>
                        </div>
                        {remarks && <div><p className="text-muted-foreground text-sm">Remarks</p><p className="font-semibold text-sm">{remarks}</p></div>}
                    </div>

                     <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Package className="h-4 w-4" /> Documents ({selectedDocs.length})</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                             {selectedDocs.map((doc, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 rounded-md border bg-muted/50">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">{doc.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Recipients</CardTitle></CardHeader>
                        <CardContent className="space-y-2 text-sm">
                             <div className="flex items-center gap-2">
                                <p className="text-muted-foreground w-12">To:</p>
                                <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>Lead Architect (Bob Miller)</span></div>
                             </div>
                             <div className="flex items-center gap-2">
                                <p className="text-muted-foreground w-12">Cc:</p>
                                <div className="flex items-center gap-2"><User className="h-4 w-4" /><span>Quantity Surveyor</span></div>
                             </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
         )}
      </div>

       <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length}>
          Next
        </Button>
      </div>

    </div>
  );
}
