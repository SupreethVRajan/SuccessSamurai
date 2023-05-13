import express from "express";
import User from "./../models/user";
import * as global from "../globalvars/global"
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../Utils/stripe";


const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
        apiKey: global.STRIPE_SECRET_KEY
    });
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
        return res.json(session);
    }
    else {
        return res.json(null);
    }    
})

export default router;