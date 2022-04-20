const { timeStamp } = require("console");
const fs = require(`fs`);
const { v4: uuid } = require(`uuid`);

class Carrito {
    constructor(a) {
        this.carrito = a;
    }

    async obtenerCarritos() {
        const carrito = await fs.promises.readFile(this.carrito, `utf-8`);
        return JSON.parse(carrito);
    }

    async guardarCarrito(c) {
        await fs.promises.writeFile(this.carrito, JSON.stringify(c, null, `\t`));
    }

    async crearCarrito(i) {
        const carrito = await this.obtenerCarritos();
        let id;

        const nuevoCarrito = {
            id: uuid(),
            timestamp: Date.now(),
            productos: i.productos
        };

        carrito.push(nuevoCarrito);

        await this.obtenerCarritos(carrito);
    }

    async deleteCarrito(n) {
        const carrito = await this.obtenerCarritos();

        const newArray = carrito.filter((c)=> {
            c.id === n
        });

        await this.guardarCarrito(newArray);
    }


}

const carritosController = new Carrito(`carritos.json`);

module.exports = {
    carritosController: carritosController,
   
}