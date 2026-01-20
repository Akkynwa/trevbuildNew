'use client';

import { useState, useMemo } from 'react';
import { 
  ShoppingBag, X, Loader2, CheckCircle2, 
  CreditCard, User, ArrowRight, MapPin
} from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'Quick Design Consult', price: 200, category: 'Consulting' },
  { id: '2', name: 'Renovation Roadmap', price: 250, category: 'Planning' },
  { id: '3', name: 'Style Inspiration Pack', price: 300, category: 'Design' },
  { id: '4', name: 'Mini Space Refresh', price: 750, category: 'Design' },
  { id: '5', name: 'Room Design Package', price: 1000, category: 'Design' },
  { id: '6', name: 'Kitchen Concept Plan', price: 2500, category: 'Technical' },
  { id: '7', name: 'Bathroom Design Package', price: 3000, category: 'Technical' },
  { id: '8', name: 'Full Interior Design (Floor)', price: 4500, category: 'Full Scale' },
  { id: '9', name: 'Contractor Matchmaking', price: 5000, category: 'Management' },
  { id: '10', name: 'Project Management Lite', price: 6000, category: 'Management' },
  { id: '11', name: 'Partial Renovation Pack', price: 7500, category: 'Full Scale' },
  { id: '12', name: 'Whole Home Concept', price: 8000, category: 'Planning' },
  { id: '13', name: 'Premium Bath + Kitchen', price: 8500, category: 'Bundle' },
  { id: '14', name: '3D Renderings Pack', price: 9000, category: 'Technical' },
  { id: '15', name: 'Full Home Renovation Plan', price: 9500, category: 'Full Scale' },
  { id: '16', name: 'Full Project Management', price: 10000, category: 'Management' },
];

const COUNTRIES = ["Canada", "United States", "United Kingdom", "Albania", "Algeria", "Argentina", "Australia", "Brazil", "France", "Germany", "India", "Italy", "Japan", "Mexico", "Nigeria", "Spain", "UAE"];

export default function TrevBuildMarketplace() {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  const [view, setView] = useState<'shop' | 'checkout'>('shop');
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [isProcessing, setIsProcessing] = useState(false);

  // FORM STATE: Initialized as empty to allow user choice
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '', // Empty default
    address: '',
    suite: '',
    city: '',
    province: '',
    postalCode: ''
  });

  const cartDetails = useMemo(() => cart.map(item => ({
    ...PRODUCTS.find(p => p.id === item.id)!,
    qty: item.qty
  })), [cart]);

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  // DYNAMIC TAX: Only apply 13% HST for Canadian clients
  const hst = formData.country === "Canada" ? subtotal * 0.13 : 0;
  const total = subtotal + hst;

  const handleAddToCart = (id: string) => {
    const ex = cart.find(i => i.id === id);
    if(ex) setCart(cart.map(i => i.id === id ? {...i, qty: i.qty+1} : i));
    else setCart([...cart, {id, qty: 1}]);
  };

  const handleFinalAction = async () => {
    // PRE-FLIGHT VALIDATION
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.country) {
      alert("Incomplete Manifest: Please ensure Identity and Country nodes are fully defined.");
      setStep(1); // Redirect to step 1 to fix missing info
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartDetails, 
          customer: formData 
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Validation Error: " + (data.error || "Please verify your contact details."));
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Fetch failure:", err);
      alert("Infrastructure Error: Gateway unreachable.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-blue-600/30">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {setView('shop'); setStep(1);}}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-black italic text-white text-xl">T</span>
            </div>
            <div>
              <span className="font-black text-white tracking-tighter uppercase block leading-none">Trev<span className="text-blue-500 italic">Build</span></span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-slate-600 font-bold">Standard Logic</span>
            </div>
          </div>
          
          <button onClick={() => setView('checkout')} className="relative flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all">
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Manifest</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        {view === 'shop' ? (
          <div className="animate-in fade-in duration-1000">
            {/* HERO SECTION */}
            <header className="mb-20 border-l-2 border-blue-600 pl-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Service Catalog 2026</span>
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.85]">
                TrevBuild <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Prime Assets.</span>
              </h1>
              <p className="text-slate-500 max-w-xl text-sm leading-relaxed uppercase tracking-widest font-medium">
                Architectural modules vetted for compliance. 
                Select a package to add to your project manifest.
              </p>
            </header>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-[2rem]">
              {PRODUCTS.map((p) => {
                const isInCart = cart.find(i => i.id === p.id);
                return (
                  <div key={p.id} onClick={() => handleAddToCart(p.id)} className="group relative cursor-pointer bg-[#0a0a0a] p-8 transition-all duration-500 hover:bg-[#0f0f0f]">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    <div className="relative flex flex-col h-[300px]">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">MOD-{p.id.padStart(3, '0')}</span>
                        {isInCart && (
                          <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-sm">X{isInCart.qty}</div>
                        )}
                      </div>
                      <div className="mt-10">
                        <h3 className="text-white font-bold text-2xl leading-[1] tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                          {p.name.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
                        </h3>
                      </div>
                      <div className="mt-auto flex justify-between items-end border-t border-white/5 pt-6 group-hover:border-blue-500/30 transition-colors">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-600 uppercase font-bold tracking-[0.2em]">Investment</span>
                          <span className={`text-2xl font-black tracking-tighter transition-all ${isInCart ? 'text-blue-500 scale-105 origin-left' : 'text-white'}`}>
                            ${p.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                          <ArrowRight className="w-3 h-3 text-white transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* CHECKOUT VIEW */
          <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-6 mb-12">
                {[
                  { s: 1, icon: <User className="w-3 h-3"/>, label: 'Contact' },
                  { s: 2, icon: <MapPin className="w-3 h-3"/>, label: 'Billing' },
                  { s: 3, icon: <CreditCard className="w-3 h-3"/>, label: 'Finalize' }
                ].map((item) => (
                  <div key={item.s} className={`flex items-center gap-2 transition-opacity ${step >= item.s ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-7 h-7 rounded flex items-center justify-center ${step === item.s ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'}`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{item.label}</span>
                    {item.s < 3 && <div className="w-4 h-[1px] bg-white/10 ml-2" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Contact</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="First Name *" placeholder="Required" value={formData.firstName} onChange={(val) => setFormData({...formData, firstName: val})} />
                    <InputField label="Last Name *" placeholder="Required" value={formData.lastName} onChange={(val) => setFormData({...formData, lastName: val})} />
                  </div>
                  <InputField label="Email Address *" placeholder="email@address.com" type="email" value={formData.email} onChange={(val) => setFormData({...formData, email: val})} />
                  <InputField label="Phone *" placeholder="+1 (___) ___-____" value={formData.phone} onChange={(val) => setFormData({...formData, phone: val})} />
                  <button onClick={() => setStep(2)} className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all">
                    Continue to Billing
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Billing Matrix</h2>
                  <SelectField label="Country *" options={COUNTRIES} value={formData.country} onChange={(val) => setFormData({...formData, country: val})} />
                  <InputField label="House Number & Street *" placeholder="123 Street Name" value={formData.address} onChange={(val) => setFormData({...formData, address: val})} />
                  <InputField label="Apartment, Suite, Unit (Optional)" placeholder="e.g. Unit 4" value={formData.suite} onChange={(val) => setFormData({...formData, suite: val})} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="Town / City *" placeholder="City" value={formData.city} onChange={(val) => setFormData({...formData, city: val})} />
                    <InputField label="State / Province" placeholder="State" value={formData.province} onChange={(val) => setFormData({...formData, province: val})} />
                  </div>
                  <InputField label="ZIP / Postal Code *" placeholder="M5V 1J2" value={formData.postalCode} onChange={(val) => setFormData({...formData, postalCode: val})} />
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-5 border border-white/10 text-white font-black uppercase rounded-xl">Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-blue-600 text-white font-black uppercase rounded-xl">Proceed to Finalize</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in py-12 px-8 bg-blue-600/5 border border-blue-600/20 rounded-3xl text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_-5px_rgba(37,99,235,0.4)]">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Validation Ready</h2>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto uppercase tracking-wider leading-relaxed">
                    By proceeding, you will be redirected to the secure Gateway to authorize this request.
                  </p>
                  <button 
                    onClick={handleFinalAction}
                    disabled={isProcessing}
                    className="w-full py-6 bg-white text-black font-black uppercase tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : "Authorize Secure Transfer"}
                  </button>
                </div>
              )}
            </div>

            {/* SIDEBAR SUMMARY */}
            <div className="lg:col-span-5">
              <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8 sticky top-32">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Selected Modules</h3>
                <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartDetails.length === 0 ? (
                    <p className="text-slate-600 italic text-sm">No modules selected.</p>
                  ) : (
                    cartDetails.map(item => (
                      <div key={item.id} className="flex justify-between items-center group">
                        <div>
                          <p className="text-white font-bold text-sm uppercase tracking-tight">{item.name}</p>
                          <p className="text-[9px] text-blue-500 font-black uppercase">Qty {item.qty} &bull; ${item.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="p-2 text-slate-700 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  {formData.country === "Canada" && (
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>Taxes (HST 13%)</span>
                      <span className="text-white">${hst.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-6">
                    <div className="flex flex-col">
                      <span className="text-blue-500 font-black text-[10px] uppercase tracking-tighter">Grand Total</span>
                      <span className="text-4xl font-black text-white tracking-tighter italic leading-none">${total.toLocaleString()}</span>
                    </div>
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

function InputField({ label, placeholder, type = "text", value, onChange }: { 
  label: string, placeholder: string, type?: string, value: string, onChange: (val: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
      <input 
        type={type} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all placeholder:text-slate-800 font-medium"
      />
    </div>
  );
}

function SelectField({ label, options, value, onChange }: { 
  label: string, options: string[], value: string, onChange: (val: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</label>
      <div className="relative">
        <select 
          value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
        >
          <option value="" disabled className="bg-[#0a0a0a]">Select Country</option>
          {options.map(opt => <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>)}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowRight className="w-3 h-3 rotate-90 text-slate-600" />
        </div>
      </div>
    </div>
  );
}