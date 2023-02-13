import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import { useDebugPlugin} from "./components/debug/vue";

const app = createApp(App);

useDebugPlugin(app, {
    registerComponent: true
})

app.mount('#app')
