<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    :footer-props="footerOption"
    :mobile-breakpoint="0"
    :options.sync="optionsObj"
    :server-items-length="total"
  >
    <template #item.index="{ item }" class="text-primary">
      {{ showNumberPage(item, options) }}
    </template>
    <template #item.active="{ item }">
      <ToggleWithValidate
        v-model="item.active"
        inset
        :ripple="false"
        @input="$emit('status', item, $event)"
      />
    </template>
    <template #item.manager="{ item }">
      <v-menu
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$emit('edit', item.id)">
            <v-list-item-title class="text-h5 text-dimgray-color">
              {{ $t('components.dataTable.manager.common.line1') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('delete', item.id)">
            <v-list-item-title class="text-h5 text-dimgray-color">
              {{ $t('components.dataTable.manager.common.line2') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #item.serviceManager="{ item }">
      <v-menu
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$emit('editInfo', item.id)">
            <v-list-item-title class="text-h5 text-dimgray-color">
              {{ $t('components.dataTable.manager.service.line1') }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="$emit('editWorking', item.id)">
            <v-list-item-title class="text-h5 text-dimgray-color">
              {{ $t('components.dataTable.manager.service.line2') }}
            </v-list-item-title>
          </v-list-item>
          <v-divider class="border-gainboro-color" />
          <v-list-item @click="$emit('delete', item.id)">
            <v-list-item-title class="text-h5 text-dimgray-color">
              {{ $t('components.dataTable.manager.service.line3') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>

<script>
import { defineComponent, reactive, computed, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    headers: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
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
      default: () => ({
        id: '',
        delete: '/'
      })
    }
  },
  setup (props, { emit }) {
    const context = useContext()
    const footerOption = reactive({
      itemsPerPageOptions: [5, 10, 30, 50],
      itemsPerPageText: screen.width <= 414 ? '' : 'Rows Per Page'
    })
    const optionsObj = computed({
      get: () => props.options,
      set: (value) => {
        emit('update:options', value)
      }
    })
    return {
      footerOption,
      showNumberPage: (item, options) => {
        return item.index + ((options.page * options.itemsPerPage) - options.itemsPerPage)
      },
      optionsObj,
      $dateSlashForm: context.$dateSlashForm
    }
  }
})

</script>
