// server.js

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('A new client connected!');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        // Broadcast incoming message to all clients
        wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
        });
    });

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server started on port 8080');
