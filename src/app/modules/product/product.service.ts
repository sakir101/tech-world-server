// eslint-disable-next-line no-unused expressions
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { productSearchableFields } from "./product.constant";
import { IProduct, IProductsFilters } from "./product.interface";
import { Product } from "./product.model";
import ApiError from "../../../errors/ApiError";
import { NOT_FOUND } from "http-status";


const createProduct = async (payload: IProduct): Promise<IProduct> => {
    const productData = {
        ...payload,
        rating: [],
        avgRating: 0,
        reviews: []
    };

    const result = await Product.create(productData);
    return result;
};

const getAllProducts = async (
    filters: IProductsFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IProduct[]>> => {
    const { searchTerm, ...filtersData } = filters;



    const andConditions = []

    if (searchTerm) {
        andConditions.push({
            $or: productSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                },
            })),
        });
    }


    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }

    if (Object.keys(filtersData)[0] === 'maxRate') {

        const topRatedProducts = await Product.find().sort({ avgRating: -1 });

        const total = await Product.countDocuments(topRatedProducts);
        return {
            meta: {
                page,
                limit,
                total
            },
            data: topRatedProducts

        }
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await Product.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getSingleProduct = async (id: string): Promise<IProduct | null> => {
    const result = await Product.findById(id);
    return result;
}

const getSingleProductByName = async (category: string): Promise<IProduct | null> => {
    const products = await Product.find({ category: category });



    return products;
}



const updateProduct = async (
    id: string,
    payload: Partial<IProduct>
): Promise<IProduct | null> => {
    const { reviews, rating, ...restPayload } = payload;

    if (reviews === undefined) {

        const result = await Product.findOneAndUpdate({ _id: id }, payload, { new: true })
        return result

    }
    let reviews1: unknown
    let rating1: unknown
    if (!Array.isArray(reviews)) {
        reviews1 = [reviews]; // Convert to an array if it's not already one
    }

    if (!Array.isArray(rating)) {
        rating1 = [rating]; // Convert to an array if it's not already one
    }

    const result = await Product.findOneAndUpdate(
        { _id: id },
        { $set: restPayload, $push: { reviews: { $each: reviews1 }, rating: { $each: rating1 } } },
        { new: true }
    );



    const product = await Product.findById(id);
    if (!product) {
        throw new ApiError(NOT_FOUND, "Product Data not found");
    }

    const ratings = product.rating.map((value) => Number(value));
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    const averageRatingInteger = Math.round(averageRating);

    const result2 = await Product.findOneAndUpdate(
        { _id: id },
        { $set: { avgRating: averageRatingInteger } },
        { new: true }
    );

    return result2;
}

const deleteProduct = async (id: string): Promise<IProduct | null> => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}


export const ProductService = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    getSingleProductByName,
    updateProduct,
    deleteProduct
}