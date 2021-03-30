<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      :options.sync="optionsObj"
      :server-items-length="total"
      :footer-props="footerOption"
      :mobile-breakpoint="0"
      no-results-text="ไม่มีข้อมูลปรากฏ"
      loading-text="กำลังโหลดข้อมูล กรุณารอสักครู่..."
      :class="`text-center justify-center mt-3`"
      hide-default-header
    >
      <template slot="header">
        <tr class="tr-head">
          <template v-for="meta in headers">
            <th :key="meta.text" :class="`text-head-table py-3 px-4  text-${meta.align}`" :style="`min-width: ${meta.width}`">
              {{ meta.text }}
            </th>
          </template>
        </tr>
      </template>
      <template v-slot:item.index="{ item }" class="text-primary">
        {{ showNumberPage(item, options) }}
      </template>
      <template v-slot:item.eventTitle="{ item }" class="py-0">
        <div class="py-3 column-text-overflow">
          {{ item.title }}
          <v-badge
            :content="item.type"
            :color="item.badgeColor ? item.badgeColor : 'primary'"
            :class="`ml-3 ${item.type === 'Event' ? 'text--primary' : 'text--success'}`"
          />
        </div>
      </template>
      <template v-slot:item.title="{ item }" class="py-0">
        <div class="py-3 column-text-overflow">
          {{ item.title }}
        </div>
      </template>
      <template v-slot:item.panel="{ item }">
        <v-expansion-panels accordion flat :hover="false">
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium pl-0">
              {{ item.panel.header }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text--disabled">
              <div v-html="item.panel.detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
      <template v-slot:item.image="{ item }" class="py-2">
        <ImagePreview
          :images="[item.image.medium]"
          :thumbnail-url="item.image.thumbnail"
          :height="50"
        />
      </template>
      <template v-slot:item.lang="{ item }">
        {{ item.lang === 'en' ? 'English': 'ภาษาไทย' }}
      </template>
      <template v-slot:item.toggle="{ item }" class="py-2">
        <div class="table-toggle">
          <ToggleWithValidate
            :value="item.toggle.value"
            class="pt-2"
            :label="item.toggle.label ? item.toggle.label : ''"
            :label-position="null"
            :is-disabled="item.toggle.disabled"
            @change="$emit('toggle', item.toggle.id, !item.toggle.value)"
          />
        </div>
      </template>
      <template v-slot:item.status="{ item }" class="py-2">
        <v-switch
          :input-value="item.status == 1 ? true : false"
          value
          :class="`mx-auto justify-center status-switch ${item.status == 0 ? 'inactive-toggle' : '' }`"
          @change="updatestatus(item,$event)"
        />
      </template>
      <template v-slot:item.active="{ item }" class="py-2">
        <div>
          <ToggleWithValidate
            :value="item.active == 1 ? true : false"
            :class="`active-switch ${item.active == 0 ? 'inactive-toggle' : '' }`"
            @change="editStatus(item,$event)"
          />
        </div>
      </template>
      <template v-slot:item.tel="{ item }" class="py-2">
        <div v-for="(n, index) in item.tel.length+1" :key="n">
          <div v-if="item.tel[index]" class="pb-3">
            {{ item.tel[index] }}
          </div>
        </div>
      </template>
      <template v-slot:item.updated_at="{ item }" class="py-2">
        {{ momentDate(item) }}
      </template>
      <template v-slot:item.manager="{ item }">
        <EditButton
          @click="editItem(item)"
        />
        <DeleteButton
          :disabled="userData.role != 'ADMIN'"
          :delete-url="`${path.delete}/${item.id}`"
          @complete="$emit('delete')"
        />
      </template>
      <template v-slot:item.action="{ item }">
        <EditButton
          @click="editItem(item)"
        />
        <DeleteButton
          :disabled="userData.role != 'ADMIN'"
          :delete-url="`${item.action.path}/${item.action.id}`"
          @complete="$emit('delete')"
        />
      </template>

      <template v-slot:item.orderTopBottom="{ item }">
        <div class="d-flex flex-row justify-start">
          <v-icon :disabled="item.position.first_row" @click="$emit('positionUp', item.id)">
            mdi-arrow-up
          </v-icon>
          <v-icon :disabled="item.position.last_row" @click="$emit('positionDown', item.id)">
            mdi-arrow-down
          </v-icon>
        </div>
      </template>

      <template v-slot:item.qr_code="{ item }">
        <div
          :class="`w-100 text-link clickable ${!item.qr_code.th && !item.qr_code.en ? 'disable-item' : ''}`"
          @click="qrPrinting(item)"
        >
          <v-icon color="link">
            mdi-qrcode
          </v-icon>
          <span class="ml-2 text-underline">พิมพ์ QR Code</span>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ImagePreview } from '~/components/image'
import { DeleteButton, EditButton } from '~/components/button'
import ToggleWithValidate from '~/components/form/inputs/ToggleWithValidate'
import { TYPE } from '~/assets/constants/activityStatus'

export default {
  components: {
    ImagePreview,
    DeleteButton,
    EditButton,
    ToggleWithValidate
  },
  props: {
    userId: {
      type: Number,
      default: null
    },
    headers: {
      type: Array,
      default: null
    },
    data: {
      type: Array,
      default: null
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    loading: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    rowPerPage: {
      type: Array,
      default () {
        return [5, 20, 30, 50]
      }
    },
    options: {
      type: Object,
      required: true
    },
    path: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      items: this.data,
      dialog: false,
      footerOption: {
        itemsPerPageOptions: [5, 10, 30, 50],
        itemsPerPageText: 'จำนวนแถวต่อหน้า'
      },
      disabled: false,
      watchImage: false,
      imageItems: [],
      selectedIndex: null,
      TYPE
    }
  },
  computed: {
    optionsObj: {
      get () { return this.options },
      set (value) {
        this.$emit('update:options', value)
      }
    },
    userData () {
      return this.$store.state.users.user_data
    }
  },
  watch: {
    loading (value) {
      if (!value) {
        this.disabled = false
      }
    },
    data (value) {
      this.items = value
    }
  },
  mounted () {
    const widthScreen = screen.width
    if (widthScreen <= 414) {
      this.footerOption.itemsPerPageText = ''
    }
  },
  methods: {
    showNumberPage (item, options) {
      return item.index + ((options.page * options.itemsPerPage) - options.itemsPerPage)
    },
    momentDate (item) {
      return this.$dateTime(item.updated_at)
    },
    updatestatus (item, e) {
      this.$emit('statustestimonial', item, e)
    },
    editItem (item) {
      this.$emit('edit', item)
    },
    editStatus (item, e) {
      this.$emit('status', item, e)
    },
    noImage () {
      this.$bus.$emit('message', 'ไม่มีข้อมูลรูปภาพ.', 'dange')
    },
    qrPrinting (item) {
      if (item.qr_code.th || item.qr_code.en) {
        this.$emit('qrCode', item.qr_code, item)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~/assets/scss/style/media.scss';
</style>
