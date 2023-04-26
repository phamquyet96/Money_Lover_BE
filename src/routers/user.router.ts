import express, {Router} from 'express';
import UserController from "../controllers/user.controller";
import authMiddlewares from "../middlewares/auth.middlewares";

const UserRouter: Router = express.Router();

const userController = new UserController();
UserRouter.put('/update-profile/:userId',authMiddlewares.checkAuthentication, userController.update)
UserRouter.delete('/account/:userId', userController.delete)
UserRouter.get('/me', userController.me)

export default UserRouter;