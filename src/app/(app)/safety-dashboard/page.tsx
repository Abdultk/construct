
'use client';

import {
  Shield,
  CalendarDays,
  UserCheck,
  HardHat,
  Map,
  Plus,
  Bell,
  Phone,
  BarChart,
  CheckCircle,
  Siren,
  BriefcaseMedical,
  DoorOpen,
  Camera,
  Video,
  Mic,
  MapPin,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

export default function SafetyDashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Safety Dashboard</h1>
          <p className="text-muted-foreground">
            Project: Downtown Skyscraper
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="p-2 text-base">
            <Shield className="mr-2 h-5 w-5 text-green-500" />
            Safety Score: 98/100
          </Badge>
          <Button variant="destructive">
            <Phone className="mr-2 h-4 w-4" />
            Emergency
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Days Without Incident
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">124</div>
            <p className="text-xs text-muted-foreground">Record: 210 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Incidents (Last 30d)
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">0</div>
            <p className="text-xs text-muted-foreground">1 Minor, 0 Major</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Status</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">100%</div>
            <p className="text-xs text-muted-foreground">All crews compliant</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PPE Compliance</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">99%</div>
            <p className="text-xs text-muted-foreground">
              Based on recent inspections
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Incident Map</CardTitle>
            <CardDescription>
              Site layout with risk zones and incident locations.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center rounded-lg bg-muted">
            <p className="text-muted-foreground">Map visualization coming soon.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Action Panel</CardTitle>
            <CardDescription>
              Manage safety-related tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" /> Schedule Safety Inspection
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full justify-start">
                  <Siren className="mr-2 h-4 w-4" /> Report New Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Siren className="h-6 w-6 text-destructive" /> New Incident
                    Report
                  </DialogTitle>
                  <DialogDescription>
                    Project: Downtown Skyscraper - {new Date().toLocaleString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4">
                  <Card className="bg-destructive/10 border-destructive">
                    <CardHeader>
                      <CardTitle className="text-destructive">
                        Immediate Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-2">
                      <Button
                        variant="destructive"
                        className="flex-col h-16 text-xs"
                      >
                        <Phone className="h-5 w-5 mb-1" />
                        <span>Emergency Contact</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-col h-16 text-xs border-destructive text-destructive hover:bg-destructive/20"
                      >
                        <BriefcaseMedical className="h-5 w-5 mb-1" />
                        <span>First Aid Guide</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-col h-16 text-xs border-destructive text-destructive hover:bg-destructive/20"
                      >
                        <DoorOpen className="h-5 w-5 mb-1" />
                        <span>Evacuation Plan</span>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Incident Details</CardTitle>
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
                              <SelectItem value="near-miss">
                                Near Miss
                              </SelectItem>
                              <SelectItem value="property-damage">
                                Property Damage
                              </SelectItem>
                              <SelectItem value="environmental">
                                Environmental
                              </SelectItem>
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
                              <SelectItem value="medium">
                                Medium (Moderate)
                              </SelectItem>
                              <SelectItem value="high">High (Serious)</SelectItem>
                              <SelectItem value="critical">
                                Critical (Severe)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personnel">Personnel Involved</Label>
                        <Input
                          id="personnel"
                          placeholder="Names and roles of people involved"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Description & Timeline
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what happened, when, and where. Include sequence of events."
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Evidence Collection</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg border-dashed border-2 text-center">
                        <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop files
                        </p>
                      </div>
                      <div className="flex justify-center gap-2">
                        <Button variant="outline">
                          <Camera className="mr-2 h-4 w-4" />
                          Photo
                        </Button>
                        <Button variant="outline">
                          <Video className="mr-2 h-4 w-4" />
                          Video
                        </Button>
                        <Button variant="outline">
                          <Mic className="mr-2 h-4 w-4" />
                          Statement
                        </Button>
                        <Button variant="outline">
                          <MapPin className="mr-2 h-4 w-4" />
                          Mark Location
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Incident Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="secondary" className="w-full justify-start">
              <UserCheck className="mr-2 h-4 w-4" /> Assign Training
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" /> Log Equipment Check
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" /> Create Hazard Alert
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Near-Miss Reports</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">Table or list coming soon.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Open Safety Issues</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground">List of unresolved issues coming soon.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
