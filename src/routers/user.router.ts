import express, {Router} from 'express';
import UserController from "../controllers/user.controller";

const UserRouter: Router = express.Router();

const userController = new UserController();
UserRouter.get('/account/:userId', userController.userInfo)
UserRouter.post('/update-profile/', userController.update)
UserRouter.delete('/account/:userId', userController.delete)
UserRouter.get('/id',userController.getIdByToken)

export default UserRouter;