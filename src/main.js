import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
const app = createApp(App)
// Use the router and store
app.use(router);
app.use(store);
app.mount('#app')
