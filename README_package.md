# onehub-connect-bridge

A TypeScript library for communicating between a React/web app running inside a Flutter `InAppWebView` and the native Flutter host.

## Requirements

- The web app must be loaded inside a Flutter `InAppWebView` with JavaScript handlers registered on the Flutter side.
- `window.flutter_inappwebview` must be injected by the Flutter host.

## Installation

```bash
pnpm i github:1hubholding/1hub-connect-bridge
```

If you use pnpm, add the package to `onlyBuiltDependencies` in your `pnpm-workspace.yaml`:

```yaml
onlyBuiltDependencies:
  - onehub-connect-bridge
```

## Usage

### Basic import

```ts
import flutterBridge from 'onehub-connect-bridge';
```

### With types

```ts
import flutterBridge, { type BridgeResponse } from 'onehub-connect-bridge';
import type {
  StartNDARequest,
  StartNDAResponse,
  GetBalanceRequest,
  GetBalanceResponse,
  GetWalletRequest,
  GetWalletResponse,
  ShowConsentRequest,
  ShowConsentResponse,
} from 'onehub-connect-bridge';
```

---

## API

All methods return a `BridgeResponse<T>`:

```ts
type BridgeResponse<T> =
  | { success: true; data: T }
  | { success: false; error?: string; code?: string };
```

When the Flutter bridge is unavailable (e.g. running in a regular browser), all methods return:

```json
{ "success": false, "error": "Flutter bridge not available", "code": "NOT_AVAILABLE" }
```

---

### `startNDA(request)`

Triggers the NDA flow on the Flutter side.

```ts
const result = await flutterBridge.startNDA({});

if (result.success) {
  // NDA started
} else {
  console.error(result.error);
}
```

| Parameter | Type             | Description |
|-----------|------------------|-------------|
| request   | `StartNDARequest` | `{}` (no fields required) |

---

### `getBalance(request)`

Fetches the wallet balance for a given wallet ID.

```ts
const result = await flutterBridge.getBalance({ walletId: 'wallet_123' });

if (result.success) {
  console.log(result.data.balance);   // number
  console.log(result.data.currency);  // string
  console.log(result.data.updatedAt); // string | undefined
}
```

| Parameter | Type                | Description         |
|-----------|---------------------|---------------------|
| walletId  | `string`            | ID of the wallet    |

**Response `data`:**

| Field     | Type     | Description                  |
|-----------|----------|------------------------------|
| balance   | `number` | Current balance               |
| currency  | `string` | Currency code (e.g. `"VND"`) |
| updatedAt | `string` | ISO timestamp _(optional)_   |

---

### `getWallet(request)`

Retrieves wallet information.

```ts
const result = await flutterBridge.getWallet({});

if (result.success) {
  console.log(result.data.walletId);  // string
  console.log(result.data.address);   // string
  console.log(result.data.createdAt); // string
}
```

| Parameter | Type              | Description |
|-----------|-------------------|-------------|
| request   | `GetWalletRequest` | `{}` (no fields required) |

**Response `data`:**

| Field     | Type     | Description          |
|-----------|----------|----------------------|
| walletId  | `string` | Wallet identifier    |
| address   | `string` | Wallet address       |
| createdAt | `string` | ISO creation timestamp |

---

### `showConsent(request)`

Shows the consent dialog on the Flutter side and returns the user's decision.

```ts
const result = await flutterBridge.showConsent({});

if (result.success) {
  console.log(result.data.consented); // boolean
  console.log(result.data.code);      // string
}
```

| Parameter | Type                 | Description |
|-----------|----------------------|-------------|
| request   | `ShowConsentRequest` | `{}` (no fields required) |

**Response `data`:**

| Field     | Type      | Description                    |
|-----------|-----------|--------------------------------|
| consented | `boolean` | Whether the user gave consent  |
| code      | `string`  | Result code from Flutter        |

---

### `callHandler(handlerName, args?)` _(generic)_

Low-level method for calling any custom Flutter handler not covered by the typed methods above.

```ts
const result = await flutterBridge.callHandler<MyResponse, MyRequest>(
  'myCustomHandler',
  { foo: 'bar' }
);
```

---

## Error codes

| Code            | Description                                       |
|-----------------|---------------------------------------------------|
| `NOT_AVAILABLE` | `window.flutter_inappwebview` is not present      |
| `BRIDGE_ERROR`  | An exception was thrown while calling the handler |

---

## Building from source

```bash
npm install
npm run build
```

Output is generated in the `dist/` directory (ESM + CJS + type declarations).

---

## Flutter side setup

On the Flutter side, register the corresponding JavaScript handlers using `flutter_inappwebview`:

```dart
webViewController.addJavaScriptHandler(
  handlerName: 'startNDA',
  callback: (args) async {
    // handle NDA logic
    return {'success': true, 'data': {}};
  },
);

webViewController.addJavaScriptHandler(
  handlerName: 'getBalance',
  callback: (args) async {
    final walletId = args[0]['walletId'];
    // fetch balance ...
    return {
      'success': true,
      'data': {'balance': 1000000, 'currency': 'VND'}
    };
  },
);

webViewController.addJavaScriptHandler(
  handlerName: 'getWallet',
  callback: (args) async {
    return {
      'success': true,
      'data': {
        'walletId': 'wallet_123',
        'address': '0xABC...',
        'createdAt': '2024-01-01T00:00:00Z'
      }
    };
  },
);

webViewController.addJavaScriptHandler(
  handlerName: 'showConsent',
  callback: (args) async {
    // show consent UI ...
    return {
      'success': true,
      'data': {'consented': true, 'code': 'CONSENT_GRANTED'}
    };
  },
);
```

> All handlers must return a JSON object matching `{ success: boolean, data?: T, error?: string, code?: string }`.
