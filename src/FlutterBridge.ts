import type {
  BridgeResponse,
  GetBalanceRequest,
  GetBalanceResponse,
  GetWalletRequest,
  GetWalletResponse,
  ShowConsentRequest,
  ShowConsentResponse,
  StartNDARequest,
  StartNDAResponse,
} from './types/bridge.types';

declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler(handlerName: string, ...args: unknown[]): Promise<unknown>;
    };
  }
}

class FlutterBridge {
  async callHandler<TResponse = unknown, TRequest = unknown>(
    handlerName: string,
    args?: TRequest,
  ): Promise<BridgeResponse<TResponse>> {
    if (typeof window === 'undefined' || !window.flutter_inappwebview) {
      return { success: false, error: 'Flutter bridge not available', code: 'NOT_AVAILABLE' };
    }

    try {
      const result = await window.flutter_inappwebview.callHandler(
        handlerName,
        ...(args !== undefined ? [args] : []),
      );
      return result as BridgeResponse<TResponse>;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        code: 'BRIDGE_ERROR',
      };
    }
  }

  async startNDA(request: StartNDARequest): Promise<BridgeResponse<StartNDAResponse>> {
    return this.callHandler<StartNDAResponse, StartNDARequest>('startNDA', request);
  }

  async getBalance(request: GetBalanceRequest): Promise<BridgeResponse<GetBalanceResponse>> {
    return this.callHandler<GetBalanceResponse, GetBalanceRequest>('getBalance', request);
  }

  async getWallet(request: GetWalletRequest): Promise<BridgeResponse<GetWalletResponse>> {
    return this.callHandler<GetWalletResponse, GetWalletRequest>('getWallet', request);
  }

  async showConsent(request: ShowConsentRequest): Promise<BridgeResponse<ShowConsentResponse>> {
    return this.callHandler<ShowConsentResponse, ShowConsentRequest>('showConsent', request);
  }
}

export default new FlutterBridge();
