import {Request, Response, NextFunction} from "express";
import JWT from "jsonwebtoken";
import * as global from "../globalvars/global"
import logger from "../../logs/logging";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    let token = req.header("authorization");

    if (!token) {
        logger.error("No user logged in");
        return res.json({
            errors: [
                {
                    msg: "Unauthorized",
                }
            ]
        })
    }

    token = token.split(" ")[1] 

    try {
        const user = (await JWT.verify(
            token,
            global.JWT_SECRET
        )) as {email: string};

        req.user = user.email as string;
        logger.info("User successfully authenticated");
        next();
    } catch (error) {
        logger.error("User not authenticated", error);
        return res.json({
            errors: [
                {
                    msg: "Unauthorized",
                }
            ]
        })
    }
};