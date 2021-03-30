<template>
  <ValidationProvider
    v-slot="{ errors, valid, touched }"
    :name="$attrs.name"
    :rules="rules"
  >
    <v-select
      v-model="innerValue"
      class="api-dropdown"
      :rounded="rounded"
      :items="dataItems"
      item-value="value"
      item-text="text"
      :error-messages="errorsRender || errors"
      :success="touched && rules ? valid : null"
      :type="$attrs.type"
      v-bind="$attrs"
      :disabled="disabled"
      :multiple="multiple"
      outlined
      dense
      :placeholder="$attrs.placeholder"
      v-on="$listeners"
      @change="$emit('change', innerValue)"
      @input="limiter"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'DropdownWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    getPath: {
      type: String,
      default: ''
    },
    getTextField: {
      type: String,
      default: 'display'
    },
    items: {
      type: Array,
      default: null
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: null,
      required: true
    },
    errorsRender: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limitValue: {
      type: Number,
      default: null
    },
    customeText: {
      type: String,
      default: ''
    },
    disabledDefault: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerValue: this.value,
      dataItems: this.items ? this.items : []
    }
  },
  watch: {
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    value (newVal) {
      this.innerValue = newVal
    },
    items (val) {
      this.dataItems = val
    }
  },
  beforeMount () {
    if (!this.items) {
      this.$axios.get(this.getPath, { params: { perPage: 999 } })
        .then((res) => {
          const { data } = res.data
          if (!this.disabledDefault) {
            this.dataItems = [{
              text: this.customeText || 'ยังไม่ได้เลือก',
              value: null
            }]
          }
          this.dataItems = [
            ...this.dataItems,
            ...data.map(el => ({
              text: el[this.getTextField],
              value: el._id
            }))
          ]
        }).catch((error) => {
          console.error('delete error : ', error)
          this.$bus.$emit('alert-error', error)
        })
    }
  },
  methods: {
    limiter (e) {
      if (this.limitValue && e.length > this.limitValue) {
        this.$bus.$emit('alert-error', {
          response: {
            data: {
              message: 'เลือกหมวดหมู่ครบแล้ว'
            }
          }
        })
        e.pop()
      }
    }
  }
}
</script>
