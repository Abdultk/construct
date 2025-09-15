
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
} from 'lucide-react';
import Link from 'next/link';

export default function ReportBuilderPage() {
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
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select and filter data sources here.
              </p>
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
                Drag and drop components from the left panel.
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
