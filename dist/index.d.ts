type BridgeResponse<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error?: string;
    code?: string;
};
interface BridgeHandlers {
    openCamera: {
        request: {
            quality?: number;
            maxWidth?: number;
            maxHeight?: number;
            saveToGallery?: boolean;
        };
        response: BridgeResponse<{
            uri: string;
            fileName?: string;
            mimeType?: string;
            fileSize?: number;
        }>;
    };
    openGallery: {
        request: {
            multiple?: boolean;
            maxFiles?: number;
            quality?: number;
        };
        response: BridgeResponse<{
            uris: string[];
            fileNames?: string[];
            mimeTypes?: string[];
        }>;
    };
    getLocation: {
        request: {
            highAccuracy?: boolean;
            timeout?: number;
        };
        response: BridgeResponse<{
            latitude: number;
            longitude: number;
            accuracy?: number;
            altitude?: number;
        }>;
    };
    getUserInfo: {
        request: Record<string, never>;
        response: BridgeResponse<{
            id: string;
            name?: string;
            email?: string;
            phone?: string;
            avatar?: string;
        }>;
    };
    share: {
        request: {
            title?: string;
            text?: string;
            url?: string;
        };
        response: BridgeResponse<void>;
    };
    setStorage: {
        request: {
            key: string;
            value: string;
        };
        response: BridgeResponse<void>;
    };
    getStorage: {
        request: {
            key: string;
        };
        response: BridgeResponse<string | null>;
    };
}
type BridgeHandlerName = keyof BridgeHandlers;

declare global {
    interface Window {
        flutter_inappwebview?: {
            callHandler<T extends BridgeHandlerName>(handlerName: T, ...args: BridgeHandlers[T]['request'] extends Record<string, never> ? [] : [BridgeHandlers[T]['request']]): Promise<BridgeHandlers[T]['response']>;
        };
    }
}
declare class FlutterBridge {
    private readonly isFlutterApp;
    constructor();
    isAvailable(): boolean;
    private callHandler;
    private isSuccess;
    private unwrapResponse;
    openCamera(options?: BridgeHandlers['openCamera']['request']): Promise<BridgeResponse<{
        uri: string;
        fileName?: string;
        mimeType?: string;
        fileSize?: number;
    }>>;
    openGallery(options?: BridgeHandlers['openGallery']['request']): Promise<BridgeResponse<{
        uris: string[];
        fileNames?: string[];
        mimeTypes?: string[];
    }>>;
    getLocation(options?: BridgeHandlers['getLocation']['request']): Promise<BridgeResponse<{
        latitude: number;
        longitude: number;
        accuracy?: number;
        altitude?: number;
    }>>;
    getUserInfo(): Promise<BridgeResponse<{
        id: string;
        name?: string;
        email?: string;
        phone?: string;
        avatar?: string;
    }>>;
    share(options: BridgeHandlers['share']['request']): Promise<BridgeResponse<void>>;
    setStorage(key: string, value: string): Promise<BridgeResponse<void>>;
    getStorage(key: string): Promise<BridgeResponse<string | null>>;
    openCameraOrThrow(options?: BridgeHandlers['openCamera']['request']): Promise<{
        uri: string;
        fileName?: string;
        mimeType?: string;
        fileSize?: number;
    }>;
    getUserInfoOrThrow(): Promise<{
        id: string;
        name?: string;
        email?: string;
        phone?: string;
        avatar?: string;
    }>;
}
declare const _default: FlutterBridge;

export { type BridgeHandlerName, type BridgeHandlers, type BridgeResponse, _default as FlutterBridge, _default as default };
