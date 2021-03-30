<template>
  <v-row
    class="ma-0 d-flex justify-center"
  >
    <v-alert
      :value="true"
      :type="status"
      transition="slide-y-transition"
      border="bottom"
      colored-border
      elevation="2"
      class="py-md-5 py-3 fixed-top"
      style="z-index: 9"
    >
      <div v-if="typeof(message) === 'object'">
        <ul v-for="(error, index) in message" :key="index">
          <li>{{ error['0'] }}</li>
        </ul>
      </div>
      <div v-else>
        {{ message }}
      </div>
    </v-alert>
  </v-row>
</template>

<script>
export default {
  props: {
    message: {
      type: null,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
}
</script>
