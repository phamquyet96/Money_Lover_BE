import express, {Router} from 'express';
import UserController from "../controllers/user.controller";
import authMiddlewares from "../middlewares/auth.middlewares";

const UserRouter: Router = express.Router();

const userController = new UserController();

UserRouter.get('/account/:userId', userController.userInfo)
UserRouter.put('/update-profile',authMiddlewares.checkAuthentication, userController.update)
UserRouter.delete('/account/:userId', userController.delete)
UserRouter.get('/id',userController.getIdByToken)

export default UserRouter;