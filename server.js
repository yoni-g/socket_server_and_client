
const port = process.env.PORT || 8080;


const fs = require('fs');

const http = require("http").createServer((req, response) => {
    response.writeHeader(200, {"Content-Type": "text/html"});  
    const html = fs.readFileSync('./index.html');
    response.write(html)
    response.end();  
});
const io = require("socket.io")(http);

io.on("connection", (socket) => {

  console.info("new client is connected!")
  socket.emit("welcome", "Welcome to the socket")

  socket.on("join-chat-request", (message) => {
    console.log("message from cleint >>");
    console.info(message)
    handleJoinChatRequest(socket)

  });

  socket.on("disconnect", (reason) => {
    console.log("client disconnected with reason >>");
    console.info(reason)
  });

});

const handleJoinChatRequest = (socket) => {
  // mimc web request 
  setTimeout(() => {
    console.log("sending message to client >>");
    console.log("joined-chat", "Welcome to the Chat");
    socket.emit("joined-chat", "Welcome to the Chat")
  }, 2000);
}

http.listen(port, () => {
  console.log("server is listening on " + port)
});