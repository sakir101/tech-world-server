import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { ProductRoutes } from '../modules/product/product.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductNameRoutes } from '../modules/productname/productName.route';






const router = express.Router();

const moduleRoutes = [
    {
        path: '/products',
        route: ProductRoutes
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/productName',
        route: ProductNameRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

