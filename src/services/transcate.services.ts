import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransCate from "../models/trans.cate.model";
import User from "../models/user.model";

let transCateRepo = dataSource.getRepository(TransCate);

class TransCateServices extends BaseServices {
  static async getAllCates(user: User): Promise<TransCate[]> {
    let result = await transCateRepo.find({
      relations: {
        subCategories: true,
        transType: true,
      },
      where: {
        subCategories: {
          user: {
            id: user.id,
          }
        }
      },
    });
    return result;
  }
}

export default TransCateServices;