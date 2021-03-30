<template>
  <v-row class="mx-0 d-flex align-center">
    <v-checkbox
      v-model="innerValue"
      v-bind="$attrs"
      class="ma-0 pa-0"
      color="secondary"
      :hide-details="true"
      v-on="$listeners"
      @change="onChange"
    />
    <div>
      {{ title }}
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Boolean],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      innerValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.innerValue = newValue
    }
  },
  methods: {
    onChange (value) {
      this.$emit('updated', value, this.data, this.index)
    }
  }
}
</script>
