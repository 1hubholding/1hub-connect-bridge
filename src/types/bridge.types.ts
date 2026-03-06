import { base64, z } from 'zod';

// ============================================
// Base response type
// ============================================

export const BridgeResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.discriminatedUnion('success', [
    z.object({ success: z.literal(true), data: dataSchema }),
    z.object({ success: z.literal(false), error: z.string().optional(), code: z.string().optional() }),
  ]);

export type BridgeResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error?: string; code?: string };

// ============================================
// NDA
// ============================================

export const StartNDARequestSchema = z.object({});
export const StartNDAResponseSchema = z.object({});

export type StartNDARequest = z.infer<typeof StartNDARequestSchema>;
export type StartNDAResponse = z.infer<typeof StartNDAResponseSchema>;

// ============================================
// Balance
// ============================================

export const GetBalanceRequestSchema = z.object({
  address: z.string(),
});

export const GetBalanceResponseSchema = z.object({
  balance: z.number(),
  currency: z.string(),
  updatedAt: z.string().optional(),
});

export type GetBalanceRequest = z.infer<typeof GetBalanceRequestSchema>;
export type GetBalanceResponse = z.infer<typeof GetBalanceResponseSchema>;

// ============================================
// Wallet
// ============================================

export const GetWalletRequestSchema = z.object({});

const WalletAccountSchema = z.object({
  address: z.string(),
  createdAt: z.string(),
});

export const GetWalletResponseSchema = z.array(WalletAccountSchema);

export type GetWalletRequest = z.infer<typeof GetWalletRequestSchema>;
export type GetWalletResponse = z.infer<typeof GetWalletResponseSchema>;

// ============================================
// Camera
// ============================================

export const ShowCameraRequestSchema = z.object({
  imageQuality: z.int().min(1).max(100).optional(),
  maxHeight: z.number().positive().optional(),
  maxWidth: z.number().positive().optional(),
});

export const ShowCameraResponseSchema = z.object({
  path: z.string(),
  base64: base64(),
  name: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type ShowCameraRequest = z.infer<typeof ShowCameraRequestSchema>;
export type ShowCameraResponse = z.infer<typeof ShowCameraResponseSchema>;


// ============================================
// SSO Code
// ============================================

export const RequestSSOCodeRequestSchema = z.object({
  clientId: z.string(),
  redirectUri: z.string(),
  scope: z.string(),
});

export const RequestSSOCodeResponseSchema = z.object({
  code: z.string(),
  codeVerifier: z.string(),
});

export type RequestSSOCodeRequest = z.infer<typeof RequestSSOCodeRequestSchema>;
export type RequestSSOCodeResponse = z.infer<typeof RequestSSOCodeResponseSchema>;


// ============================================
// Get HPay payment url
// ============================================

export const GetHPayPaymentUrlRequestSchema = z.object({
  orderId: z.string(),
});

export const GetHPayPaymentUrlResponseSchema = z.object({
  url: z.string(),
});

export type GetHPayPaymentUrlRequest = z.infer<typeof GetHPayPaymentUrlRequestSchema>;
export type GetHPayPaymentUrlResponse = z.infer<typeof GetHPayPaymentUrlResponseSchema>;

// ============================================
// Open URL
// ============================================

export const OpenURLRequestSchema = z.object({
  url: z.string(),
});

export const OpenURLResponseSchema = z.object({});

export type OpenURLRequest = z.infer<typeof OpenURLRequestSchema>;
export type OpenURLResponse = z.infer<typeof OpenURLResponseSchema>;