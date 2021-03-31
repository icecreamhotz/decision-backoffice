<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
      <VueTimepicker
        v-model="innerValue"
        hour-label="ชม."
        minute-label="น."
        placeholder="HH:mm"
        :hour-range="innerHourRange"
        :minute-range="innerMinuteRange"
        :minute-interval="minuteInterval"
        :disabled="disabled"
        v-bind="$attrs"
        :close-on-complete="defaultCloseOnComplete"
        hide-clear-button
        :class="{'time-picker--error': errors.length > 0}"
        @change="$emit('input', {HH: $event.data.HH, mm:$event.data.mm})"
      />
      <div v-if="errors.length > 0" class="v-messages theme--light error--text time-picker__error" role="alert">
        <div class="v-messages__wrapper">
          <div class="v-messages__message">
            {{ errors[0] }}
          </div>
        </div>
      </div>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    role: {
      type: String,
      required: true
    },
    rules: {
      type: String,
      default: ''
    },
    defaultCloseOnComplete: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: () => ({
        HH: '00',
        mm: '00'
      })
    },
    rivalTime: {
      type: Object,
      default: () => ({
        HH: '23',
        mm: '30'
      })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    minuteInterval: {
      type: Number,
      default: 30
    },
    defaultMinuteRange: {
      type: Array as () => number[],
      default: () => ([])
    }
  },
  setup (props) {
    const innerValue = ref(props.value)
    const innerRivalTime = ref(props.rivalTime)
    const innerHourRange = ref<number[][]>([[]])
    const innerMinuteRange = ref<number[][]>([[]])

    watch(() => props.value, (value) => {
      innerValue.value = value
      setValue()
    }, {
      deep: true
    })

    watch(() => props.rivalTime, (value) => {
      innerRivalTime.value = value
      setValue()
    }, {
      deep: true
    })

    const setValue = () => {
      const { HH: selfHH } = innerValue.value
      const { HH: rivalHH, mm: rivalMM } = innerRivalTime.value
      const isClose = props.role === 'close'

      if (isClose && rivalMM === '59') {
        innerHourRange.value = [[+rivalHH + 1, 23]]
        innerMinuteRange.value = [[0, 59]]
        return
      } else if (!isClose && rivalMM === '00') {
        innerHourRange.value = [[0, +rivalHH - 1]]
        innerMinuteRange.value = [[0, 59]]
        return
      }

      const equalHour = selfHH === rivalHH
      if (equalHour) {
        innerHourRange.value = isClose ? [[+rivalHH, 23]] : [[0, +rivalHH]]
        innerMinuteRange.value = isClose ? [[+rivalMM + 1, 59]] : [[0, +rivalMM - 1]]
      } else {
        innerHourRange.value = isClose ? [[+rivalHH, 23]] : [[0, +rivalHH]]
        innerMinuteRange.value = isClose ? [[0, 59]] : [[0, 59]]
      }
    }

    setValue()

    return {
      innerValue,
      innerRivalTime,
      innerHourRange,
      innerMinuteRange
    }
  }
})
</script>

<style lang="scss">
.vue__time-picker.time-picker--error {
  border: 1px solid $danger;
}
.vue__time-picker {
  width: 100%;
  height: 40px;
  border: 1px solid $dark-gray;
  border-radius: 5px;
  background-color: transparent;
  font-family: 'Kanit';
  outline: none;
  margin-bottom: 4px;
  input {
    border: none !important;
    height: 100% !important;
    outline: none;
  }
}
.vue__time-picker .dropdown ul li:not([disabled]).active {
  background-color: $primary !important;
  color: $white !important;
}
.vue__time-picker .dropdown {
  top: calc(2.2em + 6px) !important;
}
.time-picker__error {
  max-width: 100%;
  padding: 0 12px;
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 14px;
  min-width: 1px;
  position: relative;
}
</style>
