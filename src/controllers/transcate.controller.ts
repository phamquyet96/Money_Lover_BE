import BaseController from "./base.controller";
import { Request, Response } from "express"
import TransCateServices from "../services/transcate.services";
import User from "../models/user.model";


class TransCateController extends BaseController {
  async getAllCates(req: Request, res: Response) {
    TransCateServices.getAllCates(req.user as User)
      .then(transCates => {
        res.status(200).json(transCates);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
}

export default TransCateController;