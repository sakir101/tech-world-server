// eslint-disable-next-line no-unused expressions
import { Model } from "mongoose";


export type IStatus = "In Stock" | "Out of Stock"

export type IProduct = {
    productName: string;
    img: string;
    category: string;
    status: IStatus;
    price: string;
    description: string;
    feature: string[];
    rating: string[];
    avgRating: number;
    reviews: string[]
}

export type ProductModel = Model<IProduct, Record<string, unknown>>

export type IProductsFilters = {
    searchTerm?: string;

}