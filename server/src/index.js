/*
const http = require("http");
const PORT = 3001;
const characters = require("./utils/data");
const getCharById = require("./controllers/getCharById");

http.createServer((req, res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.url.includes("/rickandmorty/character")){
        const id = req.url.split("/").pop();
        getCharById(res, id);
    }
    else{
        return res
        .writeHead(404, {"Content-Type": "application/json"})
        .end(JSON.stringify({message:"Wrong url"}))
    }
    
}).listen(PORT, "localhost", ()=>{console.log(`Server listening on PORT: ${PORT}`)});
*/

const server = require("./app.js");
const PORT = 3001;

server.listen(PORT, () => {
   console.log('Server raised in port: ' + PORT);
});