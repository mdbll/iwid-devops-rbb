import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'

const app = createApp(App);

const pinia = createPinia();

Amplify.configure(config);

app.use(pinia);
app.use(router);
app.use(PrimeVue, { theme: { preset : Aura } });

app.mount("#app");