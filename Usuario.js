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



module.exports = Usuario;
