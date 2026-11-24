# Television (later)

Written 2026-11-24. Television comes after the phones work; this is what is known and what is not, so that the phones are not built in a way that shuts it out.

## What changes

- **No pointer.** The remote is a D-pad, a back key, an OK key and media keys. Everything must be reachable and visible by focus. This is the same problem as the keyboard-only paths in the editors
  (see [the UX audit](https://github.com/fsharp-wasm/fsharp-wasm-ide/blob/develop/docs/ux-audit.md): one tab stop with arrows inside, a focus model that is a state machine): one `Roving`/spatial focus model should serve both, not be written twice.
- **A 10-foot interface**: large type, safe margins (overscan), no hover, no small targets.
- **Keys the web view does not deliver** in the same way on every set: colour keys, media keys, back. The catalogue has `tv-remote`, `tv-focus` and `tv-display` for these.

## What is not known (and should be measured before anything is promised)

| Platform | Question |
|---|---|
| Android TV / Google TV | A web view exists (System WebView): which version, and does the probe pass? |
| Samsung (Tizen), LG (webOS) | Their web apps run in a Chromium-based engine whose version is tied to the set's age: which sets run WebAssembly GC? The probe answers per set. |
| Apple TV (tvOS) | I do not know of a web view for third-party apps there; JavaScriptCore may be available to embed. To verify before it is written down as an option. |
| Fire TV and others | Not looked at. |

The way to find out is the same as for the phones: the [probe](https://github.com/fsharp-wasm/fsharp-wasm-embedded/tree/develop/probe) on a set, and a device report. A television that cannot run the four engine
features gets a different answer (a server-rendered or streamed fallback), and that is a design question for later.
