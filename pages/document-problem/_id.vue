<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="แก้ไขข้อมูลเอกสารแก้ไขปัญหา">
          <template slot="content">
            <v-row>
              <v-col cols="12">
                <InputWithValidate
                  v-model="name"
                  label="ชื่อเอกสาร"
                  name="ชื่อเอกสาร"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <FileInputWithValidate
                  v-model="file"
                  :placeholder="fileName"
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
import { defineComponent, useContext, useFetch, ref, useRouter, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const name = ref<string>('')
    const file = ref<any>(null)
    const fileName = ref<string>('')
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const documentProblem = await context.$axios.get(`/document-problems/${route.value.params.id}`)
        const data = documentProblem.data.data
        name.value = data.name
        fileName.value = data.file
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    })

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            isSubmit.value = true
            const formData = new FormData()
            formData.append('name', name.value)
            if (file.value) {
              formData.append('file', file.value)
            }
            await context.$axios.put(`/document-problems/${route.value.params.id}`, formData)
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            isSubmit.value = true
            router.push('/document-problem')
          } catch (err) {
            isSubmit.value = false
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      name,
      file,
      submit,
      fileName,
      isSubmit
    }
  }
})
</script>
