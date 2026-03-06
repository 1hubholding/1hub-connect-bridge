// src/FlutterBridge.ts
var FlutterBridge = class {
  async callHandler(handlerName, args) {
    if (typeof window === "undefined" || !window.flutter_inappwebview) {
      return { success: false, error: "Flutter bridge not available", code: "NOT_AVAILABLE" };
    }
    try {
      const result = await window.flutter_inappwebview.callHandler(
        handlerName,
        ...args !== void 0 ? [args] : []
      );
      return result;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        code: "BRIDGE_ERROR"
      };
    }
  }
  async startNDA(request) {
    return this.callHandler("startNDA", request);
  }
  async getBalance(request) {
    return this.callHandler("getBalance", request);
  }
  async getWallet(request) {
    return this.callHandler("getWallet", request);
  }
  async showConsent(request) {
    return this.callHandler("showConsent", request);
  }
  async showCamera(request) {
    return this.callHandler("showCamera", request);
  }
  async requestSSOCode(request) {
    return this.callHandler("requestSSOCode", request);
  }
  async getHPayPaymentUrl(request) {
    return this.callHandler("getHPayPaymentUrl", request);
  }
  async openURL(request) {
    return this.callHandler("openURL", request);
  }
};
var FlutterBridge_default = new FlutterBridge();
export {
  FlutterBridge_default as FlutterBridge,
  FlutterBridge_default as default
};
//# sourceMappingURL=index.mjs.map