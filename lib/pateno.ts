export class PatenoClient {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = process.env.PATENO_BASE_URL || '';
    this.clientId = process.env.PATENO_CLIENT_ID || '';
    this.clientSecret = process.env.PATENO_CLIENT_SECRET || '';
  }

  // Automatically handles login and token caching
  private async getAuthToken(): Promise<string> {
    if (this.token) return this.token;

    const res = await fetch(`${this.baseUrl}/integrationapi/v1.0/Authentication/Login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      }),
    });

    if (!res.ok) throw new Error('Pateno authentication failed');
    
    const data = await res.json();
    this.token = data.token;
    return this.token!;
  }

  // Generic request helper
  async post(endpoint: string, body: unknown) {
    const token = await this.getAuthToken();
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res.json();
  }
}

export const pateno = new PatenoClient();
