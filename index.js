const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth" , userRoutes);
app.use("/api/messages" , messageRoutes);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection is succesfull");
}).catch((e)=>{
    console.log(e.message);
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}
const server = app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})

const io = socket(server , {
    cors:{
        origin : "*",
        credentials:true,
    }
});
global.OnlineUsers = new Map();

io.on("connection" , (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user" , (userId)=>{
        OnlineUsers.set(userId , socket.id);
    });
    socket.on("send-msg" , (data)=>{
        const sendUserSocket = OnlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive" , data.message);
        }
    })
})