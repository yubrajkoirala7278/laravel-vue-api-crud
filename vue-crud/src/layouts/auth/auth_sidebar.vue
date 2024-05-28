<script setup>
import {sidebarRoutes} from './routes';
</script>

<template>
  <v-list density="compact" nav>
    <v-list-item
      v-for="route in sidebarRoutes"
      :key="route.title"
      :prepend-icon="route.icon"
      :title="route.title"
      :value="route.value"
      :to="{ name: route.pathName }"
    ></v-list-item>
  </v-list>
</template>