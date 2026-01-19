'use client';

interface ReceiptProps {
  amount: number;
  memo: string;
  transactionId: string;
  date: string;
}

export default function Receipt({ amount, memo, transactionId, date }: ReceiptProps) {
  return (
    <div className="receipt-container p-8 max-w-2xl mx-auto bg-white text-slate-900 border border-slate-200 rounded-lg shadow-sm print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-trevblue pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">
            TREV<span className="text-trevblue">BUILD</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 uppercase font-bold tracking-widest">Construction & Development</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold uppercase">Payment Receipt</h2>
          <p className="text-sm text-slate-500">No: {transactionId.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-xs font-bold text-amber-600 uppercase mb-1">Date Paid</p>
          <p className="font-medium">{date}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-amber-600 uppercase mb-1">Payment Method</p>
          <p className="font-medium">Pateno Secure Transfer</p>
        </div>
      </div>

      {/* Table */}
      <div className="border-t border-slate-100 pt-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="pb-4">Description</th>
              <th className="pb-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50">
              <td className="py-4 font-medium">{memo}</td>
              <td className="py-4 text-right font-bold text-lg">${amount.toFixed(2)} CAD</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500 italic">&quot;Building excellence, one project at a time.&quot;</p>
        <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest">This is an automated receipt from the Trevbuild Payment Portal</p>
      </div>
    </div>
  );
}