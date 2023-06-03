// import './assets/main.css'
import router from './router';

import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/dist/vuetify.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});


const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
