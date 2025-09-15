
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
  ClipboardList
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { Logo } from "./logo"

export function Header() {
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
              href="/boq"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <ClipboardList className="h-5 w-5" />
              BOQ
            </Link>
             <Link
              href="/field-dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <HardHat className="h-5 w-5" />
              Field
            </Link>
             <Link
              href="/financial-dashboard"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <DollarSign className="h-5 w-5" />
              Financials
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
              href="/notifications"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Bell className="h-5 w-5" />
              Notifications
               <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                2
              </Badge>
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
       <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute top-0 right-0 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-1 text-[10px]">2</Badge>
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <UserNav />
    </header>
  )
}
