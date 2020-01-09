<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-row align="center" justify="space-between">
              <div style="text-align: center; flex-grow: 1">
                <h1>Корзина</h1>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3"/>
      <v-container v-if="!emptyCart">
        <product-in-cart
          v-for="cartItem in this.productsInCart"
          :key="cartItem.id"
          :cartItem="cartItem"
        />
      </v-container>
      <v-container v-else>
        <empty-cart/>
      </v-container>
      <v-divider class="mx-3"/>
      <v-container v-if="!emptyCart">
        <v-row>
          <v-col cols="6">
            <span class="title font-weight-bold">ИТОГО:</span>
          </v-col>
          <v-col cols="6" align="end">
            <span class="title font-weight-bold">{{ total }} грн</span>
          </v-col>
        </v-row>
      </v-container>
      <v-divider class="mx-3" v-if="!emptyCart"/>
      <v-card-actions class="py-4 d-flex flex-column" v-if="!emptyCart">
        <v-btn color="light-blue darken-1" text class="mb-5 text-lowercase">Перейти куда-то...</v-btn>
        <v-btn block large color="success" class="btn-order-on subtitle-1 font-weight-bold" style="letter-spacing: 0.3em !important;">Оформить заказ</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import EmptyCart from '../components/EmptyCart'
import ProductInCart from '../components/ProductInCart'

export default {
  name: 'Cart',

  components: {
    EmptyCart,
    ProductInCart
  },
  computed: {
    ...mapGetters([
      'productsInCart',
      'cartCount',
      'total'
    ]),
    emptyCart () {
      return this.cartCount === 0
    }
  }
}
</script>

<style scoped>

</style>
