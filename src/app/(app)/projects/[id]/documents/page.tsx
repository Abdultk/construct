

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
    { name: 'Contract Documents', documents: [{ id: 'CTR-001', name: 'Main Agreement.pdf', type: 'Document', size: '2.5 MB', lastModified: '2024-07-10', discipline: 'Commercial', status: 'Approved', revision: '2.1.0' }] },
    { name: 'Design Documents', documents: [{ id: 'ARC-DWG-001', name: 'Architectural_Plans_v3.dwg', type: 'CAD', size: '25.1 MB', lastModified: '2024-07-22', discipline: 'Architectural', status: 'Under Review', revision: '3.0.0-D2' }] },
    { name: 'Technical Documents', documents: [{ id: 'TEC-MS-001', name: 'Method Statement - Concrete.pdf', type: 'Document', size: '1.1 MB', lastModified: '2024-07-15', discipline: 'Structural', status: 'Approved', revision: '1.2.0' }] },
    { name: 'Regulatory Documents', documents: [{ id: 'PER-BLD-001', name: 'Building Permit BP-2023.pdf', type: 'Permit', size: '800 KB', lastModified: '2024-06-01', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
    { name: 'Progress Documents', documents: [{ id: 'PRO-REP-001', name: 'Progress_Report_July.pdf', type: 'Report', size: '4.2 MB', lastModified: '2024-08-01', discipline: 'General', status: 'Approved', revision: '1.0.0' }] },
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
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: `UPL-${Date.now()}-${index}`,
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

  const getFileIcon = (docType: string) => {
    switch (docType) {
        case 'Folder': return <Folder className="h-5 w-5 text-muted-foreground" />;
        case 'CAD': return <FileText className="h-5 w-5 text-blue-500" />;
        case 'Report': return <FileText className="h-5 w-5 text-purple-500" />;
        case 'Permit': return <FileText className="h-5 w-5 text-green-500" />;
        case 'Spreadsheet': return <FileBarChart2 className="h-5 w-5 text-green-700" />;
        case 'Archive': return <Archive className="h-5 w-5 text-gray-500" />;
        case 'Presentation': return <Presentation className="h-5 w-5 text-orange-500" />;
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
        case 'Superseded': return <Archive className="mr-2 h-4 w-4 text-red-500" />;
        case 'Archived': return <Archive className="mr-2 h-4 w-4 text-gray-500" />;
        default: return null;
    }
  }

  const RealTimeReviewDialog = ({ doc }: { doc: Document | null }) => {
    const docPreviewImage = PlaceHolderImages.find(p => p.id === 'site-plan-map');
    const [comments, setComments] = useState<LiveComment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [newCommentType, setNewCommentType] = useState<LiveComment['type']>('Comment');

    if (!doc) return null;

    const collaborators = [
        { id: 'jane', name: 'Jane Doe', avatar: 'https://picsum.photos/seed/2/40/40' },
        { id: 'bob', name: 'Bob Miller', avatar: 'https://picsum.photos/seed/11/40/40' },
        { id: 'charlie', name: 'Charlie Davis', avatar: 'https://picsum.photos/seed/12/40/40' }
    ];

    const handleSendComment = () => {
        if (newComment.trim()) {
            setComments(prev => [...prev, {
                id: `comment-${Date.now()}`,
                user: { name: 'Jane Doe', avatar: 'https://picsum.photos/seed/2/40/40' },
                text: newComment,
                timestamp: 'Just now',
                type: newCommentType,
                status: 'Open'
            }]);
            setNewComment("");
            setNewCommentType('Comment');
        }
    }
    
    const toggleCommentStatus = (id: string) => {
        setComments(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Open' ? 'Resolved' : 'Open' } : c));
    }
    
    const getCommentIcon = (type: LiveComment['type']) => {
        switch(type) {
            case 'Action Item': return <ListTodo className="h-4 w-4 text-blue-500" />;
            case 'Question': return <HelpCircle className="h-4 w-4 text-yellow-500" />;
            default: return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
        }
    }

    const renderCommentWithMentions = (text: string) => {
        const mentionRegex = /@(\w+\s?\w*)/g;
        const parts = text.split(mentionRegex);
        return parts.map((part, index) => {
            const isMention = index % 2 === 1;
            const collaborator = isMention ? collaborators.find(c => c.name.toLowerCase().replace(' ', '') === part.toLowerCase().replace(' ', '')) : null;
            if (isMention && collaborator) {
                return <span key={index} className="text-primary font-semibold bg-primary/10 p-0.5 rounded-sm">@{collaborator.name}</span>
            }
            return part;
        });
    }

    const knowledgeGraphEntities = {
        'Materials': ['Concrete Grade C40', 'Reinforcement Steel B500B'],
        'Equipment': ['Tower Crane TC-1', 'Concrete Pump P-02'],
        'Locations': ['Level 10-15', 'Core Shaft B'],
    };

    const knowledgeGraphDependencies = {
        'Upstream': [{id: 'STR-PLN-002', name: 'Structural Plan v2'}],
        'Downstream': [{id: 'MEP-DWD-005', name: 'MEP Coordination Drawing'}, {id: 'BOQ-v1.3', name: 'Bill of Quantities v1.3'}],
    };

    const knowledgeGraphIntegrations = [
      { type: 'Schedule', id: 'TSK-105', name: 'Foundation Pouring' },
      { type: 'Resource', id: 'TEAM-STR', name: 'Structural Team' },
      { type: 'Progress', id: 'DEL-002', name: 'Foundation Completion' },
      { type: 'Cost', id: 'C-3100', name: 'Concrete Works' },
      { type: 'Quality', id: 'QCL-002', name: 'Concrete Pour Checklist' },
      { type: 'Testing', id: 'TST-CNC-005', name: 'Concrete Strength Test Report' },
      { type: 'BIM Model', id: 'BM-L10-STR-001', name: 'Beam B-101' },
      { type: 'ERP', id: 'PO-2024-754', name: 'Purchase Order for Steel' },
      { type: 'Asset Registry', id: 'AHU-01', name: 'Air Handling Unit 01' },
      { type: 'Issues', id: 'RFI-012', name: 'RFI-012_Response.pdf' },
      { type: 'Compliance', id: 'REF-STD-001', name: 'BS_EN_1991-1-1.pdf' },
      { type: 'Change Order', id: 'CR-0012', name: 'Substitute roofing material' },
    ];

    const usageAnalytics = {
      views: '128',
      uniqueViewers: '15',
      shares: '5',
      comments: comments.length,
    };
    
    const contentAnalytics = {
      revisions: documentHistory.length,
      status: 'Under Review',
      age: '12 days',
    };

    return (
        <DialogContent className="max-w-7xl h-[90vh]">
            <DialogHeader className="flex-row items-center justify-between pr-8">
                <div className="space-y-1">
                    <DialogTitle>{doc.name} (Rev. {doc.revision})</DialogTitle>
                    <DialogDescription>Real-time collaborative review session.</DialogDescription>
                </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center -space-x-2">
                        {collaborators.map(c => (
                            <Avatar key={c.name} className="border-2 border-background">
                                <AvatarImage src={c.avatar} />
                                <AvatarFallback>{c.name.slice(0,2)}</AvatarFallback>
                            </Avatar>
                        ))}
                         <Avatar className="border-2 border-background">
                            <AvatarFallback>+2</AvatarFallback>
                        </Avatar>
                    </div>
                    <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
                    <Button variant="secondary"><DownloadCloud className="mr-2 h-4 w-4" /> Download Marked-up PDF</Button>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-12 gap-4 h-full py-4 overflow-hidden">
                <div className="col-span-9 flex flex-col gap-4">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-3">
                             <Card className="h-full">
                                <CardHeader className="p-2">
                                    <CardTitle className="text-base">Markup Tools</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="flex-col h-16"><Pen className="h-5 w-5" /> Pen</Button>
                                    <Button variant="outline" className="flex-col h-16"><Highlighter className="h-5 w-5" /> Highlight</Button>
                                    <Button variant="outline" className="flex-col h-16"><Type className="h-5 w-5" /> Text</Button>
                                    <Button variant="outline" className="flex-col h-16"><Square className="h-5 w-5" /> Shape</Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-9">
                            <Card>
                                <Tabs defaultValue="entities">
                                    <CardHeader className="p-2">
                                        <CardTitle className="text-base">Knowledge Graph</CardTitle>
                                        <TabsList className="grid w-full grid-cols-5 h-8">
                                            <TabsTrigger value="entities" className="h-6">Entities</TabsTrigger>
                                            <TabsTrigger value="dependencies" className="h-6">Dependencies</TabsTrigger>
                                            <TabsTrigger value="integrations" className="h-6">Integrations</TabsTrigger>
                                            <TabsTrigger value="analytics" className="h-6">Analytics</TabsTrigger>
                                            <TabsTrigger value="related" className="h-6">Related</TabsTrigger>
                                        </TabsList>
                                    </CardHeader>
                                    <CardContent className="p-2 h-36 overflow-y-auto">
                                        <TabsContent value="entities">
                                             <div className="space-y-2">
                                                {Object.entries(knowledgeGraphEntities).map(([category, items]) => (
                                                    <div key={category}>
                                                        <p className="text-xs font-semibold text-muted-foreground">{category}</p>
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {items.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="dependencies">
                                            <div className="space-y-2">
                                                 <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Upstream (Influences this doc)</p>
                                                    {knowledgeGraphDependencies.Upstream.map(dep => (
                                                        <Button key={dep.id} variant="link" className="p-0 h-auto text-sm">{dep.name}</Button>
                                                    ))}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Downstream (Affected by this doc)</p>
                                                    {knowledgeGraphDependencies.Downstream.map(dep => (
                                                         <Button key={dep.id} variant="link" className="p-0 h-auto text-sm block">{dep.name}</Button>
                                                    ))}
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="related">
                                            <Button variant="link" className="p-0 h-auto text-sm block">TEC-MS-001 - Method Statement - Concrete.pdf</Button>
                                            <Button variant="link" className="p-0 h-auto text-sm block">COM-RFI-012_Response.pdf</Button>
                                        </TabsContent>
                                        <TabsContent value="integrations">
                                            <div className="space-y-2">
                                                {knowledgeGraphIntegrations.map(item => (
                                                    <div key={item.id}>
                                                        <p className="text-xs font-semibold text-muted-foreground">{item.type} Integration</p>
                                                        <Button variant="link" className="p-0 h-auto text-sm flex items-center gap-1">
                                                            <LinkIcon className="h-3 w-3"/>
                                                            {item.name} ({item.id})
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="analytics">
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Usage Analytics</p>
                                                    <div className="grid grid-cols-4 gap-x-2 text-center mt-1">
                                                        <div className="font-medium">{usageAnalytics.views}<span className="text-xs text-muted-foreground block">Views</span></div>
                                                        <div className="font-medium">{usageAnalytics.uniqueViewers}<span className="text-xs text-muted-foreground block">Viewers</span></div>
                                                        <div className="font-medium">{usageAnalytics.comments}<span className="text-xs text-muted-foreground block">Comments</span></div>
                                                        <div className="font-medium">{usageAnalytics.shares}<span className="text-xs text-muted-foreground block">Shares</span></div>
                                                    </div>
                                                </div>
                                                 <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Content Analytics</p>
                                                    <div className="grid grid-cols-3 gap-x-2 text-center mt-1">
                                                        <div className="font-medium">{contentAnalytics.revisions}<span className="text-xs text-muted-foreground block">Revisions</span></div>
                                                        <div className="font-medium">{contentAnalytics.status}<span className="text-xs text-muted-foreground block">Status</span></div>
                                                        <div className="font-medium">{contentAnalytics.age}<span className="text-xs text-muted-foreground block">Age</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </CardContent>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                     <div className="flex-1 bg-muted rounded-md h-full overflow-auto">
                        {docPreviewImage && (
                            <Image src={docPreviewImage.imageUrl} alt="Document Preview" width={1000} height={1414} className="p-4" data-ai-hint={docPreviewImage.imageHint} />
                        )}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col h-full">
                    <Card className="flex-1 flex flex-col">
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Live Comments</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <div key={comment.id} className={cn("p-2 rounded-md", comment.status === 'Resolved' ? 'bg-green-500/10' : '')}>
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={comment.user.avatar} />
                                                <AvatarFallback>{comment.user.name.slice(0,2)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-semibold">{comment.user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                                </div>
                                                <div className="text-sm mt-1">{renderCommentWithMentions(comment.text)}</div>
                                            </div>
                                        </div>
                                         <div className="mt-2 flex items-center justify-between pl-11">
                                            <div className="flex items-center gap-2">
                                                {getCommentIcon(comment.type)}
                                                <span className="text-xs font-medium">{comment.type}</span>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => toggleCommentStatus(comment.id)}>
                                                {comment.status === 'Open' ? <CheckCircle className="mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                                                {comment.status === 'Open' ? 'Resolve' : 'Re-open'}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground pt-10">
                                    <MessageSquare className="mx-auto h-8 w-8" />
                                    <p className="mt-2 text-sm">No comments yet.</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-2 border-t">
                             <div className="relative w-full">
                                <Input 
                                    placeholder="Add a comment... Type @ to mention" 
                                    className="pr-10" 
                                    value={newComment} 
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                                />
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        {getCommentIcon(newCommentType)}
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuLabel>Comment Type</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuRadioGroup value={newCommentType} onValueChange={(v) => setNewCommentType(v as LiveComment['type'])}>
                                        <DropdownMenuRadioItem value="Comment">Comment</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Action Item">Action Item</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Question">Question</DropdownMenuRadioItem>
                                      </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSendComment}>
                                      <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
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

return (
    <div className="flex flex-1 flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/projects`}>
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
                         <DropdownMenuItem onSelect={() => handleSync('Procore')}>Procore</DropdownMenuItem>
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
                                                        <TableRow key={doc.id}>
                                                            <TableCell className="pl-12 font-medium flex items-center gap-2">
                                                                {getFileIcon(doc.type)}
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
                                                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                          <MoreVertical className="h-4 w-4" />
                                                                      </Button>
                                                                  </DropdownMenuTrigger>
                                                                  <DropdownMenuContent align="end">
                                                                      <DropdownMenuItem onSelect={() => { setSelectedDoc(doc); setIsReviewOpen(true); }}>Review</DropdownMenuItem>
                                                                      <DropdownMenuItem>Download</DropdownMenuItem>
                                                                      <DropdownMenuItem onSelect={() => { setSelectedDoc(doc); setIsHistoryOpen(true); }}>View History</DropdownMenuItem>
                                                                      <DropdownMenuSeparator />
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

        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
            <RealTimeReviewDialog doc={selectedDoc} />
        </Dialog>
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
            <HistoryDialog doc={selectedDoc} />
        </Dialog>
    </div>
);
}
