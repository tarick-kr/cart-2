<template>
  <v-text-field
    :label="this.label"
    :hint="this.hint"
    persistent-hint
    required
    :value="this.data.value"
    @input="onChangeValue($event)"
    :error="!validValue"
  />
</template>

<script>
export default {
  name: 'InputParam',
  data () {
    return {
      label: '',
      hint: '',
      patternValidParam: /^-?\d*\.?\d+$/
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
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      this.label = this.data.name + ' ' + this.data.sym + ',' + ' ' + this.data.unit
      this.hint = 'от ' + this.data.minimValue + this.data.unit + ' до ' + this.data.maximValue + this.data.unit
    },
    onChangeValue (e) {
      this.$emit('onUpdate', {
        index: this.index,
        product: this.data,
        prop: 'value',
        newValue: Number(e),
        valid: this.patternValidParam.test(e) && e >= this.data.minimValue && e <= this.data.maximValue
      })
    }
  },
  computed: {
    validValue () {
      return this.patternValidParam.test(this.data.value) && this.data.value >= this.data.minimValue && this.data.value <= this.data.maximValue
    }
  }
}
</script>

<style scoped>
</style>
