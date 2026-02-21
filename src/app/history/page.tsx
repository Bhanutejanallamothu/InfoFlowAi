import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, ChevronRight, User, Bot, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const historySessions = [
  { 
    id: 1, 
    title: "Vacation Carryover Policy", 
    preview: "Can I roll over unused vacation days to next year?", 
    date: "Feb 12, 2024", 
    tokens: 421,
    category: "Benefits"
  },
  { 
    id: 2, 
    title: "Expense Report Deadline", 
    preview: "What is the deadline for submitting Q4 expenses?", 
    date: "Feb 10, 2024", 
    tokens: 215,
    category: "Finance"
  },
  { 
    id: 3, 
    title: "Onboarding Laptop Request", 
    preview: "How do new hires request their work equipment?", 
    date: "Feb 08, 2024", 
    tokens: 652,
    category: "IT Support"
  },
  { 
    id: 4, 
    title: "Remote Work Reimbursement", 
    preview: "Does the company cover home internet costs?", 
    date: "Feb 05, 2024", 
    tokens: 310,
    category: "Policies"
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard" className="w-fit">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary pl-0 h-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Conversation History</h2>
            <p className="text-sm text-muted-foreground">Review and revisit your previous interactions with InfoFlow AI.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search past sessions..." className="pl-9" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {historySessions.map((session) => (
          <Card key={session.id} className="hover:border-secondary transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-base font-headline truncate">{session.title}</h3>
                  <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{session.category}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate italic">"{session.preview}"</p>
                <div className="flex items-center gap-4 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {session.date}
                  </span>
                  <span>{session.tokens} tokens used</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 group-hover:text-secondary group-hover:translate-x-1 transition-transform">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold font-headline mb-4">Audit Logs</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y text-xs">
              {[
                { time: "Today, 14:20", event: "Chat Session #182 started", user: "Alex Rivera", ip: "10.0.4.12" },
                { time: "Today, 09:15", event: "System Backup Successful", user: "System", ip: "10.0.0.1" },
                { time: "Yesterday, 17:45", event: "Document Indexing Completed", user: "Alex Rivera", ip: "10.0.4.12" },
              ].map((log, i) => (
                <div key={i} className="p-3 flex justify-between items-center text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="w-24 shrink-0">{log.time}</span>
                    <span className="font-medium text-foreground">{log.event}</span>
                  </div>
                  <div className="flex items-center gap-4 hidden sm:flex">
                    <span>{log.user}</span>
                    <span className="font-mono">{log.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
