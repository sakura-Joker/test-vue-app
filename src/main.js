import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/less/index.less";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import api from "./api/api";
import "@/api/mock.js";
import { useAllDataStore } from "@/stores";
function isRoute(to) {
  const res = router.getRoutes();
  let resFil = res.filter((item) => item.path === to.path);
  return resFil.length > 0;
}
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
const pinia = createPinia();
app.config.globalProperties.$api = api;
app.use(router);
app.use(pinia);
const store = useAllDataStore();
router.beforeEach((to, from) => {
  if (to.path !== "/login" && !store.state.token) {
    console.log(111);
    
    return { name: "login" };
  }
  if (!isRoute(to)) {
    console.log(222);
    return { name: "404" };
  }
});
store.addMenu(router, "refresh");
app.use(ElementPlus);
app.mount("#app");
