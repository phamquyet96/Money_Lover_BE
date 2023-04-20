import BaseController from "./base.controller";
import { Request, Response } from "express";
import UserServices from "../services/user.services";
import WalletServices from "../services/wallet.services";
import jwt from "jsonwebtoken";
import dataSource from "../database/data-source";
import User from "../models/user.model";
require('dotenv').config();

let userRepo = dataSource.getRepository(User);


class UserController extends BaseController {

    async userInfo(req: Request, res: Response) {
        let userId = Number(req.params.userId);
        UserServices.getUserById(userId)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(500).json({ message: err.message  });
            })
    }

    async update(req: any, res: Response) {
        let id = req.user.id
        let arr = Object.keys(req.body)
        let image = arr[0].replace('upload/', 'upload%2F') + '=' + req.body[arr[0]] + '&' + arr[1] + '=' + req.body[arr[1]];
        await UserServices.updateUser(id, image)
        res.status(200).json({
            message: 'Update successfully!'
        })
    }
    async delete(req: Request, res: Response) {
        let id = Number(req.params.userId);
        UserServices.deleteUser(id)
            .then(() => {
                res.status(200).json({message: "Delete user successfully"});
            })
            .catch(err => {
                res.status(500).json({message: err.message});
            })
    }
    async getIdByToken (req: Request, res: Response) {
        const userHeader = req.headers.authorization;
        if (userHeader) {
            const token = userHeader.split(" ")[1];
            jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, async (err, decoded : any) => {
                if (err) {
                    console.log(err)
                    return res.status(403).json("Token is not valid!");
                }
                let user = await userRepo.findOneBy({id: decoded.id});
                if (!user) {
                    return res.status(401).json({message: 'Unauthorized!'});
                }
                res.status(200).json({user})
            });
        } else {
            res.status(401).json("You are not authenticated!");
        }
    }
   
}

export default UserController;