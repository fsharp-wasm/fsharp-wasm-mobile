# The device APIs

<!-- Generated from apis.json by tools/catalogue.mjs: edit apis.json, not this file. -->

The device API catalogue. 32 APIs in 4 groups; each is a typed F# module, a JS glue module that uses the web's own API where there is one, and a native
implementation where there is not (see [contract.md](contract.md)). **Nothing is implemented yet**: every status is `planned`.

## P1: what almost every application needs

| API | Id | The web already gives | Only native gives | Status |
|---|---|---|---|---|
| Files and key-value storage | `storage` | IndexedDB, OPFS, localStorage | files in the app's own directory; survives clearing the web view's data | planned |
| Secure storage (Keychain, Keystore, Credential Locker) | `secure-storage` | — | hardware-backed secrets | planned |
| App lifecycle: pause, resume, back button, memory warning | `lifecycle` | visibilitychange, pagehide, freeze | the back button of Android, memory warnings, state restoration | planned |
| Deep links and universal links | `deep-links` | location, history | the OS hands the app a URL | planned |
| Share sheet | `share` | Web Share API | the native share sheet and share targets (receiving) | planned |
| Clipboard | `clipboard` | Async Clipboard API | clipboard without a user gesture where the OS allows it | planned |
| Haptic feedback | `haptics` | Vibration API (not on every platform) | impact, selection and notification feedback of the OS | planned |
| Safe area, status bar, orientation, keyboard insets | `safe-area` | env(safe-area-inset-*), Screen Orientation | status bar style, orientation lock, the keyboard's height | planned |
| Device and OS information | `device-info` | userAgentData, a few properties | model, OS version, locale, battery, free space | planned |
| Network status and type | `network` | navigator.onLine, Network Information (partial) | connection type, metered, reachability events | planned |
| Permission state and requests | `permissions` | Permissions API (partial) | the OS prompts and the settings page | planned |
| Open a URL in the system browser or another app | `open-url` | window.open | a custom tab, another app by scheme | planned |

## P2: common, with a permission or a native part that matters

| API | Id | The web already gives | Only native gives | Status |
|---|---|---|---|---|
| Local notifications | `notifications-local` | Notifications API (partial on mobile) | scheduled notifications, channels, badges | planned |
| Push notifications | `push` | Push API (partial) | APNs and FCM tokens, silent pushes | planned |
| Camera and photo library | `camera` | getUserMedia, <input capture> | the OS picker, saving to the library | planned |
| File picker and save dialog | `files` | File System Access API (partial), <input type=file> | the OS document picker and share-to-files | planned |
| Location, including background | `geolocation` | Geolocation API | background updates, significant-change, geofences | planned |
| Biometric and device-credential unlock | `biometrics` | WebAuthn (passkeys) | local authentication that gates the app or a secret | planned |
| Keep the screen on | `keep-awake` | Screen Wake Lock API | the same, where the web view lacks the API | planned |
| Media controls, lock screen, audio session | `media-session` | Media Session API | audio focus, background audio, remote commands | planned |

## P3: specialised

| API | Id | The web already gives | Only native gives | Status |
|---|---|---|---|---|
| Motion, orientation, compass | `sensors` | DeviceMotion, DeviceOrientation, Generic Sensor (partial) | the same without a permission dance in each web view | planned |
| Bluetooth LE | `bluetooth` | Web Bluetooth (not on iOS) | CoreBluetooth and the Android stack | planned |
| NFC | `nfc` | Web NFC (Android only) | reading and writing tags on both OSes | planned |
| Background work | `background-tasks` | — | scheduled and long-running tasks within the OS's limits | planned |
| In-app purchases and subscriptions | `in-app-purchase` | — | StoreKit and Play Billing | planned |
| Sign in with Apple, Google | `sign-in` | — | the native sign-in sheets | planned |
| Contacts and calendar | `contacts-calendar` | Contact Picker (Android, partial) | reading and writing, with the OS permission | planned |
| Speech recognition and synthesis | `speech` | Web Speech API (partial) | on-device recognition | planned |
| Printing and PDF export | `print` | window.print | the native print dialog from a document | planned |

## TV: television targets, later

| API | Id | The web already gives | Only native gives | Status |
|---|---|---|---|---|
| Remote control keys: D-pad, back, play/pause, colour keys | `tv-remote` | KeyboardEvent (varies by TV) | media and colour keys the web view does not deliver | planned |
| Spatial navigation: focus that follows the D-pad | `tv-focus` | CSS spatial navigation (not shipped broadly) | a focus model for apps without a pointer (shared with the editors' roving focus) | planned |
| 10-foot UI: overscan, safe margins, resolution | `tv-display` | media queries, a few | display modes, HDR, frame-rate matching | planned |
