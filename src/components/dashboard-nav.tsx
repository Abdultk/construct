
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GanttChartSquare, Home, Settings, Users, FileText, Bell, HardHat, DollarSign, ClipboardList, Network } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge";

export function DashboardNav() {
  const pathname = usePathname();
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/projects", label: "Projects", icon: GanttChartSquare, badge: '5' },
    { href: "/boq", label: "BOQ", icon: ClipboardList },
    { href: "/wbs", label: "WBS", icon: Network },
    { href: "/field-dashboard", label: "Field", icon: HardHat },
    { href: "/financial-dashboard", label: "Financials", icon: DollarSign },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: '2' },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            (pathname === href || (href !== '/dashboard' && pathname.startsWith(href))) && "bg-muted text-primary"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
          {badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{badge}</Badge>}
        </Link>
      ))}
    </nav>
  )
}
