import { defineStore } from 'pinia';
import {ref} from "vue";

export const useAuthLayoutStore = defineStore('authLayout', () => {
  const toggle = ref(JSON.parse(localStorage.getItem('toggle')) || false);
  const rail = ref(JSON.parse(localStorage.getItem('rail')) || false);
  const returnUrl = ref(null);

  const toggleDrawer = () => {
    toggle.value = !toggle.value;
    localStorage.setItem('toggle', JSON.stringify(toggle.value));
  };

  const railDrawer = (newRail = false) => {
    rail.value = newRail;
    localStorage.setItem('rail', JSON.stringify(rail.value));
  };

  return {
    toggle,
    rail,
    returnUrl,
    toggleDrawer,
    railDrawer,
  };
});