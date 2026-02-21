import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Bot, 
  Shield, 
  Zap, 
  ShieldCheck, 
  Database, 
  Search, 
  FileUp, 
  History, 
  Lock, 
  CheckCircle 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-white min-h-[85vh] flex items-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center lg:text-right lg:ml-auto lg:mr-0 bg-white/40 backdrop-blur-sm p-8 rounded-3xl lg:bg-transparent lg:backdrop-blur-none lg:p-0">
              <h1 className="text-5xl lg:text-7xl font-bold font-headline leading-tight text-primary mb-6 tracking-tight">
                Unlock Your Team's <br />
                <span className="text-secondary">Collective Intelligence.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed lg:ml-auto">
                InfoFlow AI connects your team to the information they need instantly. Upload documents, query policies, and get accurate answers using our secure RAG engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Link href="/chat">
                  <Button size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Background Image */}
          <div className="absolute top-0 right-0 w-full h-full select-none z-0">
            <div className="relative w-full h-full">
               <Image 
                src={heroImage?.imageUrl || "https://ik.imagekit.io/z5fowzj2wr/chatbot-ai.jpg"} 
                alt="AI Assistant background"
                fill
                className="object-cover opacity-60"
                priority
                data-ai-hint="ai chatbot"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
            </div>
          </div>
        </section>

        {/* Features Pillars Section */}
        <section className="py-24 bg-slate-50 relative z-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold font-headline text-primary mb-4 tracking-tight">Enterprise-Grade Knowledge Management</h2>
              <p className="text-muted-foreground">Built for modern teams who value accuracy, security, and speed in information retrieval.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart RAG Search",
                  description: "Context-aware search that understands the meaning behind your queries, ensuring high-fidelity answers.",
                  icon: Zap,
                  color: "bg-blue-500"
                },
                {
                  title: "Secure & Private",
                  description: "Your data is encrypted and stays within your organization. We prioritize privacy and strict compliance.",
                  icon: Shield,
                  color: "bg-indigo-600"
                },
                {
                  title: "Intelligent Synthesis",
                  description: "Natural conversations that synthesize complex information from multiple internal sources simultaneously.",
                  icon: Bot,
                  color: "bg-cyan-600"
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl border bg-white hover:shadow-xl transition-all duration-300 group">
                  <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-3 text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Grid Section */}
        <section className="py-24 bg-white border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold font-headline text-primary mb-4 tracking-tight">Key Features</h2>
              <p className="text-muted-foreground text-lg">Designed to simplify internal knowledge access with precision and clarity.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Centralized Knowledge Hub",
                  description: "Access all internal documents and policies in one unified platform.",
                  icon: Database
                },
                {
                  title: "AI-Powered Search",
                  description: "Ask natural language questions and receive context-aware responses.",
                  icon: Search
                },
                {
                  title: "Document Upload & Management",
                  description: "Easily upload, organize, and manage internal files securely.",
                  icon: FileUp
                },
                {
                  title: "Conversation History",
                  description: "View and revisit previous queries and responses anytime.",
                  icon: History
                },
                {
                  title: "Secure Access Control",
                  description: "Role-based authentication for employees and administrators.",
                  icon: Lock
                },
                {
                  title: "Fast & Accurate Responses",
                  description: "Optimized retrieval system ensuring reliable and relevant answers.",
                  icon: CheckCircle
                }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col p-8 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all shadow-sm hover:shadow-md">
                  <div className="h-10 w-10 text-primary/60 mb-6">
                    <feature.icon className="h-full w-full" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold font-headline mb-3 text-primary">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-16 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* 1. Branding */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span className="font-bold font-headline text-2xl text-primary tracking-tight">InfoFlow AI</span>
              </div>
              <p className="text-sm font-semibold text-secondary italic">
                "Intelligent Knowledge, Simplified."
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An AI-powered internal knowledge assistant for modern organizations.
              </p>
            </div>

            {/* 2. Quick Links */}
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">Chat</Link></li>
                <li><Link href="/history" className="text-muted-foreground hover:text-primary transition-colors">History</Link></li>
                <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">Login</Link></li>
                <li><Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
              </ul>
            </div>

            {/* 3. Product / Features */}
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-xs">Product</h4>
              <ul className="space-y-3 text-sm">
                <li className="text-muted-foreground">Smart RAG Search</li>
                <li className="text-muted-foreground">Secure Access</li>
                <li className="text-muted-foreground">Document Management</li>
                <li className="text-muted-foreground">AI Synthesis</li>
              </ul>
            </div>

            {/* 4. Support / Help */}
            <div>
              <h4 className="font-bold text-primary mb-6 uppercase tracking-wider text-xs">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* 5. Bottom Line */}
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 InfoFlow AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold">
              <span>Secure Cloud Architecture</span>
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
