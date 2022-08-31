const Contenedor = require("./Contenedor");
const express = require("express");
const app = express();

// Dejamos a la escucha un puerto de nuesrto servidor
const PORT = 8080;
const servidor = app.listen(PORT, (req, res) => {
  console.log(`Escuchando al puerto ${PORT}`);
});

// Para que nos muestre por consola en caso de que suceda algun error.
servidor.on("error",error=> console.log(`Error: ${error}`));

// Implementamos el endpoint /productos que me devolvera un array con los productos disponibles.
const cont = new Contenedor("./productos.txt");
let arregloProductos = [];

cont.getAll().then(
    res => arregloProductos = res
);


app.get("/productos", (req, res) => {
  res.send(arregloProductos);
});

// Nos devuelve un producto al azar entre todos los productos disponibles
app.get("/productoRandom", (req, res) => {
    let nroRandom = Math.round(Math.random() * (arregloProductos.length-1));
    res.send(arregloProductos[nroRandom]);   
});
  
