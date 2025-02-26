const socket_IO = require('socket.io');
const userModel = require('../models/userModel');
const driverModel = require('../models/driverModel');

let io;

function initSocket(server) {
    io = socket_IO(server,{
        cors : {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', function(socket){
        console.log(`Client connected : ${socket.id}`);

        socket.on('join', async (data) => {
            const {userId,userType,firstName} = data;

            console.log(`Username : ${firstName}, id : ${userId} joined as ${userType}`)
            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{$set:{socket_id:socket.id}});
                console.log(`user connected : ${socket.id}`);
            } else if(userType === 'driver'){
                await driverModel.findByIdAndUpdate(userId,{$set:{socket_id:socket.id}});
                console.log(`driver connected : ${socket.id}`);
            }
        });
        socket.on('disconnect', function(){
            console.log('Client disconnected');
        });

    });
}

function sendMessage(socket_id,message){
    if(io){
        io.to(socket_id).emit('message',message);
    } else {
        console.log('socket not initialized');
    }
}

module.exports = {
    initSocket,
    sendMessage
}