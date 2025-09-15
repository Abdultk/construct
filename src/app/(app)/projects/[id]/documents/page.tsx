
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
  ArrowLeft,
  FileText,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Upload,
  Folder,
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
  isFolder?: boolean;
};


const initialDocuments: Document[] = [
  {
    name: 'Project Charter.pdf',
    type: 'Document',
    size: '1.2 MB',
    lastModified: '2024-07-15',
  },
  {
    name: 'Architectural Plans',
    type: 'Folder',
    size: '3 items',
    lastModified: '2024-07-28',
    isFolder: true,
  },
  {
    name: 'Architectural_Plans_v2.dwg',
    type: 'CAD',
    size: '15.8 MB',
    lastModified: '2024-07-20',
  },
  {
    name: 'Geotechnical_Report.pdf',
    type: 'Report',
    size: '5.4 MB',
    lastModified: '2024-06-30',
  },
  {
    name: 'Meeting_Minutes_2024-07-22.docx',
    type: 'Document',
    size: '850 KB',
    lastModified: '2024-07-22',
  },
  {
    name: 'Site_Photos_Week10.zip',
    type: 'Archive',
    size: '25.1 MB',
    lastModified: '2024-07-25',
  },
];

export default function DocumentLibraryPage() {
  const params = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [newFolderName, setNewFolderName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        type: file.type || 'Document',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: format(new Date(file.lastModified), 'yyyy-MM-dd'),
      }));
      setDocuments((prev) => [...prev, ...newFiles]);
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
      const newFolder: Document = {
        name: newFolderName,
        type: 'Folder',
        size: '0 items',
        lastModified: format(new Date(), 'yyyy-MM-dd'),
        isFolder: true,
      };
      setDocuments((prev) => [newFolder, ...prev]);
      toast({
        title: 'Folder Created',
        description: `Folder "${newFolderName}" has been created.`,
      });
      setNewFolderName('');
    }
  };

  const getFileIcon = (doc: Document) => {
    if (doc.isFolder) {
      return <Folder className="h-4 w-4 text-muted-foreground" />;
    }
    return <FileText className="h-4 w-4 text-muted-foreground" />;
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {getFileIcon(doc)}
                    <span>{doc.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.lastModified}</TableCell>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
