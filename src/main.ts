import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { useDebugPlugin } from "./components/debug/plugin";
import "./assets/debug.css";
import RouterInfo from "./components/debug/docks/RouterInfo.vue";

const app = createApp(App);

// Mimic router data
app.config.globalProperties.$route = { name: "IndexPage" };

useDebugPlugin(app, {
  // defaultDebugTheme: "dark",
  registerDebugComponent: true,
  components: {
    after: {
      RouterInfo,
    },
  },
});

app.mount("#app");
