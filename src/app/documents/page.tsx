"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  FileText, 
  MoreVertical, 
  Download,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const initialDocs = [
  { id: 1, name: "Vacation Policy 2024.pdf", size: "1.2 MB", type: "Policy", date: "2023-11-15", status: "Indexed" },
  { id: 2, name: "Expense Reimbursement Guide.docx", size: "450 KB", type: "Guideline", date: "2024-01-10", status: "Indexed" },
  { id: 3, name: "Q4 Marketing Strategy.pptx", size: "4.5 MB", type: "Report", date: "2023-12-05", status: "Processing" },
  { id: 4, name: "Employee Handbook.pdf", size: "2.8 MB", type: "Policy", date: "2023-08-20", status: "Indexed" },
  { id: 5, name: "Remote Work Agreement.pdf", size: "850 KB", type: "Contract", date: "2023-09-12", status: "Error" },
  { id: 6, name: "IT Security Protocols.pdf", size: "1.1 MB", type: "Policy", date: "2024-02-01", status: "Indexed" },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState("");

  const filteredDocs = docs.filter(doc => 
    doc.name.toLowerCase().includes(search.toLowerCase()) || 
    doc.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary">Knowledge Base</h2>
          <p className="text-sm text-muted-foreground">Manage internal documents used for AI context.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-lg font-headline">Internal Documents</CardTitle>
              <CardDescription>A list of all documents currently indexed in the system.</CardDescription>
            </div>
            <div className="relative w-full max-w-sm ml-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search documents..." 
                className="pl-9 h-9" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">{doc.name}</span>
                          <span className="text-[10px] text-muted-foreground sm:hidden">Size: {doc.size}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="font-normal">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-xs">{doc.size}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={doc.status === 'Indexed' ? 'default' : doc.status === 'Error' ? 'destructive' : 'secondary'}
                        className={`text-[10px] font-semibold ${doc.status === 'Indexed' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}`}
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredDocs.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No documents found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-secondary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg font-headline text-secondary">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Indexer Latency", value: "Normal (2s)" },
                { label: "Embedding Engine", value: "Online" },
                { label: "Vector DB Sync", value: "1 min ago" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
