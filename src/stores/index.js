import { watch } from "vue";
import { defineStore } from "pinia";
import { ref } from "vue";
function initState() {
  return {
    isCollapse: false,
    tags: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
    menuList: [],
    token: "",
    routerList: [],
  };
}

export const useAllDataStore = defineStore("allData", () => {
  const state = ref(initState());
  watch(
    state,
    (newObj) => {
      if (!newObj.token) return;
      localStorage.setItem("store", JSON.stringify(newObj));
    },
    { deep: true }
  );
  function selectMenu(val) {
    if (val.name === "home") {
      state.value.currentMenu = null;
    } else {
      state.value.currentMenu = val;
      const index = state.value.tags.findIndex(
        (item) => val.name === item.name
      );
      index === -1 ? state.value.tags.push(val) : "";
    }
  }
  function updateTags(tag) {
    const index = state.value.tags.findIndex((item) => item.name === tag.name);
    index > 0 ? state.value.tags.splice(index, 1) : "";
  }
  function updateMenuList(val) {
    state.value.menuList = val;
  }
  function addMenu(router, type) {
    if (type === "refresh") {
      if (JSON.parse(localStorage.getItem("store"))) {
        state.value = JSON.parse(localStorage.getItem("store"));
        state.value.routerList = [];
      } else return;
    }
    const menu = state.value.menuList;
    const module = import.meta.glob("../views/**/*.vue");
    const routeArr = [];
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((val) => {
          let url = `../views/${val.url}.vue`;
          val.component = module[url];
          routeArr.push(...item.children);
        });
      } else {
        let url = `../views/${item.url}.vue`;
        item.component = module[url];
        routeArr.push(item);
      }
    });
    let routers = router.getRoutes();
    routers.forEach((item) => {
      if (
        item.name === "main" ||
        item.name === "login" ||
        item.name === "404"
      ) {
        return;
      } else {
        router.removeRoute(item.name);
      }
    });
    routeArr.forEach((item) => {
      state.value.routerList.push(router.addRoute("main", item));
    });
  }
  function clean() {
    state.value.routerList.forEach((item) => {
      if (item) item(); //有remove方法
    });
    state.value = initState();
    localStorage.removeItem("store");
  }
  return { state, selectMenu, updateTags, updateMenuList, addMenu, clean };
});
