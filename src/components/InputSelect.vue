<template>
  <v-select
    :label="this.label"
    :value="this.data.value"
    required
    :items="this.changeSelectType[this.index].arraySelectItems"
    @input="onChangeValue($event)"
  />
</template>

<script>
export default {
  name: 'InputSelect',
  data () {
    return {
      label: ''
    }
  },
  props: {
    data: {
      type: [Object, Number],
      required: true
    },
    index: {
      type: [Number],
      required: true
    },
    selectType: {
      type: [Number],
      required: true
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      this.label = this.data.sym ? this.data.name + ' ' + this.data.sym + ', ' + this.data.unit : this.data.name
    },
    onChangeValue (e) {
      this.$emit('onUpdate', {
        index: this.index,
        newValue: e
      })
    }
  },
  computed: {
    changeSelectType () {
      if (this.selectType === 1) {
        return this.$store.getters.getSelectFieldsType1
      } else if (this.selectType === 2) {
        return this.$store.getters.getSelectFieldsType2
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>
