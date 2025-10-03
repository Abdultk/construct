

'use client';

import Link from "next/link"
import {
  Bell,
  FileText,
  GanttChartSquare,
  HardHat,
  Home,
  Menu,
  Search,
  Settings,
  Users,
  DollarSign,
  ClipboardList,
  Network,
  ListFilter,
  TrendingUp,
  Edit,
  FileCheck,
  FilePlus,
  Eye,
  Shield,
  ClipboardCheck,
  Siren,
  Orbit,
  Signal,
  LineChart,
  Library,
  Wrench,
  RefreshCw,
  Bot,
  Briefcase,
  Check,
  Send,
  Archive,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { Logo } from "./logo"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuFooter } from "./ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import * as React from "react"

const notifications = [
    { title: "New Mention", description: "@Jane Doe mentioned you in 'Architectural_Plans_v3.dwg'", time: "2m ago" },
    { title: "Change Order Approved", description: "CR-0011 for Downtown Skyscraper was approved.", time: "5m ago" },
    { title: "New Document Uploaded", description: "Floor-Plan-Rev3.dwg was added to the project.", time: "1h ago" },
    { title: "Task Completed", description: "Jackson Lee marked 'Foundation Pour' as complete.", time: "3h ago" },
]


export function Header() {
    const [notificationCount, setNotificationCount] = React.useState(notifications.length);
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo />
            </Link>
            <Link
              href="/dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <GanttChartSquare className="h-5 w-5" />
              Projects
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                5
              </Badge>
            </Link>
             <Link
              href="/document-library"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Archive className="h-5 w-5" />
              Document Library
            </Link>
             <Link
              href="/boq"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ClipboardList className="h-5 w-5" />
              BOQ
            </Link>
             <Link
              href="/program-of-works"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Network className="h-5 w-5" />
              Program of Works
            </Link>
             <Link
              href="/change-orders"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <FilePlus className="h-5 w-5" />
              Change Orders
               <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                3
              </Badge>
            </Link>
            <Link
              href="/visualize-impact"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-5 w-5" />
              Impact Viz
            </Link>
             <Link
              href="/budget-establishment"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <DollarSign className="h-5 w-5" />
              Budget
            </Link>
            <Link
              href="/cost-tracking"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ListFilter className="h-5 w-5" />
              Cost Tracking
            </Link>
             <Link
              href="/payment-certificate"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <FileCheck className="h-5 w-5" />
              Payments
            </Link>
            <Link
              href="/safety-dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Shield className="h-5 w-5" />
              Safety
            </Link>
            <Link
              href="/quality-control"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ClipboardCheck className="h-5 w-5" />
              Quality
            </Link>
             <Link
              href="/digital-twin"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Orbit className="h-5 w-5" />
              Digital Twin
            </Link>
            <Link
              href="/facility-performance"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Facility Performance
            </Link>
            <Link
              href="/asset-registry"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Library className="h-5 w-5" />
              Asset Registry
            </Link>
            <Link
              href="/maintenance-management"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Wrench className="h-5 w-5" />
              Maintenance
            </Link>
            <Link
              href="/lifecycle-cost-analysis"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-5 w-5" />
              Lifecycle Cost
            </Link>
            <Link
              href="/teams"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-5 w-5" />
              Teams
            </Link>
            <Link
              href="/reports"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-5 w-5" />
              Reports
            </Link>
             <Link
              href="/settings"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <ThemeToggle />
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                    <Badge className="absolute top-0 right-0 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-1 text-[10px]">
                        {notificationCount}
                    </Badge>
                )}
                <span className="sr-only">Toggle notifications</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                {notificationCount > 0 && <Badge variant="secondary">{notificationCount} New</Badge>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, notificationCount).map((notification, index) => (
                <DropdownMenuItem key={index} className="flex-col items-start gap-1">
                     <div className="w-full flex justify-between text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">{notification.title}</p>
                        <p>{notification.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground w-full">{notification.description}</p>
                </DropdownMenuItem>
            ))}
            {notificationCount === 0 && (
                <div className="text-center text-sm text-muted-foreground p-4">
                    No new notifications
                </div>
            )}
             <DropdownMenuSeparator />
             <DropdownMenuFooter>
                <Button variant="ghost" className="w-full" onClick={() => setNotificationCount(0)} disabled={notificationCount === 0}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark all as read
                </Button>
             </DropdownMenuFooter>
        </DropdownMenuContent>
       </DropdownMenu>
      <UserNav />
    </header>
  )
}
