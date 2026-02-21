import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Shield, Zap, ShieldCheck } from "lucide-react";
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
        <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-8">
                <Bot className="h-4 w-4" />
                <span>Enterprise Knowledge Assistant</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-headline leading-tight text-primary mb-6 tracking-tight">
                Unlock Your Team's <br />
                <span className="text-secondary">Collective Intelligence.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                InfoFlow AI connects your team to the information they need instantly. Upload documents, query policies, and get accurate answers using our secure RAG engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block select-none">
            <div className="relative w-full h-full">
               <Image 
                src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1200/800"} 
                alt="Corporate background"
                fill
                className="object-cover opacity-10"
                priority
                data-ai-hint="corporate background"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50">
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
      </main>

      <footer className="border-t py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-xl text-primary tracking-tight">InfoFlow AI</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">Chat</Link>
              <Link href="/history" className="text-muted-foreground hover:text-primary transition-colors">History</Link>
            </div>
            <div className="flex gap-4">
               <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Join Now</Button>
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 InfoFlow AI. Enterprise Information Management.</p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
              <Link href="#" className="hover:text-primary">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}