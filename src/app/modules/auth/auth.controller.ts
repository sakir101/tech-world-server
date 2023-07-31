import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { IUser } from "../users/users.interface";

const createUser = catchAsync(async (req: Request, res: Response) => {


    const { ...userData } = req.body
    const result = await AuthService.createUser(userData)



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
        data: result,
    });
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData)


    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully',
        data: result
    })
})

export const AuthController = {
    createUser,
    loginUser
}