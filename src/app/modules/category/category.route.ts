// eslint-disable-next-line no-unused expressions
import express from 'express'
import { CategoryController } from './category.controller'




const router = express.Router()


router.get('/:id', CategoryController.getSingleCategory)


router.get('/', CategoryController.getAllCategories)

export const CategoryRoutes = router