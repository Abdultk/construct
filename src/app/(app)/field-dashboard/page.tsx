
'use client';
import {
  CloudSun,
  Phone,
  Wifi,
  WifiOff,
  MapPin,
  Camera,
  MessageSquare,
  Mic,
  Video,
  UserCheck,
  Wrench,
  ClipboardCheck,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function FieldDashboardPage() {
  const [isOnline, setIsOnline] = useState(true);

  const tasks = [
    { id: 1, label: 'Morning Safety Briefing', photoRequired: false },
    { id: 2, label: 'Install formwork for Sector A-3', photoRequired: true },
    { id: 3, label: 'Inspect rebar placement', photoRequired: true },
    { id: 4, label: 'Coordinate concrete pour', photoRequired: false },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
          <div className="flex flex-col">
            <h2 className="font-bold font-headline">Downtown Skyscraper</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span>123 Main St, Anytown, USA</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CloudSun className="h-5 w-5" />
              <span>72°F Sunny</span>
            </div>
            <Button variant="destructive" size="icon">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Emergency Contact</span>
            </Button>
            <div
              className="flex cursor-pointer items-center gap-1"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-500" />
              )}
              <span className="sr-only">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Today's Tasks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>
              Priority list for your crew
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-3">
                  <Checkbox id={`task-${task.id}`} />
                  <label htmlFor={`task-${task.id}`} className="text-sm">
                    {task.label}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  {task.photoRequired && (
                    <Camera className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Button variant="outline" size="sm">
                    GPS
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Crew & Progress */}
        <div className="space-y-4 lg:col-span-1">
          {/* Crew Management */}
          <Card>
            <CardHeader>
              <CardTitle>Crew Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck className="h-5 w-5" />
                  <span>Team Attendance</span>
                </div>
                <Button variant="secondary" size="sm">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Wrench className="h-5 w-5" />
                  <span>Equipment Assignment</span>
                </div>
                <Button variant="secondary" size="sm">
                  Assign
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <ClipboardCheck className="h-5 w-5" />
                  <span>Safety Briefing</span>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
            </CardContent>
          </Card>
          {/* Progress Reporting */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Reporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea placeholder="Enter a quick progress update..." />
                <Button className="mt-2 w-full">Submit Update</Button>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Site Photo
                </Button>
                <Button variant="secondary" asChild className="w-full">
                    <Link href="/quality-control">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Submit for Quality Review
                    </Link>
                </Button>
                <p className="text-xs text-center text-muted-foreground">AI Analysis Preview Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communications */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Communications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <p className="font-semibold">Message Center</p>
              <p className="text-sm text-muted-foreground">
                Coming Soon
              </p>
            </div>
            <div className="flex justify-around">
              <Button variant="ghost" size="icon" className="h-16 w-16 flex-col gap-1">
                <Mic className="h-6 w-6" />
                <span className='text-xs'>Voice Note</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-16 w-16 flex-col gap-1">
                <Video className="h-6 w-6" />
                 <span className='text-xs'>Video Call</span>
              </Button>
            </div>
             <Separator />
            <p className="text-sm font-semibold">Issue Reporting</p>
            <p className="text-sm text-muted-foreground">
                Coming Soon
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
