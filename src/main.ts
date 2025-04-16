import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";

const app = createApp(App);

const pinia = createPinia();

Amplify.configure(config);

app.use(pinia);
app.use(router);

app.mount("#app");
