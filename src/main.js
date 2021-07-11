import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import anime from 'animejs';
import fm from "front-matter";
import marked from "marked";
import axios from "axios";

import MelodyAPI from './utils/MelodyAPI';
import manifest from "./manifest.json";

// CONFIG

const API_URL = "http://localhost:8888/"


const app = createApp(App);
app.use(router);

// app.config.globalProperties.anime = anime;
app.config.globalProperties.fm = fm;
app.config.globalProperties.marked = marked;
app.config.globalProperties.axios = axios;
app.config.globalProperties.api = new MelodyAPI(API_URL);


app.config.globalProperties.manifest = manifest;

app.mount('#app');