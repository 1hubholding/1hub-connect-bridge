export type BridgeResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error?: string; code?: string };

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
}

export default new FlutterBridge();
