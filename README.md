# Refined USTC

[WIP] A Chrome extension for USTCers to improve the USTC online experience.

## Structure

- `chrome-ext`: Chrome extension.

  - Frontend framework used: [Refina.js](https://refinajs.github.io/refina).

  - Chrome extension manifest is inside `vite.config.ts`.

  - `src/assets` folder: static assets.

  - `src/content` folder: content scripts.

  - `src/popup` folder: popup page.

  - `src/shared`: shared code.

- `vite-plugin`: Vite plugin for Chrome extension development.

## Development

1. Clone this repo.

2. Install dependencies.

```bash
pnpm i
```

3. Start the development server.

- In one terminal:

```bash
cd ./vite-plugin
pnpm dev
```

- In another terminal:

```bash
cd ./chrome-ext
pnpm dev
```

4. Load the extension in Chrome.

- Open `chrome://extensions/` in Chrome.

- Turn on the `Developer mode` switch.

- Click `Load unpacked` and select the `chrome-ext/dist` folder.

5. Enjoy!

## Build

```bash
# In the root directory
pnpm build
```
