<template>
  <div class="pa-0 ma-0 col-md-6 col-12">
    <v-row v-for="(n, index) in tels" :key="index" class="px-md-3 px-0 ma-0 w-100">
      <v-col cols="12" class="d-flex py-0 px-0">
        <v-col cols="8" md="9" class="py-0 pr-md-0 px-md-0 px-3 sub-tels">
          <InputWithValidation
            v-model="tels[index]"
            rules="number|min:9|max:10"
            label="เบอร์โทร"
            placeholder="กรอกเบอร์โทร"
          />
        </v-col>
        <v-col :cols="btnColumn" class="px-0 ml-md-1 d-flex">
          <div v-if="tels.length > 1" class="pl-3 square-btn">
            <v-btn color="danger" class="px-0" @click="removeThis(index)">
              <v-icon color="white">
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
          <div v-if="tels.length-1 === index" class="square-btn pl-3">
            <v-btn color="primary" class="px-0" @click="addOneMore()">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { InputWithValidation } from '~/components/form/inputs'

export default {
  name: 'CustomerPhoneNumbers',
  components: {
    InputWithValidation
  },
  props: {
    telsData: {
      type: Array,
      default: null
    },
    isAddNumbers: {
      type: Boolean,
      required: true
    },
    userData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      tels: [null],
      items: [],
      temps: [],
      count: 0,
      isAddShow: [],
      telColumn: 8,
      btnColumn: 2
    }
  },
  watch: {
    isAddNumbers (newVal, oldVal) {
      if (oldVal === false && newVal === true && this.tels.length > 1) {
        for (let i = 1; i <= this.tels.length; i += 1) {
          this.addNumbers(this.tels[i])
        }
      }
    },
    tels () {
      if (this.tels[0]) {
        this.$emit('mainTelData', this.tels[0])
      }
    }
  },
  mounted () {
    this.tels = this.telsData.length > 0 ? this.telsData : [null]
  },
  methods: {
    addOneMore () {
      if (this.tels[this.tels.length - 1] !== null) {
        if (this.tels[this.tels.length - 1].match(/^[0-9]{9,10}$/)) {
          this.tels.push(null)
        } else {
          this.$emit('telErrorInform', 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
        }
      } else {
        this.$emit('telErrorInform', 'กรุณากรอกเบอร์โทรศัพท์ในช่องที่ว่าง')
      }
    },
    removeThis (index) {
      this.tels.splice(index, 1)
      this.$emit('mainTelData', this.tels[0])
    },
    addNumbers (number) {
      let customerId = null
      if (this.$route.params.id) {
        customerId = this.$route.params.id
      } else {
        customerId = this.userData.id ? this.userData.id : null
      }

      if (number) {
        this.$axios({
          url: `/customers/contacts/${customerId}`,
          method: 'DELETE'
        }).then(() => {
          this.$axios({
            url: '/customers/contacts',
            data: {
              customer_id: customerId,
              tel: number
            },
            method: 'POST'
          }).then(() => {})
        })
      }
    }
  }
}
</script>
