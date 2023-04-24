import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransSubCate from "../models/trans.subcate.model";
import TransCate from "../models/trans.cate.model";
import subCategoriesValues from "../database/subcategories";

const EntityManager = dataSource.manager;
let transSubCateRepo = dataSource.getRepository(TransSubCate);
let tranCateRepo = dataSource.getRepository(TransCate);

class TransSubCateServices extends BaseServices {
  static async getAllSubCatesByType(userId, typeId: number): Promise<TransSubCate[]> {
    let transSubCates = await transSubCateRepo.find({
      relations: {
        category: {
          transType: true,
        },
      },
      where: {
        category: {
          transType: {
            id: typeId,
          },
        },
        user: {
          id: userId
        }
      },
    });

    return transSubCates;
  }

  static async getSubCateById(subCateId: number): Promise<TransSubCate> {
    let transSubCate = await transSubCateRepo.findOneBy({ id: subCateId });
    if (!transSubCate) {
      throw new Error("Transaction subcategory not found");
    }
    return transSubCate;
  }
  static async add(cateId, userId, name): Promise<void> {
    await transSubCateRepo.save({
      category: cateId,
      user: userId,
      name: name
    })
  }

  static async updateSubCate(subCateId, cateId, name): Promise<TransSubCate> {
    let transSubCate = await this.getSubCateById(subCateId);
    let category = await tranCateRepo.findOneBy({ id: cateId })
    transSubCate.category = category
    transSubCate.name = name
    await transSubCateRepo.save(transSubCate);
    return transSubCate;
  }

  static async addDefaultSubCategoriesForUser(userId: number): Promise<void> {
    await EntityManager.query(`
      insert into trans_subcate (cate_id, user_id, name) values
      ${subCategoriesValues(userId)}
    `)
  }
}

export default TransSubCateServices;