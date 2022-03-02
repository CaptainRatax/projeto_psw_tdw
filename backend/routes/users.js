const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const User = require('../models/user')

//Getting all
router.get('/', async (req, res) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Getting One
router.get('/:id', getUser, (req, res) => {
	res.json(res.user)
})

//Creating One
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		nMec: req.body.nMec,
		password: req.body.password,
		isAdmin: req.body.isAdmin,
		image: req.body.image
	})

	try {
		await user.save();
		res.status(201).json({
			ok: true,
			message: "The user has been saved successfully!"
		})
	} catch (err) {
		res.status(500).json({
			ok: false,
			message: err
		})
	}
})

//Updating One
router.patch('/:id', getUser, async (req, res) => {
	if (req.body.name != null) {
		res.user.name = req.body.name
	}
	if (req.body.nMec != null) {
		res.user.nMec = req.body.nMec
	}
	if (req.body.password != null) {
		res.user.password = req.body.password
	}
	if (req.body.isAdmin != null) {
		res.user.isAdmin = req.body.isAdmin
	}
	if (req.body.image != null) {
		res.user.image = req.body.image
	}
	try {
		const updatedUser = await res.user.save()
		res.status(201).json({updatedUser, ok:true})
	} catch (err) {
		res.status(400).json({ ok:false, message: err.message })
	}
})

//Deleting One
router.delete('/:id', getUser, async (req, res) => {
	try {
		await res.user.remove()
		res.json({ ok: true, message: 'User deleted successfully!' })
	} catch (err) {
		res.status(500).json({ ok: false, message: err.message })
	}
})

router.post('/login', async (req, res) => {
	if (!req.body.nMec) {
		return res.status(404).send({
			login: false,
			message: "Mechanographic number not found."
		})
	}

	if (!req.body.password) {
		return res.status(404).send({
			login: false,
			message: "Password not found."
		})
	}

	await User.find({ "nMec": req.body.nMec, "password": req.body.password }).then(resultUser => {
		if (resultUser.length != 1) {
			return res.status(404).send({
				login: false,
				message: "User not found"
			});
		}

		const token = jwt.sign({ "nMec": resultUser[0].nMec }, "RazerBlade", { expiresIn: "24h" });
		res.status(200).send({
			login: true,
			message: "User login ok",
			token
		})

	})
})

router.get('/verify/token', async (req, res) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(404).send({
			ok: false,
			message: "Token not valid"
		})
	}


	try {
		jwt.verify(token, "RazerBlade", (err, decoded) => {
			if (err) {
				console.log(err)
				return res.status(500).send({
					ok: false,
					message: "Token not valid"
				})
			}
			User.find({ nMec: decoded.nMec }).then(resultUser => {
				if (resultUser.length != 1) {
					return res.status(404).send({
						ok: false,
						message: "User not found."
					})
				}
				return res.status(200).send({
					ok: true,
					user: resultUser[0]
				})
			})
		})
	} catch{
		return res.status(500).send({
			ok: false,
			message: "Token not valid"
		})
	}
});

async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user!' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.user = user
	next()
}
module.exports = router	