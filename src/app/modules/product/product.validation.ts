// eslint-disable-next-line no-unused expressions
import { z } from "zod";
import { productStatus } from "./product.constant";


const createProductZodSchema = z.object({
    body: z.object({
        productName: z.string({
            required_error: "Product name is required"
        }),
        img: z.string({
            required_error: "Image is required"
        }),
        category: z.string({
            required_error: "Category is required"
        }),
        status: z.enum([...productStatus] as [string, ...string[]]),
        price: z.string({
            required_error: "Price is required"
        }),
        description: z.string({
            required_error: "Description is required"
        }),
        feature: z.array(z.string()).nonempty("Feature is required"),
    })
})

const updateProductZodSchema = z.object({
    body: z.object({
        productName: z.string().optional(),
        img: z.string().optional(),
        category: z.string().optional(),
        status: z.enum([...productStatus] as [string, ...string[]]).optional(),
        price: z.string().optional(),
        description: z.string().optional(),
        feature: z.array(z.string()).optional()
    }).optional()
});

export const ProductValidation = {
    createProductZodSchema,
    updateProductZodSchema
}