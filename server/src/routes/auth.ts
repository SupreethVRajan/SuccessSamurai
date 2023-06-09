import express from "express";
import JWT from "jsonwebtoken";
import {body, validationResult} from "express-validator"; 
import User from "./../models/user";
import bcrypt from "bcryptjs"
import * as global from "../globalvars/global"
import { checkAuth } from "../middleware/checkAuth";
import { stripe } from "../Utils/stripe";
import logger from "../../logs/logging";

const router = express.Router();

router.post(
    '/signup', 
    body("email").isEmail().withMessage("Invalid email id"), 
    body("password").isLength({min: 5}).withMessage("Password too short"), 
    async (req, res) => {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            logger.error({METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Invalid credentials for Signup"});
            
            const errors = validationErrors.array().map(error => {
                return {
                    msg: error.msg,
                };
            });
            return res.json({errors, data: null});
        }

        const {email, password} = req.body;

        const user = await User.findOne({email})

        if (user) {
            logger.error({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Email already exists for Signup" });
            return res.json({
                errors: [
                    {
                        msg: "Email already exists"
                    }
                ],
                data: null
            })
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const customer = await stripe.customers.create({
            email,
        }, {
            apiKey: global.STRIPE_SECRET_KEY,
        })

        const newUser  = await User.create({
            email,
            password: hashedPwd,
            stripeCustomerId: customer.id
        });

        const token = await JWT.sign(
            {email: newUser.email},
            global.JWT_SECRET,
            {
                expiresIn: 10800
            }
        );

        logger.info({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "User successfully created" });
        
        return res.json({errors: [],
        data: {
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                stripeCustomerId: customer.id
            }
        }})
        
    }
);

router.post("/login", async (req, res) =>  {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        logger.error({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Email does not exists for Login" });
        return res.json({
            errors: [
                {
                msg: "Invalid credentails"
                }
            ],
            data: null
        })
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
        logger.error({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "Invalid credentials for Login" });
        return res.json({
            errors: [
                {
                msg: "Invalid credentails"
                }
            ],
            data: null
        })
    }

    const token = await JWT.sign(
        {email: user.email},
        global.JWT_SECRET,
        {
            expiresIn: 10800
        }
    );

    logger.info({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "User successfully logged in" });

    return res.json({
        errors: [],
        data: {
            token,
            user: {
                id: user._id,
                email: user.email
            }
        }
    })
})

router.get("/me", checkAuth, async (req, res) => {
    const user = await User.findOne({email: req.user})

    if (user) {
        
        logger.info({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "User found for ME route" });
        return res.json({
            errors: [],
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    stripeCustomerId: user.stripeCustomerId
                }
            }
        })
    }
    else {
        logger.error({ METHOD: req.method, ORIGINAL_URL: req.originalUrl, HTTP_VERSION: req.httpVersion, STATUS: req.statusCode, IP: req.ip, MESSAGE: "User not found for ME route" });        
        return res.json({
            errors: [
                {
                    msg: "Unauthorized",
                }
            ]
        })
    }

    
})


export default router; 