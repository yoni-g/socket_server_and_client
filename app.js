var BASE_URL = "https://mysterious-atoll-34815.herokuapp.com/";
var TEST_URL = "http://localhost:8080"

const port = process.env.PORT || 8080;

const fs = require('fs');
const http = require("http").createServer((req, response) => {
    response.writeHeader(200, {"Content-Type": "text/html"});  
    const html = fs.readFileSync('./index.html');
    response.write(html)
    response.end();  
});

const io = require("socket.io-client");

// let socket = io.connect(BASE_URL);


const socket = io(BASE_URL);


socket.on("connect", rr => {
    console.log("on connect", rr);
    socket.emit("message", "This is a message from the client")
    // socket.emit("salutations", "This is a message from the client")
})


// console.log(socket);

socket.on("welcome", data => {
    console.log("received:", data)
})

socket.on("error", err => {
    console.log("error", err);
})

socket.on("open", rr => {
    console.log("open", rr);
})

socket.connect(res => {
    console.log("connect", res);

})

http.listen(port, () => {
    console.log("server is listening on " + port)
});