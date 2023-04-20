import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import Wallet from "../models/wallet.model";
import User from "../models/user.model";

let walletRepo = dataSource.getRepository(Wallet);
const [INCOME, EXPENSE] = [1, 2];

class WalletServices extends BaseServices {
    static async getAllWalletsOfUser(userId: number): Promise<Wallet[] | null> {
        return await walletRepo.createQueryBuilder('wallet')
            .innerJoin('wallet.user', 'user')
            .select('wallet.name, wallet.balance, wallet.includeTotal, wallet.active, wallet.id')
            .where('user.id = :id', { id: userId })
            .getRawMany();
    }

    static async adjustBalance(walletId: number, money: number): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        wallet.balance -= money;
        await walletRepo.save(wallet);
    }

    static async updateBalance(walletId: number): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        let { totalIncome, totalExpense } = await this.getTotalIncomeExpenseOfWallet(walletId);
        wallet.balance = wallet.initialBalance + totalIncome - totalExpense;
        await walletRepo.save(wallet);
    }

    static async getWalletById(walletId: number): Promise<Wallet | null> {
        let wallet = await walletRepo.findOneBy({ id: walletId });
        if (!wallet) {
            throw new Error('Wallet not found');
        }
        return wallet;
    }

    static async getALlWalletsInfoOfUser(userId: number) {
        let allWalletsInfo = []
        let allWallets = await this.getAllWalletsOfUser(userId);
        for (let i=0;i<allWallets.length;i++) {
            let walletInfo = await this.getAllInfoOfWallet(allWallets[i].id)
            allWalletsInfo.push(walletInfo)
        }
        return allWalletsInfo
    }

    static async getAllInfoOfWallet(walletId: number) {
        let wallet = await this.getWalletById(walletId)
        let { totalIncome, totalExpense } = await this.getTotalIncomeExpenseOfWallet(walletId);
        return {...wallet, inflow: totalIncome, outflow: totalExpense}
    }

    static async getTotalIncomeExpenseOfWallet(walletId: number) {
        let totalIncomeExpense = await walletRepo.createQueryBuilder("wallet")
            .innerJoin("wallet.transactions", "transaction")
            .innerJoin("transaction.subCategory", "subCategory")
            .innerJoin("subCategory.category", "category")
            .innerJoin("category.transType", "transType")
            .addSelect("SUM(transaction.money)", "sum")
            .addSelect("transType.id", "transType")
            .addGroupBy("transType.id")
            .where("wallet.id = :walletId", { walletId: walletId })
            .getRawMany();
        let totalIncomeDetail = totalIncomeExpense.filter(item => item.transType == INCOME)[0];
        let totalExpenseDetail = totalIncomeExpense.filter(item => item.transType == EXPENSE)[0];
        let totalIncome = totalIncomeDetail ? Number(totalIncomeDetail.sum) : 0;
        let totalExpense = totalExpenseDetail ? Number(totalExpenseDetail.sum) : 0;

        return { totalIncome: totalIncome, totalExpense: totalExpense }
    }

    static async getTotalBalance(userId: number): Promise<number> {
        let { totalBalance } = await walletRepo.createQueryBuilder("wallet")
            .innerJoin("wallet.user", "user")
            .addSelect("SUM(wallet.balance)", "totalBalance")
            .addGroupBy("user.id")
            .where("user.id = :id", { id: userId })
            .getRawOne();
        return totalBalance;
    }

    // static async getWalletsByIncludedInTotal(userId: number, isIncluded: boolean): Promise<Wallet[]> {
    //     let wallets = await walletRepo.findBy({
    //         includeTotal: isIncluded,
    //         user: {
    //             id: userId
    //         }
    //     });
    //     return wallets;
    // }

    static async updateWallet({walletId, name, initialBalance, includeTotal, active}): Promise<void> {
        let wallet = await this.getWalletById(walletId);
        wallet.name = name;
        wallet.initialBalance = initialBalance;
        wallet.includeTotal = includeTotal;
        wallet.active = active;
        await walletRepo.save(wallet);
    }

    static async addWallet(user: User,
                            name: string,
                            initial_balance: number, 
                            includeTotal:number): Promise<Wallet>{
        let wallet = new Wallet();
        wallet.user = user;
        wallet.name = name;
        wallet.balance = initial_balance;
        wallet.initialBalance = initial_balance;
        wallet.includeTotal = includeTotal;
        console.log(wallet);
        await walletRepo.save(wallet);
        return wallet
    }

    static async deleteWallet(walletId: number): Promise<void> {
        let wallet = await walletRepo.findOneBy({id: walletId});
        await walletRepo.remove(wallet);
    }
}


export default WalletServices;