
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Upload, ChevronDown, Link as LinkIcon, Building2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const boqStandards = {
  "International": ["NRM", "CESMM4", "POMI", "SMM7", "UNIFORMAT II", "MasterFormat", "Uniclass"],
  "Regional": ["ASTM E1557 (US)", "DIN 276 (Germany)", "IS 1200 (India)", "AS 3846 (Australia)", "SANS 1921 (South Africa)", "MMHW (Malaysia)", "Nigerian Building Code"],
  "Custom": ["Enterprise Standard", "Project Specific", "Hybrid Model"]
}


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar-1');
  const [selectedStandard, setSelectedStandard] = useState('NRM');

  return (
    <div className="flex-1 space-y-4">
       <div>
        <h1 className="text-2xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                This is how others will see you on the site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Change Photo</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Project Manager" disabled />
                </div>
            </CardContent>
            <CardFooter>
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
            </CardContent>
            <CardFooter>
              <Button>Save Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
              </div>
              <div className="flex gap-4">
                 <div className="w-full rounded-md border-2 p-1 hover:border-primary cursor-pointer" onClick={() => setTheme('light')}>
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                    </div>
                  </div>
                   <span className="block w-full p-2 text-center font-normal">Light</span>
                </div>
                <div className="w-full rounded-md border-2 p-1 hover:border-primary cursor-pointer" onClick={() => setTheme('dark')}>
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                    </div>
                  </div>
                   <span className="block w-full p-2 text-center font-normal">Dark</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-muted-foreground">Milestones, schedule changes, and status updates.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                 <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Mentions</Label>
                        <p className="text-sm text-muted-foreground">When someone @mentions you in a comment.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>AI Insights</Label>
                        <p className="text-sm text-muted-foreground">New predictive alerts and optimization suggestions.</p>
                    </div>
                    <Switch />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">New logins or changes to your account.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
            </CardContent>
             <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="organization" className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Organization</CardTitle>
                    <CardDescription>
                        Manage your company's details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input id="org-name" defaultValue="ConstructAI Corp." />
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>Save Organization</Button>
                </CardFooter>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle>BOQ Preferences</CardTitle>
                    <CardDescription>
                        Set default standards and behaviors for Bill of Quantities workflows.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Default BOQ Standard</Label>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedStandard}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem onClick={() => setSelectedStandard('Auto-Detect')}>Auto-Detect</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {Object.entries(boqStandards).map(([groupName, standards]) => (
                                        <DropdownMenuSub key={groupName}>
                                            <DropdownMenuSubTrigger>{groupName}</DropdownMenuSubTrigger>
                                            <DropdownMenuSubContent>
                                                {standards.map(standard => (
                                                    <DropdownMenuItem key={standard} onClick={() => setSelectedStandard(standard)}>
                                                        {standard}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuSub>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-2">
                            <Label>Region Preference</Label>
                            <Select defaultValue="international">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="international">International</SelectItem>
                                    <SelectItem value="north-america">North America</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="europe">Europe</SelectItem>
                                    <SelectItem value="asia">Asia</SelectItem>
                                    <SelectItem value="africa">Africa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label>Enable AI Auto-Detection</Label>
                                <p className="text-sm text-muted-foreground">Allow AI to automatically detect the standard for uploaded BOQs.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>Save BOQ Preferences</Button>
                </CardFooter>
            </Card>
        </TabsContent>
         <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect your ConstructAI account with other services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Building2 className="h-8 w-8" />
                        <div>
                            <CardTitle className="text-base">Microsoft 365</CardTitle>
                            <CardDescription>Sync documents with SharePoint and OneDrive.</CardDescription>
                        </div>
                    </div>
                    <Button>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Connect
                    </Button>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.832 3.003l7.168 12.417-3.584 6.208H6.584L3 15.42l3.584-6.209L10.168 3l3.664.003z" fill="#FBBC04"/>
                            <path d="M10.168 3L6.584 9.211 3 15.42l1.792 3.104h3.584l3.584-6.209L8.376 6.107l1.792-3.104z" fill="#00832D"/>
                            <path d="M10.168 3l-1.792 3.103L3 15.42h7.168l3.584-6.209L10.168 3z" fill="#34A853"/>
                            <path d="M17.416 9.211l-3.584 6.209L10.25 21.628h10.752l3-5.197-6.584-7.22z" fill="#4285F4"/>
                            <path d="M17.416 9.211L13.832 3h3.584l6.584 11.41-3 5.198h-7.168l3.584-6.209z" fill="#34A853"/>
                            <path d="M17.416 9.211l-3.584 6.209h7.168l-3.584-6.209z" fill="#1A73E8"/>
                        </svg>
                        <div>
                            <CardTitle className="text-base">Google Workspace</CardTitle>
                            <CardDescription>Sync documents with Google Drive, Docs, and Sheets.</CardDescription>
                        </div>
                    </div>
                    <Button variant="outline">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Connect
                    </Button>
                </CardHeader>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
