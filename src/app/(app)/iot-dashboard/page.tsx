
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
  Signal,
  Clock,
  Bell,
  AlertTriangle,
  Download,
  Thermometer,
  TrendingUp,
  BarChart,
  Rss,
  LineChart,
  History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function IotDashboardPage() {

    const sensors = [
        { id: 'TEMP-01', name: 'Concrete Slab Temperature', value: '25°C', status: 'Normal', trend: 'up' },
        { id: 'VIB-02', name: 'Crane Vibration', value: '0.5g', status: 'Alert', trend: 'down' },
        { id: 'HUM-01', name: 'Basement Humidity', value: '60%', status: 'Normal', trend: 'stable' },
        { id: 'STR-03', name: 'Steel Beam Strain', value: '350µε', status: 'Warning', trend: 'up' },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Normal': return 'text-green-500';
            case 'Warning': return 'text-yellow-500';
            case 'Alert': return 'text-red-500';
            default: return 'text-muted-foreground';
        }
    }
    
    const getTrendIcon = (trend: string) => {
        if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
        if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
        return <BarChart className="h-4 w-4 text-gray-500" />;
    }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">IoT Data Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of on-site sensors.</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-2 p-2 text-sm">
            <Rss className="h-5 w-5 text-green-500" />
            <span>Connected</span>
          </Badge>
          <Badge variant="outline" className="gap-2 p-2 text-sm">
            <Clock className="h-5 w-5" />
            <span>Last update: 5s ago</span>
          </Badge>
          <Button variant="destructive">
            <Bell className="mr-2 h-4 w-4" />
            1 Active Alert
          </Button>
           <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {sensors.map(sensor => (
            <Card key={sensor.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">{sensor.name}</CardTitle>
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className='flex items-baseline justify-between'>
                        <p className={`text-2xl font-bold ${getStatusColor(sensor.status)}`}>{sensor.value}</p>
                         {getTrendIcon(sensor.trend)}
                    </div>
                    <p className="text-xs text-muted-foreground">{sensor.id}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4">
        {/* Main Grid */}
        <div className="col-span-8 flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sensor Data Analysis</CardTitle>
                    <CardDescription>Visualize trends and correlations between sensors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Chart coming soon.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Historical Data</CardTitle>
                    <CardDescription>Review past performance and anomalies.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Data table coming soon.</p>
                </CardContent>
            </Card>
        </div>

        {/* Alert Panel */}
        <div className="col-span-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Crane Vibration Exceeds Threshold</p>
                            <Badge variant="destructive">Critical</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Sensor VIB-02 - 2 mins ago</p>
                    </div>
                     <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">Steel Beam Strain Anomaly</p>
                            <Badge variant="default">Warning</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Sensor STR-03 - 15 mins ago</p>
                    </div>
                    <Button variant="outline" className="w-full">
                        <History className="mr-2 h-4 w-4" /> View Alert History
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
