'use client';

import { useState, useMemo } from 'react';
import { 
  ShoppingBag, X, Loader2, CheckCircle2, 
  CreditCard, User, ArrowRight, MapPin, 
  Layers, Compass, PenTool, Layout, 
  Home, Ruler, Settings, Box, 
  Briefcase, Activity, Shield, Cpu
} from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'Quick Design Consult', price: 200, category: 'Consulting', icon: <Compass className="w-4 h-4" /> },
  { id: '2', name: 'Renovation Roadmap', price: 250, category: 'Planning', icon: <Activity className="w-4 h-4" /> },
  { id: '3', name: 'Style Inspiration Pack', price: 300, category: 'Design', icon: <Layers className="w-4 h-4" /> },
  { id: '4', name: 'Mini Space Refresh', price: 750, category: 'Design', icon: <Box className="w-4 h-4" /> },
  { id: '5', name: 'Room Design Package', price: 1000, category: 'Design', icon: <Layout className="w-4 h-4" /> },
  { id: '6', name: 'Kitchen Concept Plan', price: 2500, category: 'Technical', icon: <Ruler className="w-4 h-4" /> },
  { id: '7', name: 'Bathroom Design Package', price: 3000, category: 'Technical', icon: <Cpu className="w-4 h-4" /> },
  { id: '8', name: 'Full Interior Design (Floor)', price: 4500, category: 'Full Scale', icon: <PenTool className="w-4 h-4" /> },
  { id: '9', name: 'Contractor Matchmaking', price: 5000, category: 'Management', icon: <Briefcase className="w-4 h-4" /> },
  { id: '10', name: 'Project Management Lite', price: 6000, category: 'Management', icon: <Shield className="w-4 h-4" /> },
  { id: '11', name: 'Partial Renovation Pack', price: 7500, category: 'Full Scale', icon: <Home className="w-4 h-4" /> },
  { id: '12', name: 'Whole Home Concept', price: 8000, category: 'Planning', icon: <Settings className="w-4 h-4" /> },
  { id: '13', name: 'Premium Bath + Kitchen', price: 8500, category: 'Bundle', icon: <Layers className="w-4 h-4" /> },
  { id: '14', name: '3D Renderings Pack', price: 9000, category: 'Technical', icon: <PenTool className="w-4 h-4" /> },
  { id: '15', name: 'Full Home Renovation Plan', price: 9500, category: 'Full Scale', icon: <Home className="w-4 h-4" /> },
  { id: '16', name: 'Full Project Management', price: 10000, category: 'Management', icon: <Briefcase className="w-4 h-4" /> },
];

const COUNTRIES = ["Canada", "United States", "United Kingdom", "Albania", "Algeria", "Argentina", "Australia", "Brazil", "France", "Germany", "India", "Italy", "Japan", "Mexico", "Nigeria", "Spain", "UAE"];

export default function TrevBuildMarketplace() {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  const [view, setView] = useState<'shop' | 'checkout'>('shop');
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [isProcessing, setIsProcessing] = useState(false);

  const cartDetails = useMemo(() => cart.map(item => ({
    ...PRODUCTS.find(p => p.id === item.id)!,
    qty: item.qty
  })), [cart]);

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const hst = subtotal * 0.13;
  const total = subtotal + hst;

  const handleAddToCart = (id: string) => {
    const ex = cart.find(i => i.id === id);
    if(ex) setCart(cart.map(i => i.id === id ? {...i, qty: i.qty+1} : i));
    else setCart([...cart, {id, qty: 1}]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-blue-600/30">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {setView('shop'); setStep(1);}}>
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-black italic text-lg">T</div>
            <div>
              <span className="font-black text-white tracking-tighter uppercase block leading-none">Trev<span className="text-blue-500 italic">Build</span></span>
              <span className="text-[7px] uppercase tracking-[0.5em] text-slate-600 font-bold">Infrastructure</span>
            </div>
          </div>
          
          <button onClick={() => setView('checkout')} className="relative flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded transition-all">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden sm:block">Project Manifest</span>
            <div className="w-px h-3 bg-white/20 mx-1 hidden sm:block" />
            <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
            {cart.length > 0 && <span className="text-[9px] font-black text-white">{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        {view === 'shop' ? (
          <div className="animate-in fade-in duration-1000">
            {/* HERO SECTION */}
            <header className="mb-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-[1px] bg-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">Enterprise Solution Suite</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]">
                TrevBuild <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Prime Assets.</span>
              </h1>
              <p className="text-slate-500 max-w-lg text-xs leading-relaxed uppercase tracking-[0.15em] font-medium border-l border-white/10 pl-6">
                A definitive catalog of architectural modules and technical services. 
                Engineered for scalability and full compliance with Ontario development standards.
              </p>
            </header>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-sm">
              {PRODUCTS.map((p) => {
                const isInCart = cart.find(i => i.id === p.id);
                return (
                  <div 
                    key={p.id} 
                    onClick={() => handleAddToCart(p.id)}
                    className="group relative cursor-pointer bg-[#0a0a0a] p-8 transition-all duration-300 hover:bg-[#0c0c0c]"
                  >
                    <div className="relative flex flex-col h-[280px]">
                      <div className="flex justify-between items-start mb-8">
                        <div className="text-blue-500 bg-blue-500/10 p-2 rounded group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {p.icon}
                        </div>
                        <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest group-hover:text-slate-400">Ref. {p.id.padStart(3, '0')}</span>
                      </div>

                      <div className="mt-4">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 block">{p.category}</span>
                        <h3 className="text-white font-bold text-lg leading-tight tracking-tight uppercase group-hover:tracking-widest transition-all duration-500">
                          {p.name}
                        </h3>
                      </div>

                      <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-6">
                        <div className="flex flex-col">
                          <span className="text-[8px] text-slate-600 uppercase font-black tracking-widest">Pricing</span>
                          <span className={`text-xl font-black tracking-tighter transition-all ${isInCart ? 'text-blue-500' : 'text-white'}`}>
                            ${p.price.toLocaleString()}
                          </span>
                        </div>
                        {isInCart && (
                          <div className="text-[10px] font-black text-blue-500 animate-pulse">X{isInCart.qty}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* CHECKOUT VIEW */
          <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-2 duration-500">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-8 mb-16 grayscale">
                <StepIndicator num={1} label="Identity" active={step >= 1} current={step === 1} />
                <StepIndicator num={2} label="Location" active={step >= 2} current={step === 2} />
                <StepIndicator num={3} label="Confirm" active={step >= 3} current={step === 3} />
              </div>

              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <SectionHeading title="Identity Information" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="First Name *" placeholder="Legal First Name" />
                    <InputField label="Last Name *" placeholder="Legal Last Name" />
                  </div>
                  <InputField label="Email Hub *" placeholder="corporate@domain.ca" type="email" />
                  <InputField label="Direct Line *" placeholder="+1 (555) 000-0000" />
                  <button onClick={() => setStep(2)} className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded hover:bg-blue-600 hover:text-white transition-all">
                    Next: Location Data
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <SectionHeading title="Project Location" />
                  <SelectField label="Jurisdiction *" options={COUNTRIES} />
                  <InputField label="Street Address *" placeholder="Primary Site Location" />
                  <InputField label="Suite / Level" placeholder="Internal Designation (Optional)" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Municipality *" placeholder="City" />
                    <InputField label="Province / State" placeholder="Region" />
                  </div>
                  <InputField label="Postal Code *" placeholder="Site ZIP" />
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 text-white font-black text-[10px] uppercase rounded">Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-white text-black font-black text-[10px] uppercase rounded">Review Manifest</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in py-12 px-8 bg-white/5 border border-white/5 rounded">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Final Verification</h2>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest leading-relaxed">
                      Secure authentication via Interac Gateway required to finalize asset acquisition.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setIsProcessing(true); setTimeout(() => window.location.href="https://etransfer.interac.ca/acceptPaymentRequest.do?rID=CA1MRGs3qR7c&src=email", 1500); }}
                    disabled={isProcessing}
                    className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] rounded flex items-center justify-center gap-3 hover:bg-blue-500 transition-all"
                  >
                    {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : "Initiate Secure Transfer"}
                  </button>
                </div>
              )}
            </div>

            {/* MANIFEST SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-sm sticky top-32">
                <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-10 pb-4 border-b border-white/5">Project Manifest</h3>
                <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartDetails.map(item => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="flex gap-4">
                        <div className="text-blue-500 mt-1">{item.icon}</div>
                        <div>
                          <p className="text-white font-bold text-xs uppercase tracking-tight">{item.name}</p>
                          <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">Ref: {item.id} / Qty {item.qty}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-white italic">${(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <SummaryRow label="Subtotal" value={subtotal} />
                  <SummaryRow label="HST (13%)" value={hst} />
                  <div className="flex justify-between items-end pt-6">
                    <span className="text-blue-500 font-black text-[9px] uppercase tracking-[0.3em]">Total Value</span>
                    <span className="text-3xl font-black text-white tracking-tighter leading-none">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* HELPER COMPONENTS */
function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8 border-b border-white/5 pb-2">{title}</h2>;
}

function StepIndicator({ num, label, active, current }: { num: number, label: string, active: boolean, current: boolean }) {
  return (
    <div className={`flex items-center gap-3 transition-all ${active ? 'opacity-100' : 'opacity-20'}`}>
      <span className={`text-[10px] font-black w-6 h-6 rounded flex items-center justify-center ${current ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'}`}>
        0{num}
      </span>
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-white">${value.toLocaleString()}</span>
    </div>
  );
}

function InputField({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-xs text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all placeholder:text-slate-800" />
    </div>
  );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
  return (
    <div className="space-y-2">
      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
      <select className="w-full bg-white/[0.03] border border-white/10 rounded px-4 py-3 text-xs text-white outline-none focus:border-blue-500 appearance-none cursor-pointer">
        {options.map(opt => <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>)}
      </select>
    </div>
  );
}