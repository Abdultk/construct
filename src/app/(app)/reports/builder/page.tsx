
'use client';

import {
  ArrowLeft,
  Table as TableIcon,
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
  Trash2,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, Pie, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const dataSources = [
    { id: 'projects', name: 'Projects', icon: Users, description: 'Core project information, status, and metadata.' },
    { id: 'costs', name: 'Cost Data', icon: DollarSign, description: 'Transactions, budget items, and variances.' },
    { id: 'schedules', name: 'Schedules', icon: GanttChartSquare, description: 'Tasks, milestones, and dependencies from WBS.' },
    { id: 'risks', name: 'Risks & Safety', icon: ShieldAlert, description: 'Incidents, near-misses, and AI-predicted risks.' },
];

const dataSourceFields: Record<string, { name: string; type: 'category' | 'value' }[]> = {
    projects: [
        { name: 'Status', type: 'category' },
        { name: 'Project Type', type: 'category' },
        { name: 'Portfolio Value', type: 'value' },
        { name: 'Budget Health', type: 'value' },
        { name: 'Completion %', type: 'value' },
    ],
    costs: [
        { name: 'Category', type: 'category' },
        { name: 'Status', type: 'category' },
        { name: 'Amount', type: 'value' },
        { name: 'Budget Variance', type: 'value' },
    ],
    schedules: [
        { name: 'Resource', type: 'category' },
        { name: 'Status', type: 'category' },
        { name: 'Duration (days)', type: 'value' },
        { name: 'Progress %', type: 'value' },
    ],
    risks: [
        { name: 'Severity', type: 'category' },
        { name: 'Status', type: 'category' },
        { name: 'Incident Count', type: 'value' },
        { name: 'Days Since Last Incident', type: 'value' },
    ]
};

// Mock data for preview
const mockChartData = [
  { name: 'On Track', value: 5, fill: 'hsl(var(--chart-2))' },
  { name: 'At Risk', value: 2, fill: 'hsl(var(--chart-4))' },
  { name: 'Delayed', value: 1, fill: 'hsl(var(--chart-1))' },
];

const mockTableData = [
    { project: 'Downtown Skyscraper', status: 'On Track', health: '95%' },
    { project: 'Suburban Housing', status: 'At Risk', health: '78%' },
    { project: 'Interstate Bridge', status: 'On Track', health: '89%' },
];


type ReportComponent = {
    id: string;
    type: 'Table' | 'BarChart' | 'PieChart';
    title: string;
    dataSource: string;
    xAxisField?: string;
    yAxisField?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export default function ReportBuilderPage() {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [reportComponents, setReportComponents] = useState<ReportComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportPreview, setReportPreview] = useState<ReportComponent[] | null>(null);

  const handleSourceChange = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId) 
        : [...prev, sourceId]
    );
  };
  
  const addComponent = (type: ReportComponent['type']) => {
    const newComponent: ReportComponent = {
        id: `${type}-${Date.now()}`,
        type,
        title: `New ${type}`,
        dataSource: '',
    };
    setReportComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  };
  
  const removeComponent = (id: string) => {
    setReportComponents(prev => prev.filter(c => c.id !== id));
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const updateSelectedComponent = (updates: Partial<ReportComponent>) => {
    if (!selectedComponentId) return;
    setReportComponents(prev => prev.map(c => c.id === selectedComponentId ? { ...c, ...updates } : c));
  }

  const handleRunReport = () => {
    setIsGenerating(true);
    setReportPreview(null);
    setTimeout(() => {
        setReportPreview(reportComponents);
        setIsGenerating(false);
    }, 1500);
  }
  
  const selectedComponent = reportComponents.find(c => c.id === selectedComponentId);

  const renderProperties = () => {
    if (!selectedComponent) {
        return <p className="text-sm text-muted-foreground">Select a component to configure its properties.</p>;
    }

    const availableFields = dataSourceFields[selectedComponent.dataSource] || [];
    const categoryFields = availableFields.filter(f => f.type === 'category');
    const valueFields = availableFields.filter(f => f.type === 'value');
    
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="comp-title">Title</Label>
                <Input 
                    id="comp-title" 
                    value={selectedComponent.title}
                    onChange={(e) => updateSelectedComponent({ title: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="comp-datasource">Data Source</Label>
                 <Select
                    value={selectedComponent.dataSource}
                    onValueChange={(value) => updateSelectedComponent({ dataSource: value, xAxisField: '', yAxisField: '' })}
                 >
                    <SelectTrigger id="comp-datasource">
                        <SelectValue placeholder="Select a data source" />
                    </SelectTrigger>
                    <SelectContent>
                        {dataSources
                            .filter(ds => selectedSources.includes(ds.id))
                            .map(ds => (
                                <SelectItem key={ds.id} value={ds.id}>{ds.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            {selectedComponent.type === 'Table' && (
                <div className="space-y-2">
                    <Label>Columns</Label>
                    <p className="text-xs text-muted-foreground">Column configuration coming soon.</p>
                </div>
            )}
             {selectedComponent.type.includes('Chart') && (
                <div className="space-y-4 pt-2 border-t">
                    <Label className="font-semibold">Chart Configuration</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="xaxis-field" className="text-xs">X-Axis (Category)</Label>
                            <Select 
                                value={selectedComponent.xAxisField} 
                                onValueChange={(value) => updateSelectedComponent({ xAxisField: value })}
                                disabled={!selectedComponent.dataSource}
                            >
                                <SelectTrigger id="xaxis-field"><SelectValue placeholder="Field..." /></SelectTrigger>
                                <SelectContent>
                                    {categoryFields.map(f => <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="yaxis-field" className="text-xs">Y-Axis (Value)</Label>
                            <Select 
                                value={selectedComponent.yAxisField} 
                                onValueChange={(value) => updateSelectedComponent({ yAxisField: value })}
                                disabled={!selectedComponent.dataSource}
                            >
                                <SelectTrigger id="yaxis-field"><SelectValue placeholder="Field..." /></SelectTrigger>
                                <SelectContent>
                                    {valueFields.map(f => <SelectItem key={f.name} value={f.name}>{f.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="xaxis-label" className="text-xs">X-Axis Label</Label>
                            <Input 
                                id="xaxis-label" 
                                placeholder="Custom label..." 
                                value={selectedComponent.xAxisLabel || ''}
                                onChange={(e) => updateSelectedComponent({ xAxisLabel: e.target.value })}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="yaxis-label" className="text-xs">Y-Axis Label</Label>
                            <Input 
                                id="yaxis-label" 
                                placeholder="Custom label..." 
                                value={selectedComponent.yAxisLabel || ''}
                                onChange={(e) => updateSelectedComponent({ yAxisLabel: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  }

  const renderComponent = (component: ReportComponent) => {
    const Icon = component.type === 'Table' ? TableIcon : component.type === 'BarChart' ? BarChart2 : PieChart;
    const dataSourceName = dataSources.find(ds => ds.id === component.dataSource)?.name;
    return (
        <Card 
            key={component.id} 
            className={cn("cursor-pointer relative", selectedComponentId === component.id && "border-primary ring-2 ring-primary")}
            onClick={() => setSelectedComponentId(component.id)}
        >
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute top-2 right-2 h-6 w-6 z-10"
              onClick={(e) => { e.stopPropagation(); removeComponent(component.id); }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base truncate">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{component.title}</span>
                </CardTitle>
                 {dataSourceName && (
                    <CardDescription className="text-xs">
                        Source: {dataSourceName}
                    </CardDescription>
                 )}
            </CardHeader>
            <CardContent className="flex items-center justify-center text-muted-foreground h-32">
                <div className="text-center">
                    <p>({component.type} preview)</p>
                     {component.xAxisField && component.yAxisField && (
                        <p className="text-xs mt-2">
                            {component.yAxisField} by {component.xAxisField}
                        </p>
                     )}
                </div>
            </CardContent>
        </Card>
    )
  }

  const renderPreviewComponent = (component: ReportComponent) => {
      return (
          <Card key={`preview-${component.id}`}>
              <CardHeader>
                  <CardTitle>{component.title}</CardTitle>
                  {component.dataSource && <CardDescription>Source: {dataSources.find(ds => ds.id === component.dataSource)?.name}</CardDescription>}
              </CardHeader>
              <CardContent>
                  {component.type === 'Table' && (
                      <Table>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Project</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Health</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                              {mockTableData.map(row => (
                                  <TableRow key={row.project}>
                                      <TableCell>{row.project}</TableCell>
                                      <TableCell>{row.status}</TableCell>
                                      <TableCell>{row.health}</TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  )}
                  {component.type === 'BarChart' && (
                      <ChartContainer config={{}} className="h-48 w-full">
                          <RechartsBarChart data={mockChartData} accessibilityLayer>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="value" radius={4}>
                                 {mockChartData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                  ))}
                              </Bar>
                          </RechartsBarChart>
                      </ChartContainer>
                  )}
                   {component.type === 'PieChart' && (
                      <ChartContainer config={{}} className="h-48 w-full">
                          <RechartsPieChart>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Pie data={mockChartData} dataKey="value" nameKey="name" >
                                {mockChartData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                  ))}
                              </Pie>
                          </RechartsPieChart>
                      </ChartContainer>
                  )}
              </CardContent>
          </Card>
      )
  }


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
          <Button onClick={handleRunReport} disabled={isGenerating}>
            {isGenerating ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                </>
            ) : (
                <>
                    <Play className="mr-2 h-4 w-4" /> Run Report
                </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Data Source Panel */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2">
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
              {renderProperties()}
            </CardContent>
          </Card>
        </div>

        {/* Design Canvas */}
        <div className="col-span-6 flex flex-col gap-4 overflow-y-auto pr-2">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Design Canvas</CardTitle>
            </CardHeader>
            <CardContent className="h-full rounded-lg border-2 border-dashed p-4">
              {reportComponents.length > 0 ? (
                <div className="grid gap-4">
                  {reportComponents.map(renderComponent)}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">
                    Click components on the right to add them to your report.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Components & Preview Panel */}
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto pr-2">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex-col h-20" onClick={() => addComponent('Table')}>
                <TableIcon className="h-6 w-6 mb-1" />
                <span>Table</span>
              </Button>
              <Button variant="outline" className="flex-col h-20" onClick={() => addComponent('BarChart')}>
                <BarChart2 className="h-6 w-6 mb-1" />
                <span>Bar Chart</span>
              </Button>
              <Button variant="outline" className="flex-col h-20" onClick={() => addComponent('PieChart')}>
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
              {isGenerating ? (
                 <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                 </div>
              ) : reportPreview ? (
                <div className="space-y-4">
                    {reportPreview.length > 0 ? (
                      reportPreview.map(renderPreviewComponent)
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">Add components to the canvas and run the report to see a preview.</p>
                    )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click "Run Report" to see a preview.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
