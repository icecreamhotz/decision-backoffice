<template>
  <div>
    <v-dialog
      v-model="pDialog"
      @click:outside="$emit('closeDialog')"
    >
      <v-card>
        <v-card-title class="text-menu justify-center d-flex">
          ปรับขนาดภาพ
        </v-card-title>

        <v-card-text class="text-center pb-0">
          <v-row>
            <v-col>
              <vue-croppie
                ref="croppieRef"
                :enable-orientation="true"
                :mouse-wheel-zoom="false"
                :enable-resize="false"
                :viewport="{
                  width: viewportWidth,
                  height: viewportHeight
                }"
                :boundary="{
                  width: boundaryWidth,
                  height: boundaryHeight
                }"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            outlined
            color="primary lighten-1"
            class="ma-2 text-button"
            @click="$emit('closeDialog')"
          >
            ยกเลิก
          </v-btn>
          <v-btn
            color="primary"
            class="ma-2 text-button"
            @click="crop()"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    pDialog: {
      type: Boolean,
      default: false
    },
    pPreviewImage: {
      type: String,
      default: ''
    },
    pType: {
      type: String,
      default: ''
    },
    imageWidth: {
      type: Number,
      required: true
    },
    imageHeight: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      boundaryWidth: null,
      boundaryHeight: null,
      viewportWidth: null,
      viewportHeight: null
    }
  },
  created () {
    this.croppieProps()
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.croppieRef.bind({
          url: this.pPreviewImage
        })
      }, 500)
    })
  },
  methods: {
    crop () {
      const options = {
        format: this.pType,
        type: 'base64',
        quality: 1,
        size: 'viewport'
      }
      this.$refs.croppieRef.result(options, (output) => {
        const cropData = this.$refs.croppieRef.get()
        const point = cropData.points
        this.$emit('updateImage', {
          image: this.b64toBlob(output),
          preview: output,
          crop: [
            Number(point[2]) - Number(point[0]),
            Number(point[3]) - Number(point[1]),
            Number(point[0]),
            Number(point[1])
          ]
        })
      })
    },
    b64toBlob (dataURI) {
      const byteString = atob(dataURI.split(',')[1])
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)

      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: this.pType })
    },
    croppieProps () {
      if (this.imageWidth > 1500 && this.$vuetify.breakpoint.mdAndUp) {
        this.viewportWidth = this.imageWidth / 5.5
        this.viewportHeight = this.imageHeight / 5.5
        this.boundaryWidth = this.viewportWidth + 15
        this.boundaryHeight = this.viewportHeight + 15
      } else if (this.imageWidth > 1500 && this.$vuetify.breakpoint.xs) {
        this.viewportWidth = this.imageWidth / 6.79
        this.viewportHeight = this.imageHeight / 6.79
        this.boundaryWidth = this.viewportWidth + 15
        this.boundaryHeight = this.viewportHeight + 15
      } else {
        this.viewportWidth = this.imageWidth / 3
        this.viewportHeight = this.imageHeight / 3
        this.boundaryWidth = this.viewportWidth + 45
        this.boundaryHeight = this.viewportHeight + 45
      }
    }
  }
}
</script>

<style>
  @import 'croppie/croppie.css';
</style>
