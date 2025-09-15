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
import { FilePlus, Filter } from "lucide-react"
import Link from "next/link"

export default function ChangeOrdersPage() {

    const changeOrders = [
        { id: 'CR-0011', title: 'Relocate HVAC unit on roof', status: 'Approved', project: 'Downtown Skyscraper', impact: '+$5,000', date: '2024-07-28'},
        { id: 'CR-0010', title: 'Substitute flooring material in lobby', status: 'Pending Review', project: 'Downtown Skyscraper', impact: '+$12,500', date: '2024-07-25'},
        { id: 'CR-0009', title: 'Additional electrical outlets in offices', status: 'Rejected', project: 'City General Hospital Wing', impact: '+$8,200', date: '2024-07-22'},
        { id: 'CR-0008', title: 'Change of paint color in corridors', status: 'Approved', project: 'Suburban Housing Development', impact: '-$2,000', date: '2024-07-20'},
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


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Change Orders</CardTitle>
            <CardDescription>
                A log of all change orders across your projects.
            </CardDescription>
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Cost Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {changeOrders.map((co) => (
              <TableRow key={co.id}>
                <TableCell className="font-medium font-code">{co.id}</TableCell>
                <TableCell>{co.title}</TableCell>
                <TableCell className="hidden md:table-cell">{co.project}</TableCell>
                <TableCell>
                     <Badge variant={getStatusBadge(co.status)}>
                        {co.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{co.date}</TableCell>
                <TableCell className={`text-right font-code ${co.impact.startsWith('+') ? 'text-destructive' : 'text-green-600'}`}>{co.impact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
