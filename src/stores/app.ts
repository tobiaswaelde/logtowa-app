export const useAppStore = defineStore('app-store', () => {
  const drawerOpen = ref<boolean>(false);
  const loading = ref<boolean>(false);

  const toggleDrawer = () => {
    drawerOpen.value = !drawerOpen.value;
  };

  return { drawerOpen, toggleDrawer, loading };
});
