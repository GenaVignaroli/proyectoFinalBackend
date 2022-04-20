const express = require(`express`);
const { productosController } = require(`../controllers/contrProductos`);

const router = express.Router();

router.get(`/`, async (req, res)=> {
    const producto = await productosController.getAll();
    res.json({
        data: producto,
    });
});

router.get(`/:id`, async (req, res)=> {
    const { id } = req.params;

    const producto = await productosController.getByID(id);

    if(!producto)
    return res.status(404).json({
        msg:`Producto no encontrado. Intenta nuevamente`
    });

    res.json({
        data: producto,
    });
});

router.post(`/`, async (req, res)=> {
    const {id, timestamp, nombre, descripcion, codigo, url, precio, stock} = req.body;

    if(!id || !timestamp || !nombre || ! descripcion || !codigo || !url || !precio || !stock)
    return res.status(404).json({
        msg:`Completar todos los campos del producto!`
    });

    const nuevoProducto = {
        id,
        timestamp,
        nombre,
        descripcion,
        codigo, 
        url,
        precio,
        stock,
    };

    await productosController.cargarProducto(nuevoProducto);

    res.json({
        msg: `Producto cargado exitosamente! Muchas gracias!`
    });
});

router.put(`/:id`, async (req, res)=> {
    const { timestamp, nombre, descripcion, codigo, url, precio, stock} = req.body;
    const { id } = req.params;

    const producto = await productosController.getByID(id);

    if(!producto)
    return res.status(404).json({
        msg:`Producto no encontrado. Intente nuevamente`
    })

    if( !timestamp || !nombre || ! descripcion || !codigo || !url || !precio || !stock)
    return res.status(404).json({
        msg:`Completar todos los campos del producto!`
    });

    const productoEditado = {
        timestamp,
        nombre,
        descripcion,
        codigo, 
        url,
        precio,
        stock,
    };

    const result = await productosController.edita(id, productoEditado);

    res.json({
        data: result,
    });
});

router.delete(`/:id`, async (req, res)=>{
    const { id } = req.params;

    await productosController.deleteByID(id);
    res.json({
        msg: `Producto borrado existosamente!`
    });
});

module.exports = router;