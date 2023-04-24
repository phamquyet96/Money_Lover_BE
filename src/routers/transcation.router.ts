import express, {Router} from 'express';
import TransActionController from "../controllers/transcation.controller";

const TransactionRouter: Router = express.Router();

TransactionRouter.delete('/:transactionId', TransActionController.deleteTransaction);
TransactionRouter.get('/',TransActionController.getTransactions);
TransactionRouter.get('/type',TransActionController.getTransactionsByTypeNameOfAllWallets);
TransactionRouter.get('/:walletId',TransActionController.getTransactionsOfOneWallet);
TransactionRouter.get('/:walletId/detail',TransActionController.getTransactionsByTypeNameOfOneWallet);
TransactionRouter.post('/',TransActionController.addTransaction);
TransactionRouter.put('/:transactionId',TransActionController.updateTransaction);

export default TransactionRouter;