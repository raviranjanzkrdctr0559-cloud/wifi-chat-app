const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

let users = {}; // store online users

io.on("connection",(socket)=>{

  socket.on("join",(name)=>{
    users[socket.id] = {
      name,
      status: "online",
      lastSeen: Date.now()
    };

    io.emit("users", users);
  });

  socket.on("message",(data)=>{
    io.emit("message", data);
  });

  socket.on("disconnect",()=>{
    if(users[socket.id]){
      users[socket.id].status = "offline";
      users[socket.id].lastSeen = Date.now();
    }

    io.emit("users", users);
  });

});

server.listen(3000, ()=>{
  console.log("WiFi Chat running on port 3000");
});
