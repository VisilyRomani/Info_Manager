const io = require('./index.js').io;
const socketJWT = require('socketio-jwt');


module.exports = (socket) =>{
    socket.on("connection",socketJWT.authorize({
        secret:"test",
        timeout:15000
    })).on('authenticated', (socket)=> {
        console.log('auth yee')
    });

    console.log("id " + socket.id);
}

