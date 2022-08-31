const fs = require("fs");

class Contenedor {

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.listaObjetos = [];
    this.idObjeto = this.maxid();
  }

  // Funcion que devuelve verdadero si existe el archivo y falso si no existe.
  isExiste() {
    return fs.existsSync(this.nombreArchivo);
  }

  // Funcion que busca el maximo id generado para continuar con la numeracion de id.
  maxid() {
    if (this.isExiste()) {
      let contenido = fs.readFileSync(this.nombreArchivo, "utf-8");
      contenido = JSON.parse(contenido);
      if (contenido.length !== 0) {
        let ids = contenido.map(el => el.id);
        return Math.max(...ids)
      } else {
        return 0
      }
    }

    return 0;
  }

  // Guarda el objeto pasado por parametro en el archivo y devuelve el id que tiene asignado. 
  async save(objeto) {
    try {
      let arregloObjetos = [];
      this.idObjeto++;
      objeto.id = this.idObjeto;
      // Si no existe el archivo lo creamos diractemente sin leer el contenido
      if (!fs.existsSync(this.nombreArchivo)) {
        arregloObjetos.push(objeto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arregloObjetos))
      } else {
        const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        arregloObjetos = JSON.parse(contenido);
        arregloObjetos.push(objeto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arregloObjetos));
      }
      return this.idObjeto;

    } catch (error) {
      console.error(error);
    }

  }

  //Recupera el objeto que se desea recuperar a partir de un Id que recibe por parametro
  async getById(idObjeto) {
    try {
      let arregloObjetos = [];
      const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      arregloObjetos = JSON.parse(contenido);
      return arregloObjetos.find(el => el.id === idObjeto) || null;
    } catch (error) {
      console.log(error);
    }

  }

  // Devuelve un arreglo con todos los Objetos que tenga el contenedor.   
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }

  //Eliminamos el objeto que pasamos por parametro.
  async deleteById(idObjeto) {
    try {
      let arregloObjetos = [];
      const contenido = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      arregloObjetos = JSON.parse(contenido);
      let posicionObjeto = arregloObjetos.findIndex(el => el.id === idObjeto);
      arregloObjetos.splice(posicionObjeto, 1);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(arregloObjetos));
    } catch (error) {
      console.log(error);
    }
  }

  // //Eliminamos todos los objetos que estan en el archivo.
  async deleteAll() {
    if (this.isExiste()) {
      await fs.promises.writeFile(this.nombreArchivo, "[]");
    }
  }
}

module.exports = Contenedor;