import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { useDebugPlugin } from "./components/debug/plugin";
import "./assets/debug.css";

const app = createApp(App);

useDebugPlugin(app, {
  // defaultDebugTheme: "dark",
  registerDebugComponent: true,
});

app.mount("#app");
