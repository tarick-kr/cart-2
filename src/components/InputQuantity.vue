<template>
  <v-text-field
    :label="this.label"
    :hint="this.hint"
    persistent-hint
    required
    :value="this.data"
    @input="onChangeValue($event)"
    :error="!validValue"
  />
</template>

<script>
export default {
  name: 'InputQuantity',
  data () {
    return {
      label: '',
      hint: '',
      maxQuantity: 100,
      patternValidQuantity: /^(?:[1-9]\d*|\d)$/
    }
  },
  props: {
    data: {
      type: [Object, Number],
      required: true
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      this.label = 'Колличество, шт'
      this.hint = 'максимум ' + this.maxQuantity + ' шт'
    },
    onChangeValue (e) {
      this.$emit('onUpdate', {
        newValue: e,
        valid: this.patternValidQuantity.test(String(e)) && String(e) > 0 && String(e) <= this.maxQuantity
      })
    }
  },
  computed: {
    validValue () {
      return this.patternValidQuantity.test(String(this.data)) && String(this.data) > 0 && String(this.data) <= this.maxQuantity
    }
  }
}
</script>

<style scoped>

</style>
