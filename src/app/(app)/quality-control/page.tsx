
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search, ListChecks, Bug, BarChart, HardHat, ShieldCheck, Percent, MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function QualityControlPage() {
  
  const defects = [
    { id: 'NCF-001', area: 'Floor 3 - Plumbing', description: 'Leaking pipe joint at column C4.', severity: 'High', status: 'Open', assignee: { name: 'Bob Miller', avatar: 'https://picsum.photos/seed/11/100/100'}, dueDate: '2024-08-05'},
    { id: 'NCF-002', area: 'Facade - Panel 7B', description: 'Incorrect panel alignment.', severity: 'Medium', status: 'In Progress', assignee: { name: 'D. Green', avatar: 'https://picsum.photos/seed/13/100/100'}, dueDate: '2024-08-10'},
    { id: 'NCF-003', area: 'Lobby - Drywall', description: 'Minor surface scratches near entrance.', severity: 'Low', status: 'Resolved', assignee: { name: 'C. Davis', avatar: 'https://picsum.photos/seed/12/100/100'}, dueDate: '2024-07-30'},
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Open': return 'destructive';
      case 'In Progress': return 'outline';
      case 'Resolved': return 'secondary';
      default: return 'outline';
    }
  };


  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">
            Quality Management
          </h1>
          <p className="text-muted-foreground">
            Manage inspections, defects, and quality metrics for Downtown Skyscraper.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Inspection
          </Button>
        </div>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Pass Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Non-Conformances</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 High, 3 Medium</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Inspections</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Structural steel weld check</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Compliance</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">On all recent site audits</p>
          </CardContent>
        </Card>
      </div>

      {/* Defect Registry */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
                <CardTitle>Defect Registry (Punch List)</CardTitle>
                <CardDescription>
                Track and manage all identified defects and issues.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search defects..." className="pl-8" />
                </div>
                <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"><Checkbox /></TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                   <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {defects.map((defect) => (
                  <TableRow key={defect.id}>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-medium font-code">{defect.id}</TableCell>
                    <TableCell>
                      <p className="font-semibold">{defect.description}</p>
                      <p className="text-xs text-muted-foreground">{defect.area}</p>
                    </TableCell>
                    <TableCell><Badge variant={getSeverityBadge(defect.severity)}>{defect.severity}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusBadge(defect.status)}>{defect.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarImage src={defect.assignee.avatar} />
                            <AvatarFallback>{defect.assignee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{defect.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{defect.dueDate}</TableCell>
                    <TableCell>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign Corrective Action</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
      
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Checklists & Standards</CardTitle>
                    <CardDescription>Manage quality standards and inspection templates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start"><ListChecks className="mr-2 h-4 w-4" /> Concrete Pour Checklist</Button>
                    <Button variant="outline" className="w-full justify-start"><ListChecks className="mr-2 h-4 w-4" /> Electrical Rough-in Checklist</Button>
                     <Button variant="secondary" className="w-full justify-start"><Plus className="mr-2 h-4 w-4" /> Create New Checklist</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Reporting & Analytics</CardTitle>
                    <CardDescription>Visualize trends and generate reports.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Quality analytics charts coming soon.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
