
'use client';

import {
  Filter,
  Search,
  Plus,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  GitMerge,
  ChevronRight,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function WbsHierarchyPage() {
  const wbsItems = [
    { id: '1', name: 'Project Initiation', children: [{ id: '1.1', name: 'Feasibility Study' }, { id: '1.2', name: 'Project Charter' }] },
    { id: '2', name: 'Design & Planning', children: [{ id: '2.1', name: 'Schematic Design' }, { id: '2.2', name: 'Permit Application' }] },
    { id: '3', name: 'Construction', children: [{ id: '3.1', name: 'Foundation', isCritical: true }, { id: '3.2', name: 'Superstructure' }] },
    { id: '4', name: 'Project Closeout' }
  ];

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Work Breakdown Structure (WBS)</h1>
          <p className="text-muted-foreground">Project: Downtown Skyscraper</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><Plus className="mr-2 h-4 w-4" /> Add Work Package</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Left Panel: Tree View */}
        <div className="col-span-3 flex flex-col gap-4">
          <Card className='h-full overflow-y-auto'>
             <CardHeader>
                <CardTitle>WBS Hierarchy</CardTitle>
                 <div className="relative pt-2">
                  <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search packages..." className="pl-8 h-9" />
                </div>
                 <div className='flex items-center gap-2 pt-2'>
                    <Button variant="outline" size="sm"><ArrowUpWideNarrow className='mr-2 h-4 w-4' /> Expand</Button>
                    <Button variant="outline" size="sm"><ArrowDownWideNarrow className='mr-2 h-4 w-4' /> Collapse</Button>
                 </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {wbsItems.map(item => (
                  <div key={item.id}>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                        <ChevronRight className="h-4 w-4 shrink-0" />
                        <Package className="h-4 w-4" />
                        <span className={`font-medium text-sm ${item.children ? '' : 'font-normal'}`}>{item.name}</span>
                    </div>
                     {item.children && (
                        <div className="pl-6 border-l-2 ml-3">
                        {item.children.map(child => (
                             <div key={child.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span className={`text-sm ${child.isCritical ? 'text-destructive' : ''}`}>{child.name}</span>
                            </div>
                        ))}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Panel: Details */}
        <div className="col-span-6 flex flex-col gap-4">
           <Card>
            <CardHeader>
                <CardTitle>Work Package Details: Foundation (3.1)</CardTitle>
                <CardDescription>Detailed information for the selected work package.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='grid grid-cols-2 gap-4'>
                    <Card>
                        <CardHeader><CardTitle className='text-base'>Resource Requirements</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">Coming Soon</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className='text-base'>Progress Tracking</CardTitle></CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">Coming Soon</p></CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className='text-base'>Dependencies</CardTitle>
                        <Button variant="outline" size="sm"><GitMerge className="mr-2 h-4 w-4" /> Visualize</Button>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>WBS Code</TableHead>
                                <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                <TableCell><Badge variant="outline">Predecessor</Badge></TableCell>
                                <TableCell className='font-code'>2.2</TableCell>
                                <TableCell>Permit Application</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell><Badge variant="outline">Successor</Badge></TableCell>
                                <TableCell className='font-code'>3.2</TableCell>
                                <TableCell>Superstructure</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </CardContent>
           </Card>
        </div>

        {/* Properties Panel */}
        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Edit work package properties here. Form coming soon.
                </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Material Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

