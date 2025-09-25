
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
import { format } from 'date-fns';

type Document = {
  name: string;
  type: 'Document' | 'CAD' | 'Report' | 'Archive' | 'Folder' | string;
  size: string;
  lastModified: string;
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
    { name: 'Contract Documents', documents: [{ name: 'Main Agreement.pdf', type: 'Document', size: '2.5 MB', lastModified: '2024-07-10' }] },
    { name: 'Design Documents', documents: [{ name: 'Architectural_Plans_v3.dwg', type: 'CAD', size: '25.1 MB', lastModified: '2024-07-22' }] },
    { name: 'Technical Documents', documents: [{ name: 'Method Statement - Concrete.pdf', type: 'Document', size: '1.1 MB', lastModified: '2024-07-15' }] },
    { name: 'Regulatory Documents', documents: [{ name: 'Building Permit BP-2023.pdf', type: 'Permit', size: '800 KB', lastModified: '2024-06-01' }] },
    { name: 'Commercial Documents', documents: [{ name: 'BOQ_v1.2.xlsx', type: 'Spreadsheet', size: '3.4 MB', lastModified: '2024-07-05' }] },
    { name: 'Progress Documents', documents: [{ name: 'Progress_Report_July.pdf', type: 'Report', size: '4.2 MB', lastModified: '2024-08-01' }] },
  ],
  "Reference Documentation": [
    { name: 'Standards & Codes', documents: [{ name: 'BS_EN_1991-1-1.pdf', type: 'Standard', size: '6.8 MB', lastModified: '2023-01-01' }] },
    { name: 'Procedures & Guidelines', documents: [{ name: 'Safety_Manual_v3.pdf', type: 'Document', size: '1.9 MB', lastModified: '2023-05-20' }] },
    { name: 'Templates & Forms', documents: [{ name: 'RFI_Template.docx', type: 'Template', size: '120 KB', lastModified: '2023-02-15' }] },
  ],
  "Communication Documentation": [
    { name: 'Correspondence', documents: [{ name: 'Meeting_Minutes_2024-07-29.pdf', type: 'Minutes', size: '750 KB', lastModified: '2024-07-29' }] },
    { name: 'RFIs (Request for Information)', documents: [{ name: 'RFI-012_Response.pdf', type: 'Document', size: '300 KB', lastModified: '2024-07-28' }] },
    { name: 'Submittals', documents: [{ name: 'Submittal_HVAC-004.zip', type: 'Archive', size: '12.3 MB', lastModified: '2024-07-26' }] },
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
                                    <TableHead className="hidden md:table-cell">Size</TableHead>
                                    <TableHead className="hidden md:table-cell">Last Modified</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {subCategories.map((category) => (
                                   <React.Fragment key={category.name}>
                                    <TableRow className="bg-muted/50 hover:bg-muted/80">
                                        <TableCell className="font-semibold flex items-center gap-2">
                                            <Folder className="h-5 w-5 text-primary" />
                                            <span>{category.name}</span>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell"><Badge variant="outline">Folder</Badge></TableCell>
                                        <TableCell colSpan={3} className="hidden sm:table-cell"></TableCell>
                                    </TableRow>
                                    {category.documents.map((doc) => (
                                         <TableRow key={doc.name}>
                                            <TableCell className="pl-12 font-medium flex items-center gap-2">
                                                {getFileIcon(doc.type)}
                                                <span>{doc.name}</span>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell"><Badge variant="outline">{doc.type}</Badge></TableCell>
                                            <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
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
    </div>
  );
}

