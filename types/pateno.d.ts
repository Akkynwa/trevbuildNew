export namespace Pateno {
  // The structure of a successful payment response
  export interface PaymentResponse {
    transactionId: string;
    status: 'Success' | 'Pending' | 'Failed';
    amount: number;
    currency: string;
    memo: string;
    timestamp: string;
    authorizationCode?: string;
  }

  // The structure for the login response
  export interface AuthResponse {
    token: string;
    expiresAt: string;
  }

  // Error structure
  export interface ErrorResponse {
    code: string;
    message: string;
  }
}
