
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
import { ArrowLeft, File, FileText, Filter, MoreVertical, Plus, Search, Upload } from 'lucide-react';
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

const documents = [
  {
    name: 'Project Charter.pdf',
    type: 'Document',
    size: '1.2 MB',
    lastModified: '2024-07-15',
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
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Folder
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
                    <FileText className="h-4 w-4 text-muted-foreground" />
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
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
