<template>
  <v-app id="inspire">
    <PageLoading />
    <Message />
    <v-main>
      <v-container
        :class="`fill-height justify-center ${$vuetify.breakpoint.smAndUp ? '' : 'bg-white'}`"
        fluid
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Message } from '~/components/alert'
import { PageLoading } from '~/components/loading'

export default {
  components: {
    PageLoading, Message
  },
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    drawer: null
  })
}
</script>
