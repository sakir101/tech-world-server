// eslint-disable-next-line no-unused expressions
import express from 'express'
import { ProductController } from '../product/product.controller'




const router = express.Router()

router.get('/:category', ProductController.getSingleProductByName)

export const ProductNameRoutes = router