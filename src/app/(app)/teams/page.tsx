

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ChevronDown,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

type TeamMember = {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Invited';
  avatar: string;
  permissions: string[];
};

const initialTeamMembers: TeamMember[] = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Project Manager',
      status: 'Active',
      avatar: 'https://picsum.photos/seed/10/100/100',
      permissions: ['Dashboard', 'Projects', 'Reports', 'Settings', 'Teams', 'Change Orders', 'Budget', 'Cost Tracking', 'Safety', 'Quality']
    },
    {
      name: 'Bob Miller',
      email: 'bob@example.com',
      role: 'Site Engineer',
      status: 'Active',
      avatar: 'https://picsum.photos/seed/11/100/100',
      permissions: ['Dashboard', 'Projects', 'Safety', 'Quality']
    },
    {
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'Architect',
      status: 'Invited',
      avatar: 'https://picsum.photos/seed/12/100/100',
      permissions: ['Projects', 'Document Library']
    },
    {
      name: 'Diana Green',
      email: 'diana@example.com',
      role: 'Safety Officer',
      status: 'Active',
      avatar: 'https://picsum.photos/seed/13/100/100',
      permissions: ['Safety', 'Incident Reporting', 'Reports']
    },
  ];

const allModules = [
  "Dashboard", "Projects", "Document Library", "BOQ", "Program of Works", "Change Orders", "Impact Viz", "Budget", "Cost Tracking", "Payments", "Safety", "Quality", "Digital Twin", "Facility Performance", "Asset Registry", "Maintenance", "Lifecycle Cost", "Teams", "Reports", "Settings"
];

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
        const matchesSearch = searchTerm === '' || 
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All' || member.role === roleFilter;
        return matchesSearch && matchesRole;
    });
  }, [teamMembers, searchTerm, roleFilter]);

  const handleInviteMember = (email: string, role: string) => {
    if (!email || !role) {
      toast({ variant: 'destructive', title: 'Error', description: 'Email and role are required.' });
      return;
    }
    const newMember: TeamMember = {
      name: email.split('@')[0].replace('.', ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase()),
      email,
      role,
      status: 'Invited',
      avatar: `https://picsum.photos/seed/${Math.random()}/100/100`,
      permissions: [],
    };
    setTeamMembers(prev => [...prev, newMember]);
    setIsInviteOpen(false);
    toast({ title: 'Invitation Sent', description: `An invitation has been sent to ${email}.` });
  };

  const handleUpdateMember = (email: string, newRole: string, newPermissions: string[]) => {
    setTeamMembers(prev => prev.map(member => member.email === email ? { ...member, role: newRole, permissions: newPermissions } : member));
    setIsManageOpen(false);
    toast({ title: 'Member Updated', description: `Permissions for ${email} have been updated.` });
  };

  const handleRemoveMember = (email: string) => {
    setTeamMembers(prev => prev.filter(member => member.email !== email));
    toast({ title: 'Member Removed', description: `${email} has been removed from the team.` });
  };
  
  const handleResendInvitation = (email: string) => {
    toast({ title: 'Invitation Resent', description: `A new invitation has been sent to ${email}.` });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return 'secondary';
      case 'Invited':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  const InviteDialog = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Invite a new team member</DialogTitle>
            <DialogDescription>
                Enter the email address and select a role for the new member.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Email
                </Label>
                <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="col-span-3"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                Role
                </Label>
                <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Site Engineer">Site Engineer</SelectItem>
                    <SelectItem value="Architect">Architect</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => handleInviteMember(email, role)}>Send Invitation</Button>
            </DialogFooter>
        </DialogContent>
    )
  };

  const ManageMemberDialog = () => {
    if (!selectedMember) return null;

    const [currentRole, setCurrentRole] = useState(selectedMember.role);
    const [currentPermissions, setCurrentPermissions] = useState<string[]>(selectedMember.permissions);

    const handlePermissionChange = (module: string, checked: boolean) => {
      setCurrentPermissions(prev => 
        checked ? [...prev, module] : prev.filter(p => p !== module)
      );
    }
    
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setCurrentPermissions(allModules);
      } else {
        setCurrentPermissions([]);
      }
    }

    const isAllSelected = currentPermissions.length === allModules.length;
    const isIndeterminate = currentPermissions.length > 0 && currentPermissions.length < allModules.length;

    return (
         <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Manage Member</DialogTitle>
                <DialogDescription>Change the role and module permissions for {selectedMember.name}.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedMember.avatar} />
                        <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{selectedMember.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="edit-role">Role</Label>
                        <Select value={currentRole} onValueChange={setCurrentRole}>
                            <SelectTrigger id="edit-role">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Administrator">Administrator</SelectItem>
                                <SelectItem value="Project Manager">Project Manager</SelectItem>
                                <SelectItem value="Site Engineer">Site Engineer</SelectItem>
                                <SelectItem value="Architect">Architect</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold">Module Permissions</h4>
                      <p className="text-sm text-muted-foreground">Grant access to specific application modules.</p>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                        <Checkbox 
                          id="select-all-modules" 
                          checked={isAllSelected} 
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all modules"
                        />
                        <Label htmlFor="select-all-modules" className="font-semibold">Select All Modules</Label>
                        <Badge variant="secondary" className="ml-auto">{currentPermissions.length} / {allModules.length} selected</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-48 overflow-y-auto pr-2">
                        {allModules.map(module => (
                            <div key={module} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`perm-${module}`} 
                                    checked={currentPermissions.includes(module)} 
                                    onCheckedChange={(checked) => handlePermissionChange(module, !!checked)}
                                />
                                <Label htmlFor={`perm-${module}`} className="text-sm font-normal">{module}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
             <DialogFooter>
                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                <Button onClick={() => handleUpdateMember(selectedMember.email, currentRole, currentPermissions)}>Save Changes</Button>
            </DialogFooter>
         </DialogContent>
    );
  }

  return (
    <>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Management</CardTitle>
          <CardDescription>
            Invite and manage your team members.
          </CardDescription>
        </div>
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <InviteDialog />
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search members..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Role: {roleFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setRoleFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter('Project Manager')}>Project Manager</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter('Site Engineer')}>Site Engineer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter('Architect')}>Architect</DropdownMenuItem>
               <DropdownMenuItem onClick={() => setRoleFilter('Safety Officer')}>Safety Officer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Badge variant="outline">{member.permissions.length} Modules</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setSelectedMember(member); setIsManageOpen(true); }}>Manage Member</DropdownMenuItem>
                      {member.status === 'Invited' && <DropdownMenuItem onClick={() => handleResendInvitation(member.email)}>Resend Invitation</DropdownMenuItem>}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveMember(member.email)}>
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
     <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
        <ManageMemberDialog />
    </Dialog>
    </>
  );
}
