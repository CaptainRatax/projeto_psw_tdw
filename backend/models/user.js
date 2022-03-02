const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	nMec: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: "https://i.ibb.co/kQXSv2M/User.png"
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false
	}
},
	{
		timestamps: true
	})

module.exports = mongoose.model('users', userSchema)