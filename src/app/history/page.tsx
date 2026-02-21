"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ArrowLeft,
  Tag,
  Cpu,
  FileText,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

const historySessions = [
  { 
    id: 1, 
    title: "Vacation Carryover Policy", 
    preview: "Can I roll over unused vacation days to next year?", 
    fullContent: "The employee asked about the 2024 vacation rollover policy. InfoFlow AI explained that up to 5 days can be carried over to the next calendar year, provided they are used by March 31st.",
    date: "Feb 12, 2024", 
    tokens: 421,
    category: "Benefits",
    status: "Completed"
  },
  { 
    id: 2, 
    title: "Expense Report Deadline", 
    preview: "What is the deadline for submitting Q4 expenses?", 
    fullContent: "Query regarding the final date for Q4 2023 expense submissions. The assistant confirmed the deadline as January 15, 2024, and provided a link to the finance portal.",
    date: "Feb 10, 2024", 
    tokens: 215,
    category: "Finance",
    status: "Completed"
  },
  { 
    id: 3, 
    title: "Onboarding Laptop Request", 
    preview: "How do new hires request their work equipment?", 
    fullContent: "Inquiry about the hardware procurement process for new engineering hires. The system detailed the IT ticket system workflow and the standard 'Developer Pro' laptop package specifications.",
    date: "Feb 08, 2024", 
    tokens: 652,
    category: "IT Support",
    status: "Completed"
  },
  { 
    id: 4, 
    title: "Remote Work Reimbursement", 
    preview: "Does the company cover home internet costs?", 
    fullContent: "Detailed discussion on the remote work stipend. InfoFlow AI verified that a $50/month stipend is available for employees categorized as 'Fully Remote' or 'Hybrid'.",
    date: "Feb 05, 2024", 
    tokens: 310,
    category: "Policies",
    status: "Completed"
  },
];

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openSessionId, setOpenSessionId] = useState<number | null>(null);

  const filteredSessions = historySessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-fit gap-2 text-muted-foreground hover:text-primary pl-0 h-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline text-primary">Conversation History</h2>
            <p className="text-sm text-muted-foreground">Review and revisit your previous interactions with InfoFlow AI.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search past sessions..." 
              className="pl-9 h-11 rounded-xl focus-visible:ring-primary shadow-sm" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <Collapsible
              key={session.id}
              open={openSessionId === session.id}
              onOpenChange={() => setOpenSessionId(openSessionId === session.id ? null : session.id)}
              className="w-full"
            >
              <Card className={`transition-all duration-300 overflow-hidden border shadow-sm hover:shadow-md ${openSessionId === session.id ? 'ring-1 ring-primary/20 border-primary/20 bg-primary/[0.02]' : 'bg-white'}`}>
                <CollapsibleTrigger asChild>
                  <CardContent className="p-5 flex items-center gap-5 cursor-pointer select-none group">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                      openSessionId === session.id ? 'bg-primary text-white shadow-lg' : 'bg-primary/5 text-primary group-hover:bg-primary/10'
                    }`}>
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg font-headline truncate text-primary/90">{session.title}</h3>
                        <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider px-2 py-0 h-5 bg-muted/60">
                          {session.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate leading-relaxed">
                        {session.preview}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-semibold">
                        <Calendar className="h-3 w-3" />
                        {session.date}
                      </div>
                      <div className="text-primary/60">
                        {openSessionId === session.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-5 pb-6 pt-0 border-t border-primary/5">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary/70 uppercase tracking-widest mb-1">
                          <FileText className="h-3.5 w-3.5" />
                          Full Interaction Summary
                        </div>
                        <p className="text-[15px] leading-relaxed text-foreground/80 bg-white p-4 rounded-xl border border-primary/10 shadow-sm italic">
                          "{session.fullContent}"
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary/70 uppercase tracking-widest mb-1">
                          <Cpu className="h-3.5 w-3.5" />
                          Session Metadata
                        </div>
                        <div className="bg-white rounded-xl border border-primary/10 p-4 space-y-3 shadow-sm">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Tag className="h-3.5 w-3.5" /> Category
                            </span>
                            <span className="font-semibold text-primary">{session.category}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" /> Status
                            </span>
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 text-[10px] font-bold h-5 uppercase">
                              {session.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Cpu className="h-3.5 w-3.5" /> Token Usage
                            </span>
                            <span className="font-mono font-bold text-primary/70">{session.tokens}</span>
                          </div>
                        </div>
                        <Button className="w-full h-10 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary/90">
                          Reopen This Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))
        ) : (
          <div className="py-24 text-center text-muted-foreground bg-white rounded-[32px] border border-dashed">
            <Search className="h-16 w-16 mx-auto mb-4 opacity-10" />
            <h3 className="text-xl font-headline font-bold text-primary/40">No matching history</h3>
            <p className="text-sm mt-1">Try adjusting your search terms to find what you're looking for.</p>
          </div>
        )}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold font-headline mb-5 flex items-center gap-2 text-primary/80">
          <Clock className="h-5 w-5" />
          System Audit Logs
        </h3>
        <Card className="rounded-[24px] overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y text-xs">
              {[
                { time: "Today, 14:20", event: "Chat Session #182 started", user: "Alex Rivera", ip: "10.0.4.12" },
                { time: "Today, 09:15", event: "System Backup Successful", user: "System", ip: "10.0.0.1" },
                { time: "Yesterday, 17:45", event: "Document Indexing Completed", user: "Alex Rivera", ip: "10.0.4.12" },
              ].map((log, i) => (
                <div key={i} className="p-4 flex justify-between items-center text-muted-foreground hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-6">
                    <span className="w-24 shrink-0 font-bold opacity-70 uppercase tracking-tighter">{log.time}</span>
                    <span className="font-semibold text-foreground/80">{log.event}</span>
                  </div>
                  <div className="flex items-center gap-6 hidden sm:flex">
                    <span className="bg-primary/5 px-2 py-0.5 rounded text-primary/70 font-bold">{log.user}</span>
                    <span className="font-mono opacity-50">{log.ip}</span>
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
