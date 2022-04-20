const express = require (`express`);
const routerProductos = require ( `./productos`);
const routerCarrito = require(`./carrito`)


const router = express.Router();

router.use(`/productos`, routerProductos);
router.use(`/carrito`, routerCarrito)

module.exports = router;