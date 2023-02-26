import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { useDebugPlugin } from "./components/debug/plugin";
import "./assets/debug.css";
import RouterInfo from "./components/debug/docks/RouterInfo.vue";
import router from "./router";

const app = createApp(App);
app.use(router);

useDebugPlugin(app, {
  // defaultDebugTheme: "dark",
  registerDebugComponent: true,
  components: {
    after: { RouterInfo },
  },
});

app.mount("#app");
