
'use client';

import {
  FilePlus,
  DollarSign,
  Calendar,
  Users,
  BarChart,
  Upload,
  ArrowLeft,
  Info,
  Paperclip,
  Wand2,
  Loader2,
  ShieldAlert,
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';
import {
  analyzeChangeImpact,
  type AnalyzeChangeImpactOutput,
} from '@/ai/flows/analyze-change-impact';
import { useToast } from '@/hooks/use-toast';

export default function ChangeRequestFormPage() {
  const [changeTitle, setChangeTitle] = useState('Substitute roofing material');
  const [changeDescription, setChangeDescription] = useState('Current specified roofing material has a 12-week lead time. A comparable, locally sourced alternative is available and can be delivered in 2 weeks. This change is to prevent schedule delays.');
  const [affectedWbs, setAffectedWbs] = useState('5.2.1 Roofing');
  const [proposedSolution, setProposedSolution] = useState('Approve substitution of current roofing material with "DuraRoof X2" product. Procure and schedule installation with existing roofing subcontractor.');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] =
    useState<AnalyzeChangeImpactOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyzeImpact = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeChangeImpact({
        changeTitle,
        changeDescription,
        affectedWbs,
        proposedSolution,
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing impact:', error);
      toast({
        variant: 'destructive',
        title: 'AI Analysis Failed',
        description:
          'There was an error while analyzing the impact of this change.',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/change-orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-headline">
              New Change Request
            </h1>
            <p className="text-muted-foreground">
              Project: Downtown Skyscraper - CR-0012
            </p>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            Draft
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit</Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4">
        {/* Main Form */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Change Details</CardTitle>
              <CardDescription>
                Provide a clear description and justification for the change.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="change-title">Change Title</Label>
                <Input
                  id="change-title"
                  placeholder="e.g., Substitute roofing material"
                  value={changeTitle}
                  onChange={(e) => setChangeTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="change-description">
                  Description & Justification
                </Label>
                <Textarea
                  id="change-description"
                  placeholder="Describe the proposed change and explain why it is necessary..."
                  rows={5}
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="wbs-affected">
                    Affected Work Package (WBS)
                  </Label>
                  <Input
                    id="wbs-affected"
                    placeholder="e.g., 5.2.1 Roofing"
                    value={affectedWbs}
                    onChange={(e) => setAffectedWbs(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="change-type">Type of Change</Label>
                  <Select>
                    <SelectTrigger id="change-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client Request</SelectItem>
                      <SelectItem value="design">
                        Design Modification
                      </SelectItem>
                      <SelectItem value="site">Site Condition</SelectItem>
                      <SelectItem value="value-eng">
                        Value Engineering
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposed-solution">Proposed Solution</Label>
                <Textarea
                  id="proposed-solution"
                  placeholder="Detail the new plan or solution..."
                  rows={3}
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-lg border-dashed border-2 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop files
                </p>
                <p className="text-xs text-muted-foreground">
                  PDFs, DWGs, JPGs, etc.
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Paperclip className="h-4 w-4" />
                  Updated_Roof_Spec_rev2.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Paperclip className="h-4 w-4" />
                  Site_Photo_Existing_Condition.jpg
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                AI-Powered Impact Analysis{' '}
                <Wand2 className="h-5 w-5 text-ai-accent" />
              </CardTitle>
              <CardDescription>
                Let AI assist in evaluating the potential impacts of this
                change.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={handleAnalyzeImpact}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Impact'
                )}
              </Button>
              <Separator />
              <div className="space-y-4 text-sm">
                <div className="space-y-2">
                  <Label>Estimated Cost Impact</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md min-h-[44px]">
                    {analysisResult?.estimatedCostImpact ? (
                      <>
                        <DollarSign className="h-5 w-5" />
                        <span className="font-semibold text-base font-code">
                          {analysisResult.estimatedCostImpact}
                        </span>
                      </>
                    ) : (
                      isAnalyzing ? (
                         <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                         <p className="text-muted-foreground text-xs">Run analysis to see impact.</p>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Estimated Schedule Impact</Label>
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-md min-h-[44px]">
                    {analysisResult?.estimatedScheduleImpact ? (
                       <>
                        <Calendar className="h-5 w-5" />
                        <span className="font-semibold text-base">
                          {analysisResult.estimatedScheduleImpact}
                        </span>
                       </>
                    ) : (
                       isAnalyzing ? (
                         <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                         <p className="text-muted-foreground text-xs">Run analysis to see impact.</p>
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Potential Risks</Label>
                   <div className="p-2 bg-muted rounded-md min-h-[44px]">
                    {analysisResult?.potentialRisks ? (
                       <div className="space-y-1">
                        {analysisResult.potentialRisks.split('\n').map((risk, index) => risk.trim() && (
                          <div key={index} className="flex items-start gap-2">
                            <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0" />
                            <span className='text-xs'>{risk.replace('-', '').trim()}</span>
                          </div>
                        ))}
                       </div>
                    ) : (
                       isAnalyzing ? (
                         <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                         <p className="text-muted-foreground text-xs">Run analysis to identify risks.</p>
                      )
                    )}
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Requester & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Requester</Label>
                <p className="text-sm font-medium">
                  Alice Johnson (Project Manager)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
