// eslint-disable-next-line no-unused expressions
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IProduct } from "./product.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { productFilterableField } from "./product.constant";
import { paginationFields } from "../../../constant/constant";
import { ProductService } from "./product.service";


const createProduct = catchAsync(async (req: Request, res: Response) => {


    const { ...ProductData } = req.body
    const result = await ProductService.createProduct(ProductData)

    sendResponse<IProduct>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product created successfully',
        data: result,
    });


})

const getAllProducts = catchAsync(
    async (req: Request, res: Response) => {

        const filters = pick(req.query, productFilterableField)
        const paginationOptions = pick(req.query, paginationFields)

        const result = await ProductService.getAllProducts(
            filters,
            paginationOptions
        )


        sendResponse<IProduct[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Products retrived successfully',
            meta: result.meta,
            data: result.data,
        });
    }
)


const getSingleProduct = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;

        const result = await ProductService.getSingleProduct(id)

        sendResponse<IProduct>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single product retrived successfully',
            data: result,
        });
    }
)

const getSingleProductByName = catchAsync(
    async (req: Request, res: Response) => {
        const category = req.params.category;

        const result = await ProductService.getSingleProductByName(category)

        sendResponse<IProduct>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single product retrived successfully',
            data: result,
        });
    }
)

const updateProduct = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const updatedData = req.body;

        const result = await ProductService.updateProduct(id, updatedData)

        sendResponse<IProduct>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product update successfully',
            data: result,
        });



    }
)

const deleteProduct = catchAsync(
    async (req: Request, res: Response) => {

        const id = req.params.id;

        const result = await ProductService.deleteProduct(id)

        sendResponse<IProduct>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Product deleted successfully',
            data: result,
        });
    }
)

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    getSingleProductByName,
    updateProduct,
    deleteProduct
}