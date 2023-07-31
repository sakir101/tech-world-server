// eslint-disable-next-line no-unused expressions
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ICategory } from "./category.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {


    const { ...CategoryData } = req.body
    const result = await CategoryService.createCategory(CategoryData)

    sendResponse<ICategory>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully',
        data: result,
    });


})

const getAllCategories = catchAsync(
    async (req: Request, res: Response) => {



        const result = await CategoryService.getAllCategories()


        sendResponse<ICategory[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Categories retrived successfully',
            data: result
        });
    }
)


const getSingleCategory = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await CategoryService.getSingleCategory(id)

        sendResponse<ICategory>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single category retrived successfully',
            data: result,
        });




    }
)

const updateCategory = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await CategoryService.updateCategory(id, updatedData)

        sendResponse<ICategory>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category update successfully',
            data: result,
        });



    }
)

const deleteCategory = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await CategoryService.deleteCategory(id)

        sendResponse<ICategory>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Category deleted successfully',
            data: result,
        });
    }
)

export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}