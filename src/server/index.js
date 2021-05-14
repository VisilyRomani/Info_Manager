const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


// TODO remove all socketjwt bull and use sessions
// TODO connect to heroku server for database pull of users
const server = require('http').Server(app);



const io = module.exports.io = require("socket.io")(server, {
    cors:{
        origins:["http://localhost:3000"],
    },
    handlePreflightRequest: (req,res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            // "Access-Control-Allow-Credentials": true

        });
    }
});

const PORT = process.env.PORT || 5000;

const SocketManager = require('./SocketManager');

// app.use(express.static(__dirname + '/../../build'));

io.on('connection', SocketManager);

server.listen(PORT, ()=>{
    console.log(`connected on ` + PORT);
});