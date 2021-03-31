<template>
  <v-snackbar
    v-model="show"
    :color="$store.state.alert.type"
    :timeout="3000"
    top
  >
    <span class="text-h4">{{ $store.state.alert.message || '' }}</span>
  </v-snackbar>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Snackbar',
  setup () {
    const { store } = useContext()

    const show = ref<boolean>(false)

    watch(() => show.value, (val) => {
      if (val === false) {
        store.commit('alert/close')
      }
    })
    watch(() => store.state.alert.show, (val:boolean) => {
      show.value = val
    })

    return { show }
  }
})
</script>
