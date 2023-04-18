import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";

let userRepo = dataSource.getRepository(User)

class UserServices {
    static async updateUser(userId: number, userImage: string): Promise<void> {
        const user = await userRepo.findOneBy({ id: userId })
        user.image = userImage
        await userRepo.save(user)
    }
    static async getUserByEmail(email: string) {
        return await userRepo.findOneBy({email: email});
    }
}

export default UserServices;