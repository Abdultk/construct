
'use client';

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
  RefreshCcw,
  CheckCircle,
  Eye,
  Archive,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Document = {
  id: string;
  name: string;
  type: 'Document' | 'CAD' | 'Report' | 'Archive' | 'Folder' | 'Permit' | 'Spreadsheet' | 'Minutes' | 'Standard' | 'Template' | string;
  size: string;
  lastModified: string;
  discipline: 'Architectural' | 'Structural' | 'MEP' | 'Civil' | 'Commercial' | 'General';
  status: 'Approved' | 'Under Review' | 'Draft' | 'Superseded';
  revision: string;
};

type DocumentCategory = {
  name: string;
  documents: Document[];
};

type DocumentStructure = {
  [key: string]: DocumentCategory[];
};

const initialDocumentStructure: DocumentStructure = {
  "Project Documentation": [
    { name: 'Contract Documents', documents: [{ id: 'CTR-001', name: 'Main Agreement.pdf', type: 'Document', size: '2.5 MB', lastModified: '2024-07-10', discipline: 'Commercial', status: 'Approved', revision: '2.1' }] },
    { name: 'Design Documents', documents: [{ id: 'ARC-DWG-001', name: 'Architectural_Plans_v3.dwg', type: 'CAD', size: '25.1 MB', lastModified: '2024-07-22', discipline: 'Architectural', status: 'Under Review', revision: '3.0' }] },
    { name: 'Technical Documents', documents: [{ id: 'TEC-MS-001', name: 'Method Statement - Concrete.pdf', type: 'Document', size: '1.1 MB', lastModified: '2024-07-15', discipline: 'Structural', status: 'Approved', revision: '1.0' }] },
    { name: 'Regulatory Documents', documents: [{ id: 'PER-BLD-001', name: 'Building Permit BP-2023.pdf', type: 'Permit', size: '800 KB', lastModified: '2024-06-01', discipline: 'General', status: 'Approved', revision: '1.0' }] },
    { name: 'Commercial Documents', documents: [{ id: 'COM-BOQ-001', name: 'BOQ_v1.2.xlsx', type: 'Spreadsheet', size: '3.4 MB', lastModified: '2024-07-05', discipline: 'Commercial', status: 'Superseded', revision: '1.2' }] },
    { name: 'Progress Documents', documents: [{ id: 'PRO-REP-001', name: 'Progress_Report_July.pdf', type: 'Report', size: '4.2 MB', lastModified: '2024-08-01', discipline: 'General', status: 'Approved', revision: '1.0' }] },
  ],
  "Reference Documentation": [
    { name: 'Standards & Codes', documents: [{ id: 'REF-STD-001', name: 'BS_EN_1991-1-1.pdf', type: 'Standard', size: '6.8 MB', lastModified: '2023-01-01', discipline: 'Structural', status: 'Approved', revision: '1.0' }] },
    { name: 'Procedures & Guidelines', documents: [{ id: 'REF-PRO-001', name: 'Safety_Manual_v3.pdf', type: 'Document', size: '1.9 MB', lastModified: '2023-05-20', discipline: 'General', status: 'Approved', revision: '3.0' }] },
    { name: 'Templates & Forms', documents: [{ id: 'REF-TPL-001', name: 'RFI_Template.docx', type: 'Template', size: '120 KB', lastModified: '2023-02-15', discipline: 'General', status: 'Approved', revision: '1.0' }] },
  ],
  "Communication Documentation": [
    { name: 'Correspondence', documents: [{ id: 'COR-MIN-001', name: 'Meeting_Minutes_2024-07-29.pdf', type: 'Minutes', size: '750 KB', lastModified: '2024-07-29', discipline: 'General', status: 'Approved', revision: '1.0' }] },
    { name: 'RFIs (Request for Information)', documents: [{ id: 'COM-RFI-012', name: 'RFI-012_Response.pdf', type: 'Document', size: '300 KB', lastModified: '2024-07-28', discipline: 'MEP', status: 'Approved', revision: '1.0' }] },
    { name: 'Submittals', documents: [{ id: 'COM-SUB-004', name: 'Submittal_HVAC-004.zip', type: 'Archive', size: '12.3 MB', lastModified: '2024-07-26', discipline: 'MEP', status: 'Under Review', revision: '1.0' }] },
  ]
};

export default function DocumentLibraryPage() {
  const params = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<DocumentStructure>(initialDocumentStructure);
  const [newFolderName, setNewFolderName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
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

  const getFileIcon = (docType: string) => {
    switch (docType) {
        case 'Folder': return <Folder className="h-5 w-5 text-muted-foreground" />;
        case 'CAD': return <FileText className="h-5 w-5 text-blue-500" />;
        case 'Report': return <FileText className="h-5 w-5 text-purple-500" />;
        case 'Permit': return <FileText className="h-5 w-5 text-green-500" />;
        case 'Spreadsheet': return <FileText className="h-5 w-5 text-green-700" />;
        default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Approved': return 'secondary';
        case 'Under Review': return 'default';
        case 'Draft': return 'outline';
        case 'Superseded': return 'destructive';
        default: return 'outline';
    }
  }

  const getStatusIcon = (status: string) => {
     switch(status) {
        case 'Approved': return <CheckCircle className="mr-2 h-4 w-4 text-green-500" />;
        case 'Under Review': return <Eye className="mr-2 h-4 w-4 text-yellow-500" />;
        case 'Draft': return <FileText className="mr-2 h-4 w-4 text-blue-500" />;
        case 'Superseded': return <Archive className="mr-2 h-4 w-4 text-red-500" />;
        default: return null;
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${params.id}`}>
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
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
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
                                    <TableHead className="hidden xl:table-cell">Discipline</TableHead>
                                    <TableHead className="hidden md:table-cell">Last Modified</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {subCategories.map((category) => (
                                   <tr key={category.name} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-semibold flex items-center gap-2 bg-muted/50">
                                        <Folder className="h-5 w-5 text-primary" />
                                        <span>{category.name}</span>
                                    </td>
                                    <td className="p-4 align-middle hidden sm:table-cell bg-muted/50"><Badge variant="outline">Folder</Badge></td>
                                    <td colSpan={4} className="p-4 align-middle hidden sm:table-cell bg-muted/50"></td>
                                   </tr>
                                    
                                    {category.documents.map((doc) => (
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
                                            <TableCell className="hidden xl:table-cell">{doc.discipline}</TableCell>
                                            <TableCell className="hidden md:table-cell">{doc.lastModified}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Rename</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                    Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
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
    </div>
  );
}
