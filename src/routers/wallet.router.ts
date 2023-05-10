import express, { Router } from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

WalletRouter.get('/', WalletController.getAllWalletsOfUser);
WalletRouter.get('/info', WalletController.getDetailInfoOfAllWallets);
WalletRouter.get('/:walletId', WalletController.getWallet);
WalletRouter.get('/info/:walletId', WalletController.getDetailInfoOfWallet);//detail wallet-FE wallet detail
WalletRouter.patch('/balance', WalletController.adjustBalance);
WalletRouter.get('/balance/total', WalletController.getTotalBalance);
WalletRouter.get('/:walletId/income-expense', WalletController.getTotalIncomeExpenseOfWallet);
WalletRouter.put('/update', WalletController.updateWallet);
WalletRouter.delete('/:walletId', WalletController.deleteWallet);
WalletRouter.post('/create', WalletController.addWallet);
export default WalletRouter;
