// eslint-disable-next-line no-unused expressions
import { ICategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: ICategory): Promise<ICategory> => {

    const result = await Category.create(payload);
    return result;
};

const getAllCategories = async (): Promise<ICategory[]> => {


    const result = await Category.find()


    return result
}

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
    const result = await Category.findById(id);
    return result;
}



const updateCategory = async (
    id: string,
    payload: Partial<ICategory>
): Promise<ICategory | null> => {

    const result = await Category.findOneAndUpdate({ _id: id }, payload, { new: true })
    return result


}

const deleteCategory = async (id: string): Promise<ICategory | null> => {
    const result = await Category.findByIdAndDelete(id);
    return result;
}


export const CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}