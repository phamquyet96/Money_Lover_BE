import BaseController from "./base.controller";
import { Request, Response } from "express";
import UserServices from "../services/user.services";
import jwt from "jsonwebtoken";
import dataSource from "../database/data-source";
import User from "../models/user.model";

let userRepo = dataSource.getRepository(User);

class UserController extends BaseController {

    async update(req: any, res: Response) {
        let id = req.user.id
        let arr = Object.keys(req.body)
        let image = arr[0].replace('upload/', 'upload%2F') + '=' + req.body[arr[0]] + '&' + arr[1] + '=' + req.body[arr[1]];
        await UserServices.updateUser(id, image)
        res.status(200).json({
            message: 'Update successfully!'
        })
    }

    async getUserByToken(req:Request,res:Response){
        const userHeader = req.headers.authorization;
        console.log(userHeader);
        if (userHeader) {
            const token = userHeader.split(" ")[1];
            jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, async (err, decoded : any) => {
                if (err) {
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