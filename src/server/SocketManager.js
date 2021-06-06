const db = require("./database");
const io = require('./index.js').io;

const data = {a:123,b:223}


module.exports = (socket) =>{
    var clients = [];

    io.on("connection", (socket)=> {
        console.log("connected")
        clients.push(socket);

        socket.on('disconnect', function () {
            console.log('disconnected')
            delete clients[clients.indexOf(socket)];
        });

        // This will be used when the server does an update when a user creates a new job
        // for (var i in clients) {
        //     clients[i].emit('serverMessages', /* messages object */);
        // }


        // TODO: recreate the logic to send the data back to the client for initial pull.  
        const jobLookup = async (dates) => {
            // db.any('SELECT * FROM jobs WHERE book_date between $1 AND $2', dates).then((data)=> {
            //     socket.emit('initJobs', data);
            // });
            db.any('SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date between $1 AND $2', dates).then((data)=> {
                socket.emit('initJobs', data);
            });
        }

        socket.on('pgInit', (dates) => {
            console.log(dates);
            jobLookup(dates)
        })



        // const jobLookup = async (dates) => {
        //     console.log(dates);
        //     return await db.any('SELECT * FROM jobs WHERE book_date between $1 AND $2', dates).then((data)=> {
        //         console.log(data);
        //         return data;
        //     });
            
        //     // db.any('SELECT * FROM users;').then((data) => {
        //     //     console.log(data);
        //     //     return data;
        //     // })


        // console.log("aaa" +jobLookup(dates));

        // socket.emit('getJobs',  jobLookup(dates), dates);
        
        // TODO: put the data when when a new person inserts emit update to all people
    });

}

