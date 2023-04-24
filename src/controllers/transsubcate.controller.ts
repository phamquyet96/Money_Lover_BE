import BaseController from "./base.controller";
import {Request, Response} from "express";
import TransSubCateServices from "../services/transsubcate.services";

class TransSubCateController extends BaseController {

  static getAllSubCatesByType(req: any, res: Response) {
    let userId = req.user.id
    let transTypeId = Number(req.params.transTypeId);
    TransSubCateServices.getAllSubCatesByType(userId, transTypeId)
      .then((transSubCates) => {
        res.status(200).json(transSubCates);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async add(req: any, res: Response) {
    try {
      let {cateId, name} = req.body;
      await TransSubCateServices.add(cateId, req.user.id, name);
      res.status(200).json({message: "Added subCategory successfully"});
    } catch (err) {
      console.log(err);
      res.status(500).json({message: err.message});
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const subCateId = req.params.subCateId;
      let {cateId, name} = req.body;
      await TransSubCateServices.updateSubCate(subCateId, cateId, name);
      res.status(200).json({message:'Update subcategory successfully'})
    } catch (e) {
      res.status(500).json({message: e.message});

    }
  }

  static async addDefaultSubCategoriesForUser(req: any, res: Response) {
    try {
      await TransSubCateServices.addDefaultSubCategoriesForUser(req.user.id);
      res.status(200).json({message: "success"})
    }
    catch (err) {
      res.status(500).json({message: err.message})
    }
  }
}

export default TransSubCateController;