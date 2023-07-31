// eslint-disable-next-line no-unused expressions
import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";
import { productStatus } from "./product.constant";




const productSchema = new Schema<IProduct>({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: productStatus
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feature: {
        type: [String],
        required: true
    },
    rating: {
        type: [String]
    },
    avgRating: {
        type: Number,
    },
    reviews: {
        type: [String],
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const Product = model<IProduct, ProductModel>('Product', productSchema);