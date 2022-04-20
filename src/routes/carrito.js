const express = require(`express`);
const { carritosController } = require(`../controllers/contrCarrito`);

const router = express.Router();

router.post(`/`, async (req, res)=> {
    const {id, timestamp, productos} = req.body;

    if(!id || !timestamp)
    return res.status(404).json({
        msg: `Carrito inexistente o carrito vacío!`
    });
    if(id, timestamp, !productos)
    return res.json({
        msg: `El carrito fue creado pero esta vacío :(`
    });

    const nuevoCarrito ={
        id,
        timestamp, 
        ...productos,
    };

    await carritosController.crearCarrito(nuevoCarrito);

    res.json({
        msg: `Carrito creado y con productos cargados!`
    })

})

module.exports = router;