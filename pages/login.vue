<template>
  <div class="login-container mx-auto">
    <ValidationObserver ref="form" v-slot="{ validate }">
      <form @submit.prevent="onSubmit(validate)">
        <v-row>
          <v-col cols="12">
            <div class="text-h1 text-center">
              Decision System
            </div>
          </v-col>
          <v-col cols="12">
            <InputWithValidate
              v-model="username"
              label="ชื่อผู้ใช้"
              name="ชื่อผู้ใช้"
              rules="required"
            />
          </v-col>
          <v-col cols="12">
            <InputWithValidate
              v-model="password"
              label="รหัสผ่าน"
              name="รหัสผ่าน"
              type="password"
              rules="required"
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              block
              type="submit"
            >
              Log In
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'empty',
  setup () {
    const context = useContext()
    const router = useRouter()
    const username = ref<string>('')
    const password = ref<string>('')
    const loading = ref<boolean>(false)

    const onSubmit = (validate: () => Promise<any>) :void => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            const login = await context.$axios.post('/auth/login', {
              username: username.value,
              password: password.value
            })
            window.localStorage.setItem('token', login.data.data.token)
            window.localStorage.setItem('type', login.data.data.type)
            router.push('/')
          } catch (err) {
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      username,
      password,
      loading,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 450px;
  flex-direction: column;
}
</style>
