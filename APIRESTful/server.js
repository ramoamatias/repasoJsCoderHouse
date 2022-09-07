const express = require("express");
const app = express();
const productosRouter = require("./routes/productos.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter);
app.use(express.static(__dirname+"/public"))

// Dejamos a la escucha el server 
const PORT = process.env.PORT || 8080;

const servidor = app.listen(PORT, (req, res) => {
    console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});

// Para que nos muestre por consola en caso de que suceda algun error.
servidor.on("error", error => console.log(`Error: ${error}`));