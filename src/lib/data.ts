export type Project = {
    id: string;
    name: string;
    status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
    portfolioValue: number;
    budgetHealth: number;
    completionPercentage: number;
    budget: number;
    spent: number;
};
  
export const projects: Project[] = [
    {
      id: 'proj-001',
      name: 'Downtown Skyscraper',
      status: 'On Track',
      portfolioValue: 120500000,
      budgetHealth: 95,
      completionPercentage: 45,
      budget: 100000000,
      spent: 42000000,
    },
    {
      id: 'proj-002',
      name: 'Suburban Housing Development',
      status: 'At Risk',
      portfolioValue: 75000000,
      budgetHealth: 78,
      completionPercentage: 80,
      budget: 65000000,
      spent: 58000000,
    },
    {
      id: 'proj-003',
      name: 'Interstate Bridge Retrofit',
      status: 'On Track',
      portfolioValue: 250000000,
      budgetHealth: 89,
      completionPercentage: 22,
      budget: 220000000,
      spent: 45000000,
    },
    {
      id: 'proj-004',
      name: 'City General Hospital Wing',
      status: 'Delayed',
      portfolioValue: 92000000,
      budgetHealth: 65,
      completionPercentage: 65,
      budget: 80000000,
      spent: 71000000,
    },
    {
      id: 'proj-005',
      name: 'Coastal Wind Farm',
      status: 'Completed',
      portfolioValue: 310000000,
      budgetHealth: 105,
      completionPercentage: 100,
      budget: 300000000,
      spent: 295000000,
    },
];

export const portfolioPerformance = [
    { month: "Jan", budget: 186, actual: 160 },
    { month: "Feb", budget: 305, actual: 280 },
    { month: "Mar", budget: 237, actual: 240 },
    { month: "Apr", budget: 273, actual: 290 },
    { month: "May", budget: 209, actual: 200 },
    { month: "Jun", budget: 214, actual: 220 },
];
  
export const kpiData = {
    totalPortfolioValue: projects.reduce((acc, p) => acc + p.portfolioValue, 0),
    activeProjects: projects.filter(p => p.status !== 'Completed').length,
    overallBudgetHealth: Math.round(projects.reduce((acc, p) => acc + p.budgetHealth, 0) / projects.length),
    safetyIncidents: 3,
};

export const projectStatusDistribution = projects.reduce((acc, project) => {
  const status = project.status;
  const existing = acc.find(item => item.status === status);
  if (existing) {
    existing.count++;
  } else {
    acc.push({ status: status, count: 1 });
  }
  return acc;
}, [] as { status: string, count: number }[]);
