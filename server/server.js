const https = require('https');
const fs = require('fs');
const { WebSocketServer } = require('ws');

// read ssl certificate
const privateKey = fs.readFileSync(
	'/etc/letsencrypt/live/mobilecontrol.club/privkey.pem',
	'utf8'
);
const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/mobilecontrol.club/cert.pem',
	'utf8'
);

const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials);
httpsServer.listen(8082);

const wss = new WebSocketServer({
	server: httpsServer,
});

wss.on('connection', (ws, req) => {
	console.log('Connection Opened');
	ws.on('message', (data) => {
		console.log(data);
	});
	ws.on('close', () => {
		console.log('Websocket is closing!');
		
	});
});