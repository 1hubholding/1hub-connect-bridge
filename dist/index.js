"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FlutterBridge: () => FlutterBridge_default,
  default: () => FlutterBridge_default
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlutterBridge
});
//# sourceMappingURL=index.js.map