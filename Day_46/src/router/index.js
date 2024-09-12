import { About, Home, Product, ProductDetail } from '../pages';
import data from '../data/data.json';
export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/product/:id',
    component: ProductDetail,
    beforeEnter: (params) => {
      const productId = parseInt(params.data.id, 10);
      const productExists = data.some((product) => product.id === productId);

      return productExists; // Return true if the product exists, false otherwise
    },
  },
];
