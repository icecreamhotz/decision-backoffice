<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="แก้ไขข้อมูลปัญหาที่เข้ามาใหม่">
          <template slot="content">
            <v-row>
              <v-col cols="12">
                <InputWithValidate
                  v-model="name"
                  label="หัวข้อปัญหา"
                  name="หัวข้อปัญหา"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <TextareaWithValidate
                  v-model="description"
                  name="วิธีีการแก้ปัญหา"
                  label="วิธีการแก้ปัญหา"
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
    const name = ref<string>('')
    const description = ref<string>('')
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const problem = await context.$axios.get(`/problem-drafts/${route.value.params.id}`)
        name.value = problem.data.data.title
      } catch (err) {
        isSubmit.value = false
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    })

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            isSubmit.value = true
            await context.$axios.put(`/problem-drafts/${route.value.params.id}`, {
              title: name.value,
              description: description.value
            })
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            isSubmit.value = true
            router.push('/problem-draft')
          } catch (err) {
            isSubmit.value = false
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      name,
      description,
      submit,
      isSubmit
    }
  }
})
</script>
