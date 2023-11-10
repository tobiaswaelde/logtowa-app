import { defineStore } from 'pinia';
import { useHttp } from '../composables/http';
import { App, CreateAppDto, UpdateAppDto } from '../types/app';
import { useGroupsStore } from './groups';
import { Group } from '../types/group';

export const useAppsStore = defineStore('apps', () => {
  const http = useHttp();
  const { findGroupPath } = useGroupsStore();

  const findProjectPath = (project: App): (Group | App)[] | null => {
    const groupPath = findGroupPath(project.group.id);
    return [...groupPath, project];
  };

  //#region CRUD
  const createApp = async (data: CreateAppDto) => {
    try {
      const res = await http.post<App>(`/api/apps`, data);
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  const updateApp = async (id: string, data: UpdateAppDto) => {
    try {
      const res = await http.patch<App>(`/api/apps/${id}`, data);
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  const deleteApp = async (id: string) => {
    try {
      const res = await http.delete<App>(`/api/apps/${id}`);
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  //#endregion

  return {
    findProjectPath,
    createApp,
    updateApp,
    deleteApp,
  };
});
