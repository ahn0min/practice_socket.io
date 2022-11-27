// import { createServer } from "http";
// import { Server } from "socket.io";

const http = require("http");
const Socket = require("socket.io");
const express = require("express");
const app = express();
const { Server } = Socket;
const { createServer } = http;
const fs = require("fs");
// const createServer = require("http");
// const Server = require("socket.io");

app.get("/", (req, res) => {
  fs.readFile("HTMLPage.html", (error, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});
const httpServer = createServer(app);

const server = new Server(httpServer, {});

// connection event가 발생
server.on("connection", (socket) => {
  // asdf라는 room에 join한다.
  socket.join("asdf");
  const userCount = server.sockets.adapter.rooms.get("asdf").size;
  // socket은 클라이언트 측과 연결된 소켓이다.
  // socket에서 ping이라는 이벤트로 보내면 function을 호출한다.
  socket.on("message", (data) => {
    // data라는 네임의 room에 join한다.
    // data라는 방에 emit을 통해 message event로 data를 전달한다.
    server.sockets.in("asdf").emit("message", {
      data,
      userCount,
    });
    // socket.emit("message", data);
  });
});

httpServer.listen(4000);
