
/*
    product 0..* komposition 1 lagerbil
*/

export default class Product {
    constructor(name, productId, amount, unit, licensePlate) {
        this.name = name
        this.productId = productId
        this.amount = amount
        this.unit = unit
        this.licensePlate = licensePlate
    }

    toJSON() {
        const json = {
            name: this.name,
            productId: this.productId,
            amount: this.amount,
            unit: this.unit,
            licensePlate: this.licensePlate,
        }
        return json;
    }
}