const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	isActive:{
		type: Boolean,
		default: true
	}
})

module.exports = mongoose.model('products', productSchema)