import Stripe from "stripe";
import * as global from "../globalvars/global"

export const stripe = new Stripe(global.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
})