import express, {Router} from 'express';
import WalletController from "../controllers/wallet.controller";
const WalletRouter: Router = express.Router();

WalletRouter.get('/',WalletController.getAllWalletsOfUser);
WalletRouter.get('/info',WalletController.getDetailInfoOfAllWallets);
WalletRouter.get('/:walletId', WalletController.getWallet);
WalletRouter.get('/info/:walletId', WalletController.getDetailInfoOfWallet);
WalletRouter.patch('/balance', WalletController.adjustBalance);
WalletRouter.get('/balance/total', WalletController.getTotalBalance);
WalletRouter.get('/:walletId/income-expense', WalletController.getTotalIncomeExpenseOfWallet);
WalletRouter.get('/included-in-total/:isIncluded(true|false)', WalletController.getWalletsByIncludedIntotal);
WalletRouter.patch('/', WalletController.updateWallet);
WalletRouter.post('/',WalletController.addWallet);
WalletRouter.delete('/:walletId', WalletController.deleteWallet);

export default WalletRouter;