/**
 * find-free-port
 * Programmatic API for finding a free TCP port.
 */

const net = require('net');

/**
 * Finds a free TCP port starting from the given port number.
 * @param {number} startPort - The port to start scanning from (default: 3000)
 * @returns {Promise<number>} - Resolves with the first available port
 */
function findFreePort(startPort = 3000) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            server.close(() => resolve(startPort));
        });
        server.on('error', () => resolve(findFreePort(startPort + 1)));
    });
}

module.exports = { findFreePort };
