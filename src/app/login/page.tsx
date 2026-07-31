"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary pl-0 h-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <Card className="w-full max-w-md border-border shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="space-y-4 text-center pt-10 pb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary font-headline">
              InfoFlow-AI
            </CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              Internal Knowledge Assistant
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">Work Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                className="h-11 border-input focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground/80">Password</Label>
                <Link href="#" className="text-xs text-muted-foreground hover:text-primary font-medium transition-colors">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="h-11 border-input focus-visible:ring-primary"
              />
            </div>
            
            <Link href="/dashboard" className="block pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-sm font-bold transition-all shadow-md active:scale-[0.98]">
                Secure Sign In
              </Button>
            </Link>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-10 pt-0 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary font-bold hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
          <div className="pt-4 border-t w-full">
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold">
              Protected by enterprise-grade AI security
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
