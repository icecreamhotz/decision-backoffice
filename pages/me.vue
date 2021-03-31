<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="แก้ไขข้อมูลส่วนตัว">
          <template slot="content">
            <v-row>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="username"
                  disabled
                  label="ชื่อผู้ใช้ระบบ"
                  name="ชื่อผู้ใช้ระบบ"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="password"
                  label="รหัสผ่าน"
                  name="รหัสผ่าน"
                  type="password"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="firstname"
                  label="ชื่อ"
                  name="ชื่อ"
                  rules="required"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="lastname"
                  label="นามสกุล"
                  name="นามสกุล"
                  rules="required"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="email"
                  label="อีเมล"
                  name="อีเมล"
                  rules="required|email"
                />
              </v-col>
              <v-col cols="12" md="6">
                <InputWithValidate
                  v-model="tel"
                  label="เบอร์โทรศัพท์"
                  name="เบอร์โทรศัพท์"
                  rules="required|integer|min:9|max:10"
                />
              </v-col>
              <v-col cols="12">
                <InputWithValidate
                  v-model="role"
                  disabled
                  label="สิทธิ"
                  name="สิทธิ"
                />
              </v-col>
            </v-row>
          </template>
          <template slot="submit">
            <SubmitButton
              :disabled="invalid || isSubmit"
              btn-text="บันทึก"
              class="d-flex mx-auto"
              :loading="isSubmit"
            />
          </template>
        </CardContent>
      </CardContainer>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const username = ref<string>('')
    const password = ref<string>('')
    const firstname = ref<string>('')
    const lastname = ref<string>('')
    const email = ref<string>('')
    const tel = ref<string>('')
    const role = ref<string>('')
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const user = await context.$axios.get('/auth/payload')
        const data = user.data.data
        username.value = data.username
        firstname.value = data.firstname
        lastname.value = data.lastname
        email.value = data.email
        tel.value = data.tel
        role.value = data.role
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    })

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            await context.$axios.put('/auth/me', {
              password: password.value,
              email: email.value,
              firstname: firstname.value,
              lastname: lastname.value,
              tel: tel.value
            })
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
          } catch (err) {
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      username,
      password,
      firstname,
      lastname,
      email,
      tel,
      role,
      submit,
      isSubmit
    }
  }
})
</script>
