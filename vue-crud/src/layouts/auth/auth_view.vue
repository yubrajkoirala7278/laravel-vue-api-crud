<script setup>
import { useAuthLayoutStore } from "./store";
import { computed } from "vue";
import AuthSidebar from "./auth_sidebar.vue";


const authLayoutStore = useAuthLayoutStore();


const toggle = computed(() => authLayoutStore.toggle);
const rail = computed(() => authLayoutStore.rail);

function toggleDrawer() {
  authLayoutStore.toggleDrawer();
}
function railDrawer(rail) {
  authLayoutStore.railDrawer(rail);
}
</script>

<template>
  <v-app-bar color="primary" title="Legends">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    </template>
    <template v-slot:append>
      <v-btn icon="mdi-logout"></v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer elevation="2" v-model="toggle" :rail="rail">
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      title="Admin"
      subtitle="admin@gmail.com"
      nav
      @click="railDrawer(false)"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="railDrawer(true)"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <auth-sidebar></auth-sidebar>
  </v-navigation-drawer>
  <v-main>
    <v-container fluid>
      <router-view />
      <status-message></status-message>
    </v-container>
  </v-main>
</template>