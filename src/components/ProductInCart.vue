<template>
  <v-card
    style="cursor:pointer"
    class="mx-auto mb-3"
    max-width="600"
    outlined
    hover
  >
    <v-list-item three-line :to="'/cart/detail-product/' + cartItem.id">
      <v-list-item-content>
        <v-list-item-title class="title mb-1">{{ cartItem.titleProduct }}</v-list-item-title>
        <v-list-item-subtitle>{{ descriptionProductParam }}</v-list-item-subtitle>
        <v-divider v-show="!emptySelectParam"/>
        <v-list-item-subtitle>{{ descriptionProductSelectParam }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar tile size="120" v-if="$vuetify.breakpoint.smAndUp">
        <v-img :src="image"/>
      </v-list-item-avatar>
    </v-list-item>
    <v-divider class="mx-5"/>
    <v-container style="cursor: default">
      <v-row justify="space-around">
        <v-col cols="3" class="px-1 px-sm-3 text-center"><span class="subtitle-1 font-weight-bold">{{ this.price }} грн</span></v-col>
        <v-col cols="6" class="px-0 px-sm-1">
          <div style="text-align: center">
            <v-btn
              class="px-0 px-sm-3"
              style="min-width: 32px"
              text
              small
              outlined
              :disabled="disabledBtn"
              @click="decrement"
            >
              <v-icon>remove</v-icon>
            </v-btn>
            <span class="mx-sm-5">{{ this.quantity }} шт</span>
            <v-btn
              class="px-0 px-sm-3"
              style="min-width: 32px"
              text
              small
              outlined
              @click="increment"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="3" class="px-1 px-sm-3 text-center"><span class="subtitle-1 font-weight-bold" style="text-align: right">{{ subTotal }} грн</span></v-col>
      </v-row>
    </v-container>
    <v-divider class="mx-5"/>
    <v-card-actions class="px-4" style="cursor: default">
      <edit-product :cartItem="cartItem"/>
      <v-btn class="my-2" color="red accent-4" outlined small @click="remove">
        удалить
        <v-icon size="18" right>delete_forever</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import EditProduct from './EditProduct'

export default {
  name: 'ProductInCart',
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  components: {
    EditProduct
  },
  data () {
    return {
      productParams: [],
      productSelectParams: [],
      descriptionParam: [],
      descriptionSelectParams: [],
      price: '',
      image: '',
      quantity: ''
    }
  },
  mounted () {
    for (let i = 0; i < this.cartItem.productParams.length; i++) {
      this.productParams.push({
        name: this.cartItem.productParams[i].name,
        sym: this.cartItem.productParams[i].sym,
        unit: this.cartItem.productParams[i].unit,
        value: this.cartItem.productParams[i].value
      })
    }
    for (let i = 0; i < this.productParams.length; i++) {
      this.descriptionParam.push(this.productParams[i].name + ' ' + this.productParams[i].sym + ' - ' + this.productParams[i].value + this.productParams[i].unit)
    }

    for (let i = 0; i < this.cartItem.productSelectParams.length; i++) {
      this.productSelectParams.push({
        name: this.cartItem.productSelectParams[i].name,
        sym: this.cartItem.productSelectParams[i].sym,
        unit: this.cartItem.productSelectParams[i].unit,
        value: this.cartItem.productSelectParams[i].value
      })
    }
    for (let i = 0; i < this.productSelectParams.length; i++) {
      if (this.cartItem.productSelectParams[i].sym) {
        this.descriptionSelectParams.push(this.productSelectParams[i].name + ' ' + this.productSelectParams[i].sym + ' - ' + this.productSelectParams[i].value + this.productSelectParams[i].unit)
      } else {
        this.descriptionSelectParams.push(this.productSelectParams[i].name + ' - ' + this.productSelectParams[i].value)
      }
    }

    let price = this.cartItem.price
    this.price = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
    this.image = this.cartItem.imageProduct
    this.quantity = this.cartItem.quantity
  },
  watch: {
    'cartItem.quantity': {
      handler (val) {
        this.quantity = val
      }
    },
    'cartItem.productParams': {
      handler () {
        this.productParams = []
        for (let i = 0; i < this.cartItem.productParams.length; i++) {
          this.productParams.push({
            name: this.cartItem.productParams[i].name,
            sym: this.cartItem.productParams[i].sym,
            unit: this.cartItem.productParams[i].unit,
            value: this.cartItem.productParams[i].value
          })
        }
        this.descriptionParam = []
        for (let i = 0; i < this.productParams.length; i++) {
          this.descriptionParam.push(this.productParams[i].name + ' ' + this.productParams[i].sym + ' - ' + this.productParams[i].value + this.productParams[i].unit)
        }
      },
      deep: true
    },
    'cartItem.productSelectParams': {
      handler () {
        this.productSelectParams = []
        for (let i = 0; i < this.cartItem.productSelectParams.length; i++) {
          this.productSelectParams.push({
            name: this.cartItem.productSelectParams[i].name,
            sym: this.cartItem.productSelectParams[i].sym,
            unit: this.cartItem.productSelectParams[i].unit,
            value: this.cartItem.productSelectParams[i].value
          })
        }
        this.descriptionSelectParams = []
        for (let i = 0; i < this.productSelectParams.length; i++) {
          if (this.cartItem.productSelectParams[i].sym) {
            this.descriptionSelectParams.push(this.productSelectParams[i].name + ' ' + this.productSelectParams[i].sym + ' - ' + this.productSelectParams[i].value + this.productSelectParams[i].unit)
          } else {
            this.descriptionSelectParams.push(this.productSelectParams[i].name + ' - ' + this.productSelectParams[i].value)
          }
        }
      },
      deep: true
    }
  },
  computed: {
    emptySelectParam () {
      return this.cartItem.productSelectParams.length === 0
    },
    descriptionProductParam () {
      return this.descriptionParam.join(' / ')
    },
    descriptionProductSelectParam () {
      return this.descriptionSelectParams.join(' / ')
    },
    disabledBtn () {
      return !this.cartItem.quantity
    },
    subTotal () {
      let subTotal = this.cartItem.price * this.cartItem.quantity
      subTotal = subTotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
      return subTotal
    }
  },
  methods: {
    decrement () {
      this.$store.dispatch('DECREMENT', this.cartItem.id)
    },
    increment () {
      this.$store.dispatch('INCREMENT', this.cartItem.id)
    },
    remove () {
      this.$store.dispatch('REMOVE_PRODUCT', this.cartItem.id)
    }
  }
}
</script>
