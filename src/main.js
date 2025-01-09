import Vue from 'vue';
import App from './App.vue';
import router from './routes/index';
import 'bootstrap/dist/css/bootstrap.min.css'

// Import Bootstrap JS and Popper.js
import 'jquery'
import 'popper.js'
import 'bootstrap'
Vue.config.productionTip = false



export default new Vue({
  el:'#app',
  router,
   render: h => h(App),
}).$mount('#app')
