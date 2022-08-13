class Usuario {
    constructor(nombre,apellido,libros,mascotas) {
        this.nombre = nombre; //Contiene el nombre en forma de cadena
        this.apellido = apellido; //Contiene el nombre en forma de cadena
        this.libros = libros;   //Es un arreglo de objetos, que contiene objetos de tipo libros.
        this.mascotas = mascotas; //Es un arreglo de string, que contiene el nombre de las mascotas.
    }

    // Nos devuelve el nombre completo del usuario Nombre y Apellido
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    //Nos permite agregar una nueva mascota a la lista de mascotas 
    addMascota(nuevaMascota){
        this.mascotas.push(nuevaMascota);
    }

    // Retorna la cantidad de mascotas que tiene el usuario.
    countMascotas(){
        return this.mascotas.length;
    }

    //Agrega un objeto de tipo Libro al arreglo de libros que tiene el usuario.
    addBook(nombre,autor){
        let libro = {
                nombre,
                autor
            }
        this.libros.push(libro);    
    }

    // Devuelve un arreglo con solo los nombres de libros que tiene el usuario
    getBookName(){
      return this.libros.map(el => el.nombre);
    }

}



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
