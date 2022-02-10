const http = require("http")

/* http.createServer((req, res)=>{ //ecouter le serveur dans un certain port
    res.write("tutu")
    res.end()
}).listen(80) */

//http.createServer().listen(3000) en faisant le f12 il montrera la doc

//idemn que ça 

const server = http.createServer((req, res) => {
    console.log(req.url)
})
server.listen(3000)