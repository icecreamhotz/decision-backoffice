<template>
  <v-row
    class="mt-0 mb-0 d-flex"
  >
    <v-col cols="12" class="pt-0">
      <div class="cover-image-container">
        <div v-if="title && !isVrImage" class="img-title secondary--text">
          {{ title }} <span v-if="isRequired" class="danger--text">*</span>
        </div>
        <div v-else-if="title && isVrImage" class="img-title secondary--text">
          <v-row>
            <v-col cols="6" class="text-left py-0">
              {{ title }} <span v-if="isRequired" class="danger--text">*</span>
            </v-col>
            <v-col v-if="imageUrl || previewImage" cols="6" class="text-right py-0">
              <span class="img-upload-text" @click="chooseImage">+ อัพโหลดรูป</span>
            </v-col>
          </v-row>
        </div>
        <v-col class="full-image-preview px-0 pb-2">
          <div
            v-if="!isVrImage"
            :class="`${isAvatar ? 'preview-image-avatar' : 'preview-image'} pa-3 mt-0 text-sm-center d-flex align-center justify-center`"
            :style="`width: ${imageContainerWidth}; height: ${imageContainerHeight};`"
            @click="chooseImage"
          >
            <img
              v-if="oldValue && !imageUrl && !previewImage"
              :src="oldValue"
              aspect-ratio="1"
              class="lighten-2"
              max-width="100%"
              max-height="100%"
            >
            <img
              v-else-if="imageUrl || previewImage"
              :src="imageUrl || previewImage"
              aspect-ratio="1"
              class="lighten-2"
              max-width="100%"
              max-height="100%"
            >
            <div v-else class="text-center upload-image-layout">
              <v-icon class="display-4 mb-3" color="secondary">
                mdi-image-outline
              </v-icon>
              <div class="font-weight-black text-center img-upload-text">
                + อัพโหลดรูป
              </div>
            </div>
          </div>
          <div
            v-else-if="isVrImage && !imageUrl && !previewImage"
            :class="`${isAvatar ? 'preview-image-avatar' : 'preview-image'} pa-3 mt-0 text-sm-center d-flex align-center justify-center`"
            @click="chooseImage"
          >
            <div class="text-center upload-image-layout">
              <v-col cols="12" class="text-center">
                <img src="/images/360Icon.png" class="mt-0">
              </v-col>
              <v-col cols="12" class="text-right">
                <span class="img-upload-text">+ อัพโหลดรูป</span>
              </v-col>
            </div>
          </div>
          <div
            v-else
            :class="`${isAvatar ? 'preview-image-avatar' : 'preview-image'} pa-3 mt-0 text-sm-center d-flex align-center justify-center`"
          >
            <client-only v-if="oldValue && oldValue != '' && !imageUrl && !previewImage">
              <Pano v-if="oldValue && oldValue != '' && !imageUrl && !previewImage" :source="oldValue" />
            </client-only>
            <client-only v-else-if="(imageUrl && imageUrl != '') || (previewImage && previewImage != '')">
              <Pano v-if="(imageUrl && imageUrl != '') || (previewImage && previewImage != '')" :source="imageUrl || previewImage" />
            </client-only>
            <div v-else class="text-center upload-image-layout">
              <v-col cols="12" class="text-center py-0">
                <v-icon class="display-4 mb-0" color="secondary">
                  mdi-image-outline
                </v-icon>
              </v-col>
              <v-col cols="12" class="text-center py-0">
                <img src="/images/360Icon.png" class="mt-0">
              </v-col>
            </div>
          </div>
          <small v-if="description != null" class="text-md-left text-center danger--text pl-0 pt-0 pb-3">
            {{ description }}
          </small>
        </v-col>
        <v-row align="center" justify="center">
          <ValidationProvider ref="imageProvider" v-slot="{ errors }" :name="name" :rules="rules">
            <input
              ref="image"
              type="file"
              class="d-none"
              accept="image/jpeg, image/jpg, image/png"
              @change="pickedImage($event)"
            >
            <span class="text-danger">{{ errors[0] ? `กรุณาอัปโหลดรูปภาพ` : '' }}</span>
          </ValidationProvider>
          <CropImage
            v-if="isShowDialog"
            :p-dialog="isShowDialog"
            :p-preview-image="imageUrl"
            :p-type="imageFile.type"
            :image-width="imageWidth"
            :image-height="imageHeight"
            @closeDialog="closeDialog"
            @updateImage="updateImage"
          />
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { Pano } from 'vuejs-vr'
import { ValidationProvider } from 'vee-validate'
import CropImage from '~/components/image/CropImage'

export default {
  name: 'ImageUploader',
  components: {
    CropImage,
    ValidationProvider,
    Pano
  },
  props: {
    notCrop: {
      type: Boolean,
      default: false
    },
    isAvatar: {
      type: Boolean,
      default: false
    },
    isVrImage: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'รูปภาพ'
    },
    title: {
      type: String,
      default: ''
    },
    // ถ้า rules ต้องการตรวจสอบขนาดไฟล์ให้ส่ง kilobyte มา (MEGABYTE * 1024)
    rules: {
      type: String,
      default: 'required|image'
    },
    oldValue: {
      type: null,
      default: null
    },
    previewImage: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    checkContainerWidthHeight: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    innerValue: '',
    errors: [],
    imageName: '',
    imageUrl: '',
    imageFile: '',
    isShowDialog: false,
    env: process.env.SERVICE_URL,
    cropValue: []
  }),
  computed: {
    imageContainerWidth () {
      if ((this.imageWidth < this.imageHeight || this.imageWidth === this.imageHeight) && this.checkContainerWidthHeight) {
        return '19rem'
      }
      return '100%'
    },
    imageContainerHeight () {
      if (this.checkContainerWidthHeight) {
        if (this.imageHeight > this.imageWidth) {
          return '25rem'
        } else if (this.imageWidth === this.imageHeight) {
          return '19rem'
        }
      }
      return '19rem'
    }
  },
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.oldValue) {
      this.innerValue = this.oldValue
    }
  },
  methods: {
    updateImage ({ image, preview, crop }) {
      this.$refs.image.value = null
      this.imageUrl = preview
      this.cropValue = crop
      this.$emit('getFile', { image: this.imageFile, crop: this.cropValue })
      this.isShowDialog = false
    },
    closeDialog () {
      this.$refs.image.value = null
      this.imageUrl = null
      this.innerValue = null
      this.imageFile = null
      this.isShowDialog = false
    },
    chooseImage () {
      this.$refs.image.click()
    },
    async pickedImage (e, validate) {
      const { valid } = await this.$refs.imageProvider.validate(e)
      if (valid) {
        const { files } = e.target
        if (files[0] !== undefined) {
          this.imageName = files[0].name
          if (this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            // eslint-disable-next-line prefer-destructuring
            this.imageFile = files[0]
            if (this.notCrop) {
              this.$emit('getFile', { image: this.imageFile, crop: this.cropValue || [] })
            } else {
              this.isShowDialog = true
            }
          })
        } else {
          this.imageName = null
          this.imageFile = null
          this.imageUrl = null
        }
      }
    }
  }
}
</script>
