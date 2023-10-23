// EXPRESS

const express = require("express");

const PORT = 8080;

const app = express();

//-----------------ROUTING---------------

const router = express.Router();

router.get("/saludo", (req, res, next)=>{
    res.send("<h2>Buenas tardes</h2>")
});

router.get("/pesada", (req, res, next)=>{
    res.send("<h1>HOLA PESADA</h1>")
})

router.get("/movies", (req, res, next) => {
    const movie = ["Star War", "Dorameon", "Titanic", "Shinchan"];
    res.send(movie);
  });

  //---------------CONFIGURAR USO DEL ROUTER

  app.use("/api/v1", router)

app.listen(PORT, ()=>{
    console.log("server listening on port http://localhost:8080")
});