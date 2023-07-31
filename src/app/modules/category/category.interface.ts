// eslint-disable-next-line no-unused expressions
import { Model } from "mongoose";


export type ICategory = {
    title: string;
    img: string;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>

