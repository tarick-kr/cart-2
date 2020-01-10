<template>
  <v-row justify="end" class="mr-4">
    <v-dialog v-model="dialog" max-width="760px">
      <template v-slot:activator="{ on }">
        <v-btn class="my-2" color="success" small dark v-on="on">
          изменить
          <v-icon size="18" right>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center background-card-title px-1 px-sm-2 px-md-4 mb-4">
          <span class="headline font-weight-bold mx-auto white--text">{{ cartItem.titleProduct }}</span>
        </v-card-title>
        <v-img
          class="mb-4"
          :src="cartItem.imageProduct"
          aspect-ratio="5"
          contain
        />
        <div class="text-center px-1 px-sm-2 px-md-4">
          <v-divider class="divider-width-align"/>
        </div>
        <v-card-text class="px-1 px-sm-2 px-md-4">
          <v-container>
            <v-row>
              <v-col
                cols="12" sm="4"
                v-for="(editedProduct, index) in this.editedParams"
                :key="editedProduct.id"
              >
                <input-param
                  :index="index"
                  :data="editedProduct"
                  @onUpdate="updateParam($event)"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="divider-width-align"/>
          <v-container v-if="!isSelectParams">
            <v-row>
              <v-col cols="12" sm="6" md="4" v-for="(field, index) in this.editedSelectParams" :key="index">
                <input-select
                  :data="field"
                  :index="index"
                  :selectType="cartItem.selectType"
                  @onUpdate="updateSelect($event)"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="divider-width-align" v-if="!isSelectParams"/>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <input-quantity
                  :data="this.editedQuantity"
                  @onUpdate="updateQuantity($event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            class="mr-4"
            color="red accent-4"
            dark
            small
            @click="onCancel"
          >Закрыть
            <v-icon right size="21">close</v-icon>
          </v-btn>
          <v-btn

            color="blue darken-1"
            class="white--text"
            small
            @click="onSave"
            :disabled="!allFieldsComplited"
          >
            Сохранить
            <v-icon right size="19">save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import InputParam from './InputParam'
import InputQuantity from './InputQuantity'
import InputSelect from './InputSelect'

export default {
  name: 'EditProduct',
  data () {
    return {
      dialog: false,
      editedParams: [],
      editedParamValid: [],
      editedParamCount: 0,
      editedQuantity: '',
      editedQuantityValid: true,
      editedSelectParams: []
    }
  },
  components: {
    InputParam,
    InputQuantity,
    InputSelect
  },
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.initValue()
  },
  watch: {
    'cartItem.quantity': {
      handler (val) {
        this.editedQuantity = val
      }
    },
    'cartItem.productParams': {
      handler () {
        this.editedParams = []
        for (let i = 0; i < this.cartItem.productParams.length; i++) {
          let itemObj = this.cartItem.productParams[i]
          let itemObjNew = Object.assign({}, itemObj)
          this.editedParams.push(itemObjNew)
        }
      },
      deep: true
    }
  },
  methods: {
    initValue () {
      // создаётся массив editedParams, который является клоном массива
      // cartItem.productParams полученного в пропсах
      for (let i = 0; i < this.cartItem.productParams.length; i++) {
        let itemObj = this.cartItem.productParams[i]
        let itemObjNew = Object.assign({}, itemObj)
        this.editedParams.push(itemObjNew)
      }
      // создаётся массив editedParamValid со значениями true (т.к. изначально все значения валидны)
      for (let i = 0; i < this.cartItem.productParams.length; i++) {
        this.editedParamValid.push(true)
      }
      // инициализируется счётчик editedParamCount параметров продукта (инпутов)
      // со значением равным длине массива editedParamValid
      this.editedParamCount = this.editedParamValid.length
      // инициализируется кол-во товара
      this.editedQuantity = this.cartItem.quantity
      // создаётся массив editedSelectParams, который является клоном массива
      // cartItem.productParams полученного в пропсах
      if (this.changeSelectType !== '') {
        for (let i = 0; i < this.cartItem.productSelectParams.length; i++) {
          let itemObj = this.cartItem.productSelectParams[i]
          let itemObjNew = Object.assign({}, itemObj)
          this.editedSelectParams.push(itemObjNew)
        }
      } else {
        this.editedSelectParams = []
      }
    },
    onCancel () {
      this.editedParams = []
      this.editedSelectParams = []
      this.initValue()
      this.dialog = false
    },
    onSave () {
      this.$store.dispatch('SAVE_CHANGES', {
        id: this.cartItem.id,
        editedParams: this.editedParams,
        editedQuantity: this.editedQuantity,
        editedSelectParams: this.editedSelectParams
      })
      this.editedParams = []
      this.editedSelectParams = []
      this.initValue()
      this.dialog = false
    },
    updateParam (payload) {
      this.$set(payload.product, payload.prop, payload.newValue)
      this.editedParamValid[payload.index] = payload.valid
      let editedParamCount = 0
      for (let i = 0; i < this.editedParamValid.length; i++) {
        if (this.editedParamValid[i]) {
          editedParamCount++
        }
      }
      this.editedParamCount = editedParamCount
    },
    updateQuantity (payload) {
      this.editedQuantity = Number(payload.newValue)
      this.editedQuantityValid = payload.valid
    },
    updateSelect (payload) {
      for (let i = 0; i < this.editedSelectParams.length; i++) {
        if (i === payload.index) {
          this.editedSelectParams[i].value = payload.newValue
        }
      }
    }
  },
  computed: {
    isSelectParams () {
      return this.cartItem.productSelectParams.length === 0
    },
    changeSelectType () {
      if (this.cartItem.selectType === 1) {
        return this.$store.getters.getSelectFieldsType1
      } else if (this.cartItem.selectType === 2) {
        return this.$store.getters.getSelectFieldsType2
      } else {
        return ''
      }
    },
    editedParamComplited () {
      return this.editedParamCount === this.editedParamValid.length
    },
    editedQuantityComplited () {
      return this.editedQuantityValid
    },
    allFieldsComplited () {
      return this.editedParamComplited && this.editedQuantityComplited
    }
  }
}
</script>

<style scoped lang="sass">

.divider-width-align
  margin: 0 auto
  max-width: calc(100% - 26px)
.background-card-title
  background-color: #1E88E5

</style>
