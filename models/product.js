const db = require('../util/database');

module.exports = class Product {
    constructor(title, imgUrl, description, price) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute("INSERT INTO product (title, imgUrl, description, price) VALUES (?, ?, ?, ?)",
            [this.title, this.imgUrl, this.description, this.price]);
    }
    static edit(title, imgUrl, description, price, id)
    {
        return db.execute("UPDATE product SET title=?, imgUrl=?, description=?, price=? WHERE id=?",
            [title, imgUrl, description, price, id]);
    }

    static delete(id) {
        return db.execute("DELETE FROM product WHERE id=?", [id]); 
    }

    static fetchAll() {
        return db.execute("SELECT * FROM product"); 
    }

    static findById(id) {
        return db.execute("SELECT * FROM product WHERE id=?", [id]);
    }
}