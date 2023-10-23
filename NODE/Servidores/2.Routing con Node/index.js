const http = require("http")

const app = http.createServer((req, res)=>{
    res.setHeader ("Content-Type", "text/html")
    const url = req.url;
    const method = req.method;
    console.log(url)

    switch (url) {
        case "/abel":
            res.end("<h2>Abel Garcia Heredia</h2>");
            break;
        case "/maria":
            res.end("<h2>Maria Luquero Garcia</h2>");
        default:
            break;
    }
    if(method === "GET" && url === "/movies") getMovies(res);
})

const getMovies = (res) => {
    const movies = [
        {
            name: "Las tortugas ninjas",
            age: 2023
        },
        {
            name: "Spiderman",
            age: 2022
        },
        {
            name: "Avatar",
            age: 2021
        }
    ]
    const JSONmovies = JSON.stringify(movies);
    // res.setHeader("content-type", "application/json");
    res.end(JSONmovies);
};

app.listen(8080, ()=>{
    console.log("server listening on port http://localhost:8080");
})
