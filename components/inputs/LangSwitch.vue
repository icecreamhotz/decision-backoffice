<template>
  <v-btn-toggle
    v-model="index"
    :data-cy="dataCy"
    mandatory
  >
    <v-btn small>
      TH
    </v-btn>
    <v-btn small>
      EN
    </v-btn>
  </v-btn-toggle>
</template>

<script>
const LANG = ['th', 'en']

export default {
  props: {
    value: {
      type: String,
      default: 'th'
    },
    dataCy: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerValue: this.value,
      index: this.getIndex(this.value)
    }
  },
  watch: {
    value (value) {
      this.index = this.getIndex(value)
    },
    index (value) {
      this.$emit('input', this.getValue(value))
      this.$emit('change')
    }
  },
  methods: {
    getIndex (text = 'th') {
      const index = LANG.indexOf(text)
      if (index > -1) {
        return index
      }
      return 0
    },
    getValue (index = 0) {
      return LANG[index]
    }
  }
}
</script>
