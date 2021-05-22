<template>
  <div>
    <CardContainer>
      <CardContent title="สถิติความถึงพอใจระบบ">
        <template slot="content">
          <v-row>
            <v-col cols="12" md="3">
              <SelectWithValidate
                v-model="year"
                name="ปี"
                label="ปี"
                placeholder="ปี"
                outlined
                dense
                flat
                text-field="text"
                value-field="value"
                :items="Array(2030 - 2010 + 1).fill().map((_, idx) => ({
                  text: 2010 + idx,
                  valie: 2010 + idx
                }))"
              />
            </v-col>
            <v-col cols="12">
              <div class="system-stat__container mx-auto">
                <PieChart v-if="isHidden" :data="chartData" :options="chartOptions" />
              </div>
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: 2021,
      chartOptions: {
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              try {
                let label = ' ' + data.labels[tooltipItem.index] || ''

                if (label) {
                  label += ': '
                }

                const sum = data.datasets[0].data.reduce((accumulator, curValue) => {
                  return accumulator + curValue
                })
                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                const checkkIsZero = value > 0 && sum > 0
                label += checkkIsZero ? (value / sum) * 100 + '%' : '0%'
                return label
              } catch (error) {
                console.log(error)
              }
            }
          }
        }
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['1 คะแนน', '2 คะแนน', '3 คะแนน', '4 คะแนน', '5 คะแนน'],
        datasets: [
          {
            label: 'Dataset One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#fbe90f', '#280ffb'],
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      isHidden: false
    }
  },
  watch: {
    year () {
      this.fetchData()
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const report = await this.$axios.get(`/reports/system-score?year=${this.year}`)
        const one = report.data.data.filter(d => d.score === 1)
        const two = report.data.data.filter(d => d.score === 2)
        const three = report.data.data.filter(d => d.score === 3)
        const four = report.data.data.filter(d => d.score === 4)
        const five = report.data.data.filter(d => d.score === 5)
        this.chartData.datasets[0].data = [one.length, two.length, three.length, four.length, five.length]
        this.isHidden = true
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    }
  }
}
</script>

<style lang="scss">
.system-stat__container {
  width: 100%;
  max-width: 400px;
}
</style>
