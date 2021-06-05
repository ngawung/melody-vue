import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import anime from 'animejs';

const app = createApp(App);
app.use(router);

app.config.globalProperties.anime = anime;

app.mount('#app');