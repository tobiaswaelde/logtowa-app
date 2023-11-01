import { useGroups } from './groups';
import { CreateAppDto, App, UpdateAppDto } from '../types/app';
import { useHttp } from '../composables/http';
import { Group } from '../types/group';

export const useApps = defineStore('apps-store', () => {
  const http = useHttp();
  const { findGroupPath } = useGroups();

  const app = ref<App | null>(null);

  const findProjectPath = (project: App): (Group | App)[] | null => {
    const groupPath = findGroupPath(project.group.id);
    return [...groupPath, project];
  };

  const getApp = async (id: string) => {
    try {
      const res = await http.get<App>(`/api/apps/${id}`);
      app.value = res.data;
    } catch (err) {
      app.value = null;
    }
  };

  const createApp = async (data: CreateAppDto) => {
    try {
      const res = await http.post<App>(`/api/apps`, data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const updateApp = async (id: string, data: UpdateAppDto) => {
    try {
      const res = await http.patch<App>(`/api/apps/${id}`, data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const deleteApp = async (id: string) => {
    try {
      const res = await http.delete<App>(`/api/apps/${id}`);
      const deletedApp = res.data;

      return deletedApp;
    } catch (err) {
      return null;
    }
  };

  return {
    app,
    findProjectPath,
    getApp,
    createApp,
    updateApp,
    deleteApp,
  };
});
