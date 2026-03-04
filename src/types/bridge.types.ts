// ============================================
// Base response type
// ============================================

export type BridgeResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error?: string; code?: string };

// ============================================
// NDA
// ============================================

export interface StartNDARequest {
}

export interface StartNDAResponse {
}

// ============================================
// Balance
// ============================================

export interface GetBalanceRequest {
  walletId: string;
}

export interface GetBalanceResponse {
  balance: number;
  currency: string;
  updatedAt?: string;
}

// ============================================
// Wallet
// ============================================

export interface GetWalletRequest {
}

export interface GetWalletResponse {
  walletId: string;
  address: string;
  createdAt: string;
}


// ============================================
// Show Consent
// ============================================

export interface ShowConsentRequest {
}

export interface ShowConsentResponse {
  consented: boolean;
  code: string;
}