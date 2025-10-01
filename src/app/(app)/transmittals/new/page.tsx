
'use client';

import { ArrowLeft, Send, Plus, Paperclip, Trash2, CalendarIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState, useRef, ChangeEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function NewTransmittalPage() {
  const { toast } = useToast();
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dueDate, setDueDate] = useState<Date>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(prev => [...prev, ...Array.from(event.target.files!)]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setAttachments(prev => prev.filter(file => file.name !== fileName));
  };
  
  const handleSubmit = () => {
    toast({
        title: "Transmittal Sent",
        description: "The document transmittal has been successfully sent for review.",
    });
  }

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
        <Button onClick={handleSubmit}>
          <Send className="mr-2 h-4 w-4" /> Send Transmittal
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Form */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Transmittal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="transmittal-subject">Subject</Label>
                        <Input id="transmittal-subject" placeholder="e.g., For Approval: Structural Drawings - Phase 2" />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="transmittal-type">Purpose of Submission</Label>
                            <Select>
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
                                    onSelect={setDueDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="transmittal-remarks">Remarks</Label>
                        <Textarea id="transmittal-remarks" placeholder="Add any comments or instructions for the recipient..." rows={4} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Attach the documents to be transmitted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                    <div className="space-y-2">
                        {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                            <div className="flex items-center gap-2 truncate">
                            <Paperclip className="h-4 w-4" />
                            <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFile(file.name)}>
                            <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                        <Plus className="mr-2 h-4 w-4" /> Add Document
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" /> Recipients
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="recipients-to">To</Label>
                        <Select>
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
                        <Select>
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
        </div>
      </div>
    </div>
  );
}
