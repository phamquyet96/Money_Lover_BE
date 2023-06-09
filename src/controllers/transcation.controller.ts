import BaseController from "./base.controller";
import TransactionServices from "../services/transaction.services";
import WalletServices from "../services/wallet.services";



import {Request, Response} from "express";
import WalletModel from "../models/wallet.model";
import dataSource from "../database/data-source";
import Wallet from "../models/wallet.model";
import TransSubCateServices from "../services/transsubcate.services";
let walletRepo = dataSource.getRepository(Wallet);
const [INCOME, EXPENSE] = ["Income", "Expense"];
const queryRunner = dataSource.createQueryRunner()
class TransactionController extends BaseController {

    static getTransactions(req: any, res: Response) {
        let walletId = req.query.walletId;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;

        TransactionServices.getTransactionOfUserByTime(walletId, startDate, endDate)
          .then(result => {
              res.json(result);
          })
    }

    static getTransactionsOfOneWallet(req: Request, res: Response) {
        let walletId = req.params.walletId;
        TransactionServices.getTransactionsOfWallet(walletId, req.query)
          .then(transactions => {
              res.json(transactions);
          })
    }

    static getTransactionsByTypeNameOfAllWallets(req: any, res: Response) {
        let userId = req.user.id;
        TransactionServices.getTransactionsByTypeName(userId, req.query)
          .then(transactions => {
              res.json(transactions)
          })
    }

    static getTransactionsByTypeNameOfOneWallet(req: Request, res: Response) {
        let walletId = req.params.walletId;
        TransactionServices.getTransactionsByTypeNameOfWallet(walletId, req.query)
          .then(transactions => {
              res.json(transactions)
          })
    }

    static async addTransaction(req: Request, res: Response) {
        try {
            let {walletId, subcategoryId, money, date, image, note} = req.body
            await TransactionServices.addTransaction(walletId, subcategoryId, money, date, image, note);
            let wallet = await TransactionController.updateBalanceWallet(walletId, money, subcategoryId)
            res.status(200).json({message: "Added transaction successfully", wallet: wallet}, );
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    }

    static async updateBalanceWallet(walletId: number, money: number, subcategoryId: number) {
        try {
            const wallet = await walletRepo.findOneByOrFail({id: walletId});
            const subcategory = await TransSubCateServices.getSubCateById(subcategoryId)
            if (subcategory.category.id == 1) {
                wallet.balance = +wallet.balance + +money;
            } else {
                wallet.balance = +wallet.balance - +money;
            }
            return walletRepo.save(wallet);
        } catch (err) {
            console.log(err)
        }
    }

    static async updateTransaction(req: Request, res: Response) {
        await queryRunner.startTransaction()
        try {
            let transactionId = Number(req.params.transactionId);
            let transaction = await TransactionServices.getTransactionById(transactionId);
            let previousWalletId = transaction.wallet.id;
            let currentWalletId = req.body.walletId;
            await TransactionServices.updateTransaction(transactionId, req.body);
            await WalletServices.updateBalance(previousWalletId);
            if (previousWalletId !== currentWalletId) {
                await WalletServices.updateBalance(currentWalletId);
            }
            await queryRunner.commitTransaction()
            res.status(200).json({
                message: "Updated transaction successfully",
                });
        } catch (err) {
            await queryRunner.rollbackTransaction()
            res.status(500).json(err.message);
        }
    }

    static async deleteTransaction(req: Request, res: Response) {
        await queryRunner.startTransaction()
        try {
            let transactionId = Number(req.params.transactionId);
            let transaction = await TransactionServices.getTransactionById(transactionId);
            let walletId = transaction.wallet.id;
            await TransactionServices.deleteTransaction(transaction);
            await WalletServices.updateBalance(walletId);
            await queryRunner.commitTransaction()
            let currentWallet = await WalletServices.getWalletById(walletId)
            res.status(200).json({
                message: "Deleted transaction successfully",
                data: currentWallet
            })
        } catch (err) {
            await queryRunner.rollbackTransaction()
            res.status(500).json({message: err.message})
        }
    }


}

export default TransactionController;