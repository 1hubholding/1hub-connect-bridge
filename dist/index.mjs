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
export {
  FlutterBridge_default as FlutterBridge,
  FlutterBridge_default as default
};
//# sourceMappingURL=index.mjs.map