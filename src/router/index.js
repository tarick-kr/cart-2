import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../views/Cart'
import ProductDetail from '../views/ProductDetail'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cart',
      component: Cart
    },
    {
      path: '/cart/detail-product/:id',
      props: true,
      name: 'product-detail',
      component: ProductDetail
    }
  ]
})
