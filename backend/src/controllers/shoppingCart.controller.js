require("dotenv").config();
const { User, Product, CartItem, ShoppingCart, Purchase } = require("../db");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const { deleteCartContent } = require("../functions/shoppingCart.functions");
const Stripe = require("stripe");
// const { STRIPE_KEY, STRIPE_ENDPOINT_SECRET, WEBHOOK_SECRET } = process.env;
const { STRIPE_KEY, STRIPE_ENDPOINT_SECRET } = process.env;

// stripe listen --forward-to localhost:3001/shoppingCart/webhook

const WEBHOOK_SECRET = null;

const getShoppingCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await ShoppingCart.findOne({
            where: { UserId: userId },
            include: [
                { model: Product, through: { attributes: ["quantity"] } },
            ],
        });

        // Si no se encuentra el carrito, créalo
        if (!cart) {
            cart = await ShoppingCart.create({ UserId: userId });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getShoppingCartQuantity = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await ShoppingCart.findOne({
            where: { UserId: userId },
            include: [
                { model: Product, through: { attributes: ["quantity"] } },
            ],
        });

        if (!cart) {
            res.status(500).json({ error: "Cart not found" });
        }

        const quantity = cart?.Products?.reduce(
            (count, product) => count + product.CartItem.quantity,
            0
        );

        res.status(200).json(quantity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addToCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        console.log(userId);

        const shoppingCart = await ShoppingCart.findOne({
            where: { UserId: userId },
            include: [{ model: Product, through: { attributes: [] } }],
        });

        const cartItem = await CartItem.findOne({
            where: { ProductId: productId },
        });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            await shoppingCart.addProduct(productId, {
                through: { quantity: 1 },
            });
        }

        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const shoppingCart = await ShoppingCart.findOne({
            where: { UserId: userId },
            include: [{ model: Product, through: { attributes: [] } }],
        });

        if (shoppingCart) {
            const cartItem = await CartItem.findOne({
                where: { ProductId: productId },
            });

            if (!cartItem) {
                return res.status(404).json({ error: "Cart item not found" });
            }

            await cartItem.destroy();
        } else {
            return res.status(404).json({ error: "Cart not found" });
        }

        res.status(200).json({
            message: "Product removed from cart successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cartItem = await CartItem.findOne({
            where: { ProductId: productId },
        });

        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            message: "Cart item quantity updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const clearCart = async (req, res) => {
    const { userId } = req.params;
    try {
        console.log(userId);

        const cart = await ShoppingCart.findOne({
            where: { UserId: userId },
        });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        await ShoppingCart.destroy({
            where: { UserId: userId },
        });

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const checkoutAll = async (req, res) => {
    try {
        const stripe = new Stripe(STRIPE_KEY);
        const { data } = req.body;

        const products = data.productsToCheckout;
        const userId = data.userId;
        const ShoppingCartId = data.cartId;

        console.log(userId);

        const customer = await stripe.customers.create({
            metadata: {
                userId: userId,
                cart: JSON.stringify(products),
                ShoppingCartId,
            },
        });

        const lineItems = products.map((product) => {
            return {
                price_data: {
                    product_data: {
                        name: product.title,
                    },
                    currency: "usd",
                    unit_amount: parseInt(product.price * 100),
                },
                quantity: parseInt(product.quantity * 1),
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            customer: customer.id,
            mode: "payment",
            success_url: "http://localhost:3000/products",
            cancel_url: "http://localhost:3000/shoppingCart",
        });

        // console.log(customer);
        return res.json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const webhook = async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let data;
    let eventType;

    if (WEBHOOK_SECRET) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                WEBHOOK_SECRET
            );
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = event.data.object;
        eventType = event.type;
    } else {
        data = request.body.data.object;
        eventType = request.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers
            .retrieve(data.customer)
            .then((customer) => {
                const cart = JSON.parse(customer.metadata.cart);
                if (data.payment_status === "paid") {
                    for (const product of cart) {
                        console.log(customer.metadata.ShoppingCartId);
                        Purchase.create({
                            UserId: customer.metadata.userId,
                            ProductId: product.id,
                            quantity: product.quantity,
                            orderId: parseInt(customer.metadata.ShoppingCartId),
                        });
                    }
                    deleteCartContent(customer.metadata.userId);
                }
            })
            .catch((err) => console.log(err.message));
    }

    response.send().end();
};

module.exports = {
    getShoppingCart,
    getShoppingCartQuantity,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    checkoutAll,
    webhook,
};
