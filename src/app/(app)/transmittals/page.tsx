
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
import { Send, Filter, MoreHorizontal, ArrowUpDown, Clock, CheckCircle, Search, ChevronDown, Archive, XCircle, MessageSquare, AlertCircle, Percent, Hourglass, BarChart as BarChartIcon } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

type Transmittal = {
  id: string;
  subject: string;
  to: string;
  from: string;
  date: string;
  status: 'Draft' | 'Sent' | 'Overdue' | 'Responded';
  response: 'Pending' | 'Approved' | 'Approved with Comments' | 'Rejected';
};

const initialTransmittals: Transmittal[] = [
    { id: 'TRN-0023', subject: 'For Review: Updated Lobby Renderings', to: 'Client ABC Corp.', from: 'B. Miller', date: '2024-08-01', status: 'Sent', response: 'Pending' },
    { id: 'TRN-0022', subject: 'For Approval: Structural Calculations - Phase 3', to: 'Structural Engineer', from: 'A. Johnson', date: '2024-07-28', status: 'Overdue', response: 'Pending' },
    { id: 'TRN-0021', subject: 'Response: Approved - RFI-012', to: 'A. Johnson', from: 'MEP Consultant', date: '2024-07-27', status: 'Responded', response: 'Approved' },
    { id: 'TRN-0020', subject: 'Response: Revise & Resubmit - Electrical Plans', to: 'A. Johnson', from: 'Lead Architect', date: '2024-07-26', status: 'Responded', response: 'Rejected' },
];

export default function TransmittalsPage() {
    const [transmittals, setTransmittals] = React.useState<Transmittal[]>(initialTransmittals);
    const [searchTerm, setSearchTerm] = React.useState('');

    const getStatusBadge = (status: string) => {
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
                return { icon: CheckCircle, variant: 'secondary' as const };
            case 'Approved with Comments':
                return { icon: MessageSquare, variant: 'secondary' as const };
            case 'Rejected':
                return { icon: XCircle, variant: 'destructive' as const };
            default:
                return { icon: Clock, variant: 'outline' as const };
        }
    }
    
    const pipelineData = React.useMemo(() => {
        const statuses = ['Draft', 'Sent', 'Overdue', 'Responded'];
        return statuses.map(status => ({
            status,
            count: transmittals.filter(t => t.status === status).length,
        }));
    }, [transmittals]);

    const chartConfig = {
      count: {
        label: "Count",
      },
      Sent: {
        color: "hsl(var(--primary))",
      },
      Overdue: {
        color: "hsl(var(--destructive))",
      },
      Responded: {
        color: "hsl(var(--secondary))",
      },
       Draft: {
        color: "hsl(var(--muted-foreground))",
      },
    }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold font-headline">Document Transmittals</h1>
            <p className="text-muted-foreground">Track all formal document submissions and responses.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild>
                <Link href="/transmittals/new">
                    <Send className="mr-2 h-4 w-4" />
                    New Transmittal
                </Link>
            </Button>
        </div>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Responses</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting action from recipients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground">Past response due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="text-xs text-muted-foreground">Of all responded items</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5 Days</div>
            <p className="text-xs text-muted-foreground">For last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
      <CardHeader>
        <CardTitle>Transmittal Log</CardTitle>
        <div className="flex items-center justify-between">
            <CardDescription>
                A history of all document transmittals for the project.
            </CardDescription>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transmittals..." className="pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>To</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Response</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transmittals.map((t) => {
              const ResponseIcon = getResponseBadge(t.response).icon;
              const responseVariant = getResponseBadge(t.response).variant;
              return(
                <TableRow key={t.id}>
                    <TableCell className="font-medium font-code">{t.id}</TableCell>
                    <TableCell>{t.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">{t.to}</TableCell>
                    <TableCell className="hidden md:table-cell">{t.from}</TableCell>
                    <TableCell className="hidden sm:table-cell">{t.date}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusBadge(t.status)}>
                            {t.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <Badge variant={responseVariant} className="gap-1">
                            <ResponseIcon className="h-3 w-3" />
                            {t.response}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Download Attachments</DropdownMenuItem>
                                {t.status === 'Overdue' && <DropdownMenuItem>Send Reminder</DropdownMenuItem>}
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
    </div>
  )
}
