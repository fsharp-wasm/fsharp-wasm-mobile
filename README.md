# fsharp-wasm-mobile

<!-- status -->
[![CI](https://github.com/fsharp-wasm/fsharp-wasm-mobile/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/fsharp-wasm/fsharp-wasm-mobile/actions/workflows/ci.yml) · [Status of every repository](https://fsharp-wasm.github.io/status/)
<!-- /status -->

<!-- platform -->
> **Part of the [fsharp-wasm platform](https://fsharp-wasm.github.io/projects/)**: device APIs. Builds on [runtime](https://github.com/fsharp-wasm/fsharp-wasm-runtime), is hosted by [embedded](https://github.com/fsharp-wasm/fsharp-wasm-embedded). Status: **planned, no code yet**.
> [All projects](https://fsharp-wasm.github.io/projects/) · [Roadmap](https://fsharp-wasm.github.io/docs/roadmap/) · [Tests](https://fsharp-wasm.github.io/tests/) · [Benchmarks](https://fsharp-wasm.github.io/benchmarks/) · [Live demos](https://fsharp-wasm.github.io/demos/)

The **device APIs** of the platform, for the phones and tablets of iOS and Android first and for television later: the haptics, the share sheet, secure storage, deep links, the camera, the
notifications that a web page cannot reach or reaches badly. An F# application compiled to WebAssembly GC asks for them the way it asks for the DOM today: through a typed module and a small piece of glue.

**This repository is a plan, not yet a library.** What exists is the [catalogue](docs/apis.md) of 32 APIs, the [contract](docs/contract.md) they would share, and the questions for television ([docs/tv.md](docs/tv.md)).

## The idea

Every API has the same three layers, and the application sees only the first:

| | what | where |
|---|---|---|
| **an F# module** | `Mobile.Haptics.impact Light`: typed, errors as values (`Unsupported`, `Denied`, `Failed`), callbacks where the answer comes later (a module cannot wait for a promise) | here, next to a glue module, as `Browser.Net` is in the runtime |
| **glue with a web fallback** | uses the web's own API where the web view has one (Share, Vibration, Wake Lock, Geolocation, Clipboard), so the application works in a browser tab too | here, `glue/*.js`, loaded through `boot({ imports })` of the runtime |
| **a native implementation** | where the web has nothing or too little (secure storage, deep links, background work, in-app purchase) | here, Kotlin and Swift, loaded by the [shell](https://github.com/fsharp-wasm/fsharp-wasm-embedded) over its bridge |

A **capability check** tells the application what it has here, per API: `web`, `native` or `none`, and the permission state. An application asks and degrades instead of sniffing a user agent.

[docs/apis.md](docs/apis.md) lists every API with what the web already gives and what only native gives. Priorities: **P1** what almost every application needs (storage, lifecycle, deep links, share, clipboard,
haptics, safe area, device info, network, permissions, opening a URL), **P2** common with a permission or a native part that matters (notifications, push, camera, files, location, biometrics, media), **P3** specialised, and **TV** (later).

## Where it goes

1. **The contract** ([docs/contract.md](docs/contract.md)): the bridge envelope, the capability answer, the error values. Argued with before anything is built on it.
2. **P1 with web fallbacks only**: `share`, `clipboard`, `haptics`, `safe-area`, `lifecycle`, `network`, `device-info`; they run in any browser, and each has an end-to-end test in Chromium.
3. **The first native implementations** once the [shell](https://github.com/fsharp-wasm/fsharp-wasm-embedded) hosts a bridge: `secure-storage`, `deep-links`, `storage`.
4. **The rest of P1 and P2.**
5. **Television** ([docs/tv.md](docs/tv.md)), when the phones work.

What a device's web view can run is a question of fact, and [fsharp-wasm-embedded](https://github.com/fsharp-wasm/fsharp-wasm-embedded) has the page that asks it
(`probe/`): its reports decide which of the above can be web-only on which device.

## Contributing

Easy ways in, none of which needs a native toolchain:

- **Run the probe on a device** you have and file a [device report](https://github.com/fsharp-wasm/fsharp-wasm-embedded/issues/new?template=device_report.yml).
- **Ask for an API** that is not in the catalogue ([API request](https://github.com/fsharp-wasm/fsharp-wasm-mobile/issues/new?template=api_request.yml)), or correct a row: the catalogue is `apis.json`, and
  `node tools/catalogue.mjs` writes `docs/apis.md` from it (`--check` is what CI runs).
- **Argue with the contract.** It is a draft, and it is cheaper to change now.

[CONTRIBUTING](https://github.com/fsharp-wasm/.github/blob/develop/CONTRIBUTING.md) is the organisation's; [AGENTS.md](AGENTS.md) says how the platform is worked on.

## License

[Apache-2.0](LICENSE).
