const {Router} = require("express")

const router = Router();
const productos = [];
let idProductos = 0;

// Devuelve todos los productos
router.get("/",(req,res)=>{
    res.json({productos})
})

// Devuelve el producto de acuerdo a su id
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const producto = productos.find(el => el.id == id);
    if (producto) {
        res.json(producto);
    } else {
        res.json({
            error: "Producto no encontrado"
        });
    }
})

// Agrega un nuevo producto.
router.post("/",(req,res)=>{
    const producto = req.body;
    idProductos++;
    producto.id = idProductos;
    productos.push(producto);
    res.json({
        id:idProductos
    });
})

// Actualizamos un producto de acuerdo a su id
router.put("/:id",(req,res) => {
    const {id} = req.params;
    const datosNuevos = req.body;
    let producto = productos.find(el => el.id == id),
    posProducto = productos.findIndex(el => el.id == id);

    if (producto) {
        let idProd = producto.id;
        producto = {...producto, ...datosNuevos, id:idProd}
        productos.splice(posProducto,1,producto);
        res.json(producto);
    } else {
        res.json({
            error: "Producto no encontrado"
        })
    }
})

// Eliminamos un producto de acuerdo a su id.
router.delete("/:id",(req,res) => {
    const {id} = req.params;
    let posProducto = productos.findIndex(el => el.id == id);
    console.log(posProducto);
    if (posProducto>=0 ){
        productos.splice(posProducto,1);
        res.json({eliminado:id});
    } else {
        res.json({error:"Producto no encontrado"});
    }
})


module.exports = router;