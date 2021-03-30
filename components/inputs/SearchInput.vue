<template>
  <v-text-field
    v-model="innerValue"
    :label="lable"
    :data-cy="dataCy"
    class="search-input"
    hide-details
    @keyup.enter="search"
  >
    <v-icon
      slot="append"
      @click="search"
    >
      mdi-magnify
    </v-icon>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    reset: {
      type: Boolean,
      default: false
    },
    lable: {
      type: String,
      default: 'ค้นหา'
    },
    dataCy: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerValue: ''
    }
  },
  watch: {
    value (value) {
      this.innerValue = value
    },
    reset (value) {
      if (value) {
        this.innerValue = ''
      }
    },
    innerValue (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    search () {
      this.$emit('search', this.innerValue)
    }
  }
}
</script>
