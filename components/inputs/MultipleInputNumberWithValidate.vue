<template>
  <!--
    How to use Example
    <MultipleInputNumberWithValidate
    @input="functionCallbackInput"
    :data="data"
  /> -->
  <v-row>
    <v-col cols="6">
      <v-row v-for="(tel, index) of tels" :key="index">
        <v-col cols="10">
          <InputWithValidation
            v-model="tels[index]"
            :name="`เบอร์โทรที่ ${index + 1}`"
            max-length="10"
            rules="number|min:9|max:10"
            label="เบอร์โทร"
            placeholder="กรอกเบอร์โทร"
            class="required"
            @input="onChangeTelephoneNumber(index, $event)"
          />
        </v-col>
        <v-col v-if="index !== 0" cols="1">
          <div class="square-btn">
            <v-btn color="danger" class="px-0" @click="onClickDeleteNumber(index)">
              <v-icon color="white">
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="1">
          <div v-if="index + 1 === tels.length" class="square-btn">
            <v-btn color="primary" class="px-0" @click="onClickAddNumber">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { InputWithValidation } from '~/components/form/inputs'

export default {
  components: {
    InputWithValidation
  },
  props: {
    data: {
      type: Array,
      default () {
        return ['']
      }
    }
  },
  data () {
    return {
      tels: this.data
    }
  },
  methods: {
    onClickAddNumber () {
      this.tels = [...this.tels, '']
    },
    onClickDeleteNumber (idx) {
      if (idx !== 0) {
        this.tels.splice(idx, 1)
      }
    },
    onChangeTelephoneNumber (idx, value) {
      this.tels.splice(idx, 1, value)
      this.$emit('input', this.tels)
    }
  }
}
</script>
