
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
import { FilePlus, Filter, MoreHorizontal, ArrowUpDown, Clock, Hourglass, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

type ChangeOrder = {
  id: string;
  title: string;
  status: 'Approved' | 'Pending Review' | 'Rejected';
  project: string;
  impact: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  requester: string;
};

type Comment = {
  id: string;
  user: { name: string; avatar: string; fallback: string };
  text: string;
  timestamp: string;
};

type CommentsByChangeOrder = {
  [key: string]: Comment[];
};

export default function ChangeOrdersPage() {

    const changeOrders: ChangeOrder[] = [
        { id: 'CR-0011', title: 'Relocate HVAC unit on roof', status: 'Approved', project: 'Downtown Skyscraper', impact: '+$5,000', date: '2024-07-28', priority: 'Medium', requester: 'A. Johnson'},
        { id: 'CR-0010', title: 'Substitute flooring material in lobby', status: 'Pending Review', project: 'Downtown Skyscraper', impact: '+$12,500', date: '2024-07-25', priority: 'High', requester: 'B. Miller'},
        { id: 'CR-0009', title: 'Additional electrical outlets in offices', status: 'Rejected', project: 'City General Hospital Wing', impact: '+$8,200', date: '2024-07-22', priority: 'Low', requester: 'C. Davis'},
        { id: 'CR-0008', title: 'Change of paint color in corridors', status: 'Approved', project: 'Suburban Housing Development', impact: '-$2,000', date: '2024-07-20', priority: 'Low', requester: 'A. Johnson'},
    ];

    const commentsData: CommentsByChangeOrder = {
        'CR-0010': [
            { id: 'comment-1', user: { name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/10/100/100', fallback: 'AJ' }, text: 'Can we get a cost breakdown for this new material? The impact seems high.', timestamp: '3h ago' },
            { id: 'comment-2', user: { name: 'Bob Miller', avatar: 'https://picsum.photos/seed/11/100/100', fallback: 'BM' }, text: 'Attached. The supplier has a minimum order quantity which is driving up the price.', timestamp: '2h ago' },
        ],
        'CR-0011': [
            { id: 'comment-3', user: { name: 'Charlie Davis', avatar: 'https://picsum.photos/seed/12/100/100', fallback: 'CD' }, text: 'Structural has signed off on the new location. We are good to go.', timestamp: '1d ago' },
        ]
    };
    
    const [selectedChangeOrder, setSelectedChangeOrder] = React.useState<ChangeOrder | null>(null);
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [newComment, setNewComment] = React.useState('');

    const handleRowClick = (co: ChangeOrder) => {
        setSelectedChangeOrder(co);
        setComments(commentsData[co.id] || []);
    };
    
    const handleAddComment = () => {
        if (newComment.trim() === '' || !selectedChangeOrder) return;
        const newCommentObj: Comment = {
            id: `comment-${Date.now()}`,
            user: { name: 'Jane Doe', avatar: 'https://picsum.photos/seed/2/100/100', fallback: 'JD' },
            text: newComment,
            timestamp: 'Just now'
        };
        setComments(prev => [...prev, newCommentObj]);
        setNewComment('');
    };


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

    const pipelineData = React.useMemo(() => {
        const statuses = ['Pending Review', 'Approved', 'Rejected'];
        return statuses.map(status => ({
            status,
            count: changeOrders.filter(co => co.status === status).length,
        }));
    }, [changeOrders]);

    const chartConfig = {
      count: {
        label: "Count",
      },
      "Pending Review": {
        label: "Pending",
        color: "hsl(var(--chart-4))",
      },
      Approved: {
        label: "Approved",
        color: "hsl(var(--chart-2))",
      },
      Rejected: {
        label: "Rejected",
        color: "hsl(var(--chart-1))",
      },
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
                 <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart data={pipelineData} accessibilityLayer>
                         <CartesianGrid vertical={false} />
                         <XAxis
                            dataKey="status"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                         />
                         <YAxis allowDecimals={false}/>
                         <ChartTooltip content={<ChartTooltipContent />} />
                         <Bar dataKey="count" radius={4}>
                            {pipelineData.map((d) => (
                                <div key={d.status} />
                            ))}
                         </Bar>
                    </BarChart>
                 </ChartContainer>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Comments & Discussion</CardTitle>
                 <CardDescription>
                    {selectedChangeOrder ? `Comments for ${selectedChangeOrder.id}` : 'Select a change order to view comments'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-4 h-32 overflow-y-auto pr-2">
                    {selectedChangeOrder ? (
                        comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={comment.user.avatar} />
                                        <AvatarFallback>{comment.user.fallback}</AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg bg-muted p-2 w-full">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-xs">{comment.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                                        </div>
                                        <p className="text-sm">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : <p className="text-sm text-muted-foreground text-center pt-8">No comments for this item.</p>
                    ) : <p className="text-sm text-muted-foreground text-center pt-8">Select a change order to begin discussion.</p>}
                 </div>
                 <div className="relative">
                    <Input 
                        placeholder="Type a comment..." 
                        className="pr-10" 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        disabled={!selectedChangeOrder}
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute inset-y-0 right-0 h-full w-10"
                        onClick={handleAddComment}
                        disabled={!selectedChangeOrder || newComment.trim() === ''}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
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
              <TableRow 
                key={co.id} 
                className={`cursor-pointer hover:bg-muted/50 ${selectedChangeOrder?.id === co.id ? 'bg-muted' : ''}`}
                onClick={() => handleRowClick(co)}
              >
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
