const fs = require(`fs`)
const { v4: uuid } = require(`uuid`);

class Productos {
    constructor(a) {
        this.productos = a;
    }

    async obtenerProductos() {
        const items = await fs.promises.readFile(this.productos, `utf-8`);
        return JSON.parse(items);
    }

    async guardarProductos(p) {
        await fs.promises.writeFile(this.productos, JSON.stringify(p, null, `\t`));
    }

    async cargarProducto(i) {
        const producto = await this.obtenerProductos();
        let id;

        const nuevoProducto = {
            id: uuid(),
            timestamp: Date.now(),
            nombre: i.nombre,
            descripcion: i.descripcion,
            codigo: uuid(),
            foto: i.url,
            precio: i.precio,
            stock: i.stock,
        };

        producto.push(nuevoProducto);

        await this.guardarProductos(producto);
    }

    async getByID(n) {
        const producto = await this.obtenerProductos();

        const i = producto.findIndex((p)=> {
            if(p.id === n) return true;
            else return false;
        })

        if (i === -1) return null;

        return producto[i];
    }

    async getAll() {
        const producto = await this.obtenerProductos();

        return producto;
    }

    async deleteByID(n) {
        const producto = await this.obtenerProductos();

        const newArray = producto.filter((p)=> {
            p.id === n
        });

        await this.guardarProductos(newArray);
    }

    async deleteAll() {
        const nuevo = [];

        await this.guardarProductos(nuevo);
    }

    async edita(id, data) {
        const producto = await this.getAll();

        const i = producto.findIndex((p)=> p.id === id);

        if(i<0) throw new Error(`No existe un producto con ese id`);

        const productEditado = {
            id,
            ...data,
        };
        
        producto.splice(i, 1, productEditado);

        await this.guardarProductos(producto);

        return productEditado;
    }
}

const productosController = new Productos(`productos.json`);

module.exports = {
    productosController: productosController,
   
}