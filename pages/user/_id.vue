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
                  label="ชื่อผู้ใช้ระบบ"
                  name="ชื่อผู้ใช้ระบบ"
                  disabled
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
                <SelectWithValidate
                  v-model="role"
                  name="สิทธิการใช้งาน"
                  label="สิทธิการใช้งาน"
                  placeholder="สิทธิการใช้งาน"
                  outlined
                  dense
                  flat
                  text-field="text"
                  value-field="value"
                  :items="roles"
                  rules="required"
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
import { defineComponent, useContext, ref, useRouter, useFetch, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const username = ref<string>('')
    const password = ref<string>('')
    const firstname = ref<string>('')
    const lastname = ref<string>('')
    const email = ref<string>('')
    const tel = ref<string>('')
    const role = ref<string>('')
    const roles = ref<any>([{
      text: 'ผู้ดูแลระบบ',
      value: 'ADMIN'
    }, {
      text: 'เจ้าหน้าที่ห้องทะเบียน',
      value: 'STAFF'
    }])
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const user = await context.$axios.get(`/users/${route.value.params.id}`)
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
            isSubmit.value = true
            await context.$axios.put(`/users/${route.value.params.id}`, {
              password: password.value,
              email: email.value,
              firstname: firstname.value,
              lastname: lastname.value,
              tel: tel.value,
              role: role.value
            })
            isSubmit.value = true
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            router.push('/user')
          } catch (err) {
            isSubmit.value = false
            if (err.response!.status === 400) {
              if (err.response.data.message.ERROR_TYPE === 'UNIQUE_USERNAME') {
                context.store.commit('alert/show', { type: 'error', message: 'กรุณาเปลี่ยนชื่อผู้ใช้ระบบเนื่องจากมีข้อมูลซ้ำ.' })
              }
            } else {
              context.store.commit('alert/show', { type: 'error', message: err })
            }
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
      roles,
      submit,
      isSubmit
    }
  }
})
</script>
