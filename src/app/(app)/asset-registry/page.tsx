
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Search,
  Filter,
  Download,
  Plus,
  Wrench,
  FileText,
  MoreVertical,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function AssetRegistryPage() {
  const assets = [
    {
      id: 'AHU-01',
      name: 'Air Handling Unit',
      category: 'HVAC',
      location: 'Roof',
      status: 'Operational',
      nextMaintenance: '2024-09-15',
    },
    {
      id: 'PMP-03',
      name: 'Water Pump',
      category: 'Plumbing',
      location: 'Basement',
      status: 'Needs Repair',
      nextMaintenance: '2024-08-01',
    },
    {
      id: 'ELEV-02',
      name: 'Elevator',
      category: 'Mechanical',
      location: 'Core',
      status: 'Operational',
      nextMaintenance: '2024-10-01',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Operational':
        return 'secondary';
      case 'Needs Repair':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Asset Registry</h1>
          <p className="text-muted-foreground">
            Manage all facility assets for Downtown Skyscraper.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Grid */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card>
            <CardContent className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search assets..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter by Category
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex-1 overflow-auto rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id} className="cursor-pointer">
                    <TableCell className="font-medium font-code">
                      {asset.id}
                    </TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{asset.nextMaintenance}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Details Panel */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
              <CardDescription>Select an asset to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select an asset to see comprehensive information, maintenance history, performance metrics, and cost tracking.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start"><Wrench className="mr-2 h-4 w-4" /> Schedule Maintenance</Button>
                <Button variant="outline" className="w-full justify-start"><FileText className="mr-2 h-4 w-4" /> Generate Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
