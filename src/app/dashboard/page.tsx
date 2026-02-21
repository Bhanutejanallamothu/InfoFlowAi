import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  TrendingUp,
  Clock,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { name: "Active Employees", value: "342", icon: Users, change: "+5%", trend: "up" },
    { name: "Response Accuracy", value: "98.2%", icon: TrendingUp, change: "+0.4%", trend: "up" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold font-headline tracking-tight text-primary">Welcome back, Alex</h2>
          <p className="text-muted-foreground">Here's what's happening in InfoFlow today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Download Report</Button>
          <Link href="/chat">
            <Button size="sm" className="bg-secondary hover:bg-secondary/90">New Query</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.name} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change} <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Jane Smith", action: "queried", detail: "Vacation Policy 2024", time: "10 mins ago" },
                { user: "System", action: "indexed", detail: "Q3 Fiscal Report", time: "1 hour ago" },
                { user: "Mark Doe", action: "downloaded", detail: "Employee Handbook", time: "3 hours ago" },
                { user: "Alex Rivera", action: "queried", detail: "Expense Reimbursement", time: "5 hours ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <span className="font-semibold">{item.user}</span>
                    <span className="text-muted-foreground mx-1">{item.action}</span>
                    <span className="italic">"{item.detail}"</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{item.time}</span>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-primary p-0" asChild>
              <Link href="/history">View all activity history</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
