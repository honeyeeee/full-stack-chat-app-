const express = require('express');
const mdb=require('./msg_schema')
const app = express();
const {Server} = require('socket.io');
const http= require('http');
const server = http.createServer(app);
const users={}
const  messageGet={}
const db = require('./db');
const schema = require('./schema');
const router = require('./rout');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/',router)


const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
io.on('connection',(socket)=>{
    console.log("new user connected");

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
 socket.on('join',(data)=>{
   users[data]=socket.id;
     console.log( 'get name from  back ',data)
     console.log(users)

     io.emit('user-connected',Object.keys(users));
 })

// socket.on('private-chat',(data)=>{
//     console.log(data);
//     const room = [data.ap,data.bp].sort().join('-');
//     console.log(data.ap)
//     socket.join(room);
//     console.log(room);
//     const reciver=users[data.bp];
//     if(reciver){
//         io.to(reciver).emit('private-msg',data);
//     }
// })

socket.on('private-chat', async (data)=>{

    console.log(data)
    const room = [data.ap,data.bp].sort().join('-');
    console.log(users)
    const reciver=users[data.bp]
    console.log(reciver)
    socket.join (room);
    console.log(room)
    console.log(data)
    const clients = io.sockets.adapter.rooms.get(room);


    const find= await mdb.find({
        room:room
    })

  
    console.log(`this is the data from private chat bro : ${find}`)
    console.log ('users' ,clients)


    io.to(room).emit('private-msg',{
        data:data,
        find:find
    })

})


socket.on('send', async (data)=>{
    // console.log(data);
console.log(data);
   const room = [data.username,data.name].sort().join('-');
   console.log( 'this data from backend ', data.message);

  await  mdb.create({
        username:data.username,
        receiver:data.name,
        message:data.message,
        room:room
    })



const mes= await mdb.find({
    room:room
})
 
// console.log(mes.message)
console.log('data from mdb', mes)

   messageGet[room]=[data.message];
//    console.log(messageGet);
    io.to(room).emit('get',{message:data.message,username:data.username ,room:room,db:mes});

})

socket.on('typing',(data)=>{
    console.log(`${data.username} is typing`);
    socket.broadcast.emit('typing-msg',data.username);
})

    socket.on('stop-typing',(data)=>{
        console.log(`${data.username} stopped typing`);
        socket.broadcast.emit('stop-typing-msg' ,data.username);
    })
})

const start = async ()=>{
    await db();
    server.listen(8800,()=>{
        console.log("server is running on port 8800");
    });
}
start();

