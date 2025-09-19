
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
import { Paperclip, Mic, Send, Bot, Wand2, FileText, BarChart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import {
  generateInsightfulReport,
} from '@/ai/flows/generate-insightful-reports';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

// Mock data to simulate RAG (Retrieval-Augmented Generation)
const mockProjectDocuments = [
    { content: "Project: Downtown Skyscraper. Total Budget: $120,500,000. Spent to Date: $54,200,000." },
    { content: "The current budget is 3% ahead of the planned spending for this stage of the Downtown Skyscraper project." },
    { content: "An AI-calculated budget health score of 95% indicates strong financial management." },
    { content: "The primary risk identified is a potential 2-week delay in steel supply, with a 70% probability." }
];

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! How can I help you with your projects today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await generateInsightfulReport({
        query: input,
        documents: mockProjectDocuments,
        userContext: {
            name: "Jane Doe",
            role: "Project Manager"
        },
        projectContext: {
            name: "Downtown Skyscraper",
            status: "On Track"
        }
      });
      
      const botMessage: Message = { sender: 'bot', text: result.report };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


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
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                   {message.sender === 'bot' && (
                     <Avatar>
                        <Bot className="h-10 w-10 p-2 border rounded-full bg-ai-accent text-white" />
                    </Avatar>
                   )}
                  <div className={`rounded-lg p-3 max-w-md ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'border bg-card'}`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                   {message.sender === 'user' && (
                     <Avatar>
                        <AvatarImage src="https://picsum.photos/seed/2/100/100" data-ai-hint="user portrait" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                   )}
                </div>
              ))}
               {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <Bot className="h-10 w-10 p-2 border rounded-full bg-ai-accent text-white" />
                    </Avatar>
                    <div className="rounded-lg border bg-card p-3 flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <p className="text-sm text-muted-foreground">Thinking...</p>
                    </div>
                  </div>
                )}
            </CardContent>
            <CardFooter className="border-t p-4">
              <form onSubmit={handleSendMessage} className="relative w-full">
                <Input
                  placeholder="Type a message or ask a question..."
                  className="pr-24"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button variant="ghost" size="icon" type="button">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" type="button">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
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
              <Button variant="outline" className="w-full justify-start" onClick={() => setInput('Generate the weekly progress report for Downtown Skyscraper')}>
                <FileText className="mr-2 h-4 w-4" /> Generate Weekly Report
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setInput('Are there any cost overruns on the Downtown Skyscraper project?')}>
                <BarChart className="mr-2 h-4 w-4" /> Analyze Cost Overruns
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setInput('Suggest some schedule optimizations for the Downtown Skyscraper project.')}>
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
