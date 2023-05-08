import BaseController from "./base.controller";
import { Request, Response } from "express";
import WalletServices from "../services/wallet.services";

class WalletController extends BaseController {

    static getAllWalletsOfUser(req: Request, res: Response) {
        //@ts-ignore
        let userId = req.user.id;
        WalletServices.getAllWalletsOfUser(userId)
            .then(wallets => {
                res.status(200).json(wallets);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static getDetailInfoOfWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.getAllInfoOfWallet(walletId)
            .then(wallet => {
                res.json(wallet)
            }).catch(err => {
            res.status(500).json(err);
        })
    }

    static getDetailInfoOfAllWallets(req: Request, res: Response) {
        //@ts-ignore
        let userId = req.user.id;
        WalletServices.getALlWalletsInfoOfUser(userId)
            .then(wallets => {
                res.json(wallets)
            })
    }

    static getWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.getWalletById(walletId)
            .then(wallet => {
                res.status(200).json(wallet);
            })
            .catch(err => {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            })
    }

    static async adjustBalance(req: any, res: Response) {
        try {
            let { walletId, balance } = req.body;
            await WalletServices.updateBalance(walletId);
            res.status(200).json({ message: "Adjusted balance succesfully!" });
        }
        catch (err) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage });
        }
    }

    static async getTotalBalance(req: Request, res: Response) {
        try {
            //@ts-ignore
            let totalBalance = await WalletServices.getTotalBalance(req.user.id);
            return res.status(200).json(totalBalance);
        }
        catch (err) {
            res.status(500).json(err.message || this.defaultErrorMessage);
        }
    }
    static getTotalIncomeExpenseOfWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.getTotalIncomeExpenseOfWallet(walletId)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err.message);
            })
    }

    // static getWalletsByIncludedIntotal(req: Request, res: Response) {
    //     //@ts-ignore
    //     let userId = req.user.id;
    //     let isIncluded = req.params.isIncluded == "true" ? true : false;
    //     // WalletServices.getWalletsByIncludedInTotal(userId, isIncluded)
    //     //     .then(wallets => {
    //     //         res.status(200).json(wallets);
    //     //     })
    //     //     .catch(err => {
    //     //         res.status(500).json(err.message || this.defaultErrorMessage);
    //     //     })
    // }

    static async updateWallet(req: Request, res: Response) {
        try {
            await WalletServices.updateWallet(req.body);
            await WalletServices.updateBalance(req.body.walletId);
            res.status(200).json({ message: "Update wallet successfully!" });
        }
        catch (err) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage });
        }
    }

    static async addWallet(req: Request, res: Response) {
        //@ts-ignore
        
        let userId = req.user.id;
        let name = req.body.name;
        let initialBalance = +req.body.initialBalance;
        let includeTotal = +req.body.initialBalance;
        try {
            await WalletServices.addWallet(userId, name, initialBalance, includeTotal)
            res.status(200).json({ message: "Add wallet successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage })
        }
    }

    static async deleteWallet(req: Request, res: Response) {
        let walletId = Number(req.params.walletId);
        WalletServices.deleteWallet(walletId)
            .then(() => {
                res.status(200).json({ message: "Delete wallet successfully" });
            })
            .catch(err => {
                res.status(500).json({ message: err.message || this.defaultErrorMessage });
            })
    }

}

export default WalletController;