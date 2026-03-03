// ============================================
// BridgeResponse - Discriminated union
// ============================================

export type BridgeResponse<T> =
  | { success: true; data: T }
  | { success: false; error?: string; code?: string };

