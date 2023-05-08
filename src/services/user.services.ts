import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import Wallet from "../models/wallet.model";
import TransSubCate from "../models/trans.subcate.model";

let userRepo = dataSource.getRepository(User);
let transSubCateRepo = dataSource.getRepository(TransSubCate);



class UserServices {
    static async updateUser(userId: number, data: any): Promise<void> {
        await userRepo
          .createQueryBuilder()
          .update(User)
          .set(data)
          .where("id = :id", { id: userId })
          .execute();

    }
    static async getUserByEmail(email: string) {
        return await userRepo.findOneBy({email: email});
    }
    static async getUserById(userId: number) {
        return await userRepo.findOneBy({ id: userId });

    }
    static async deleteUser(userId: number): Promise<void> {
        const subCate = await transSubCateRepo.findBy({user: {id: userId}});
        if (subCate && subCate.length > 0) {
            await Promise.all(subCate.map(async (record) => {
                await transSubCateRepo.remove(record);
            }));
        }
        const user = await userRepo.findOneBy({id: userId});
        if (user) {
            await userRepo.remove(user);
        }
    }


}

export default UserServices;