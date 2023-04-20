import dataSource from "../database/data-source";
import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import BaseController from "../controllers/base.controller";
require('dotenv').config();

let userRepo = dataSource.getRepository(User);

class AuthMiddleware {

    static checkAuthentication(req, res, next) {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, async (err, decoded) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                let user = await userRepo.findOneBy({id: decoded.id});
                if (!user) {
                    return res.status(401).json({message: 'Unauthorized!'});
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You are not authenticated!");
        }
    }

    static refreshToken(req, res) {
        const refreshToken = req.body.token;
        if (!refreshToken) return res.status(401).json("You are not authenticated!");
        jwt.verify(refreshToken, `${process.env.JWT_REFRESH_KEY}`, async (err, decoded) => {
            if (err) {
                return res.status(403).json("Refresh token is not valid!");
            }
            let user = await userRepo.findOneBy({id: decoded.id});
            if (user.refreshToken === refreshToken) {
                let payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                }
                const newAccessToken = BaseController.generateAccessToken(payload);
                const newRefreshToken = BaseController.generateRefreshToken(payload);
                user.refreshToken = newRefreshToken
                await userRepo.save(user)
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                });
            } else {
                return res.status(403).json("Refresh token is not valid!");
            }
            }
        );
    }

}
export default AuthMiddleware;


