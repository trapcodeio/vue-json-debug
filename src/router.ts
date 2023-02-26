import { createRouter, createWebHashHistory } from "vue-router";
import Index from "./views/Index.vue";
import About from "./views/About.vue";
import Compose from "./views/Compose.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", name: "index", component: Index },
  { path: "/about", name: "about", component: About },
  { path: "/compose", name: "compose", component: Compose },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
