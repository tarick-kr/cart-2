import Img1 from '../assets/1.jpg'
import Img2 from '../assets/2.jpg'
import Img3 from '../assets/3.jpg'

export default {
  state: {
    cartItemList: [
      {
        id: 'prod1',
        titleProduct: 'Шар',
        imageProduct: Img1,
        price: 50,
        quantity: 5,
        selectType: 2,
        productParams: [
          {
            id: 'param1-prod1',
            name: 'Диаметр',
            sym: 'D',
            unit: 'мм',
            minimValue: 100,
            maximValue: 1000,
            value: 300
          }
        ],
        productSelectParams: [
          {
            id: 'field1-type2',
            name: 'Толщина металла',
            sym: 't',
            unit: 'мм',
            value: '0.7'
          },
          {
            id: 'field2-type2',
            name: 'Тип металла',
            value: 'Оц. сталь'
          },
          {
            id: 'field3-type2',
            name: 'Тип соединения',
            value: 'Нет'
          }
        ]
      },
      {
        id: 'prod2',
        titleProduct: 'Цилиндр',
        imageProduct: Img2,
        price: 15,
        quantity: 9,
        selectType: 3,
        productParams: [
          {
            id: 'param1-prod2',
            name: 'Диаметр',
            sym: 'D',
            unit: 'мм',
            minimValue: 300,
            maximValue: 800,
            value: 600
          },
          {
            id: 'param2-prod2',
            name: 'Высота',
            sym: 'h',
            unit: 'мм',
            minimValue: 600,
            maximValue: 2000,
            value: 1000
          }
        ],
        productSelectParams: []
      },
      {
        id: 'prod3',
        titleProduct: 'Прямоугольный параллелепипед',
        imageProduct: Img3,
        price: 50,
        quantity: 3,
        selectType: 1,
        productParams: [
          {
            id: 'param1-prod3',
            name: 'Сторона',
            sym: 'a',
            unit: 'мм',
            minimValue: 500,
            maximValue: 2000,
            value: 500
          },
          {
            id: 'param2-prod3',
            name: 'Сторона',
            sym: 'b',
            unit: 'мм',
            minimValue: 500,
            maximValue: 2000,
            value: 800
          },
          {
            id: 'param3-prod3',
            name: 'Сторона',
            sym: 'c',
            unit: 'мм',
            minimValue: 500,
            maximValue: 2000,
            value: 1050
          }
        ],
        productSelectParams: [
          {
            id: 'field1-type1',
            name: 'Толщина металла',
            sym: 't',
            unit: 'мм',
            value: '0.5'
          },
          {
            id: 'field2-type1',
            name: 'Тип металла',
            value: 'Оц. сталь'
          },
          {
            id: 'field3-type1',
            name: 'Тип соединения',
            value: 'Фланец №20'
          }
        ]
      }
    ]
  },
  mutations: {
    DECREMENT (state, id) {
      for (let i = 0; i < state.cartItemList.length; i++) {
        if (state.cartItemList[i].id === id) {
          if (state.cartItemList[i].quantity > 0) {
            state.cartItemList[i].quantity--
          } else {
            state.cartItemList[i].quantity = 0
          }
        }
      }
    },
    INCREMENT (state, id) {
      for (let i = 0; i < state.cartItemList.length; i++) {
        if (state.cartItemList[i].id === id) {
          state.cartItemList[i].quantity++
        }
      }
    },
    REMOVE_PRODUCT (state, id) {
      let index = state.cartItemList.findIndex(product => product.id === id)
      state.cartItemList.splice(index, 1)
    },
    SAVE_CHANGES (state, { id, editedParams, editedQuantity, editedSelectParams }) {
      const updateProduct = state.cartItemList.find(product => {
        return product.id === id
      })
      updateProduct.quantity = editedQuantity
      updateProduct.productParams = editedParams
      updateProduct.productSelectParams = editedSelectParams
    }
  },
  actions: {
    DECREMENT ({ commit }, id) {
      commit('DECREMENT', id)
    },
    INCREMENT ({ commit }, id) {
      commit('INCREMENT', id)
    },
    REMOVE_PRODUCT ({ commit }, id) {
      commit('REMOVE_PRODUCT', id)
    },
    SAVE_CHANGES ({ commit }, payload) {
      commit('SAVE_CHANGES', payload)
    }
  },
  getters: {
    productsInCart: (state) => {
      return state.cartItemList
    },
    cartCount: (state) => {
      return state.cartItemList.length
    },
    total: (state) => {
      let sum = []
      let total
      for (let i = 0; i < state.cartItemList.length; i++) {
        let sumItem = state.cartItemList[i].price * state.cartItemList[i].quantity
        sum.push(sumItem)
      }
      total = sum.reduce((sum, current) => sum + current, 0)
      total = total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
      return total
    },
    productById: (state) => {
      return productId => {
        return (
          state.cartItemList.find(product => product.id === productId)
        )
      }
    }
  }
}
