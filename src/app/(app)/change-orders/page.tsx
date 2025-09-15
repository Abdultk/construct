
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FilePlus, Filter, MoreHorizontal, ArrowUpDown, Clock, Hourglass, CheckCircle } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ChangeOrdersPage() {

    const changeOrders = [
        { id: 'CR-0011', title: 'Relocate HVAC unit on roof', status: 'Approved', project: 'Downtown Skyscraper', impact: '+$5,000', date: '2024-07-28', priority: 'Medium', requester: 'A. Johnson'},
        { id: 'CR-0010', title: 'Substitute flooring material in lobby', status: 'Pending Review', project: 'Downtown Skyscraper', impact: '+$12,500', date: '2024-07-25', priority: 'High', requester: 'B. Miller'},
        { id: 'CR-0009', title: 'Additional electrical outlets in offices', status: 'Rejected', project: 'City General Hospital Wing', impact: '+$8,200', date: '2024-07-22', priority: 'Low', requester: 'C. Davis'},
        { id: 'CR-0008', title: 'Change of paint color in corridors', status: 'Approved', project: 'Suburban Housing Development', impact: '-$2,000', date: '2024-07-20', priority: 'Low', requester: 'A. Johnson'},
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
        case 'Approved':
            return 'secondary';
        case 'Pending Review':
            return 'outline';
        default:
            return 'destructive';
        }
    };
    
    const getPriorityBadge = (priority: string) => {
        switch (priority) {
          case 'High': return 'destructive';
          case 'Medium': return 'default';
          default: return 'outline';
        }
    }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold font-headline">Change Review Dashboard</h1>
            <p className="text-muted-foreground">Review, approve, and track all change orders.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            <Button asChild>
                <Link href="/change-orders/new">
                    <FilePlus className="mr-2 h-4 w-4" />
                    New Change Request
                </Link>
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Hourglass className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Awaiting your approval</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Approval Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2.5 Days</div>
                <p className="text-xs text-muted-foreground">In the last 30 days</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Recently Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">In the last 7 days</p>
            </CardContent>
          </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Change Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Chart Coming Soon.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Comments & Discussion</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Coming Soon.</p>
            </CardContent>
        </Card>
      </div>
      
      <Card>
      <CardHeader>
        <CardTitle>Change Order Log</CardTitle>
        <CardDescription>
            A filterable and sortable log of all change orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Project</TableHead>
              <TableHead><div className="flex items-center">Status <ArrowUpDown className="ml-2 h-4 w-4" /></div></TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead className="text-right">Cost Impact</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {changeOrders.map((co) => (
              <TableRow key={co.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium font-code">{co.id}</TableCell>
                <TableCell>{co.title}</TableCell>
                <TableCell className="hidden md:table-cell">{co.project}</TableCell>
                <TableCell>
                     <Badge variant={getStatusBadge(co.status)}>
                        {co.status}
                    </Badge>
                </TableCell>
                 <TableCell>
                     <Badge variant={getPriorityBadge(co.priority)}>
                        {co.priority}
                    </Badge>
                </TableCell>
                 <TableCell className="hidden md:table-cell">{co.requester}</TableCell>
                <TableCell className={`text-right font-code ${co.impact.startsWith('+') ? 'text-destructive' : 'text-green-600'}`}>{co.impact}</TableCell>
                 <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                             <DropdownMenuItem>Reject</DropdownMenuItem>
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
  )
}
