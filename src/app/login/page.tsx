"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-md border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="space-y-4 text-center pt-10 pb-6">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              InfoFlow AI
            </CardTitle>
            <CardDescription className="text-sm font-medium text-slate-500 font-sans">
              Internal Knowledge Assistant
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                className="h-11 border-slate-200 focus-visible:ring-slate-900"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                <Link href="#" className="text-xs text-slate-500 hover:text-slate-900 font-medium">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="h-11 border-slate-200 focus-visible:ring-slate-900"
              />
            </div>
            
            <Link href="/dashboard" className="block pt-2">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-11 text-sm font-semibold transition-colors rounded-lg">
                Secure Sign In
              </Button>
            </Link>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-10 pt-0 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-slate-900 font-bold hover:underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
