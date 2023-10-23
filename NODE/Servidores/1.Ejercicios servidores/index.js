//NODE

const http = require("http");

const app = http.createServer((req,res)=>{
    res.statusCode=200
    // res.setHeader("content-type", "text/plain")
    res.end("<h1>Buenos dias</h1>")
})

app.listen(8080, ()=>{})
console.log("server listening on port http://localhost:8080")