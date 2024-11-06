const PORT = process.env.PORT || 3000
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// İstemciye socket.io.js dosyasını sağlayabilmek için statik dosya servisi ayarla
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı.');
    for (let inner in socket) {
        console.log(inner)
    }
    socket.on('mesaj', (msg) => {
        console.log('Mesaj: ' + msg);
        io.emit('mesaj', msg);
    });
});

server.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
