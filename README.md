# Isomorph in Bun

In this repo there is an example of memory usage issue with Bun.

### Instructions

Build app for Bun by _Rspack_:

```bash
NODE_ENV=production npm run build
```

Run built app:

```bash
NODE_ENV=production bun run dist/index.js
```

Run built app with `--smol` flag:

```bash
NODE_ENV=production bun --smol run dist/index.js
```

Loading by _k6_:

```bash
k6 run load/index.js
```
