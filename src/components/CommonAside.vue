<script setup>
import { computed, ref } from "vue";
import { useAllDataStore } from "@/stores";
import { useRoute, useRouter } from "vue-router";
const list = computed(() => store.state.menuList);
const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
const store = useAllDataStore();
const isCollapse = computed(() => store.state.isCollapse);
const width = computed(() => (store.state.isCollapse ? "64px" : "180px"));

const route = useRoute();
const router = useRouter();
const activeMenu = computed(() => route.path);
const handleMenu = (item) => {
  router.push(item.path);
  store.selectMenu(item);
};
</script>

<template>
  <el-aside :width="width">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <h3 v-show="!isCollapse">通用后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3>
      <el-menu-item
        v-for="(item, index) in noChildren"
        :index="index.toString()"
        :key="item.path"
        @click="handleMenu(item)"
      >
        <component :is="item.icon" class="icons"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="(item, index) in hasChildren"
        :index="index.toString()"
        :key="item.path"
      >
        <template #title>
          <component :is="item.icon" class="icons"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem?.path"
            :key="subItem?.path"
            @click="handleMenu(item)"
          >
            <component :is="subItem.icon" class="icons"></component>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="less">
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100%;
  background-color: #545c64;
}
</style>
