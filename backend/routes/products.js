const express = require('express')
const router = express.Router()
const Product = require('../models/product')

//Getting all
router.get('/', async (req, res) => {
	try {
		const products = await Product.find()
		res.json(products)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Getting One
router.get('/:id', getProduct, (req, res) => {
	res.json(res.product)
})

//Creating One
router.post('/', async (req, res) => {
	const product = new Product({
		name: req.body.name,
		stock: req.body.stock,
		price: req.body.price,
		category: req.body.category,
		image: req.body.image,
		isActive: req.body.isActive
	})
	try {
		const newProduct = await product.save()
		res.status(201).json({
			ok: true,
			message: "Product inserted successfully!"
		})
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: err
		});
	}
})

//Updating One
router.patch('/:id', getProduct, async (req, res) => {
	if (req.body.name != null) {
		res.product.name = req.body.name
	}
	if (req.body.stock != null) {
		res.product.stock = req.body.stock
	}
	if (req.body.price != null) {
		res.product.price = req.body.price
	}
	if (req.body.category != null) {
		res.product.category = req.body.category
	}
	if (req.body.image != null) {
		res.product.image = req.body.image
	}
	if (req.body.isActive != null) {
		res.product.isActive = req.body.isActive
	}
	try {
		const updatedProduct = await res.product.save()
		res.status(201).json({updatedProduct, ok:true})
	} catch (err) {
		res.status(400).json({ ok: false, message: err.message })
	}
})

//Deleting One
router.delete('/:id', getProduct, async (req, res) => {
	try {
		await res.product.remove()
		res.json({ ok: true, message: 'Product deleted successfully!' })
	} catch (err) {
		res.status(500).json({ ok: false, message: err.message })
	}
})

async function getProduct(req, res, next) {
	let product
	try {
		product = await Product.findById(req.params.id)
		if (product == null) {
			return res.status(404).json({ message: 'Cannot find product!' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.product = product
	next()
}

module.exports = router