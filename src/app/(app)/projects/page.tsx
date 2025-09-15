
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
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function ProjectsPage() {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
    }).format(value)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
            A list of all projects in your portfolio.
            </CardDescription>
        </div>
        <Button asChild>
            <Link href="/projects/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
            </Link>
        </Button>
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
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="hover:underline">
                    <div className="font-medium font-headline">{project.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      ID: {project.id}
                    </div>
                  </Link>
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
  )
}
