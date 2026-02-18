# find-free-port

A cross-platform CLI tool (and Node.js library) to find a free TCP port starting from a given base port.

## CLI Usage

```bash
# Print a free port starting from 3200
npx find-free-port 3200

# Start a command with the free port substituted in via {PORT}
npx find-free-port 3000 -- next dev --webpack -p {PORT}
npx find-free-port 8080 -- python -m http.server {PORT}
```

### Arguments

| Argument | Description | Default |
|---|---|---|
| `[basePort]` | Port to start scanning from | `3000` |
| `-- <cmd> [args...]` | Command to run with `{PORT}` replaced | _(none, prints port)_ |

## Programmatic Usage

```js
const { findFreePort } = require('find-free-port');

const port = await findFreePort(3200);
console.log(`Free port: ${port}`);
```

## How it works

Attempts to bind a TCP server to the given port. If the port is in use, it increments and tries again until a free port is found. Works on **Windows**, **macOS**, and **Linux**.
