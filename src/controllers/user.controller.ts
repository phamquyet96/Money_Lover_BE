import BaseController from "./base.controller";
import { Request, Response } from "express";
import UserServices from "../services/user.services";
import WalletServices from "../services/wallet.services";
import jwt from "jsonwebtoken";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import userServices from "../services/user.services";
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
    await UserServices.updateUser(id, req.body)
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

  async me(req: any, res: Response) {
    try {
      const user = await UserServices.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json({
        status: 'success',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default UserController;