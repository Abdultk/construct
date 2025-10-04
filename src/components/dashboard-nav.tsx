
'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GanttChartSquare, Home, Settings, Users, FileText, Bell, HardHat, DollarSign, ClipboardList, Network, ListFilter, TrendingUp, Edit, FileCheck, FilePlus, Eye, Shield, ClipboardCheck, Siren, Orbit, Signal, LineChart, Library, Wrench, RefreshCw, Bot, Briefcase, Folder, Send, Archive } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge";

export function DashboardNav() {
  const pathname = usePathname();
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/projects", label: "Projects", icon: GanttChartSquare, badge: '5' },
    { href: "/document-library", label: "Document Library", icon: Archive },
    { href: "/boq", label: "BOQ", icon: ClipboardList },
    { href: "/program-of-works", label: "Program of Works", icon: Network },
    { href: "/change-orders", label: "Change Orders", icon: FilePlus, badge: '3' },
    { href: "/budget-establishment", label: "Budget", icon: DollarSign },
    { href: "/cost-tracking", label: "Cost Tracking", icon: ListFilter },
    { href: "/payment-certificate", label: "Payments", icon: FileCheck },
    { href: "/safety-dashboard", label: "Safety", icon: Shield },
    { href: "/quality-control", label: "Quality", icon: ClipboardCheck },
    { href: "/digital-twin", label: "Digital Twin", icon: Orbit },
    { href: "/facility-performance", label: "Facility Performance", icon: LineChart },
    { href: "/asset-registry", label: "Asset Registry", icon: Library },
    { href: "/maintenance-management", label: "Maintenance", icon: Wrench },
    { href: "/lifecycle-cost-analysis", label: "Lifecycle Cost", icon: RefreshCw },
    { href: "/teams", label: "Teams", icon: Users },
    { href: "/reports", label: "Reports", icon: FileText },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  // A sub-item that won't be displayed in the main nav, but will be used for active state
  const subNavItems = [
      { href: "/projects/[id]/documents", label: "Documents", icon: Folder, parent: "/document-library" },
  ]

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon, badge }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            (pathname === href || 
             (href !== '/dashboard' && pathname.startsWith(href)) ||
             (subNavItems.find(sub => new RegExp(`^${sub.href.replace(/\[id\]/g, '(?<id>[^/]+)')}$`).test(pathname))?.parent === href)
            ) && "bg-muted text-primary"
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
