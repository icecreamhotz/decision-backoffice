<template>
  <div>
    <div class="upload-image__container" @click="chooseImage">
      <div class="upload-image__content">
        <img v-if="imageUrl || preview" :src="imageUrl || preview" class="w-100">
        <div v-else>
          <img src="/images/gallery-icon.png" width="60" class="d-block mx-auto">
          <div class="text-link primary--text spacing-8">
            {{ title }}
          </div>
        </div>
      </div>
      <div class="text-h6 text-darkgray-color spacing-8">
        {{ subTitle }}
      </div>
    </div>
    <CropImage
      v-if="isShowDialog"
      :p-dialog="isShowDialog"
      :p-preview-image="imageUrl"
      :p-type="imageFile.type"
      :image-width="imageWidth"
      :image-height="imageHeight"
      @closeDialog="closeDialog"
      @update-image="updateImage"
    />
    <ValidationProvider ref="imageProvider" v-slot="{ errors }" :name="name" :rules="rules">
      <input
        ref="inputFile"
        type="file"
        class="d-none"
        accept="image/jpeg, image/jpg, image/png"
        @change="pickedImage"
      >
      <span class="red--text spacing-4 text-h6">{{ errors[0] ? errors[0] : '' }}</span>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: 'required|image'
    },
    preview: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    isCrop: {
      type: Boolean,
      default: false
    },
    imageWidth: {
      type: String,
      default: '0'
    },
    imageHeight: {
      type: String,
      default: '0'
    }
  },
  setup (props, {
    emit
  }) {
    const inputFile = ref<any>(null)
    const imageProvider = ref<any>(null)
    const innerValue = ref<string>('')
    const imageUrl = ref<string>('')
    const imageFile = ref<FileList | null>(null)
    const isShowDialog = ref<boolean>(false)
    const cropValue = ref<number[]>([])

    const updateImage = ({ preview, crop }: { preview: string, crop: number[] }) => {
      inputFile.value = ''
      imageUrl.value = preview
      cropValue.value = crop as any
      emit('change', { file: imageFile.value, crop, preview })
      isShowDialog.value = false
    }

    const closeDialog = () => {
      inputFile.value = ''
      imageUrl.value = ''
      innerValue.value = ''
      imageFile.value = null
      isShowDialog.value = false
    }

    const chooseImage = () => {
      inputFile?.value?.click()
    }

    const pickedImage = async (e: any) => {
      const { valid } = await imageProvider.value.validate(e)
      if (valid) {
        const { files } = e.target
        if (files[0] !== undefined) {
          if (files[0].name.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            const url = fr.result?.toString() as any
            imageUrl.value = url
            if (props.isCrop) {
              imageFile.value = files[0]
              isShowDialog.value = true
            } else {
              emit('change', files[0])
            }
          })
        } else {
          emit('change', null)
        }
      }
    }

    return {
      inputFile,
      imageProvider,
      innerValue,
      imageUrl,
      imageFile,
      isShowDialog,
      cropValue,
      updateImage,
      pickedImage,
      chooseImage,
      closeDialog
    }
  }
})
</script>

<style scoped lang="scss">
.upload-image__container {
  width: 208px;
  .upload-image__content {
    min-height: 120px;
    padding: 24px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: $white-smoke;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
