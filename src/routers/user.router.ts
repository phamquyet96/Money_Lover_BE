import express, {Router} from 'express';
import UserController from "../controllers/user.controller";

const UserRouter: Router = express.Router();

const userController = new UserController();
UserRouter.post('/update-profile', userController.update)

export default UserRouter;