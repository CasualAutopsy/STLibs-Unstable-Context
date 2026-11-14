# Unstable ST Context

A library designed to improve QoL for extension developers by putting exports that aren't included in `SillyTavern.getContext()` into it's own easily accessible function.

## Installation

1. Open the extension settings drawer in SillyTavern and click `Install extension`.
2. Paste the following link: `https://github.com/CasualAutopsy/STLibs-Unstable-Context.git`.
3. Click `Install just for me` if you're a user, or `Install for all users` if you're a developer.

## Usage

Since this is a developer resource, the library does nothing on it's own, and is only required to be downloaded by a user if the extension they're using is dependant on this one.

For developers that want to use this as a dependency, usage is quite simple:

```js
const unst_ctx = getUnstableSTContext();
```

The function is in the `globalThis` object, so no import is needed.
If you want the typedef or to add it to your auto-complete menu, then simply add this to your `global.d.ts` file:

```ts
import '../STLibs-Unstable-Context/libs';
```

And don't forget to add this library as a dependency to your `manifest.json`! It can be done like so:

```json5
{
    // ...The rest of your manifest config here.
    "dependencies": [
        "third-party/STLibs-Unstable-Context"
    ],
}
```
