import { createApp, defineComponent } from "vue";
import "./style.css";
import App from "./App.vue";
import { useDebugPlugin } from "./components/debug/plugin";
import "./assets/debug.css";

const app = createApp(App);

const AppSlogan = defineComponent({
  template: `<small>Debug Plugin The Second</small>`,
});

useDebugPlugin(app, {
  registerDebugComponent: true,
  components: {
    before: {},
    after: {
      AppSlogan,
    },
  },
});

app.mount("#app");
