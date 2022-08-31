// Primer desafio
const Usuario = require("./Usuario");

// Prueba de Usuario.
let nombre = "Matias",
    apellido = "Ramoa",
    mascota = ["Olivia","Canela","Dona","Apolo","Zeus","Max"];
    libro = [
        {
            nombre: "El señor de las moscas",
            autor: "William Golding"
        },
        {
            nombre: "Fundacion",
            autor: "Isaac Asimov"
        }
    ]

const usuarioMatias = new Usuario(nombre,apellido,libro,mascota);

console.log(usuarioMatias);
console.log();
console.log("Nombre completo Usuario: ",usuarioMatias.getFullName());
console.log("Cantidad de Mascotas: ",usuarioMatias.countMascotas());
console.log("Lista de libros: ",usuarioMatias.getBookName());

//Agregamos nuevas mascotas 
usuarioMatias.addMascota("Luna");
usuarioMatias.addMascota("Lula");
console.log("Cantidad de Mascotas actualizado : ",usuarioMatias.countMascotas());

//Agregamos dos libro
usuarioMatias.addBook("Harry Potter y la Piedra Filosofal","Joanne Rowling");
usuarioMatias.addBook("Animales fantásticos y dónde encontrarlos","Joanne Rowling");
console.log("Lista de libros actualizada: ",usuarioMatias.getBookName());

// Segundo Desafio 
// Puesta en Funcionamiento
// La carga del archivo no se puede ejecutar en secuencial con el resto de los métodos,  

// 1) Creamos el objeto Archivo con su referencia al Archivo de Texto.
const archivo = new Contenedor("./productos.txt");

// 2) Cargamos el archivo con los objetos de productos
archivo.save({ title: 'Escuadra', price: 123.45, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', })
  .then(res => {
    console.log("Id: ", res);
    return archivo.save({ title: 'Calculadora', price: 234.56, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png' });
  })
  .then(res => {
    console.log("Id: ",res);
    return archivo.save({ title: 'Globo Terráqueo', price: 345.67, thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png' });
  })
  .then(res => {
    console.log("Id: ",res);
  })
  .catch((err) => console.log(err));

// 3) Si queremos eliminar un objeto por id debemos de utilizar este metodo
archivo.getById(2)
  .then(res => console.log(res));

// 4) En el caso de querer eliminar todos los objetos.
archivo.getAll()
  .then(res => console.log(res));

// 5) Para poder eliminar un objeto en particular solo se debe de indicar el Id, si existe lo borrará de lo contrario no hara nada
archivo.deleteById(2);

// 6) Este metodo permite eliminar todos los objetos del archivo y nos deja un arreglo vacio.
archivo.deleteAll();
