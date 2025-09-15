
'use client';

import {
  Phone,
  FirstAidKit,
  DoorOpen,
  Siren,
  ShieldAlert,
  Users,
  Clock,
  Camera,
  Video,
  Mic,
  MapPin,
  FileText,
  Bell,
  Send,
  ArrowLeft
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
import Link from 'next/link';

export default function IncidentReportingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/safety-dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
              <Siren className="h-6 w-6 text-destructive" />
              New Incident Report
            </h1>
            <p className="text-muted-foreground">
              Project: Downtown Skyscraper - {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Immediate Actions */}
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Immediate Actions</CardTitle>
          <CardDescription className="text-destructive/80">
            For use in emergency situations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <Button variant="destructive" size="lg" className="flex-col h-20">
            <Phone className="h-6 w-6 mb-1" />
            <span>Emergency Contact</span>
          </Button>
          <Button variant="outline" className="flex-col h-20 border-destructive text-destructive hover:bg-destructive/20">
            <FirstAidKit className="h-6 w-6 mb-1" />
            <span>First Aid Guide</span>
          </Button>
          <Button variant="outline" className="flex-col h-20 border-destructive text-destructive hover:bg-destructive/20">
            <DoorOpen className="h-6 w-6 mb-1" />
            <span>Evacuation Plan</span>
          </Button>
        </CardContent>
      </Card>

      {/* Incident Form */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
          <CardDescription>
            Provide a clear and accurate account of the incident.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="incident-type">Incident Type</Label>
              <Select>
                <SelectTrigger id="incident-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="injury">Injury</SelectItem>
                  <SelectItem value="near-miss">Near Miss</SelectItem>
                  <SelectItem value="property-damage">Property Damage</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select>
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (Minor)</SelectItem>
                  <SelectItem value="medium">Medium (Moderate)</SelectItem>
                  <SelectItem value="high">High (Serious)</SelectItem>
                  <SelectItem value="critical">Critical (Severe)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="personnel">Personnel Involved</Label>
            <Input id="personnel" placeholder="Names and roles of people involved" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description & Timeline</Label>
            <Textarea
              id="description"
              placeholder="Describe what happened, when, and where. Include sequence of events."
              rows={5}
            />
          </div>
        </CardContent>
      </Card>

      {/* Evidence Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Evidence Collection</CardTitle>
          <CardDescription>
            Attach photos, videos, and statements.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className='p-6 rounded-lg border-dashed border-2 text-center'>
                <Camera className='mx-auto h-8 w-8 text-muted-foreground' />
                <p className='mt-2 text-sm text-muted-foreground'><span className="font-semibold">Click to upload</span> or drag and drop files</p>
                <p className='text-xs text-muted-foreground'>Photos, Videos, Witness Statements</p>
            </div>
            <div className="flex justify-center gap-4">
                <Button variant="outline" className="flex-1"><Camera className="mr-2 h-4 w-4" />Photo</Button>
                <Button variant="outline" className="flex-1"><Video className="mr-2 h-4 w-4" />Video</Button>
                <Button variant="outline" className="flex-1"><Mic className="mr-2 h-4 w-4" />Statement</Button>
                <Button variant="outline" className="flex-1"><MapPin className="mr-2 h-4 w-4" />Mark Location</Button>
            </div>
        </CardContent>
      </Card>

      {/* Follow-up Actions */}
       <Card>
        <CardHeader>
          <CardTitle>Follow-up Actions</CardTitle>
          <CardDescription>
            Outline the immediate response and next steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label htmlFor="response-plan">Immediate Response Plan</Label>
                <Textarea id="response-plan" placeholder="e.g., Secured the area, provided first aid..." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="investigator">Assign Investigator</Label>
                    <Input id="investigator" placeholder="Select team member" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notifications">Notification Workflow</Label>
                     <Select>
                        <SelectTrigger id="notifications">
                        <SelectValue placeholder="Select workflow" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="standard">Standard Protocol</SelectItem>
                        <SelectItem value="critical">Critical Incident Protocol</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <Button className="w-full" size="lg">
                <Send className="mr-2 h-4 w-4" />
                Submit Incident Report
            </Button>
            <p className="text-center text-xs text-muted-foreground">
                Submitting will trigger selected notification workflows.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
