'use client';

import { useState } from 'react';
import { ShieldCheck, FileText, ArrowRight, Lock, CheckCircle2, UploadCloud } from 'lucide-react';
// Import your existing Checkout Component here or keep it in the same file
import TrevbuildCheckout from './checkout/page'; 
import './globals.css'; // Make sure this path is correct

export default function WelcomePortal() {
  const [view, setView] = useState<'welcome' | 'checkout'>('welcome');

  if (view === 'checkout') {
    return <TrevbuildCheckout onBack={() => setView('welcome')} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 selection:bg-blue-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-slate-500/5 blur-[100px]" />
      </div>

      <main className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: The Value Proposition */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            Official Trevonix OU Partner
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
            Award Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Project</span> Today.
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md">
            Agree on a contract with your chosen contractor.if you like you can Make it official by uploading your signed documents and paying the deposit through <span className="text-white font-bold">Secure Pay</span>.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3 h-3 text-blue-500" />
              </div>
              <p className="text-sm text-slate-300">Upload signed contracts directly to the cloud (optional).</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3 h-3 text-blue-500" />
              </div>
              <p className="text-sm text-slate-300">Escrow-style security for complete peace of mind.</p>
            </div>
          </div>

          <button 
            onClick={() => setView('checkout')}
            className="group flex items-center gap-4 bg-white text-slate-950 px-8 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-white/5"
          >
            PROCEED TO SECURE PAY
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Right Side: The Interactive "Upload" Card */}
        <div className="relative animate-in fade-in slide-in-from-right duration-1000">
          <div className="bg-slate-900/50 backdrop-blur-3xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Lock className="text-slate-700 w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold mb-2">Contract Submission (optional)</h3>
            <p className="text-slate-500 text-sm mb-6">Attach your signed agreement to finalize the awarding process (optional).</p>

            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center group hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
              <UploadCloud className="w-12 h-12 text-slate-600 group-hover:text-blue-500 transition-colors mb-4" />
              <p className="text-sm font-bold text-slate-400">Click or Drag Contract</p>
              <p className="text-[10px] text-slate-600 mt-1 uppercase">PDF, DOCX (Max 10MB)</p>
            </div>
          </div>
          
          {/* Decorative "Glass" piece behind the main card */}
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-600/20 rounded-[2.5rem] blur-xl -z-10" />
        </div>
      </main>

      <footer className="mt-20 text-slate-600 text-[10px] uppercase tracking-[0.5em]">
        Trevonix OU &bull; Secure Infrastructure 2026
      </footer>
    </div>
  );
}