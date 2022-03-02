const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = new Schema({
    idUser: {
        type: String,
        required: [true, "User required!"]
    },
    products: {
        type: Array,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("cart", Cart);