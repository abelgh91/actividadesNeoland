const express = require("express");
const PORT = 8080;
const app = express();

const router = express.Router();

router.get("/biblioteca/:libros", (req, res, error) => {
    const { libros } = req.params;
    const librosHaruki = ["kafkaEnLaOrilla", "TokioBlues", "HombresSinMujeres"];
    let acc = 0;
    librosHaruki.forEach((element) => {
        element.toLowerCase() === libros.toLowerCase() && acc++;
    });

    return acc > 0
    ? res.status(200).json("se ha encontrado el libro")
    : res.status(404).json("no se ha encontrado el libro")
});

router.get("/queryBuscar", (req, res, error) => {
    const { category, title } = req.query;
  console.log(title);

  if (category) {
    const books = ["kafkaEnLaOrilla", "TokioBlues", "HombresSinMujeres"];
    let acc = 0;
    books.forEach((item) => {
      item.toLowerCase() === category.toLowerCase() && acc++;
    });

    return acc > 0
      ? res.status(200).json("se ha encontrado el libro 👌")
      : res.status(404).json("no se ha encontrado ❌");
  } else {
    return res.status(404).json("no ha incluido la categoria");
  }
});

app.use("/api/v1", router);

app.listen(PORT, () => 
console.log(`Server listening on port:http://localhost:${PORT}`)
)