<script setup>
import { displayMessage } from "@/utils";
import DefaultView from "./auth_view.vue";
</script>

<template>
  <v-app>
    <default-view />
     <!-- display success and error msg -->
     <v-snackbar v-model="displayMessage.snackbar"  v-if="displayMessage.message"  :timeout="2000" rounded="pill" :color="displayMessage.color"
        location="end bottom" 
          min-width="auto"
          min-height="auto"

        >
           <p class="text-center px-3">{{ displayMessage.message }}</p> 
        </v-snackbar>
  </v-app>
</template>