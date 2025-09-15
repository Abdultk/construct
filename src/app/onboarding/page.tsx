'use client';

import * as React from 'react';
import { ArrowRight, Rocket, TrendingUp, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function OnboardingPage() {
    const welcomeImage = PlaceHolderImages.find(p => p.id === 'login-hero');

    const benefits = [
        {
          icon: Rocket,
          title: 'Streamline Operations',
          description: 'Manage projects, teams, and finances from a single platform.',
        },
        {
          icon: TrendingUp,
          title: 'AI-Powered Insights',
          description: 'Leverage AI for predictive analysis, budget optimization, and risk mitigation.',
        },
        {
          icon: Users,
          title: 'Enhance Collaboration',
          description: 'Keep your team, stakeholders, and clients aligned in real-time.',
        },
        {
          icon: Shield,
          title: 'Ensure Compliance',
          description: 'Maintain safety standards and project compliance with automated tracking.',
        },
      ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-3xl font-headline">Welcome to ConstructAI</CardTitle>
                    <CardDescription>Your all-in-one platform for AI-powered construction management.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                            <benefit.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                            <h3 className="font-semibold">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="p-0 mt-8">
                    <Button asChild className="w-full font-bold">
                        <Link href="/onboarding/role-selection">
                        Get Started <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </div>
            <div className="hidden md:block relative">
                {welcomeImage && (
                    <Image
                    src={welcomeImage.imageUrl}
                    alt="Construction site"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={welcomeImage.imageHint}
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-bold font-headline text-xl">Build Faster, Smarter, Safer</h3>
                    <p className="text-sm">Join thousands of leading construction firms.</p>
                 </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
