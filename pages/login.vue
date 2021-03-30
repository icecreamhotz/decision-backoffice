<template>
  <v-col
    cols="12"
    sm="10"
    md="8"
    lg="6"
    justify="center"
    :class="`login-page ${$vuetify.breakpoint.smAndUp ? '' : 'fill-height'} bg-white base-border py-5 align-center mt-md-0 mt-5`"
  >
    <v-col cols="12" class="justify-center d-flex py-0 mt-md-5 mb-0">
      <v-img src="/images/logo.png" max-width="300" max-height="215" />
    </v-col>
    <v-col cols="12" class="pa-0">
      <v-form @submit="login">
        <v-col cols="12" sm="10" md="8" class="px-md-auto px-0 py-md-2 pt-4 pb-2 mx-auto">
          <v-text-field
            v-model="username"
            class="shadow-none"
            label="Email"
            name="email"
            type="text"
            outlined
          />
        </v-col>
        <v-col cols="12" sm="10" md="8" class="px-md-auto px-0 py-2 mx-auto">
          <v-text-field
            id="password"
            v-model="password"
            class="shadow-none"
            label="Password"
            name="password"
            type="password"
            outlined
          />
        </v-col>
        <v-col cols="12" sm="10" md="8" class="px-md-auto px-0 py-0 my-0 mx-auto">
          <v-checkbox v-model="rememberMe" class="ml-0 background-none my-0 pt-0" label="จำรหัสผ่าน" />
        </v-col>
        <v-col cols="12" sm="10" md="8" class="px-md-auto px-0 pt-0 pb-md-5 pb-3 mb-md-5 mx-auto">
          <v-btn
            :loading="btnLoading"
            class="text-large-button"
            color="primary"
            x-large
            width="100%"
            type="submit"
          >
            เข้าสู่ระบบ
          </v-btn>
        </v-col>
      </v-form>
    </v-col>
    <v-col
      v-if="wrongCredential"
      cols="12"
      class="justify-center d-flex pa-0 ma-0"
    >
      <v-alert
        v-if="wrongCredential"
        type="error"
        transition="slide-y-transition"
        border="bottom"
        colored-border
        elevation="2"
        class="py-md-5 py-3 fixed-top"
      >
        อีเมลหรือรหัสผ่านไม่ถูกต้อง
      </v-alert>
    </v-col>
  </v-col>
</template>

<script>
export default {
  middleware: 'unauthorization',
  layout: 'centered',
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    username: '',
    password: '',
    appName: process.env.APP_NAME,
    drawer: null,
    wrongCredential: false,
    rememberMe: false,
    btnLoading: false
  }),
  methods: {
    login (e) {
      e.preventDefault()

      this.btnLoading = true
      const { username, password, rememberMe } = this
      this.$store.dispatch('auth/login', {
        grant_type: 'password',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: '*',
        username,
        password,
        rememberMe
      })
        .then((res) => {
          this.$store.dispatch('users/getUserData')
            .then(() => {
              this.$router.push('/')
            }).catch((error) => {
              console.error(error)
              this.btnLoading = false
              this.wrongCredential = true
              setTimeout(() => {
                this.wrongCredential = null
              }, 3000)
            })
        })
        .catch((error) => {
          console.error(error)
          this.wrongCredential = true
          setTimeout(() => {
            this.wrongCredential = null
          }, 3000)
          this.btnLoading = false
        })
      // }
    }
  }
}
</script>
