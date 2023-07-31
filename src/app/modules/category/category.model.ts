// eslint-disable-next-line no-unused expressions
import { Schema, model } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)

export const Category = model<ICategory, CategoryModel>('Catagory', categorySchema);