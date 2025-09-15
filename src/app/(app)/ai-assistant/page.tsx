'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Paperclip, Mic, Send, Bot, Wand2, FileText, BarChart } from 'lucide-react';

export default function AiAssistantPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-ai-accent" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">Your intelligent project partner.</p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
        {/* Chat Window */}
        <div className="col-span-8 flex flex-col gap-4">
          <Card className="flex flex-1 flex-col">
            <CardContent className="flex-1 space-y-4 p-6 overflow-y-auto">
              {/* Message History */}
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="https://picsum.photos/seed/2/100/100" data-ai-hint="user portrait" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">
                    Can you give me a summary of the current budget status for the Downtown Skyscraper project?
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Avatar>
                  <Bot className="h-10 w-10 p-2 border rounded-full bg-ai-accent text-white" />
                </Avatar>
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-sm">
                    Of course. The "Downtown Skyscraper" project has a total budget of $120.5M.
                    Currently, $54.2M has been spent, which is 3% ahead of the planned budget for this stage. The AI-calculated budget health score is 95%.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="relative w-full">
                <Input
                  placeholder="Type a message or ask a question..."
                  className="pr-24"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-4 space-y-4 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> Generate Weekly Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" /> Analyze Cost Overruns
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Wand2 className="mr-2 h-4 w-4" /> Suggest Optimizations
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Context: Budget</CardTitle>
              <CardDescription>
                Related information based on your conversation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Contextual data will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
