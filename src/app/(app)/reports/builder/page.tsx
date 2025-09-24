
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
  ArrowLeft,
  Table,
  BarChart2,
  PieChart,
  Save,
  Share2,
  Play,
  Settings,
  Database,
  Users,
  DollarSign,
  GanttChartSquare,
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';


const dataSources = [
    { id: 'projects', name: 'Projects', icon: Users, description: 'Core project information, status, and metadata.' },
    { id: 'costs', name: 'Cost Data', icon: DollarSign, description: 'Transactions, budget items, and variances.' },
    { id: 'schedules', name: 'Schedules', icon: GanttChartSquare, description: 'Tasks, milestones, and dependencies from WBS.' },
    { id: 'risks', name: 'Risks & Safety', icon: ShieldAlert, description: 'Incidents, near-misses, and AI-predicted risks.' },
]

export default function ReportBuilderPage() {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId) 
        : [...prev, sourceId]
    );
  };


  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/reports">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-headline">Report Builder</h1>
            <p className="text-muted-foreground">
              Design and customize your own reports.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button>
            <Play className="mr-2 h-4 w-4" /> Run Report
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Data Source Panel */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" /> Data Sources
              </CardTitle>
              <CardDescription>Select the data to include in your report.</CardDescription>
            </CardHeader>
            <CardContent>
               <Accordion type="multiple" defaultValue={['data-sources']} className="w-full">
                <AccordionItem value="data-sources">
                    <AccordionTrigger className="text-sm font-semibold">Available Sources</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            {dataSources.map(source => (
                                <div key={source.id} className="flex items-start gap-3 p-3 rounded-md border hover:bg-muted/50">
                                    <Checkbox 
                                        id={source.id} 
                                        checked={selectedSources.includes(source.id)} 
                                        onCheckedChange={() => handleSourceChange(source.id)}
                                        className="mt-1"
                                    />
                                    <Label htmlFor={source.id} className="flex-1 cursor-pointer">
                                        <div className="flex items-center gap-2 font-medium">
                                            <source.icon className="h-4 w-4" />
                                            <span>{source.name}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-normal mt-1">{source.description}</p>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" /> Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configure selected component properties.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Design Canvas */}
        <div className="col-span-6 flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Design Canvas</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full items-center justify-center rounded-lg border-2 border-dashed">
              <p className="text-muted-foreground">
                Drag and drop components from the right panel.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Components & Preview Panel */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex-col h-20">
                <Table className="h-6 w-6 mb-1" />
                <span>Table</span>
              </Button>
              <Button variant="outline" className="flex-col h-20">
                <BarChart2 className="h-6 w-6 mb-1" />
                <span>Bar Chart</span>
              </Button>
              <Button variant="outline" className="flex-col h-20">
                <PieChart className="h-6 w-6 mb-1" />
                <span>Pie Chart</span>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time preview will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
