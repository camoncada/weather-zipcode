<template>
  <div>
    <MainMenu/>
    <ZipCodeForm/>
    <WeatherContent/>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import ZipCodeForm from './components/ZipCodeForm.vue'
import WeatherContent from './components/WeatherContent.vue'

export default {
  name: 'app',
  components: {
    MainMenu,
    ZipCodeForm,
    WeatherContent
  }
}
</script>

<style>
</style>
