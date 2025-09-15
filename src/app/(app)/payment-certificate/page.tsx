
'use client';

import {
  FileText,
  Printer,
  Share2,
  Download,
  Mail,
  MessageSquare,
  CheckCircle,
  Clock,
  MoreVertical,
  Paperclip,
  ArrowLeft,
  FileCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function PaymentCertificatePage() {

    const lineItems = [
        { wbs: '3.1.1', description: 'Excavation', completed: '100%', amount: 60000 },
        { wbs: '3.1.2', description: 'Formwork', completed: '80%', amount: 120000 },
        { wbs: '3.1.3', description: 'Rebar Installation', completed: '60%', amount: 90000 },
    ];

    const totalAmount = lineItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
       {/* Header */}
       <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
                <h1 className="text-2xl font-bold font-headline">
                    Payment Certificate
                </h1>
                <p className="text-muted-foreground">
                    Project: Downtown Skyscraper
                </p>
            </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
           <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
           <Button variant="secondary"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Document */}
        <div className="col-span-9 overflow-y-auto">
            <Card className='p-8'>
                <CardHeader className="p-0 grid grid-cols-2">
                    <div>
                        <h2 className="font-bold text-3xl font-headline">Payment Certificate #003</h2>
                        <p className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">ConstructAI Corp.</p>
                        <p className="text-sm text-muted-foreground">123 Innovation Drive, Tech City</p>
                    </div>
                </CardHeader>

                <Separator className="my-6" />

                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">To:</p>
                        <p className="font-semibold">Client Name Inc.</p>
                        <p>456 Business Ave.</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Project:</p>
                        <p className="font-semibold">Downtown Skyscraper</p>
                        <p>Contract #CTR-2023-001</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Status:</p>
                        <Badge variant="secondary"><CheckCircle className='mr-2 h-4 w-4' />Approved</Badge>
                    </div>
                </div>

                <Card className="my-6">
                    <CardHeader>
                        <CardTitle className='text-xl'>Progress Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableRow>
                                <TableHead>Work Completed to Date</TableHead>
                                <TableCell className="text-right font-code">$2,700,000.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableHead>Previously Certified</TableHead>
                                <TableCell className="text-right font-code">$2,430,000.00</TableCell>
                            </TableRow>
                             <TableRow className='bg-muted'>
                                <TableHead className='font-bold'>This Certification</TableHead>
                                <TableCell className="text-right font-bold font-code">$270,000.00</TableCell>
                            </TableRow>
                        </Table>
                    </CardContent>
                </Card>

                <CardTitle className='text-xl mb-4'>Line Item Details</CardTitle>
                <div className="overflow-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">WBS</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>% Completed</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lineItems.map(item => (
                                <TableRow key={item.wbs}>
                                    <TableCell className='font-code'>{item.wbs}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.completed}</TableCell>
                                    <TableCell className="text-right font-code">${item.amount.toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                                <TableCell className="text-right font-bold font-code">${totalAmount.toLocaleString()}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                 <Card className="my-6">
                    <CardHeader>
                        <CardTitle className='text-xl'>Adjustments</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableRow>
                                <TableHead>Variations</TableHead>
                                <TableCell className="text-right font-code">$0.00</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableHead>Retention (10%)</TableHead>
                                <TableCell className="text-right font-code text-destructive">-${(totalAmount * 0.1).toLocaleString()}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableHead>Tax (5%)</TableHead>
                                <TableCell className="text-right font-code">${(totalAmount * 0.9 * 0.05).toLocaleString()}</TableCell>
                            </TableRow>
                        </Table>
                    </CardContent>
                     <CardFooter className="bg-muted p-4 rounded-b-lg">
                        <div className="flex justify-between w-full">
                            <span className="font-bold text-lg">Total for this Certificate</span>
                            <span className="font-bold text-lg font-code">${(totalAmount * 0.9 * 1.05).toLocaleString()}</span>
                        </div>
                    </CardFooter>
                </Card>

            </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-3 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Approval Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className='flex gap-4'>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                            <p className="font-semibold">Foreman</p>
                            <p className="text-muted-foreground">Approved by J. Smith</p>
                        </div>
                    </div>
                     <div className='flex gap-4'>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                            <p className="font-semibold">Project Manager</p>
                            <p className="text-muted-foreground">Approved by A. Johnson</p>
                        </div>
                    </div>
                     <div className='flex gap-4'>
                        <Clock className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                            <p className="font-semibold">Client</p>
                            <p className="text-muted-foreground">Pending Approval</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Add a comment..." />
                    <Button className='mt-2 w-full'>Submit Comment</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Distribution</CardTitle>
                </CardHeader>
                <CardContent className='flex gap-2'>
                   <Button variant="outline" size="icon"><Mail /></Button>
                   <Button variant="outline" size="icon"><MessageSquare /></Button>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
