'use client';

import { useState, useMemo } from 'react';
import { 
  ShoppingBag, X, Loader2, CheckCircle2, 
  CreditCard, User, ArrowRight, MapPin, Trash2, Plus
} from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'Quick Design Consult', price: 200, category: 'Consulting', desc: '$200 — Quick Design Consult: 30-minute virtual call with a design expert for ideas and advice.' },
  { id: '2', name: 'Renovation Roadmap', price: 250, category: 'Planning', desc: '$250 — Renovation Roadmap: A prioritized to-do list and budget outline based on photos of your space.' },
  { id: '3', name: 'Style Inspiration Pack', price: 300, category: 'Design', desc: '$300 — Style Inspiration Pack: Custom mood board + color palette tailored to your preferences.' },
  { id: '4', name: 'Mini Space Refresh', price: 750, category: 'Design', desc: '$750 — Mini Space Refresh: Design concept + shopping list for one room (up to 100 sq ft).' },
  { id: '5', name: 'Room Design Package', price: 1000, category: 'Design', desc: '$1,000 — Room Design Package: Detailed layout + materials + finishes for one room.' },
  { id: '6', name: 'Kitchen Concept Plan', price: 2500, category: 'Technical', desc: '$2,500 — Kitchen Concept Plan: Custom kitchen layout, elevations, materials, and lighting plan.' },
  { id: '7', name: 'Bathroom Design Package', price: 3000, category: 'Technical', desc: '$3,000 — Bathroom Design Package: Complete plan for one bathroom with fixtures and tile selection.' },
  { id: '8', name: 'Full Interior Design (Floor)', price: 4500, category: 'Full Scale', desc: '$4,500 — Full Interior Design (One Floor): Concepts, furniture, lighting, and finishes for a whole floor.' },
  { id: '9', name: 'Contractor Matchmaking', price: 5000, category: 'Management', desc: '$5,000 — Contractor Matchmaking + Plan: Design plan + vetted contractor proposals with estimates.' },
  { id: '10', name: 'Project Management Lite', price: 6000, category: 'Management', desc: '$6,000 — Project Management Lite: Design + oversight of one room from start to finish.' },
  { id: '11', name: 'Partial Renovation Pack', price: 7500, category: 'Full Scale', desc: '$7,500 — Partial Renovation Pack: Design + contractor + project management for one major area (e.g., kitchen or living room).' },
  { id: '12', name: 'Whole Home Concept', price: 8000, category: 'Planning', desc: '$8,000 — Whole Home Concept + Estimates: High-level design for entire home + cost estimates for renovation.' },
  { id: '13', name: 'Premium Bath + Kitchen', price: 8500, category: 'Bundle', desc: '$8,500 — Premium Bathroom + Kitchen Combo: Design + contractor sourcing + project oversight for both spaces.' },
  { id: '14', name: '3D Renderings Pack', price: 9000, category: 'Technical', desc: '$9,000 — Complete Interior Design + Renderings: Full interior design with 3D renderings (up to 3 rooms).' },
  { id: '15', name: 'Full Home Renovation Plan', price: 9500, category: 'Full Scale', desc: '$9,500 — Full Home Renovation Plan: Detailed architectural + interior design + materials schedule.' },
  { id: '16', name: 'Full Project Management', price: 10000, category: 'Management', desc: '$10,000 — Full Project Management: End-to-end renovation management including scheduling, supervision, and quality control.' },
];

const COUNTRIES = ["Canada", "United States", "United Kingdom", "Albania", "Algeria", "Argentina", "Australia", "Brazil", "France", "Germany", "India", "Italy", "Japan", "Mexico", "Nigeria", "Spain", "UAE"];

export default function TrevonixMarketplace() {
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);
  const [view, setView] = useState<'shop' | 'checkout'>('shop');
  const [step, setStep] = useState<1 | 2 | 3>(1); 
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: '', address: '', suite: '', city: '', province: '', postalCode: ''
  });

  const cartDetails = useMemo(() => cart.map(item => ({
    ...PRODUCTS.find(p => p.id === item.id)!,
    qty: item.qty
  })), [cart]);

  // --- FINANCIAL CALCULATION (TAX REMOVED) ---
  const total = cartDetails.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleAddToCart = (id: string) => {
    const ex = cart.find(i => i.id === id);
    if(ex) setCart(cart.map(i => i.id === id ? {...i, qty: i.qty+1} : i));
    else setCart([...cart, {id, qty: 1}]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleFinalAction = async () => {
    if (!formData.firstName || !formData.email || !formData.country) {
      alert("Incomplete Manifest: Please ensure Identity and Country nodes are fully defined.");
      setStep(1); return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartDetails, customer: formData })
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else { alert("Validation Error: " + (data.error || "Please verify your contact details.")); setIsProcessing(false); }
    } catch (err) { setIsProcessing(false); }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-100 px-6 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => {setView('shop'); setStep(1);}}>
            <div>
              <span className="font-black text-blue-600 tracking-tighter uppercase block leading-none">Trevonix<span className="text-blue-600"> OU</span></span>
            </div>
          </div>
          <button onClick={() => setView('checkout')} className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 px-5 py-2.5 rounded-xl transition-all border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Review Manifest</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            {cart.length > 0 && (
              <span className="bg-blue-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        {view === 'shop' ? (
          <div className="animate-in fade-in duration-700">
            <header className="mb-16">
              <h1 className="text-5xl lg:text-7xl font-black text-blue-600 mb-4 tracking-tighter uppercase leading-none">
                Your Renovation, Made <br/><span className="text-slate-300">Simple.</span>
              </h1>
              <p className="text-slate-500 max-w-xl text-xs leading-relaxed uppercase tracking-widest font-bold">
                We connect you with trusted renovation and interior design professionals.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((p) => {
                const isInCart = cart.find(i => i.id === p.id);
                return (
                  <div 
                    key={p.id} 
                    onClick={() => handleAddToCart(p.id)}
                    className="group bg-white border border-slate-100 rounded-2xl p-8 hover:border-blue-600 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Asset TX-{p.id.padStart(3, '0')}</span>
                      {isInCart && <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded">Active x{isInCart.qty}</div>}
                    </div>
                    <h3 className="text-2xl font-black text-black tracking-tighter uppercase mb-4 leading-tight group-hover:text-blue-600">{p.name}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed font-bold mb-8 flex-grow">{p.desc}</p>
                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-2xl font-black text-black tracking-tight">${p.price.toLocaleString()}</span>
                      <Plus className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-6 mb-12">
                {[
                  { s: 1, icon: <User className="w-3 h-3"/>, label: 'Contact' },
                  { s: 2, icon: <MapPin className="w-3 h-3"/>, label: 'Billing' },
                  { s: 3, icon: <CreditCard className="w-3 h-3"/>, label: 'Finalize' }
                ].map((item) => (
                  <div key={item.s} className={`flex items-center gap-2 ${step >= item.s ? 'opacity-100' : 'opacity-20'}`}>
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${step === item.s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{item.label}</span>
                    {item.s < 3 && <div className="w-4 h-[1px] bg-slate-200 ml-2" />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Contact</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="First Name *" placeholder="Required" value={formData.firstName} onChange={(v: string) => setFormData({...formData, firstName: v})} />
                    <InputField label="Last Name *" placeholder="Required" value={formData.lastName} onChange={(v: string) => setFormData({...formData, lastName: v})} />
                  </div>
                  <InputField label="Email Address *" placeholder="email@address.com" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                  <InputField label="Phone *" placeholder="+1" value={formData.phone} onChange={(v: string) => setFormData({...formData, phone: v})} />
                  <button onClick={() => setStep(2)} className="w-full py-5 bg-black text-white font-black uppercase tracking-widest rounded-xl">Continue</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic">Billing</h2>
                  <SelectField label="Country *" options={COUNTRIES} value={formData.country} onChange={(v: string) => setFormData({...formData, country: v})} />
                  <InputField label="Street Address *" placeholder="123 Street" value={formData.address} onChange={(v: string) => setFormData({...formData, address: v})} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField label="City *" placeholder="City" value={formData.city} onChange={(v: string) => setFormData({...formData, city: v})} />
                    <InputField label="Postal Code *" placeholder="M5V 1J2" value={formData.postalCode} onChange={(v: string) => setFormData({...formData, postalCode: v})} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-5 border border-slate-200 text-slate-400 font-black uppercase rounded-xl">Back</button>
                    <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-black text-white font-black uppercase rounded-xl">Review</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-in fade-in py-10 text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                    <CheckCircle2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Ready for Deployment</h2>
                  <button 
                    onClick={handleFinalAction} disabled={isProcessing}
                    className="w-full py-6 bg-blue-600 text-white font-black uppercase tracking-widest text-lg rounded-2xl flex items-center justify-center gap-3"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : "Authorize Transfer"}
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 sticky top-32">
                <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-8">Current Manifest</h3>
                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2">
                  {cartDetails.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">Manifest empty</p>
                  ) : (
                    cartDetails.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <p className="text-black font-black text-xs uppercase tracking-tight">{item.name}</p>
                          <p className="text-[10px] text-blue-600 font-bold uppercase">Qty {item.qty} &bull; ${(item.price * item.qty).toLocaleString()}</p>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="p-1 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200 space-y-4">
                  {/* TAX DISPLAY REMOVED ENTIRELY */}
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest pb-2">Total Amount</span>
                    <span className="text-4xl font-black text-black tracking-tighter italic">${total.toLocaleString()}</span>
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

// Sub-components remain unchanged...
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InputField({ label, placeholder, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <input 
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm text-black outline-none focus:border-blue-600/30 transition-all placeholder:text-slate-300 font-medium"
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SelectField({ label, options, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative">
        <select 
          value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 text-sm text-black outline-none appearance-none cursor-pointer font-medium"
        >
          <option value="" disabled>Select Country</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ArrowRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-slate-300 pointer-events-none" />
      </div>
    </div>
  );
}