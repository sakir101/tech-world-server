// eslint-disable-next-line no-unused expressions
import { IStatus } from "./product.interface"

export const productStatus: IStatus[] = ['In Stock', 'Out of Stock'];

export const productSearchableFields = [
    'productName',
    'category',
]

export const productFilterableField = [
    'searchTerm',
    'category'
]
