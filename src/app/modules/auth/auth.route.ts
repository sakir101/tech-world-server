import express from 'express'
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from '../users/users.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';


const router = express.Router();

router.post('/signup',
    validateRequest(UserValidation.createUserZodSchema),
    AuthController.createUser
)


router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);



export const AuthRoutes = router;