import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const drawerOpen = ref<boolean>(false);

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value;
  };

  return { drawerOpen, toggleDrawer };
});
