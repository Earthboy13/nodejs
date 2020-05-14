const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    items: [{
        product: {
            type: Object,
            ref: 'Product',
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    user:{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);