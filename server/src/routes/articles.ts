import express from "express";
import User from "./../models/user";
import * as global from "../globalvars/global"
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../Utils/stripe";
import Article from "../models/article";


const router = express.Router();

router.get("/", checkAuth, async (req, res) => {
    const user = await User.findOne({ email: req.user });

    if (user) {
        const subscriptions = await stripe.subscriptions.list(
            {
                customer: user.stripeCustomerId,
                status: "all",
                expand: ["data.default_payment_method"],
            },
            {
                apiKey: global.STRIPE_SECRET_KEY
            }
        );

        if (!subscriptions.data.length) return res.json([]);

        //@ts-ignore
        const plan = subscriptions.data[0].plan.nickname;

        if (plan === "Basic") {
            const articles = await Article.find({ access: "Basic" });
            return res.json(articles);
        }
        else if (plan === "Gold") {
            const articles = await Article.find({access: {$in: ["Basic", "Gold"]}})
            return res.json(articles);
        }
        else {
            const articles = await Article.find({});
            return res.json(articles);
        }
    }
})

export default router;