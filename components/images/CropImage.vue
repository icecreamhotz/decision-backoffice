<template>
  <v-dialog
    :value="pDialog"
    width="450"
    @click:outside="$emit('closeDialog')"
  >
    <v-card>
      <v-card-title class="text-h3 justify-center d-flex">
        {{ $t('components.cropImage.title') }}
      </v-card-title>

      <v-card-text class="text-center pb-0">
        <v-row>
          <v-col>
            <vue-croppie
              ref="croppieRef"
              :enable-orientation="true"
              :mouse-wheel-zoom="false"
              :enable-resize="false"
              :viewport="{ width: viewportWidth, height: viewportHeight }"
              :boundary="{ width: boundaryWidth, height: boundaryHeight }"
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
          {{ $t('components.cropImage.cancelButton') }}
        </v-btn>
        <v-btn
          color="primary"
          class="ma-2 text-button"
          @click="crop()"
        >
          {{ $t('components.cropImage.acceptButton') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CropImage',
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
      type: String,
      required: true
    },
    imageHeight: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const croppieRef = ref()
    const boundaryWidth = ref<number>(0)
    const boundaryHeight = ref<number>(0)
    const viewportWidth = ref<number>(0)
    const viewportHeight = ref<number>(0)

    onMounted(() => {
      context.root.$nextTick(() => {
        setTimeout(() => {
          croppieRef.value.bind({
            url: props.pPreviewImage
          })
        }, 500)
      })
    })
    const croppieProps = (): void => {
      viewportWidth.value = +props.imageWidth / 3
      viewportHeight.value = +props.imageHeight / 3
      boundaryWidth.value = viewportWidth.value + 45
      boundaryHeight.value = viewportHeight.value + 45
    }
    croppieProps()

    const crop = () :void => {
      const options = {
        format: props.pType,
        type: 'base64',
        quality: 1,
        size: 'viewport'
      }
      croppieRef.value.result(options, (output: string) => {
        const cropData = croppieRef.value.get()
        const point = cropData.points
        context.emit('update-image', {
          // image: b64toBlob(output),
          preview: output,
          crop: [
            Number(point[2]) - Number(point[0]),
            Number(point[3]) - Number(point[1]),
            Number(point[0]),
            Number(point[1])
          ]
        })
      })
    }

    return {
      croppieRef,
      boundaryWidth,
      boundaryHeight,
      viewportWidth,
      viewportHeight,
      crop
    }
  }
})
</script>

<style>
  @import 'croppie/croppie.css';
</style>
