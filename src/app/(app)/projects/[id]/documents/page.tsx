

'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Upload,
  Folder,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  Eye,
  Archive,
  History,
  MessageSquare,
  Users,
  X,
  Pen,
  Highlighter,
  Type,
  Square,
  Send,
  DownloadCloud,
  HelpCircle,
  ListTodo,
  GitCommit,
  GitBranch,
  BarChart3,
  Share2,
  Link as LinkIcon,
  BarChart,
  TrendingUp,
  FileBarChart2,
  Presentation,
  Shield,
  Fingerprint,
  ScanText,
  Building2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Pilcrow,
  File as FileIcon,
  Loader2,
  MessageCircle,
  Clock,
  ArchiveIcon,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useState, useRef, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb } from 'lucide-react';
import { Switch } from '@/components/ui/switch';


type Document = {
  id: string;
  name: string;
  type: 'Document' | 'CAD' | 'Report' | 'Archive' | 'Permit' | 'Spreadsheet' | 'Minutes' | 'Standard' | 'Template' | 'Presentation' | string;
  size: string;
  lastModified: string;
  discipline: 'Architectural' | 'Structural' | 'MEP' | 'Civil' | 'Commercial' | 'General';
  status: 'Approved' | 'Under Review' | 'Draft' | 'Superseded' | 'Archived';
  revision: string;
};

type DocumentCategory = {
  name: string;
  documents: Document[];
};

type DocumentStructure = {
  [key: string]: DocumentCategory[];
};

type Transmittal = {
  id: string;
  subject: string;
  to: string;
  from: string;
  date: string;
  status: 'Draft' | 'Sent' | 'Overdue' | 'Responded';
  response: 'Pending' | 'Approved' | 'Approved with Comments' | 'Rejected';
};

type LiveComment = {
  id: string;
  user: { name: string; avatar: string; };
  text: string;
  timestamp: string;
  type: 'Comment' | 'Action Item' | 'Question';
  status: 'Open' | 'Resolved';
};

const initialDocumentStructure: DocumentStructure = {
  "Project Documentation": [
    { name: 'Contract Documents', documents: [{ id: 'CTR-001', name: 'Main Agreement.docx', type: 'Document', size: '2.5 MB', lastModified: '2024-07-10', discipline: 'Commercial', status: 'Approved', revision: '2.1.0' }] },
    { name: 'Design Documents', documents: [{ id: 'ARC-DWG-001', name: 'Architectural_Plans_v3.dwg', type: 'CAD', size: '25.1 MB', lastModified: '2024-07-22', discipline: 'Architectural', status: 'Under Review', revision: '3.0.0-D2' }] },
    { name: 'Technical Documents', documents: [{ id: 'TEC-MS-001', name: 'Method Statement - Concrete.pdf', type: 'Document', size: '1.1 MB', lastModified: '2024-07-15', discipline: 'Structural', status: 'Approved', revision: '1.2.0' }] },
    { name: 'Regulatory Documents', documents: [{ id: 'PER-BLD-001', name: 'Building Permit BP-2023.pdf', type: 'Permit', size: '800 KB', lastModified: '2024-06-01', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
    { name: 'Progress Documents', documents: [{ id: 'PRO-REP-001', name: 'Progress_Report_July.xlsx', type: 'Spreadsheet', size: '4.2 MB', lastModified: '2024-08-01', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
  ],
  "Reference Documentation": [
    { name: 'Standards & Codes', documents: [{ id: 'REF-STD-001', name: 'BS_EN_1991-1-1.pdf', type: 'Standard', size: '6.8 MB', lastModified: '2023-01-01', discipline: 'Structural', status: 'Approved', revision: '1.0.0' }] },
    { name: 'Procedures & Guidelines', documents: [{ id: 'REF-PRO-001', name: 'Safety_Manual_v3.pdf', type: 'Document', size: '1.9 MB', lastModified: '2023-05-20', discipline: 'General', status: 'Approved', revision: '3.0.0' }] },
    { name: 'Templates & Forms', documents: [
        { id: 'REF-TPL-001', name: 'RFI_Template.docx', type: 'Template', size: '120 KB', lastModified: '2023-02-15', discipline: 'General', status: 'Approved', revision: '1.0.0' },
        { id: 'REF-TPL-002', name: 'Specification_Template_CSI.docx', type: 'Template', size: '250 KB', lastModified: '2023-02-15', discipline: 'General', status: 'Approved', revision: '1.0.0' },
        { id: 'REF-TPL-003', name: 'Meeting_Minutes_Template.docx', type: 'Template', size: '95 KB', lastModified: '2023-02-15', discipline: 'General', status: 'Approved', revision: '1.0.0' }
    ]},
  ],
  "Communication Documentation": [
    { name: 'Correspondence', documents: [{ id: 'COR-MIN-001', name: 'Meeting_Minutes_2024-07-29.pdf', type: 'Minutes', size: '750 KB', lastModified: '2024-07-29', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
    { name: 'RFIs (Request for Information)', documents: [{ id: 'COM-RFI-012', name: 'RFI-012_Response.pdf', type: 'Document', size: '300 KB', lastModified: '2024-07-28', discipline: 'MEP', status: 'Approved', revision: '1.1.0' }] },
    { name: 'Submittals', documents: [{ id: 'COM-SUB-004', name: 'Submittal_HVAC-004.zip', type: 'Archive', size: '12.3 MB', lastModified: '2024-07-26', discipline: 'MEP', status: 'Under Review', revision: '1.0.0' }] },
    { name: 'Presentations', documents: [{ id: 'COM-PPT-001', name: 'Monthly_Progress_Review.pptx', type: 'Presentation', size: '8.5 MB', lastModified: '2024-08-01', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
  ],
   "Archive": [
    { name: 'Superseded Documents', documents: [
        { id: 'COM-BOQ-001', name: 'BOQ_v1.2.xlsx', type: 'Spreadsheet', size: '3.4 MB', lastModified: '2024-07-05', discipline: 'Commercial', status: 'Superseded', revision: '1.2.0' },
        { id: 'ARC-DWG-001-v2', name: 'Architectural_Plans_v2.dwg', type: 'CAD', size: '22.8 MB', lastModified: '2024-07-18', discipline: 'Architectural', status: 'Archived', revision: '2.1.0' }
    ] },
  ],
};

const initialTransmittals: Transmittal[] = [
    { id: 'TRN-0023', subject: 'For Review: Updated Lobby Renderings', to: 'Client ABC Corp.', from: 'B. Miller', date: '2024-08-01', status: 'Sent', response: 'Pending' },
    { id: 'TRN-0022', subject: 'For Approval: Structural Calculations - Phase 3', to: 'Structural Engineer', from: 'A. Johnson', date: '2024-07-28', status: 'Overdue', response: 'Pending' },
    { id: 'TRN-0021', subject: 'Response: Approved - RFI-012', to: 'A. Johnson', from: 'MEP Consultant', date: '2024-07-27', status: 'Responded', response: 'Approved' },
    { id: 'TRN-0020', subject: 'Response: Revise & Resubmit - Electrical Plans', to: 'A. Johnson', from: 'Lead Architect', date: '2024-07-26', status: 'Responded', response: 'Rejected' },
];

const documentHistory = [
  {
    version: '3.0.0-D2',
    date: '2024-07-22',
    author: 'B. Miller',
    action: 'Content Change',
    description: 'Updated floor plan based on client feedback from meeting on 07/20.',
    status: 'Under Review',
  },
  {
    version: '2.1.0',
    date: '2024-07-18',
    author: 'B. Miller',
    action: 'Minor Correction',
    description: 'Corrected typo in room labels.',
    status: 'Approved',
  },
  {
    version: '2.0.0',
    date: '2024-07-15',
    author: 'B. Miller',
    action: 'Major Revision',
    description: 'Integrated structural engineer\'s feedback. Added new sections for MEP.',
    status: 'Approved',
  },
   {
    version: '1.0.0',
    date: '2024-07-01',
    author: 'B. Miller',
    action: 'Initial Draft',
    description: 'First version of the architectural plans.',
    status: 'Approved',
  },
];


export default function DocumentLibraryPage() {
  const params = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<DocumentStructure>(initialDocumentStructure);
  const [newFolderName, setNewFolderName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isTransmittalOpen, setIsTransmittalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const uploadIdCounter = useRef(0);

  const getUploadId = () => {
    uploadIdCounter.current += 1;
    return `UPL-${uploadIdCounter.current}`;
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: getUploadId(),
        name: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'Document',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date().toISOString().split('T')[0],
        discipline: 'General' as const,
        status: 'Draft' as const,
        revision: '1.0.0',
      }));

      setDocuments(prevDocs => {
        const newDocs = { ...prevDocs };
        const projectDocs = newDocs["Project Documentation"] || [];
        let uploadsCategory = projectDocs.find(cat => cat.name === 'Uploads');

        if (uploadsCategory) {
          uploadsCategory.documents.push(...newFiles);
        } else {
          projectDocs.push({
            name: 'Uploads',
            documents: newFiles,
          });
        }
        
        newDocs["Project Documentation"] = projectDocs;
        return newDocs;
      });

      toast({
        title: 'Upload Successful',
        description: `${files.length} file(s) have been added.`,
      });
    }
     if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewFolder = () => {
    if (newFolderName.trim()) {
      toast({
        title: 'Folder Created',
        description: `Folder "${newFolderName}" has been created.`,
      });
      setNewFolderName('');
    }
  };
  
  const handleSync = (platform: string) => {
    toast({
        title: 'Synchronization Started',
        description: `Syncing with ${platform}. You will be notified upon completion.`,
    })
  }

  const handleOcr = (docName: string) => {
    toast({
        title: 'OCR Process Started',
        description: `Extracting text from ${docName}. The document will be searchable shortly.`,
    })
  }
  
  const handleNewTransmittal = () => {
    toast({
        title: 'Transmittal Sent',
        description: `The transmittal has been created and sent for review.`,
    });
    setIsTransmittalOpen(false);
  }


  const getFileIcon = (docType: string) => {
    switch (docType.toLowerCase()) {
        case 'folder': return <Folder className="h-5 w-5 text-primary" />;
        case 'cad': return <FileText className="h-5 w-5 text-blue-500" />;
        case 'report': return <FileText className="h-5 w-5 text-purple-500" />;
        case 'permit': return <FileText className="h-5 w-5 text-green-500" />;
        case 'spreadsheet':
        case 'xlsx':
             return <FileBarChart2 className="h-5 w-5 text-green-700" />;
        case 'archive': return <Archive className="h-5 w-5 text-gray-500" />;
        case 'presentation':
        case 'pptx':
             return <Presentation className="h-5 w-5 text-orange-500" />;
        case 'pdf':
             return <FileText className="h-5 w-5 text-red-500" />;
        case 'docx':
            return <FileText className="h-5 w-5 text-blue-700" />;
        default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getStatusBadge = (status: Document['status']) => {
    switch(status) {
        case 'Approved': return 'secondary';
        case 'Under Review': return 'default';
        case 'Draft': return 'outline';
        case 'Superseded': return 'destructive';
        case 'Archived': return 'outline';
        default: return 'outline';
    }
  }

  const getStatusIcon = (status: Document['status']) => {
     switch(status) {
        case 'Approved': return <CheckCircle className="mr-2 h-4 w-4 text-green-500" />;
        case 'Under Review': return <Eye className="mr-2 h-4 w-4 text-yellow-500" />;
        case 'Draft': return <FileText className="mr-2 h-4 w-4 text-blue-500" />;
        case 'Superseded': return <ArchiveIcon className="mr-2 h-4 w-4 text-red-500" />;
        case 'Archived': return <ArchiveIcon className="mr-2 h-4 w-4 text-gray-500" />;
        default: return null;
    }
  }

  const getTransmittalStatusBadge = (status: string) => {
    switch (status) {
    case 'Sent':
        return 'default';
    case 'Overdue':
        return 'destructive';
    case 'Responded':
        return 'secondary';
    default:
        return 'outline';
    }
  };

  const getResponseBadge = (response: string) => {
    switch (response) {
        case 'Approved':
            return { icon: CheckCircle, variant: 'secondary' as const, className: 'text-green-600' };
        case 'Approved with Comments':
            return { icon: MessageSquare, variant: 'secondary' as const, className: 'text-blue-600' };
        case 'Rejected':
            return { icon: XCircle, variant: 'destructive' as const, className: 'text-red-600' };
        default:
            return { icon: Clock, variant: 'outline' as const, className: 'text-muted-foreground' };
    }
  }

  const RealTimeReviewDialog = ({ doc }: { doc: Document | null }) => {
    if (!doc) return null;
    
    const [liveComments, setLiveComments] = useState<LiveComment[]>([
        { id: 'c1', user: { name: 'Client', avatar: 'https://picsum.photos/seed/31/40/40'}, text: 'Is this load-bearing wall correctly specified?', type: 'Question', status: 'Open', timestamp: '2h ago' },
        { id: 'c2', user: { name: 'You', avatar: 'https://picsum.photos/seed/10/40/40'}, text: 'Assign @Structural to verify beam specs.', type: 'Action Item', status: 'Open', timestamp: '1h ago' }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const newLiveComment: LiveComment = {
            id: `c${Date.now()}`,
            user: { name: 'You', avatar: 'https://picsum.photos/seed/10/40/40' },
            text: newComment,
            type: 'Comment',
            status: 'Open',
            timestamp: 'Just now',
        };
        setLiveComments(prev => [...prev, newLiveComment]);
        setNewComment('');
    };
    
    const getEditorInterface = () => {
        return (
            <div className="bg-background h-full w-full border rounded-md overflow-hidden flex flex-col">
                {/* Editor Toolbar Placeholder */}
                <div className="p-2 border-b bg-muted/50 flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Bold className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Italic className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Underline className="h-4 w-4" /></Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="ghost" size="icon" className="h-7 w-7"><Highlighter className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MessageSquare className="h-4 w-4" /></Button>
                </div>
                {/* Editor Body Placeholder */}
                 <div className="flex-1 p-4 overflow-y-auto prose prose-sm max-w-none">
                    <h3 className="font-bold">Architectural Plans - General Notes</h3>
                    <p>1. All dimensions are in millimeters unless otherwise stated.</p>
                    <p>2. This drawing is to be read in conjunction with all relevant structural, MEP, and specialist drawings.</p>
                    <div className="p-2 bg-yellow-200/50 rounded-md border border-yellow-500/50 relative">
                        <p>3. <span className="font-bold">Load-bearing wall specification to be confirmed by structural engineer.</span> Refer to drawing STR-DWG-007 for details.</p>
                    </div>
                </div>
            </div>
        );
    }
    
     const getCommentIcon = (type: LiveComment['type']) => {
      switch (type) {
        case 'Question': return <HelpCircle className="h-4 w-4 text-blue-500" />;
        case 'Action Item': return <ListTodo className="h-4 w-4 text-orange-500" />;
        default: return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
      }
    };

    return (
        <DialogContent className="max-w-7xl h-[90vh]">
            <div className="grid grid-cols-12 gap-4 h-full">
                <div className="col-span-8 flex flex-col gap-2 h-full">
                    <DialogHeader className="flex-row items-center justify-between pr-8 h-14">
                        <div className="space-y-1">
                            <DialogTitle>{doc.name} (Rev. {doc.revision})</DialogTitle>
                            <DialogDescription>Real-time collaborative review session.</DialogDescription>
                        </div>
                    </DialogHeader>
                    <div className="flex-1 overflow-hidden">
                        {getEditorInterface()}
                    </div>
                </div>
                <div className="col-span-4 h-full flex flex-col border-l pl-4">
                    <Tabs defaultValue="comments" className="flex flex-col h-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="comments">Comments & Tasks</TabsTrigger>
                            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
                        </TabsList>
                        <TabsContent value="comments" className="flex-1 overflow-y-auto space-y-4 pt-4">
                             {liveComments.map(comment => (
                                <div key={comment.id} className="flex items-start gap-3 text-sm">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.user.avatar} />
                                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 rounded-md bg-muted p-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold">{comment.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            {getCommentIcon(comment.type)}
                                            <p>{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                         <TabsContent value="ai-assistant" className="flex-1 overflow-y-auto space-y-4 pt-4">
                            <Card className="bg-ai-accent/10 border-ai-accent/50">
                                <CardHeader className="flex-row items-center gap-2 space-y-0">
                                    <Lightbulb className="h-5 w-5 text-ai-accent" />
                                    <CardTitle className="text-base">Predictive Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm">
                                     <div className="flex items-center justify-between">
                                        <span>First-Time Approval Probability</span>
                                        <span className="font-bold text-lg">85%</span>
                                    </div>
                                    <Separator />
                                     <div>
                                        <p className="font-semibold">Review Bottleneck Prediction</p>
                                        <p className="text-muted-foreground">High probability of delay with <span className="text-foreground font-medium">Structural Engineer</span> review (Est. +2 days).</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/50">
                                <CardHeader className="flex-row items-center gap-2 space-y-0">
                                    <Lightbulb className="h-5 w-5 text-foreground" />
                                    <CardTitle className="text-base">Smart Recommendations</CardTitle>
                                </CardHeader>
                                 <CardContent className="space-y-3 text-sm">
                                    <div>
                                        <p className="font-semibold">Language Clarity</p>
                                        <p className="text-muted-foreground">Section 3.1 contains ambiguous phrase "as soon as practical." Suggest replacing with a specific timeframe.</p>
                                    </div>
                                    <Separator />
                                     <div>
                                        <p className="font-semibold">Missing Information</p>
                                        <p className="text-muted-foreground">The document references Drawing 'STR-DWG-007' which is not attached to this transmittal.</p>
                                    </div>
                                </CardContent>
                            </Card>
                         </TabsContent>
                        <div className="mt-auto pt-4 border-t">
                            <div className="relative">
                                <Textarea 
                                    placeholder="Add a comment or create a task..." 
                                    className="pr-10" 
                                    value={newComment} 
                                    onChange={e => setNewComment(e.target.value)}
                                />
                                <Button type="button" size="icon" variant="ghost" className="absolute top-2 right-2 h-7 w-7" onClick={handleAddComment}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </DialogContent>
    );
  }

  const HistoryDialog = ({ doc }: { doc: Document | null }) => {
    const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
    const [isCompareOpen, setIsCompareOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    
    if (!doc) return null;

    const handleVersionSelect = (version: string) => {
        setSelectedVersions(prev => {
            if (prev.includes(version)) {
                return prev.filter(v => v !== version);
            }
            if (prev.length < 2) {
                return [...prev, version];
            }
            // Or show a toast message
            toast({
                variant: 'destructive',
                title: 'Selection Limit Reached',
                description: 'You can only compare two versions at a time.',
            });
            return prev;
        });
    };
    
    const canCompare = selectedVersions.length === 2;
    const canGenerateReport = selectedVersions.length > 0;

    return (
        <React.Fragment>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Version History: {doc.name}</DialogTitle>
                    <DialogDescription>
                        Review and compare changes for this document. Select up to 2 versions to compare.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-4 my-4">
                  <div className="space-y-6">
                    {documentHistory.map((entry, index) => (
                      <div key={index} className="flex gap-4">
                        <Checkbox 
                            id={`version-${entry.version}`} 
                            className="mt-1"
                            checked={selectedVersions.includes(entry.version)}
                            onCheckedChange={() => handleVersionSelect(entry.version)}
                            disabled={!selectedVersions.includes(entry.version) && selectedVersions.length >= 2}
                        />
                        <div className="flex flex-col items-center">
                          <Avatar className="h-9 w-9 mb-1">
                            <AvatarImage src={`https://picsum.photos/seed/${entry.author}/40/40`} />
                            <AvatarFallback>{entry.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          {index < documentHistory.length - 1 && <div className="w-px flex-grow bg-border" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{entry.action}</p>
                            <Badge variant={getStatusBadge(entry.status as Document['status'])}>{entry.status}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Rev {entry.version} by {entry.author} on {entry.date}
                          </p>
                          <p className="text-sm mt-1 bg-muted p-2 rounded-md">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                 <DialogFooter>
                    <Button variant="outline" onClick={() => setIsReportOpen(true)} disabled={!canGenerateReport}>
                        Generate Report
                    </Button>
                    <Button variant="secondary" onClick={() => setIsCompareOpen(true)} disabled={!canCompare}>
                        Compare Selected Versions
                    </Button>
                </DialogFooter>
            </DialogContent>
            
            <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
                <CompareDialog versions={selectedVersions} />
            </Dialog>
             <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
                <ComparisonReportDialog versions={selectedVersions} />
            </Dialog>
        </React.Fragment>
    );
};

const CompareDialog = ({ versions }: { versions: string[] }) => {
    if (versions.length < 2) return null;
    return (
        <DialogContent className="max-w-6xl h-[80vh]">
            <DialogHeader>
                <DialogTitle>Compare Versions</DialogTitle>
                <DialogDescription>
                    Showing differences between {versions[0]} and {versions[1]}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 h-full overflow-hidden">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-base">Version: {versions.sort()[0]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto text-sm prose prose-sm max-w-none">
                        <p>This is the original section of the document. It contains the initial text that was drafted for the project specifications.</p>
                        <p>The structural requirements for the foundation are detailed here, specifying a concrete strength of 4000 psi.</p>
                        <p className="bg-red-500/20 p-1 rounded-sm line-through">The HVAC system was originally specified to use a single large chiller unit.</p>
                    </CardContent>
                </Card>
                <Card className="flex flex-col border-primary">
                    <CardHeader>
                        <CardTitle className="text-base">Version: {versions.sort()[1]}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto text-sm prose prose-sm max-w-none">
                        <p>This is the original section of the document. It contains the initial text that was drafted for the project specifications.</p>
                        <p>The structural requirements for the foundation are detailed here, specifying a concrete strength of <span className="bg-green-500/20 p-1 rounded-sm font-bold">5000 psi</span>.</p>
                        <p className="bg-green-500/20 p-1 rounded-sm">The HVAC system has been updated to use two smaller, more efficient chiller units in a redundant configuration for improved reliability and energy savings.</p>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-base">Change Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="font-bold text-lg text-green-600">25</p>
                        <p className="text-xs text-muted-foreground">Words Added</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg text-red-600">10</p>
                        <p className="text-xs text-muted-foreground">Words Deleted</p>
                    </div>
                     <div>
                        <p className="font-bold text-lg">3</p>
                        <p className="text-xs text-muted-foreground">Format Changes</p>
                    </div>
                </CardContent>
            </Card>
        </DialogContent>
    );
};

const ComparisonReportDialog = ({ versions }: { versions: string[] }) => {
    return (
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Comparison Report</DialogTitle>
                <DialogDescription>
                    Summary of changes between selected versions: {versions.join(', ')}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            The document underwent one major revision (2.0.0) integrating structural feedback, followed by a minor correction (2.1.0) and a recent draft update (3.0.0-D2) for client feedback. Key changes involve floor plan updates and MEP integration.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Change Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="font-bold text-lg">1</p>
                            <p className="text-xs text-muted-foreground">Content Changes</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">1</p>
                            <p className="text-xs text-muted-foreground">Minor Corrections</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">2</p>
                            <p className="text-xs text-muted-foreground">Status Changes</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Detailed Change Log</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documentHistory.filter(h => versions.includes(h.version)).map(h => (
                                    <TableRow key={h.version}>
                                        <TableCell className="font-code">{h.version}</TableCell>
                                        <TableCell>{h.author}</TableCell>
                                        <TableCell>{h.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </div>
            <DialogFooter>
                <Button variant="secondary">Download Report</Button>
            </DialogFooter>
        </DialogContent>
    );
};

const SecurityDialog = ({ doc }: { doc: Document | null }) => {
    if (!doc) return null;
    const accessList = [
        { name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://picsum.photos/seed/10/40/40', permissions: ['View', 'Edit', 'Share', 'Download'] },
        { name: 'Client ABC Corp.', role: 'Client', avatar: 'https://picsum.photos/seed/31/40/40', permissions: ['View', 'Comment'] },
        { name: 'MEP Subcontractor', role: 'Subcontractor', avatar: 'https://picsum.photos/seed/35/40/40', permissions: ['View'] },
    ];
    const auditTrail = [
      { user: 'Alice Johnson', action: 'Viewed document', time: '2 hours ago' },
      { user: 'B. Miller', action: 'Edited content', time: '5 hours ago' },
      { user: 'Client ABC Corp.', action: 'Added a comment', time: '1 day ago' },
    ];

    return (
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Security & Compliance</DialogTitle>
                <DialogDescription>
                    Manage access, data protection, and view audit history for: <span className="font-semibold">{doc.name}</span>
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Access Control</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User / Role</TableHead>
                                    <TableHead>Permissions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {accessList.map(item => (
                                    <TableRow key={item.name}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={item.avatar} />
                                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.role}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {item.permissions.map(p => <Badge key={p} variant="outline">{p}</Badge>)}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Data Protection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <Label htmlFor="watermark-switch" className="flex flex-col gap-y-1">
                                <span>Dynamic Watermarking</span>
                                <span className="font-normal text-xs text-muted-foreground">Embeds user and time info on view/print.</span>
                            </Label>
                            <Switch id="watermark-switch" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <Label htmlFor="encryption-switch" className="flex flex-col gap-y-1">
                                <span>End-to-End Encryption</span>
                                <span className="font-normal text-xs text-muted-foreground">Secures data in transit and at rest.</span>
                            </Label>
                            <Switch id="encryption-switch" defaultChecked disabled />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <Label htmlFor="download-switch" className="flex flex-col gap-y-1">
                                <span>Restrict Downloading</span>
                                 <span className="font-normal text-xs text-muted-foreground">Prevents users from saving offline copies.</span>
                            </Label>
                            <Switch id="download-switch" />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Audit Trail</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {auditTrail.map((log, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm border-b last:border-b-0 py-2">
                                <Fingerprint className="h-4 w-4 text-muted-foreground" />
                                <p className="flex-1"><span className="font-semibold">{log.user}</span> {log.action}</p>
                                <p className="text-xs text-muted-foreground">{log.time}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Save Settings</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    );
};


return (
    <div className="flex flex-1 flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/document-library`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold font-headline">Document Library</h1>
                    <p className="text-muted-foreground">
                        Manage all files for project {params.id}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <RefreshCw className="mr-2 h-4 w-4" /> Sync
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Cloud Platforms</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleSync('SharePoint')}>SharePoint</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSync('Google Drive')}>Google Drive</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleSync('Dropbox')}>Dropbox</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Industry Software</DropdownMenuLabel>
                         <DropdownMenuItem onSelect={() => handleSync('BIM 360')}>Autodesk BIM 360</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Folder
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Folder</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="folder-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="folder-name"
                                    value={newFolderName}
                                    onChange={(e) => setNewFolderName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g., Submittals"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" onClick={handleNewFolder}>
                                    Create Folder
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Button onClick={() => setIsTransmittalOpen(true)}>
                    <Send className="mr-2 h-4 w-4" /> New Transmittal
                </Button>
            </div>
        </div>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search documents..." className="pl-8" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Discipline</DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Architectural</DropdownMenuItem>
                                    <DropdownMenuItem>Structural</DropdownMenuItem>
                                    <DropdownMenuItem>MEP</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={Object.keys(documents)} className="w-full">
                    {Object.entries(documents).map(([mainCategory, subCategories]) => (
                        <AccordionItem key={mainCategory} value={mainCategory}>
                            <AccordionTrigger className="text-lg font-semibold font-headline py-4">
                                {mainCategory}
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="pl-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="hidden sm:table-cell">Type</TableHead>
                                                <TableHead className="hidden lg:table-cell">Status</TableHead>
                                                <TableHead className="hidden xl:table-cell">Revision</TableHead>
                                                <TableHead className="hidden md:table-cell">Last Modified</TableHead>
                                                <TableHead className="w-12"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {subCategories.map((category) => (
                                                <React.Fragment key={category.name}>
                                                    <TableRow>
                                                        <TableCell className="p-4 align-middle font-semibold flex items-center gap-2 bg-muted/50">
                                                            <Folder className="h-5 w-5 text-primary" />
                                                            <span>{category.name}</span>
                                                        </TableCell>
                                                        <TableCell className="p-4 align-middle hidden sm:table-cell bg-muted/50"><Badge variant="outline">Folder</Badge></TableCell>
                                                        <TableCell colSpan={4} className="p-4 align-middle hidden sm:table-cell bg-muted/50"></TableCell>
                                                    </TableRow>
                                                    
                                                    {category.documents.map((doc) => {
                                                    return(
                                                        <TableRow 
                                                            key={doc.id} 
                                                            className="cursor-pointer"
                                                            onClick={() => { setSelectedDoc(doc); setIsReviewOpen(true); }}
                                                        >
                                                            <TableCell className="pl-12 font-medium flex items-center gap-2">
                                                                {getFileIcon(doc.name.split('.').pop() || '')}
                                                                <span>{doc.name}</span>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell"><Badge variant="outline">{doc.type}</Badge></TableCell>
                                                            <TableCell className="hidden lg:table-cell">
                                                                <Badge variant={getStatusBadge(doc.status)} className="capitalize">
                                                                    {getStatusIcon(doc.status)} {doc.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden xl:table-cell font-code">{doc.revision}</TableCell>
                                                            <TableCell className="hidden md:table-cell">{doc.lastModified}</TableCell>
                                                            <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem onSelect={() => { setSelectedDoc(doc); setIsReviewOpen(true); }}>Review</DropdownMenuItem>
                                                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                                                    <DropdownMenuItem onSelect={() => { setSelectedDoc(doc); setIsHistoryOpen(true); }}>View History</DropdownMenuItem>
                                                                    <DropdownMenuItem onSelect={() => { setSelectedDoc(doc); setIsSecurityOpen(true); }}>Security & Compliance</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem onSelect={() => handleOcr(doc.name)}>
                                                                        <ScanText className="mr-2 h-4 w-4" /> Extract Text (OCR)
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem className="text-destructive">
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    )})}
                                                </React.Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Transmittals Log</CardTitle>
                <CardDescription>
                A history of all document transmittals for this project.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[120px]">ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {initialTransmittals.map((t) => {
                    const { icon: ResponseIcon, variant: responseVariant, className: responseClassName } = getResponseBadge(t.response);
                    return(
                        <TableRow key={t.id}>
                            <TableCell className="font-medium font-code">{t.id}</TableCell>
                            <TableCell>{t.subject}</TableCell>
                            <TableCell className="hidden md:table-cell">{t.to}</TableCell>
                            <TableCell>
                                <Badge variant={getTransmittalStatusBadge(t.status)}>
                                    {t.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge variant={responseVariant} className="gap-1">
                                    <ResponseIcon className={cn("h-3 w-3", responseClassName)} />
                                    {t.response}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Download Attachments</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )
                    })}
                </TableBody>
                </Table>
            </CardContent>
            </Card>

        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
            <RealTimeReviewDialog doc={selectedDoc} />
        </Dialog>
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
            <HistoryDialog doc={selectedDoc} />
        </Dialog>
         <Dialog open={isSecurityOpen} onOpenChange={setIsSecurityOpen}>
            <SecurityDialog doc={selectedDoc} />
        </Dialog>
         <Dialog open={isTransmittalOpen} onOpenChange={setIsTransmittalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Transmittal</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    This would be the form to create a new transmittal.
                </div>
                <DialogFooter>
                    <Button onClick={handleNewTransmittal}>Send</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
);
}
