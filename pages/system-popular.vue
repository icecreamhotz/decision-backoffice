<template>
  <div>
    <CardContainer>
      <CardContent title="สถิติปัญหาที่พบบ่อย">
        <template slot="content">
          <v-row>
            <v-col cols="4">
              <SelectWithValidate
                v-model="problem"
                name="หมวดหมู่ปัญหาที่พบบ่อย"
                label="หมวดหมู่ปัญหาที่พบบ่อย"
                placeholder="หมวดหมู่ปัญหาที่พบบ่อย"
                outlined
                dense
                flat
                text-field="text"
                value-field="value"
                :items="problems"
              />
            </v-col>
          </v-row>
          <div class="system-popular__container mx-auto">
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
      problem: '',
      problems: [],
      chartOptions: {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              try {
                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                return `จำนวนกดเสร็จสิ้น ${value} คน`
              } catch (error) {
                console.log(error)
              }
            }
          }
        },
        plugins: {
          colorschemes: {
            scheme: 'tableau.Tableau20'
          }
        }
      },
      chartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: 'Dataset One',
            data: []
          }
        ]
      },
      isHidden: false
    }
  },
  watch: {
    problem () {
      this.k()
    }
  },
  async mounted () {
    try {
      const categories = await this.$axios.get('/problem-categories?page=1&perPage=99999')
      const data = categories.data.data.data
      if (data.length > 0) {
        this.problems = data.map(d => ({
          text: d.name,
          value: d.id
        }))
        this.problem = this.problems[0].value
        this.k()
      }
    } catch (err) {
      this.$store.commit('alert/show', { type: 'error', message: err })
    }
  },
  methods: {
    async k () {
      this.isHidden = false
      try {
        const dd = await this.$axios.get(`/problems?page=1&perPage=99999&problem_category_id=${this.problem}`)
        const data = dd.data.data.data
        this.chartData.labels = data.map(d => d.title)
        this.chartData.datasets[0].data = data.map(d => d.view)
        this.chartData.datasets[0].backgroundColor = data.map(() => {
          const letters = '0123456789ABCDEF'.split('')
          let color = '#'
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
          }
          return color
        })
        this.isHidden = true
      } catch (err) {
        this.$store.commit('alert/show', { type: 'error', message: err })
      }
    }
  }
}
</script>

<style lang="scss">
.system-popular__container {
  width: 100%;
  max-width: 500px;
}
</style>
