# The bridge contract (draft)

Written 2026-11-24, nothing implements it yet. It is short on purpose: what every API shares, so that an API is a schema and a module, not a new mechanism.

## The wire

Messages are JSON, one object each, over whatever channel the host gives the page (a `postMessage` pair, a custom URL scheme, a JavaScript interface: the host decides; the page does not know).

```jsonc
// page → host: a request
{ "id": 17, "api": "haptics", "method": "impact", "args": { "style": "light" } }

// host → page: its answer, exactly once
{ "id": 17, "ok": true,  "value": null }
{ "id": 17, "ok": false, "error": { "code": "unsupported", "message": "no haptic engine" } }

// host → page: an event, no id (lifecycle, network, deep link)
{ "api": "lifecycle", "event": "pause", "data": {} }
```

An error has one of three codes, and an application matches on them: **`unsupported`** (this device cannot), **`denied`** (the user or the OS said no), **`failed`** (it could have and did not: `message` says why).
Nothing throws across the boundary; the F# side gets a value.

## Capabilities

```jsonc
// request: { "id": 1, "api": "capabilities", "method": "get", "args": {} }
{ "id": 1, "ok": true, "value": {
    "share":   { "via": "native", "permission": "granted" },
    "haptics": { "via": "web",    "permission": "granted" },
    "push":    { "via": "none",   "permission": "unavailable" } } }
```

`via` is where the call will go (`web`: the web view's own API through the glue; `native`: the host; `none`), `permission` is `granted`, `prompt`, `denied` or `unavailable`. The manifest of the shell lists the APIs an
application may ask for; an API that is not listed answers `denied` without reaching the OS.

## The F# side

```fsharp
// proposal; the callback is how the platform's modules wait (Browser.Net, Browser.Actors)
Mobile.Haptics.impact Light (function
    | Ok () -> ()
    | Error Unsupported -> ()                 // nothing to do on this device
    | Error e -> log e)
```

## What a schema holds

One file per API (`schema/haptics.json`): its methods with argument and result types, its events, the permission it needs per OS, and its web fallback if there is one. The F# module, the glue stub and the native
interfaces are generated from it, so that the three cannot drift apart (as the design tokens are one source for CSS and JSON). Until the first API exists this is a plan and not a format.

## Open

- Is JSON fast enough for a stream (sensors at 60 Hz)? Measure the bridge round trip first; a binary channel for streams is the fallback.
- One version number for the whole contract, or one per API?
- Who owns permission prompts that the web view shows itself (camera, location): the host overrides them, or the glue defers?
