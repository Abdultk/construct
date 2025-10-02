
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Folder } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

export default function DocumentLibraryPage() {

    const getImageForProject = (projectName: string) => {
        const seed = projectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `https://picsum.photos/seed/${seed}/400/200`;
    }
    
    const getStatusVariant = (status: string) => {
        switch(status) {
            case 'On Track': return 'secondary';
            case 'At Risk': return 'default';
            case 'Delayed': return 'destructive';
            default: return 'outline';
        }
    }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline">Document Library</h1>
          <p className="text-muted-foreground">
            Select a project to view its document library.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="p-0">
                <Link href={`/projects/${project.id}/documents`}>
                    <div className="relative h-40 w-full rounded-t-lg overflow-hidden">
                         <Image 
                            src={getImageForProject(project.name)}
                            alt={`Image for ${project.name}`}
                            fill
                            className="object-cover"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                         <div className="absolute bottom-4 left-4">
                            <h3 className="font-bold text-lg text-white font-headline">{project.name}</h3>
                         </div>
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="p-4 flex-1">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                </div>
                 <div className="space-y-1">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{project.completionPercentage}%</span>
                    </div>
                    <Progress value={project.completionPercentage} className="h-2" />
                 </div>
              </div>
            </CardContent>
             <CardFooter className="p-4">
                <Link href={`/projects/${project.id}/documents`} className="w-full">
                    <Button variant="outline" className="w-full">
                       <Folder className="mr-2 h-4 w-4" />
                       Open Library
                       <ArrowRight className="ml-auto h-4 w-4" />
                    </Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
