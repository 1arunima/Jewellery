import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
 import router from './Routers/Router'
 ;
// import * as TablerIconsVue from '@tabler/icons-vue';
import '@mdi/font/css/materialdesignicons.css'
//Vuetify

import 'vuetify/styles'

import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


 const vuetify = createVuetify({
    components,
    directives
 })




// createApp(App).mount('#app')
const pinia =createPinia()
const app =createApp(App)
// app.use(createPinia())
app.use(router)
app.use(pinia)
app.use(vuetify)
app.mount('#app');
