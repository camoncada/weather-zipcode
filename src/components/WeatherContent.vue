<template>
  <div is="sui-container" v-if="weatherData.city">
    <sui-segment id="weatherContent">
      <sui-card>
        <sui-card-content >
          <sui-card-header><sui-icon name="map marker alternate"/>{{ weatherData.city.name }}</sui-card-header>
          <sui-divider />
          <sui-card-meta><sui-icon name="flag"/> {{ weatherData.city.country }}</sui-card-meta>
        </sui-card-content>
      </sui-card>
      <sui-divider />
      <sui-accordion exclusive styled fluid>
        <div v-for="list in weatherData.list" :key="list.id">
          <sui-accordion-title>
          <TimeFormarter :date="list.dt_txt"/>
          </sui-accordion-title>
          <sui-accordion-content>
            <sui-statistics-group>
              <sui-statistic in-group>
                <sui-statistic-label>Temperature:</sui-statistic-label>
                <sui-statistic-value>{{ list.main.temp }} °C</sui-statistic-value>
              </sui-statistic>
              <sui-statistic in-group>
                <sui-statistic-label>Humidity</sui-statistic-label>
                <sui-statistic-value>{{ list.main.humidity }} %</sui-statistic-value>
              </sui-statistic>
              <sui-statistic in-group>
                <sui-statistic-label>Wind speed</sui-statistic-label>
                <sui-statistic-value>{{ list.wind.speed}} m/s</sui-statistic-value>
              </sui-statistic>
            </sui-statistics-group>
            <sui-divider />
            <sui-list>
              <sui-list-item><strong>Weather: </strong>{{ list.weather[0].description}}</sui-list-item>
              <sui-list-item><strong>Pressure: </strong>{{ list.main.pressure }} mb</sui-list-item>
              <sui-list-item><strong>Sea level: </strong>{{ list.main.sea_level }} meters</sui-list-item>
            </sui-list>
          </sui-accordion-content>
        </div>
      </sui-accordion>
    </sui-segment>
    <sui-segment id="weatherGraph">
      <sui-button primary content="Show graph" icon="chart line" label-position="right" @click="createChart"/>
      <div v-if="showGraph">
        <GChart type="LineChart" :data="chartData" :options="chartOptions"/>
      </div>
    </sui-segment>   
  </div>

</template>
<script>
import axios from 'axios'
import { serverBus } from '../main.js'
import TimeFormarter from './shared/TimeFormarter.vue'

export default {
  name: 'WeatherContent',
  components: {
    TimeFormarter
  },
  data () {
    return {
      weatherData: [],
      errors: [],
      zipCode: null,
      showGraph: false,
      chartData: null,
      chartOptions: {
          chart: {
            title: 'Historical weather'
          }
        }
    }
  },
  created () {
    serverBus.$on('sendZipCode', (zipCode) => {
      this.zipCode = zipCode
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?zip=${this.zipCode},us&APPID=eac5638b19da66da84291312335ae8c4&units=metric`)
      .then(response => {
        this.weatherData = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    })
  },
  methods: {
    createChart () {
      this.showGraph = true
      this.chartData = [['Date', 'temperature', 'humidity']]
      for (const w in this.weatherData.list) {
        this.chartData.push([this.weatherData.list[w].dt_txt, this.weatherData.list[w].main.temp, this.weatherData.list[w].main.humidity])
      }
    }
  }
} 
</script>
<style scoped>
  #weatherContent {
    margin-top: 15px;
  }
  #weatherGraph {
    margin-bottom: 15px;
  }
  @media only screen and (max-width: 480px) {
    .statistic {
      width: 100%;
    }
    .list {
      text-align: center;
    }
  }
</style>
