const Product = require("./Product");

module.exports = class  Posters extends Product {
    constructor(name, description, height, widht, price, inStock = 0) {
        super(name, description, price, inStock)
        this.height = height
        this.widht = widht
    }
}