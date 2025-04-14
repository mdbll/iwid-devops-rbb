import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";

const app = createApp(App);

Amplify.configure(config);

app.use(createPinia());
app.use(router);

app.mount("#app");
