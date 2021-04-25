<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="เพิ่มข้อมูลหมวดหมู่ปัญหาที่พบบ่อย">
          <template slot="content">
            <v-row>
              <v-col cols="12">
                <InputWithValidate
                  v-model="name"
                  label="หมวดหมู่"
                  name="หมวดหมู่"
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
import { defineComponent, useContext, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const name = ref<string>('')
    const isSubmit = ref<boolean>(false)

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            isSubmit.value = true
            await context.$axios.post('/problem-categories', {
              name: name.value
            })
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            isSubmit.value = true
            router.push('/problem-category')
          } catch (err) {
            isSubmit.value = false
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      name,
      submit,
      isSubmit
    }
  }
})
</script>
