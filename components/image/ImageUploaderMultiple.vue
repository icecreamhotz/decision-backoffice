<template>
  <div>
    <v-row
      class="mt-0 mb-0 d-flex"
    >
      <v-col cols="12" class="pt-0">
        <div class="d-flex w-100 justify">
          <div v-if="title" class="img-title secondary--text">
            {{ title }} <span v-if="isRequired" class="danger--text">*</span>
          </div>
          <div v-if="displayRightTopUpload" class="img-title secondary--text ml-auto">
            ขนาดไฟล์ไม่เกิน 2 MB - รองรับไฟล์ .jpg และ .png <div
              class="d-inline font-weight-black img-upload-text ml-3"
              @click="$refs.image.click()"
            >
              + อัพโหลดรูป
            </div>
          </div>
        </div>
        <div
          :class="`${displayCenterUpload ? 'justify-center d-flex align-center' : 'justify-start'} full-image-preview img-uploader-multiple-container mt-3`"
          @click.prevent="uploadShow"
        >
          <div v-if="displayCenterUpload">
            <div class="text-center upload-image-layout">
              <v-icon class="display-4 mb-3" color="secondary">
                mdi-image-outline
              </v-icon>
              <div class="font-weight-black img-upload-text">
                + อัพโหลดรูป
              </div>
              <small v-if="description != null" class="danger--text">
                {{ description }}
              </small>
            </div>
            <small class="text-md-left text-center danger--text mt-3">
              หมายเหตุ : อัปโหลดรูปภาพที่มีขนาดเท่ากัน เพื่อความสวยงามในการแสดงผล
            </small>
          </div>
          <div v-else>
            <v-row class="mx-auto">
              <v-col
                v-for="(img, idx) in innerPreview"
                :key="`${idx}-${img.image_url}`"
                class="position-relative"
                cols="12"
                sm="6"
                lg="3"
              >
                <div class="preview-multiple-upload-image">
                  <img
                    :src="img.image_url"
                    contain
                    class="mx-auto"
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="danger"
                    class="remove-image-button"
                    @click="removeImage(idx, img.id)"
                  >
                    <v-icon dark>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                v-for="(img, idx) in files"
                :key="idx"
                class="position-relative"
                cols="12"
                sm="6"
                lg="3"
              >
                <div class="preview-multiple-upload-image">
                  <img
                    :src="img.url"
                    contain
                    class="mx-auto"
                  >
                  <v-btn
                    fab
                    dark
                    small
                    color="danger"
                    class="remove-image-button"
                    @click="removeImage(idx, img.id)"
                  >
                    <v-icon dark>
                      mdi-minus
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col cols="12" align="center" justify="center">
        <ValidationProvider ref="imageProvider" v-slot="{ errors }" :name="name" :rules="rules">
          <input
            ref="image"
            type="file"
            class="d-none"
            accept="image/jpeg, image/jpg, image/png"
            multiple="multiple"
            @change="pickedImage($event)"
          >
          <span class="text-danger">{{ errors[0] ? `กรุณาอัปโหลดรูปภาพขนาดน้อยกว่าหรือเท่ากับ 2MB` : '' }}</span>
        </ValidationProvider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'ImageUploaderMultiple',
  components: {
    ValidationProvider
  },
  props: {
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
    description: {
      type: String,
      default: null
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      innerPreview: this.preview,
      deletedId: [],
      errors: [],
      files: [],
      isReadyClickUpload: true
    }
  },
  computed: {
    displayRightTopUpload () {
      return this.files.length > 0 || this.innerPreview.length > 0
    },
    displayCenterUpload () {
      return this.files.length <= 0 && this.innerPreview.length <= 0
    }
  },
  watch: {
    preview (value) {
      this.innerPreview = value
    }
  },
  methods: {
    uploadShow () {
      if (this.files.length <= 0 && this.innerPreview.length <= 0) {
        this.$refs.image.click()
      }
    },
    async pickedImage (e, validate) {
      const { valid } = await this.$refs.imageProvider.validate(e)
      if (valid) {
        const { files } = e.target
        for (let i = 0; i < files.length; i += 1) {
          if (files[i] !== undefined && files[i].name.lastIndexOf('.') > 0) {
            const fr = new FileReader()
            fr.readAsDataURL(files[i])
            fr.addEventListener('load', () => {
              this.files = [...this.files, {
                url: fr.result,
                file: files[i]
              }]
              this.$emit('getFile', this.files)
            })
          }
        }
      }
    },
    removeImage (idx, id = null) {
      if (id) {
        this.deletedId = [...this.deletedId, id]
        this.$emit('onDelete', this.deletedId)
        this.innerPreview = this.innerPreview.filter((_, i) => i !== idx)
      } else {
        this.files.splice(idx, 1)
        this.$emit('getFile', this.files)
      }
      if (this.$refs.image.value) {
        this.$refs.image.value = null
      }
    }
  }
}
</script>
