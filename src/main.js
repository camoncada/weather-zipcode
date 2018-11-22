import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import VueGoogleCharts from 'vue-google-charts'
export const serverBus = new Vue();

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(SuiVue)
Vue.use(VueGoogleCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
