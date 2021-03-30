<template>
  <div class="d-flex py-1">
    <img
      :src="thumbnailUrl"
      :width="width"
      :height="height"
      style="cursor: zoom-in;"
      @click="dialog = true"
    >
    <v-dialog
      v-model="dialog"
    >
      <v-carousel
        v-if="images.length > 1"
        v-model="currentImage"
        :show-arrows="images.length > 1"
        :continuous="true"
        hide-delimiters
      >
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="item"
        />
      </v-carousel>
      <img
        v-else
        :src="images[0]"
      >
      <v-col v-if="downloadable" cols="12" class="text-center white">
        <v-btn :loading="btnLoading" large color="primary" class="text--white" @click.prevent="downloadImage(images[currentImage])">
          <v-icon left>
            mdi-cloud-download
          </v-icon> Download
        </v-btn>
      </v-col>
    </v-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver'

export default {
  props: {
    thumbnailUrl: {
      type: String,
      default: 'auto'
    },
    images: {
      type: null,
      required: true
    },
    width: {
      type: null,
      default: 'auto'
    },
    height: {
      type: null,
      default: 'auto'
    },
    downloadable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      currentImage: null,
      imageName: null,
      imageUrl: null,
      btnLoading: false
    }
  },
  methods: {
    downloadImage (url) {
      if (url) {
        this.btnLoading = true
        this.$axios({
          method: 'post',
          url: '/download-image',
          data: {
            url
          }
        }).then((res) => {
          const blob = this.b64toBlob(res.data.content, res.data.mime)
          FileSaver.saveAs(blob, `${this.randomString(8)}.${res.data.type}`)
          this.btnLoading = false
        })
      } else {
        this.$emit('noImage')
      }
    },
    b64toBlob (content, mime) {
      const byteString = atob(content)
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)

      for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mime })
    },
    randomString (length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    }
  }
}
</script>
