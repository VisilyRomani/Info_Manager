const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
app.set('port', (process.env.PORT || 5000))
const origins = ['https://sprouts-control-center.herokuapp.com','http://localhost:3000','http://localhost:5000', 'https://sprouts-control-center.herokuapp.com/favicon.ico' ]
const controller = require('./authController');
const corsOptions = {
    origin: origins,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
    }
const cookieParser = require('cookie-parser');
const db = require("./database");


require('dotenv').config();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
let scriptSources, styleSources, connectSources, imgSources;
scriptSources = ["'self'" ];
styleSources = ["'self'", "'unsafe-inline'"];
imgSources = ["'self'"]
connectSources = ["'self'", "https://sprouts-control-center.herokuapp.com", "ws://sprouts-control-center.herokuapp.com"]
app.use(helmet.contentSecurityPolicy({
    scriptSrc: scriptSources,
    imgSrc: imgSources,
    // connectSrc:connectSources,
    reportUri: '/report-violation',
    reportOnly: false,
    setAllHeaders: false,
    safari5: false
}));


const server = require('http').Server(app);

app.post('/auth/login', controller.signin);

// app.post('/auth/register', controller.reg);

app.get('/auth/jwt', controller.check);



const io = module.exports.io = require("socket.io")(server, {
    cors:{
        origins:origins,
    },
    handlePreflightRequest: (req,res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": origins,
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "my-custom-header",
            "Access-Control-Allow-Credentials": true

        });
    }
    
});

app.use(express.static(__dirname + '/../../build'));
let connectCounter=0;
io.on('connection', socket => {
    console.log(connectCounter)
    connectCounter++; 
    
    socket.on('pgInit', (dates) => {

        db.any('SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date between $1 AND $2', dates).then((data)=> {
            socket.emit('initJobs', data);
            console.log(data);
        });
    });

    socket.on('disconnect', () => {
        socket.removeAllListeners();
        connectCounter--;
     });
});

server.listen(PORT, ()=>{
    console.log(`connected on ` + PORT);
});