<template>
  <div>
    <v-row class="my-0">
      <v-col cols="12" class="py-0">
        <div class="autocomplete-container">
          <gmap-autocomplete
            class="custom-gmap-place-autocomplete"
            :placeholder="placeholder"
            @place_changed="setPlace"
          />
          <v-btn
            icon
            class="text-gray-color"
            x-small
            disabled
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="pt-0 spacing-8">
        <gmap-map
          :center="centerLatLng"
          :zoom="15"
          :options="{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }"
          style="height: 250px;"
        >
          <gmap-marker
            v-if="marker"
            :position="marker.position"
            :clickable="true"
            :draggable="true"
            @drag="updateMarker"
            @click="centerLatLng = marker.position"
          />
        </gmap-map>
        <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
          <input v-model="marker" type="hidden">
          {{ errors[0] }}
        </ValidationProvider>
      </v-col>
    </v-row>
    <div>
      <span v-if="marker.position" class="text-h5 primary--text">[{{ marker.position.lat }}, {{ marker.position.lng }}]</span>
      <span v-else class="text-h5 primary--text">[{{ centerLatLng.lat }}, {{ centerLatLng.lng }}]</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import { DEFAULT_LAT_LNG } from '~/assets/constants/variables/business'

export default defineComponent({
  props: {
    value: {
      type: Object as () => ({
        lat: number,
        lng: number
    }),
      default: () => ({ lat: DEFAULT_LAT_LNG.lat, lng: DEFAULT_LAT_LNG.lng })
    },
    center: {
      type: Object as () => ({
      lat: number,
      lng: number
    }),
      default: () => ({ lat: DEFAULT_LAT_LNG.lat, lng: DEFAULT_LAT_LNG.lng })
    },
    name: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup (props, {
    emit
  }) {
    const centerLatLng = ref<{
      lat: number,
      lng: number
    }>(props.center)
    const marker = ref<{
      position: {
        lat: number,
        lng: number
      }
    }>({
      position: props.value
    })
    const isIgnoreUpdateCurrent = ref<boolean>(false)

    watch(() => props.value, (val) => {
      marker.value.position = val
    })

    watch(() => props.center, (val) => {
      centerLatLng.value = val
      isIgnoreUpdateCurrent.value = true
    })

    const getCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!isIgnoreUpdateCurrent.value) {
          marker.value.position = centerLatLng.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      })
    }

    const updateMarker = (location: any, place: boolean = false) => {
      let lat = 0
      let lng = 0
      if (place) {
        lat = location.geometry.location.lat()
        lng = location.geometry.location.lng()
        updateCenter(lat, lng)
      } else {
        lat = location.latLng.lat()
        lng = location.latLng.lng()
      }
      updateMarkerPosition(lat, lng)
    }

    const updateMarkerPosition = (lat: number, lng: number) => {
      marker.value.position = {
        lat,
        lng
      }
      emit('input', marker.value.position)
    }

    const updateCenter = (lat: number, lng: number) => {
      centerLatLng.value = {
        lat,
        lng
      }
    }

    const setPlace = (place: any) => {
      updateMarker(place, true)
    }

    if (!marker.value.position.lat && !marker.value.position.lng) {
      getCurrentPosition()
    } else {
      centerLatLng.value = marker.value.position
    }

    return {
      centerLatLng,
      marker,
      setPlace,
      updateMarker
    }
  }
})
</script>

<style lang="scss">
.custom-gmap-place-autocomplete {
  border: 1px solid rgba(0, 0, 0, 0.36);
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  padding: 0 12px;
  min-height: 35px;
  &:focus {
    outline: none;
    border: 2px solid $primary !important;
  }
}
.custom-gmap-place-autocomplete::placeholder {
  font-size: 16px !important;
  font-weight: 300;
  letter-spacing: 0.03125em !important;
  line-height: 21px;
  font-family: "Kanit" !important;
}
.vue-map {
  border-radius: 10px;
  width: 100%;
}
.autocomplete-container {
  position: relative;
  button {
    position: absolute;
    right: 10px;
    bottom: 7px;
  }
}
</style>
