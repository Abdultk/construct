
'use client'
import {
  Activity,
  ArrowUpRight,
  CircleDollarSign,
  ShieldCheck,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Bar,
  CartesianGrid,
  Pie,
  PieChart,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts"

import { kpiData, projects, portfolioPerformance, projectStatusDistribution } from "@/lib/data"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export default function Dashboard() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
    }).format(value)

  const upcomingMilestones = [
    { name: "Facade Completion (proj-001)", date: "Aug 30, 2024" },
    { name: "Core & Shell Handover (proj-002)", date: "Sep 15, 2024" },
    { name: "Final Inspections (proj-004)", date: "Oct 01, 2024" },
  ];

  const topRisks = [
    { level: 'High', description: 'High probability of steel supplier delaying delivery by 2 weeks.', color: 'text-destructive' },
    { level: 'Medium', description: 'Potential for 1-week delay on HVAC permits due to city backlog.', color: 'text-yellow-500' },
    { level: 'Low', description: 'Upcoming forecast shows minimal rain, low impact on schedule.', color: 'text-green-500' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Portfolio Value
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">
              {formatCurrency(kpiData.totalPortfolioValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{kpiData.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 since last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-ai-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline text-ai-accent">{kpiData.overallBudgetHealth}%</div>
            <p className="text-xs text-muted-foreground">AI Calculated Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Incidents</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{kpiData.safetyIncidents}</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Budget vs. Actual Costs (Last 6 Months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="min-h-[250px] w-full">
              <RechartsBarChart data={portfolioPerformance}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickFormatter={(value) => `$${value}M`} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="budget" fill="hsl(var(--secondary))" radius={4} />
                <Bar dataKey="actual" fill="hsl(var(--primary))" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="min-h-[150px] w-full">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={projectStatusDistribution}
                      dataKey="count"
                      nameKey="status"
                      innerRadius={40}
                      strokeWidth={5}
                    >
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Top identified project risks.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {topRisks.map((risk, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${risk.color}`} />
                            <div>
                                <p className="font-semibold text-sm">{risk.level} Risk</p>
                                <p className="text-xs text-muted-foreground">{risk.description}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
            <CardTitle>Top Performing Projects</CardTitle>
            <CardDescription>
                Projects with the highest budget health and performance.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Health</TableHead>
                    <TableHead className="hidden md:table-cell">Completion</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {projects.slice(0, 5).map((project) => (
                    <TableRow key={project.id}>
                    <TableCell>
                        <div className="font-medium font-headline">{project.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                        ID: {project.id}
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge
                        className="text-xs"
                        variant={
                            project.status === "On Track"
                            ? "secondary"
                            : project.status === "At Risk"
                            ? "outline"
                            : "destructive"
                        }
                        >
                        {project.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <div className="font-bold">{project.budgetHealth}%</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {project.completionPercentage}%
                    </TableCell>
                    <TableCell className="text-right font-code">
                        {formatCurrency(project.portfolioValue)}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="https://picsum.photos/seed/10/100/100" alt="Avatar" data-ai-hint="user portrait" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
                        <p className="text-sm text-muted-foreground">Approved change order #12 on "Downtown Skyscraper".</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                        5m ago
                    </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="https://picsum.photos/seed/11/100/100" alt="Avatar" data-ai-hint="user portrait" />
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Jackson Lee</p>
                        <p className="text-sm text-muted-foreground">Marked task "Foundation Pour" as complete.</p>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                        15m ago
                    </div>
                </div>
                <Separator />
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Upcoming Milestones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4">
                      {upcomingMilestones.map((milestone, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{milestone.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                        </div>
                      ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

    

    