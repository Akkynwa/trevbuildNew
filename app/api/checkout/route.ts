import { NextResponse } from 'next/server';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export async function POST(req: Request) {
  try {
    const { items, customer }: { items: CartItem[], customer: CustomerData } = await req.json();

    // 1. Calculate Financials (Tax logic removed)
    const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Ensure the total is formatted to 2 decimal places as a number
    const finalAmount = Number(total.toFixed(2));

    const apiKey = "i9zrh0Tdj]d;TuXv6M:Ofvb}";

    // 2. Construct Payload
    const body = {
      api_key: apiKey,
      client_name: `${customer.firstName} ${customer.lastName}`.trim(),
      client_email: customer.email.toLowerCase().trim(),
      reference: `TREV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      amount: finalAmount
    };

    // 3. Execute Request to Clarity PAT
    const response = await fetch('https://pat.clarityglobalinc.com/api/1.1/wf/money_request', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'api_key': apiKey 
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // LOGGING for debugging
    console.log("CLARITY_RESPONSE_DATA:", JSON.stringify(data, null, 2));

    // 4. Robust URL Extraction Logic
    const paymentLink = 
      data?.response?.payment_link || 
      data?.payment_link || 
      data?.response?.url || 
      data?.url ||
      (data?.response && typeof data.response === 'string' && data.response.startsWith('http') ? data.response : null);

    if (paymentLink) {
      return NextResponse.json({ url: paymentLink });
    }

    // 5. Detailed Error Reporting
    return NextResponse.json({ 
      error: 'No payment link generated', 
      details: data.message || data.status || "Check terminal for full JSON"
    }, { status: 400 });

  } catch (err) {
    console.error("CRITICAL_ROUTE_ERROR:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}