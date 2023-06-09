import express from "express";
import User from "./../models/user";
import * as global from "../globalvars/global"
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../Utils/stripe";
import logger from "../../logs/logging";


const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: global.STRIPE_SECRET_KEY
    });
    logger.info({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Successfully retreived prices" });
    return res.json(prices)
})

router.post("/session", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user });


    if (user) {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1
                }
            ],
            success_url: "http://localhost:3000/articles",
            cancel_url: "http://localhost:3000/articleplans",
            customer: user.stripeCustomerId
        }, {
            apiKey: global.STRIPE_SECRET_KEY,
        });
        logger.info({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Successfully retreived session" });
        return res.json(session);
    }
    else {
        logger.error({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "User not found for stripe session" });
        return res.json(null);
    }    
})

export default router;