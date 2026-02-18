#!/usr/bin/env node
// get-free-port CLI
// Finds a free TCP port starting from BASE_PORT (default 3000) and prints it to stdout.
// If extra args are provided after '--', spawns that command with {PORT} replaced by the found port.
//
// Usage (standalone):   npx get-free-port [basePort]
// Usage (with command): npx get-free-port [basePort] -- <cmd> [args...]
//   e.g. npx get-free-port 3000 -- next dev --webpack -p {PORT}

const { getFreePort } = require('../index');
const { spawn } = require('child_process');

const separatorIndex = process.argv.indexOf('--');
const scriptArgs = separatorIndex === -1 ? process.argv.slice(2) : process.argv.slice(2, separatorIndex);
const commandArgs = separatorIndex === -1 ? [] : process.argv.slice(separatorIndex + 1);

const BASE_PORT = parseInt(scriptArgs[0] ?? '3000', 10);

if (isNaN(BASE_PORT) || BASE_PORT < 1 || BASE_PORT > 65535) {
    console.error(`Error: invalid port "${scriptArgs[0]}". Must be a number between 1 and 65535.`);
    process.exit(1);
}

getFreePort(BASE_PORT).then((port) => {
    if (commandArgs.length === 0) {
        // Standalone mode: just print the port
        process.stdout.write(String(port) + '\n');
        return;
    }

    // Command mode: replace {PORT} placeholder in all args, then spawn
    const [cmd, ...args] = commandArgs.map((arg) => arg.replace(/\{PORT\}/g, String(port)));
    console.log(`Found free port ${port}. Running: ${cmd} ${args.join(' ')}`);

    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => process.exit(code ?? 0));
});
