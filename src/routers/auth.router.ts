import express, {Router} from 'express';
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middlewares";
require('dotenv').config();

const AuthRouter: Router = express.Router();

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/refresh', AuthMiddleware.refreshToken);
AuthRouter.get('/logout', AuthMiddleware.checkAuthentication, AuthController.logout);
AuthRouter.post('/change-password', AuthMiddleware.checkAuthentication, AuthController.changePassword);
AuthRouter.post('/login/google', AuthController.loginWithGoogle);
AuthRouter.post('/verify', AuthController.verifyEmail);
AuthRouter.post('/forgot-password', AuthController.forgotPassword);
AuthRouter.post('/reset-password', AuthController.resetPassword);

export default AuthRouter;






