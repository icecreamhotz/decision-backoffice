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
      default-view="dayGridMonth"
      :plugins="calendarPlugins"
      :long-press-delay="0"
      :weekends="true"
      :selectable="true"
      :header="{
        left: '',
        right: ''
      }"
      :events="[
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01',
          end: '2021-05-03'
        },
        {
          title: 'All Day Event',
          description: 'description for All Day Event',
          start: '2021-05-01'
        }
      ]"
      unselect-auto
      @eventRender="eventRender"
      @select="select"
    />
  </div>
</template>

<script>
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

export default {
  props: {
    pRef: {
      type: String,
      required: true
    },
    events: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      month: ''
    }
  },
  mounted () {
    this.month = this.$dayjs(this.$refs[this.pRef].getApi().getDate()).format('MMMM YYYY')
  },
  methods: {
    onPrevMount () {
      this.$refs[this.pRef].getApi().prev()
      console.log(this)
      // this.month = this.$thaiMonthYear(this.$refs[this.pRef].getApi().getDate())
    },
    onNextMount () {
      this.$refs[this.pRef].getApi().next()
      console.log(this)
      // this.month = this.$thaiMonthYear(this.$refs[this.pRef].getApi().getDate())
      // const data = this.$refs[this.pRef].getApi().view
      // this.$emit('fetch-data', moment(data.activeStart), moment(data.activeEnd))
    },
    select (data) {
      console.log(data)
    },
    eventRender (elem) {
      tippy(elem.el, {
        content: 'My tooltip!'
      })
    }
  }
}
</script>
