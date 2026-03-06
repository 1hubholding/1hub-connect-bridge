import { z } from 'zod';

type BridgeResponse<T = unknown> = {
    success: true;
    data: T;
} | {
    success: false;
    error?: string;
    code?: string;
};
declare const StartNDARequestSchema: z.ZodObject<{}, z.core.$strip>;
declare const StartNDAResponseSchema: z.ZodObject<{}, z.core.$strip>;
type StartNDARequest = z.infer<typeof StartNDARequestSchema>;
type StartNDAResponse = z.infer<typeof StartNDAResponseSchema>;
declare const GetBalanceRequestSchema: z.ZodObject<{
    address: z.ZodString;
}, z.core.$strip>;
declare const GetBalanceResponseSchema: z.ZodObject<{
    balance: z.ZodNumber;
    currency: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type GetBalanceRequest = z.infer<typeof GetBalanceRequestSchema>;
type GetBalanceResponse = z.infer<typeof GetBalanceResponseSchema>;
declare const GetWalletRequestSchema: z.ZodObject<{}, z.core.$strip>;
declare const GetWalletResponseSchema: z.ZodArray<z.ZodObject<{
    address: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$strip>>;
type GetWalletRequest = z.infer<typeof GetWalletRequestSchema>;
type GetWalletResponse = z.infer<typeof GetWalletResponseSchema>;
declare const ShowConsentRequestSchema: z.ZodObject<{}, z.core.$strip>;
declare const ShowConsentResponseSchema: z.ZodObject<{
    consented: z.ZodBoolean;
}, z.core.$strip>;
type ShowConsentRequest = z.infer<typeof ShowConsentRequestSchema>;
type ShowConsentResponse = z.infer<typeof ShowConsentResponseSchema>;
declare const ShowCameraRequestSchema: z.ZodObject<{
    imageQuality: z.ZodOptional<z.ZodInt>;
    maxHeight: z.ZodOptional<z.ZodNumber>;
    maxWidth: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const ShowCameraResponseSchema: z.ZodObject<{
    path: z.ZodString;
    base64: z.ZodBase64;
    name: z.ZodString;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type ShowCameraRequest = z.infer<typeof ShowCameraRequestSchema>;
type ShowCameraResponse = z.infer<typeof ShowCameraResponseSchema>;
declare const RequestSSOCodeRequestSchema: z.ZodObject<{
    clientId: z.ZodString;
    redirectUri: z.ZodString;
    scope: z.ZodString;
}, z.core.$strip>;
declare const RequestSSOCodeResponseSchema: z.ZodObject<{
    code: z.ZodString;
    codeVerifier: z.ZodString;
}, z.core.$strip>;
type RequestSSOCodeRequest = z.infer<typeof RequestSSOCodeRequestSchema>;
type RequestSSOCodeResponse = z.infer<typeof RequestSSOCodeResponseSchema>;
declare const GetHPayPaymentUrlRequestSchema: z.ZodObject<{
    orderId: z.ZodString;
}, z.core.$strip>;
declare const GetHPayPaymentUrlResponseSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;
type GetHPayPaymentUrlRequest = z.infer<typeof GetHPayPaymentUrlRequestSchema>;
type GetHPayPaymentUrlResponse = z.infer<typeof GetHPayPaymentUrlResponseSchema>;
declare const OpenURLRequestSchema: z.ZodObject<{
    url: z.ZodString;
}, z.core.$strip>;
declare const OpenURLResponseSchema: z.ZodObject<{}, z.core.$strip>;
type OpenURLRequest = z.infer<typeof OpenURLRequestSchema>;
type OpenURLResponse = z.infer<typeof OpenURLResponseSchema>;

declare global {
    interface Window {
        flutter_inappwebview?: {
            callHandler(handlerName: string, ...args: unknown[]): Promise<unknown>;
        };
    }
}
declare class FlutterBridge {
    callHandler<TResponse = unknown, TRequest = unknown>(handlerName: string, args?: TRequest): Promise<BridgeResponse<TResponse>>;
    startNDA(request: StartNDARequest): Promise<BridgeResponse<StartNDAResponse>>;
    getBalance(request: GetBalanceRequest): Promise<BridgeResponse<GetBalanceResponse>>;
    getWallet(request: GetWalletRequest): Promise<BridgeResponse<GetWalletResponse>>;
    showConsent(request: ShowConsentRequest): Promise<BridgeResponse<ShowConsentResponse>>;
    showCamera(request: ShowCameraRequest): Promise<BridgeResponse<ShowCameraResponse>>;
    requestSSOCode(request: RequestSSOCodeRequest): Promise<BridgeResponse<RequestSSOCodeResponse>>;
    getHPayPaymentUrl(request: GetHPayPaymentUrlRequest): Promise<BridgeResponse<GetHPayPaymentUrlResponse>>;
    openURL(request: OpenURLRequest): Promise<BridgeResponse<OpenURLResponse>>;
}
declare const _default: FlutterBridge;

export { type BridgeResponse, _default as FlutterBridge, type GetBalanceRequest, type GetBalanceResponse, type GetHPayPaymentUrlRequest, type GetHPayPaymentUrlResponse, type GetWalletRequest, type GetWalletResponse, type OpenURLRequest, type OpenURLResponse, type RequestSSOCodeRequest, type RequestSSOCodeResponse, type ShowCameraRequest, type ShowCameraResponse, type ShowConsentRequest, type ShowConsentResponse, type StartNDARequest, type StartNDAResponse, _default as default };
