<template>
  <div>
    <v-row>
      <v-col class="py-0 text-medium" cols="6">
        {{ month }}
      </v-col>
      <v-col class="py-0 text-right" cols="6">
        <v-btn icon @click="onPrevMount">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon @click="onNextMount">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <full-calendar
      :ref="pRef"
      :editable="true"
      default-view="dayGridMonth"
      :plugins="calendarPlugins"
      :long-press-delay="0"
      :weekends="true"
      :selectable="true"
      :header="{
        left: '',
        right: ''
      }"
      :events="events"
      unselect-auto
      @eventRender="eventRender"
      @select="select"
      @eventDrop="eventDrop"
      @eventResize="eventResize"
      @eventClick="eventClick"
    />
    <EventFormModalComponent
      v-model="eventFormModalValue"
      :p-id="pId"
      :is-edit="isEdit"
      @submit="submit"
      @delete="deleteEvent"
    />
  </div>
</template>

<script>
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export default {
  data () {
    return {
      pRef: 'eventCalendar',
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      eventFormModalValue: false,
      month: '',
      start: '',
      end: '',
      events: [],
      pId: 0,
      isEdit: false
    }
  },
  watch: {
    eventFormModalValue (value) {
      if (!value) {
        this.start = ''
        this.end = ''
        this.isEdit = false
        this.pId = 0
      }
    }
  },
  mounted () {
    this.month = this.$dayjs(this.$refs[this.pRef].getApi().getDate()).add(543, 'years').format('MMMM YYYY')
    this.fetchEvents()
  },
  methods: {
    async fetchEvents () {
      try {
        const events = await this.$axios.get('/events')
        this.events = events.data.data.map(d => ({
          title: d.title,
          description: d.description,
          start: this.$dayjs(d.start).format('YYYY-MM-DD'),
          end: this.$dayjs(d.end).format('YYYY-MM-DD'),
          id: d.id
        }))
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    },
    onPrevMount () {
      this.$refs[this.pRef].getApi().prev()
      this.month = this.$dayjs(this.$refs[this.pRef].getApi().getDate()).add(543, 'years').format('MMMM YYYY')
    },
    onNextMount () {
      this.$refs[this.pRef].getApi().next()
      this.month = this.$dayjs(this.$refs[this.pRef].getApi().getDate()).add(543, 'years').format('MMMM YYYY')
      // const data = this.$refs[this.pRef].getApi().view
      // this.$emit('fetch-data', moment(data.activeStart), moment(data.activeEnd))
    },
    select (data) {
      this.start = data.startStr
      this.end = data.endStr
      this.eventFormModalValue = true
    },
    eventRender (elem) {
      tippy(elem.el, {
        content: elem.event.extendedProps.description
      })
    },
    async submit (name, description) {
      try {
        if (this.isEdit) {
          await this.$axios.put(`/events/${this.pId}`, {
            title: name,
            description,
            start: this.$dayjs(this.start).format('YYYY-MM-DDTHH:mm:ss+07:00'),
            end: this.$dayjs(this.end).format('YYYY-MM-DDTHH:mm:ss+07:00')
          })
        } else {
          await this.$axios.post('/events', {
            title: name,
            description,
            start: this.$dayjs(this.start).format('YYYY-MM-DDTHH:mm:ss+07:00'),
            end: this.$dayjs(this.end).format('YYYY-MM-DDTHH:mm:ss+07:00')
          })
        }
        this.eventFormModalValue = false
        this.fetchEvents()
        this.$store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    },
    async eventDrop (info) {
      try {
        await this.$axios.put(`/events/${info.event.id}/date`, {
          start: this.$dayjs(info.event.start).format('YYYY-MM-DDTHH:mm:ss+07:00'),
          end: this.$dayjs(info.event.end).format('YYYY-MM-DDTHH:mm:ss+07:00')
        })
        this.fetchEvents()
        this.$store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    },
    async eventResize (info) {
      try {
        await this.$axios.put(`/events/${info.event.id}/date`, {
          start: this.$dayjs(info.event.start).format('YYYY-MM-DDTHH:mm:ss+07:00'),
          end: this.$dayjs(info.event.end).format('YYYY-MM-DDTHH:mm:ss+07:00')
        })
        this.fetchEvents()
        this.$store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    },
    eventClick (info) {
      this.isEdit = true
      this.pId = +info.event.id
      this.eventFormModalValue = true
      this.start = this.$dayjs(info.event.start).format('YYYY-MM-DD')
      this.end = this.$dayjs(info.event.end).format('YYYY-MM-DD')
    },
    async deleteEvent () {
      try {
        await this.$axios.delete(`/events/${this.pId}`)
        this.eventFormModalValue = false
        this.fetchEvents()
        this.$store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    }
  }
}
</script>
