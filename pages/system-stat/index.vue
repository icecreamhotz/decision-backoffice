<template>
  <div>
    <CardContainer>
      <CardContent title="สถิติความถึงพอใจระบบ">
        <template slot="content">
          <div class="system-stat__container mx-auto">
            <PieChart v-if="isHidden" :data="chartData" :options="chartOptions" />
          </div>
        </template>
      </CardContent>
    </CardContainer>
  </div>
</template>

<script>
export default {
  data () {
    return {
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

                label += Number((value / sum) * 100).toFixed(2) + '%'
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
  async mounted () {
    try {
      const report = await this.$axios.get('/reports/system-score')
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
</script>

<style lang="scss">
.system-stat__container {
  width: 100%;
  max-width: 400px;
}
</style>
