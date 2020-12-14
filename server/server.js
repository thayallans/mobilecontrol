const https = require('http');
const fs = require('fs');
const WebSocketServer = require('ws').Server;

const httpsServer = https.createServer();
httpsServer.listen(8080);

const wss = new WebSocketServer({
	server: httpsServer,
});

console.log(wss);

wss.on('connection', (ws, req) => {
	console.log('Connection Opened');
	ws.on('message', (data) => {
		console.log(data);
	});
	ws.on('close', () => {
		console.log('Websocket is closing!');
		
	});
});

console.log("Websocket Server is running on port 8080");