const WebSocket = require('ws');

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        const messageString = message.toString();
        console.log('Received:', messageString);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${messageString}`);
            }
        });
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is listening on port 8080');
