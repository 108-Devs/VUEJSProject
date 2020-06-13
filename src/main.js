import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import { BootstrapDropdown } from 'vue-custom-google-autocomplete'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

Vue.use(VueSweetalert2);
Vue.use(BootstrapDropdown);
