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
  constructor() {
    this.isFlutterApp = false;
    this.isFlutterApp = typeof window !== "undefined" && window.flutter_inappwebview !== void 0;
  }
  isAvailable() {
    return this.isFlutterApp;
  }
  async callHandler(handlerName, ...args) {
    if (!this.isAvailable()) {
      return {
        success: false,
        error: "Flutter bridge not available",
        code: "NOT_AVAILABLE"
      };
    }
    try {
      const result = await window.flutter_inappwebview.callHandler(
        handlerName,
        ...args
      );
      return result;
    } catch (error) {
      console.error(`Error calling ${handlerName}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        code: "BRIDGE_ERROR"
      };
    }
  }
  isSuccess(response) {
    return response.success === true;
  }
  unwrapResponse(response) {
    if (this.isSuccess(response)) {
      return response.data;
    }
    throw new Error(response.error || "Unknown error");
  }
  // ============================================
  // Public API Methods (all fully typed)
  // ============================================
  async openCamera(options = {}) {
    return this.callHandler("openCamera", options);
  }
  async openGallery(options = {}) {
    return this.callHandler("openGallery", options);
  }
  async getLocation(options = {}) {
    return this.callHandler("getLocation", options);
  }
  async getUserInfo() {
    return this.callHandler("getUserInfo");
  }
  async share(options) {
    return this.callHandler("share", options);
  }
  async setStorage(key, value) {
    return this.callHandler("setStorage", { key, value });
  }
  async getStorage(key) {
    return this.callHandler("getStorage", { key });
  }
  // ============================================
  // Unwrapped versions (throw on error)
  // ============================================
  async openCameraOrThrow(options = {}) {
    const response = await this.openCamera(options);
    return this.unwrapResponse(response);
  }
  async getUserInfoOrThrow() {
    const response = await this.getUserInfo();
    return this.unwrapResponse(response);
  }
};
var FlutterBridge_default = new FlutterBridge();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FlutterBridge
});
//# sourceMappingURL=index.js.map