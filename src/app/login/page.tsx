import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fdfbf7] via-[#fcf9f2] to-[#f5f0e6] px-4 py-12">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-transform hover:scale-105">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-slate-900 tracking-tight">
              InfoFlow AI
            </h1>
            <p className="text-sm font-light text-slate-500 italic tracking-wide">
              Intelligent Knowledge. Beautifully Delivered.
            </p>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-10 md:p-12 space-y-8">
          <form className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold ml-1">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                className="border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus-visible:ring-0 focus-visible:border-slate-900 transition-colors placeholder:text-slate-300"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold ml-1">Password</Label>
                <Link href="#" className="text-[10px] uppercase tracking-wider text-slate-400 hover:text-slate-900 transition-colors">Forgot?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="border-0 border-b border-slate-200 bg-transparent rounded-none px-1 h-10 focus-visible:ring-0 focus-visible:border-slate-900 transition-colors"
              />
            </div>
            
            <Link href="/dashboard" className="block w-full pt-4">
              <Button className="w-full bg-[#1a1c1e] hover:bg-[#2c2e30] text-white rounded-none h-12 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 shadow-sm">
                Enter Workspace
              </Button>
            </Link>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-400 font-light">
              Don't have access?{' '}
              <Link href="/signup" className="text-slate-900 font-medium hover:underline underline-offset-4">
                Request an invitation
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Secure Enterprise Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
