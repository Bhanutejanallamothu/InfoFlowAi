"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
    { name: "History", href: "/history" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-10">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-primary tracking-tight">InfoFlow AI</span>
        </Link>

        {/* Middle: Navigation Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                pathname === link.href 
                  ? "text-primary bg-primary/5" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="font-medium">Login</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-medium px-5">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Navigation</p>
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className={cn(
                        "text-lg font-medium transition-colors",
                        pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-6 border-t">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full bg-primary">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}