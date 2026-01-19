'use client';

import { useState } from 'react';
import { Hammer, Wallet, ClipboardCheck, HardHat, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface CheckoutProps {
  onBack?: () => void;
}

const categories = [
  { id: 'deposit', label: 'Initial Deposit', icon: <Wallet className="w-5 h-5" />, desc: 'Secure project start date' },
  { id: 'progress', label: 'Milestone', icon: <Hammer className="w-5 h-5" />, desc: 'Phase completion payment' },
  { id: 'change', label: 'Change Order', icon: <ClipboardCheck className="w-5 h-5" />, desc: 'Upgrades & adjustments' },
  { id: 'final', label: 'Final Release', icon: <HardHat className="w-5 h-5" />, desc: 'Project wrap-up' },
];

export default function TrevbuildCheckout({ onBack }: CheckoutProps) {
  // --- State ---
  const [selectedCat, setSelectedCat] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Store receipt data here to avoid render errors
  const [receiptData, setReceiptData] = useState({ id: '', date: '' });

  // --- Payment Handler ---
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API logic
    setTimeout(() => {
      // 1. Generate unstable values safely inside an event handler
      const generatedId = "TB-" + Math.random().toString(36).substring(2, 11).toUpperCase();
      const generatedDate = new Date().toLocaleString();

      // 2. Update state all at once
      setReceiptData({ id: generatedId, date: generatedDate });
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  // --- Views ---
  if (success) {
    return (
      <SuccessView 
        amount={amount} 
        category={selectedCat} 
        memo={memo} 
        transactionId={receiptData.id}
        transactionDate={receiptData.date}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center p-4 lg:p-8 selection:bg-blue-500/30">
      {/* Brand Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-500/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-slate-900/40 backdrop-blur-3xl">
        
        {/* Left: Summary Panel */}
        <div className="lg:col-span-5 p-8 lg:p-12 bg-gradient-to-br from-blue-600/10 to-transparent border-r border-white/5">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-[#0056b3] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <HardHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
              Trev<span className="text-[#0056b3] not-italic">build</span>
            </h1>
          </div>

          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Type</span>
                <span className="text-white font-bold bg-blue-500/10 px-3 py-1 rounded-full text-xs uppercase text-blue-400 tracking-wider">
                  {selectedCat}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-sm">Reference</span>
                <span className="text-white font-semibold truncate max-w-[150px]">{memo || '---'}</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-slate-400 text-sm">Total Due</span>
                <span className="text-3xl font-black text-white italic">
                  <span className="text-[#0056b3] mr-1">$</span>
                  {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-950/50 border border-white/5">
              <ShieldCheck className="text-blue-500 w-6 h-6 shrink-0" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Security Protocol: <span className="text-white">AES-256 Encrypted</span>. Your payment is securely routed via Pateno Financial Bridge.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interaction Form */}
        <div className="lg:col-span-7 p-8 lg:p-12">
          <form onSubmit={handlePayment} className="space-y-10">
            <div>
              <h3 className="text-white font-bold mb-5 flex items-center gap-3 uppercase tracking-widest text-xs">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px]">01</span>
                Project Category
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCat(cat.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                      selectedCat === cat.id 
                        ? 'bg-[#0056b3] border-[#0056b3] text-white scale-[1.05] shadow-xl shadow-blue-600/20' 
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {cat.icon}
                    <span className="font-bold text-[10px] mt-3 uppercase tracking-tighter">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-white font-bold flex items-center gap-3 uppercase tracking-widest text-xs">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-[10px]">02</span>
                Billing Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Project ID / Ref</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. TB-5001"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-800"
                  />
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Amount (CAD)</label>
                  <input 
                    required
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-5 py-4 text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-800"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading || !amount}
              className="w-full group relative flex items-center justify-center gap-3 bg-[#0056b3] hover:bg-[#004494] disabled:bg-slate-800 text-white font-black py-6 rounded-2xl transition-all shadow-2xl shadow-blue-600/20 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <>
                  CONFIRM & AUTHORIZE
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

interface SuccessViewProps {
  amount: string;
  category: string;
  memo: string;
  transactionId: string;
  transactionDate: string;
}

function SuccessView({ amount, category, memo, transactionId, transactionDate }: SuccessViewProps) {
  const subtotal = Number(amount) / 1.13;
  const tax = Number(amount) - subtotal;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white text-slate-950 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden print:shadow-none">
        
        {/* Header */}
        <div className="p-8 border-b-2 border-slate-100 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Trev<span className="text-[#0056b3] not-italic">build</span>
            </h1>
            <p className="text-[10px] text-slate-500 mt-1 uppercase leading-tight">
              123 Construction Way, Suite 500<br />
              Toronto, ON M5V 2N2<br />
              support@trevbuild.com
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-slate-300 uppercase tracking-widest">Receipt</h2>
            <p className="text-xs font-mono text-slate-500">{transactionId}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-bold text-slate-400 uppercase text-[10px] mb-2 tracking-widest">Bill To:</h3>
              <p className="font-semibold text-slate-800 italic underline decoration-blue-500/20">Valued Trevbuild Client</p>
              <p className="text-slate-500 text-xs">Project Ref: {memo}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold text-slate-400 uppercase text-[10px] mb-2 tracking-widest">Date Processed:</h3>
              <p className="text-slate-800 font-medium">{transactionDate}</p>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase">
                <th className="py-3 font-bold">Description</th>
                <th className="py-3 font-bold text-right">Amount (CAD)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-50">
                <td className="py-4">
                  <span className="font-bold block capitalize">{category} Payment</span>
                  <span className="text-xs text-slate-400">Services rendered for project {memo}</span>
                </td>
                <td className="py-4 text-right font-medium">${subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tax (HST 13%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-black text-[#0056b3]">
                <span>TOTAL PAID:</span>
                <span>${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50 text-[10px] text-slate-400 text-center uppercase tracking-[0.2em]">
          Secured by Pateno Financial Bridge &bull; Trevbuild Corp 2026
        </div>

        {/* Actions */}
        <div className="p-6 bg-white border-t border-slate-100 flex gap-4 print:hidden">
          <button 
            onClick={() => window.print()} 
            className="flex-1 bg-[#0056b3] text-white font-bold py-4 rounded-xl hover:bg-[#004494] transition-all flex items-center justify-center gap-2"
          >
            PRINT RECORD
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
          >
            CLOSE PORTAL
          </button>
        </div>
      </div>
    </div>
  );
}