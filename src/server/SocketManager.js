// const db = require("./database");
// const io = require('./index.js').io;

// module.exports = (socket) =>{
//     io.on("connection", (socket)=> {


//         socket.on('disconnect', function () {
//             console.log('disconnected')
//         });

//         socket.on('pgInit', (dates) => {
//             console.log(dates);
//             jobLookup(dates)
//         });
    
//         const jobLookup = async (dates) => {
//             // db.any('SELECT * FROM jobs WHERE book_date between $1 AND $2', dates).then((data)=> {
//             //     socket.emit('initJobs', data);
//             // });
//             db.any('SELECT * FROM jobs FULL OUTER JOIN clients ON clients.client_id = jobs.client_id WHERE book_date between $1 AND $2', dates).then((data)=> {
//                 socket.emit('initJobs', data);
//             });
//         }
//     });
// }


