const router = require("express").Router();
const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const History = require("../models/History");
var CartId;
var idUser;

router.use(async (req, res, next) => {

    const id = req.headers['x-access-token'];
    await User.find({ nMec: id }).then(result => {
        if (result.length != 1) {
            return res.status(404).send({
                success: false,
                message: "Error: User not found."
            });
        }
        idUser = result[0].nMec;
        Cart.find({ idUser: result[0]._id }).then(resultCart => {
            if (resultCart.length != 1) {
                Cart.create({ idUser: result[0]._id })
                    .then(newCart => {
                        CartId = newCart._id;
                        next();
                    })
                    .catch(err => {
                        return res.status(500).send({
                            success: false,
                            message: err
                        });
                    });
            } else {
                CartId = resultCart[0]._id;
                next();
            }
        });
    });


});

router.patch("/add/product", async (req, res, next) => {
    const { body } = req;
    const product = body;

    if (product) {
        await Cart.find({ "products.id": product.id, _id: CartId }).then(
            resultFindProduct => {
                if (resultFindProduct.length > 0) {
                    resultFindProduct[0].products.forEach((element, index) => {
                        if (element.id === product.id) {
                            Product.findById(element.id).then(resultProduct => {
                                if (element.quantity < resultProduct.stock) {
                                    resultFindProduct[0].products[index].quantity += 1;
                                    resultFindProduct[0].products[index].price =
                                        resultProduct.price *
                                        resultFindProduct[0].products[index].quantity;

                                    Cart.updateOne(
                                        { _id: CartId },
                                        { $set: { products: resultFindProduct[0].products } }
                                    ).then(resultUpdate => {
                                        return res.status(200).send({
                                            success: true,
                                            message: "The product has been actualized successfully",
                                            resultUpdate
                                        });
                                    });
                                } else {
                                    return res.status(403).send({
                                        success: false,
                                        message: "Error: Quantity exceeded."
                                    });
                                }
                            });
                        }
                    });
                } else {
                    Product.findById(product.id).then(resultProduct => {
                        if (product.quantity <= resultProduct.stock) {
                            product.price = resultProduct.price * product.quantity;

                            Cart.updateOne(
                                { _id: CartId },
                                {
                                    $push: {
                                        products: product
                                    }
                                }
                            )
                                .then(result => {
                                    if (result.ok > 0) {
                                        return res.status(200).send({
                                            success: true,
                                            message: "Product inserted with successfully"
                                        });
                                    }
                                    return res.status(403).send({
                                        success: false,
                                        message: "Error: Error inserting the product."
                                    });
                                })
                                .catch(err => {
                                    return res.status(500).send({
                                        success: false,
                                        message: "Error: Server Error."
                                    });
                                });
                        } else {
                            return res.status(403).send({
                                success: false,
                                message: "Error: Quantity exceeded."
                            });
                        }
                    });
                }
            }
        );
    } else {
        return res.status(404).send({
            success: false,
            message: "Error: Without products to insert."
        });
    }
});

router.get("/get/products", async (req, res, next) => {
    if (CartId) {
        Cart.find({ _id: CartId })
            .then(resultCart => {
                if (resultCart[0].products.length == 0) {
                    return res.status(404).send({
                        success: false,
                        message: "Error: No products in the shopping list."
                    });
                }
                return res.status(200).send({
                    success: true,
                    products: resultCart[0]
                });
            })
            .catch(err => {
                return res.status(500).send({
                    success: false,
                    message: "Error: Server Error.",
                    error: err
                });
            });
    } else {
        return res.status(404).send({
            success: false,
            message: "Error: No shopping lists found."
        });
    }
});

router.patch("/add/products/quantity", async (req, res, next) => {
    const { body } = req;
    const product = body;
    await Product.find({ _id: product.id })
        .then(resultProduct => {
            if (resultProduct.length < 0) {
                res.status(404).send({
                    success: false,
                    message: "Error: No products found."
                });
            }

            Cart.find({ _id: CartId })
                .then(resultCart => {
                    if (resultCart[0].products.length == 0) {
                        return res.status(404).send({
                            success: false,
                            message: "Error: No products in this shopping list."
                        });
                    }
                    Cart.updateOne(
                        { _id: CartId },
                        { $set: { products: product } }
                    ).then(resultUpdate => {
                        return res.status(200).send({
                            success: true,
                            message: "Product actualized successfully.",
                            resultUpdate
                        });
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        success: false,
                        message: "Error: Server Error.",
                        error: err.message
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                success: false,
                message: "Error: Server Error."
            });
        });
});

router.patch("/remove/products/quantity", async (req, res, next) => {
    const { body } = req;
    const product = body;
    await Product.find({ _id: product.id })
        .then(resultProduct => {
            if (resultProduct.length < 0) {
                res.status(404).send({
                    success: false,
                    message: "Error: No products found."
                });
            }

            Cart.find({ _id: CartId })
                .then(resultCart => {
                    if (resultCart[0].products.length == 0) {
                        return res.status(404).send({
                            success: false,
                            message: "Error: No products in this shopping list."
                        });
                    }
                    Cart.updateOne(
                        { _id: CartId },
                        { $set: { products: product } }
                    ).then(resultUpdate => {
                        return res.status(200).send({
                            success: true,
                            message: "Product actualized with success.",
                            resultUpdate
                        });
                    });
                })
                .catch(err => {
                    return res.status(500).send({
                        success: false,
                        message: "Error: Server Error.",
                        error: err.message
                    });
                });
        })
        .catch(error => {
            res.status(500).send({
                success: false,
                message: "Error: Server Error."
            });
        });
});

router.patch("/add/products/history", async (req, res, next) => {
    const { body } = req;
    const { products, userId,totalPrice } = body;
   
    if (products && userId) {
        await User.find({ nMec: userId })
            .then(resultUser => {
                    products.forEach((product, index) => {
                        Product.findById(product.id).then(resultProduct => {
                            if (resultProduct.stock > 0) {
                                resultProduct.stock -= product.quantity;
                                if (resultProduct.stock <= 0) {
                                    resultProduct.isActive = false;
                                }
                                Product.updateOne(
                                    { _id: product.id },
                                    { $set: resultProduct }
                                ).then(() => {
                                    Cart.updateOne(
                                        { _id: CartId },
                                        { $set: { products: [] } }
                                    ).then({});
                                });
                            } else {
                                Product.updateOne(
                                    { _id: product.id },
                                    {
                                        $set: {
                                            isActive: false
                                        }
                                    }
                                ).then(() => {
                                    Cart.updateOne(
                                        { _id: CartId },
                                        { $set: { products: [] } }
                                    ).then({});
                                });
                            }
                        });
                    });

                   

                    History.create({ userId, products, totalPrice })
                        .then(result => {
                            res.status(200).send({
                                success: true,
                                message: "Purchased successfully."
                            });
                        })
                        .catch(err => {
                            res.status(500).send({
                                success: false,
                                message: "Error: Server Error",
                                err
                            });
                        });
                
            })
            .catch(error => {
                return res.status(500).send({
                    success: false,
                    message: "Error: Server Error"
                });
            });
    } else {
        return res.status(404).send({
            success: false,
            message: "Error: Incomplete data for purchase."
        });
    }
});

router.get("/get/products/history", async (req, res, next) => {
    await History.find({ userId: idUser })
        .sort({ createdAt: "desc" })
        .then(resultHistory => {
            if (resultHistory.length <= 0) {
                res.status(404).send({
                    success: false,
                    message: "Error: No purchases."
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: "Data found.",
                    resultHistory
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: "Error: Server Error.",
                err
            });
        });
});

module.exports = router;

