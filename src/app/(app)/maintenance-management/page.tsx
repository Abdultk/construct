
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Plus, SlidersHorizontal, ListTodo, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MaintenanceManagementPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Maintenance Management</h1>
          <p className="text-muted-foreground">
            Schedule and track all maintenance work orders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> View Options
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Work Order
          </Button>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Schedule View */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>Calendar view of scheduled and overdue tasks.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                className="rounded-md border p-3"
              />
            </CardContent>
          </Card>
        </div>

        {/* Work Order & Technician Panel */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Work Order Panel</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Quarterly HVAC Inspection</p>
                        <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">For all AHU units. Due: 2024-09-15</p>
               </div>
               <div className="p-4 border rounded-lg border-yellow-500/50 bg-yellow-500/5">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Repair Water Pump PMP-03</p>
                        <Badge variant="default">Assigned</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Assigned to: John Doe. Due: 2024-08-05</p>
               </div>
               <Button className="w-full"><ListTodo className="mr-2 h-4" /> View All Work Orders</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technician Interface</CardTitle>
              <CardDescription>Mobile-optimized view for field technicians.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-8 bg-muted/50 rounded-lg">
                <Wrench className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                    Technician-specific views and work instructions will be available here.
                </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
