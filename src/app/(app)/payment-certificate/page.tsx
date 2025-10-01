

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
  FileCheck,
  ThumbsUp,
  ThumbsDown,
  Send,
  Loader2,
  Eye,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PaymentCertificatePage() {

    const { toast } = useToast();
    const [currentDate, setCurrentDate] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setCurrentDate(new Date().toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));
    }, []);

    const lineItems = [
        { wbs: '3.1.1', description: 'Excavation', completed: '100%', amount: 60000 },
        { wbs: '3.1.2', description: 'Formwork', completed: '80%', amount: 120000 },
        { wbs: '3.1.3', description: 'Rebar Installation', completed: '60%', amount: 90000 },
    ];

    const totalAmount = lineItems.reduce((acc, item) => acc + item.amount, 0);

    const handlePrint = () => {
        window.print();
    }

    const handleDownloadPdf = async () => {
        const certificateElement = document.getElementById('payment-certificate');
        if (!certificateElement) return;

        setIsDownloading(true);

        try {
            const canvas = await html2canvas(certificateElement, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                backgroundColor: null,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width, canvas.height]
            });
            
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
            pdf.save(`Payment_Certificate_003_${new Date().toISOString().split('T')[0]}.pdf`);

            toast({
                title: 'Download Successful',
                description: 'The payment certificate has been downloaded as a PDF.',
            });

        } catch (error) {
            console.error('Error generating PDF:', error);
            toast({
                variant: 'destructive',
                title: 'Download Failed',
                description: 'Could not generate the PDF at this time.',
            });
        } finally {
            setIsDownloading(false);
        }
    }

    const handleShare = async () => {
        const shareData = {
            title: 'Payment Certificate #003',
            text: 'Please review Payment Certificate #003 for the Downtown Skyscraper project.',
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
                toast({
                    title: 'Shared Successfully',
                    description: 'The payment certificate has been shared.',
                });
            } else {
                 await navigator.clipboard.writeText(window.location.href);
                toast({
                    title: 'Link Copied',
                    description: 'The link to the payment certificate has been copied to your clipboard.',
                });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            toast({
                variant: 'destructive',
                title: 'Sharing Failed',
                description: 'Could not share the certificate at this time.',
            });
        }
    };

  const formatNumber = (num: number) => {
    if (typeof num !== 'number') return num;
    if (isClient) {
      return num.toLocaleString();
    }
    return String(num);
  };

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
                    Payment Certificate #003
                </h1>
                <p className="text-muted-foreground">
                    Project: Downtown Skyscraper - Due: July 30, 2024
                </p>
            </div>
             <Badge variant="destructive">High Priority</Badge>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
           <Button variant="outline" onClick={handleDownloadPdf} disabled={isDownloading}>
                {isDownloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Download className="mr-2 h-4 w-4" />
                )}
                Download PDF
            </Button>
           <Button variant="secondary" onClick={handleShare}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Main Document */}
        <div className="col-span-8 overflow-y-auto pr-4">
            <Card className='p-8' id="payment-certificate">
                <CardHeader className="p-0 grid grid-cols-2">
                    <div>
                        <h2 className="font-bold text-3xl font-headline">Payment Certificate #003</h2>
                        <p className="text-muted-foreground">Date: {currentDate}</p>
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
                        <p className="font-semibold">Client ABC Corp.</p>
                        <p>456 Business Ave.</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Project:</p>
                        <p className="font-semibold">Downtown Skyscraper</p>
                        <p>Contract #CTR-2023-001</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Status:</p>
                        <Badge variant="secondary"><Clock className='mr-2 h-4 w-4' />Pending Approval</Badge>
                    </div>
                </div>

                <Card className="my-6">
                    <CardHeader>
                        <CardTitle className='text-xl'>Progress Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableBody>
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
                            </TableBody>
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
                                    <TableCell className="text-right font-code">${formatNumber(item.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3} className="text-right font-bold">Subtotal</TableCell>
                                <TableCell className="text-right font-bold font-code">${formatNumber(totalAmount)}</TableCell>
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
                            <TableBody>
                                <TableRow>
                                    <TableHead>Variations</TableHead>
                                    <TableCell className="text-right font-code">$0.00</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Retention (10%)</TableHead>
                                    <TableCell className="text-right font-code text-destructive">-${formatNumber(totalAmount * 0.1)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Tax (5%)</TableHead>
                                    <TableCell className="text-right font-code">${formatNumber(totalAmount * 0.9 * 0.05)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                     <CardFooter className="bg-muted p-4 rounded-b-lg">
                        <div className="flex justify-between w-full">
                            <span className="font-bold text-lg">Total for this Certificate</span>
                            <span className="font-bold text-lg font-code">${formatNumber(totalAmount * 0.9 * 1.05)}</span>
                        </div>
                    </CardFooter>
                </Card>

            </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Approval Panel</CardTitle>
                    <CardDescription>Review and action this certificate.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="check-quantities" />
                            <Label htmlFor="check-quantities">Quantities match progress reports</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="check-rates" />
                            <Label htmlFor="check-rates">Rates align with contract</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="check-evidence" />
                            <Label htmlFor="check-evidence">Supporting evidence is sufficient</Label>
                        </div>
                    </div>
                     <Separator />
                     <Textarea placeholder="Add approval comments or conditions..." />
                     <div className="grid grid-cols-2 gap-2">
                        <Button><ThumbsUp className="mr-2 h-4 w-4" /> Approve</Button>
                        <Button variant="destructive"><ThumbsDown className="mr-2 h-4 w-4" /> Reject</Button>
                     </div>
                     <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            toast({
                                title: 'Certificate Returned for Revision',
                                description: 'The payment certificate has been sent back with your comments.',
                            });
                        }}
                        >
                        <Send className="mr-2 h-4 w-4" /> Return for Revision
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Supporting Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <Paperclip className="h-4 w-4"/>
                        Progress Report_July.pdf
                    </Button>
                     <Button variant="outline" className="w-full justify-start gap-2">
                        <Paperclip className="h-4 w-4"/>
                        Site_Photos_July.zip
                    </Button>
                     <Button variant="outline" className="w-full justify-start gap-2">
                        <Paperclip className="h-4 w-4"/>
                        Change_Order_CO-05.pdf
                    </Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Approval Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className='flex gap-4'>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Foreman</p>
                            <p className="text-muted-foreground">Approved by J. Smith - 7/28/24</p>
                        </div>
                    </div>
                     <Separator />
                     <div className='flex gap-4'>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Project Manager</p>
                            <p className="text-muted-foreground">Approved by A. Johnson - 7/29/24</p>
                        </div>
                    </div>
                     <Separator />
                     <div className='flex gap-4'>
                        <Eye className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Quantity Surveyor</p>
                            <p className="text-muted-foreground">In Review by K. Lee</p>
                        </div>
                    </div>
                     <Separator />
                     <div className='flex gap-4'>
                        <Clock className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">You (Client)</p>
                            <p className="text-muted-foreground">Pending Approval</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
