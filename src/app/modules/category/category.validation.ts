// eslint-disable-next-line no-unused expressions
import { z } from "zod";

const createCategoryZodSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        img: z.string({
            required_error: "Image is required"
        })
    })
})

const updateCategoryZodSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        img: z.string().optional(),
    }).optional()
});

export const ProductValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema
}