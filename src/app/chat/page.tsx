"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Info, 
  Search,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { employeeKnowledgeQuery } from '@/ai/flows/employee-knowledge-query-flow';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize first message on client side only to avoid hydration mismatch
    setMessages([
      {
        role: 'assistant',
        content: "Hello! I'm InfoFlow AI, your corporate knowledge assistant. Ask me anything about company policies, reports, or procedures.",
        timestamp: new Date(),
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const response = await employeeKnowledgeQuery(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.", 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-5xl mx-auto">
      <div className="mb-6 flex flex-col gap-4">
        <Link href="/dashboard" className="w-fit">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-headline text-primary flex items-center gap-3">
              <Bot className="h-8 w-8" />
              AI Assistant
            </h2>
            <p className="text-sm text-muted-foreground">Connected to Company Knowledge Base</p>
          </div>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border shadow-xl rounded-2xl">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-8 max-w-3xl mx-auto py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    message.role === 'user' ? 'bg-secondary' : 'bg-primary'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-6 w-6 text-white" />
                    ) : (
                      <Sparkles className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className={`flex flex-col gap-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      message.role === 'user' 
                        ? 'bg-secondary text-white rounded-tr-none' 
                        : 'bg-muted/30 text-foreground border rounded-tl-none'
                    }`}>
                      {message.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[80%]">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border rounded-tl-none text-sm text-muted-foreground flex items-center gap-3">
                    <Search className="h-4 w-4 animate-pulse" />
                    Analyzing knowledge base...
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <CardContent className="p-6 border-t bg-white">
          <form onSubmit={handleSend} className="flex gap-3 max-w-4xl mx-auto">
            <Input
              placeholder="Ask a question about policies, procedures, or reports..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 h-12 rounded-xl focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-xl shadow-lg shadow-primary/20">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              <span className="ml-2 hidden sm:inline font-bold">Ask AI</span>
            </Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider w-full text-center mb-1">Common Questions:</span>
            {["Vacation policy?", "Expense reports?", "Onboarding process?"].map((suggestion) => (
              <Button 
                key={suggestion} 
                variant="outline" 
                size="sm" 
                className="text-[11px] h-8 rounded-full text-muted-foreground border-muted-foreground/20 hover:border-primary/40 hover:text-primary transition-all"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground/70 justify-center font-medium">
        <Info className="h-3.5 w-3.5" />
        InfoFlow AI provides information based on current internal documents. Always verify critical data.
      </div>
    </div>
  );
}
