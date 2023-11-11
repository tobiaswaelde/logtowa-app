import { defineStore } from 'pinia';
import { useHttp } from '../composables/http';
import { App, CreateAppDto, UpdateAppDto } from '../types/app';
import { useGroupsStore } from './groups';
import { Group } from '../types/group';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.VITE_DEBUG_LOADING_DELAY);

export const useAppsStore = defineStore('apps', () => {
  const http = useHttp();
  const { findGroupPath } = useGroupsStore();

  const findAppPath = (app: App): (Group | App)[] | null => {
    const groupPath = findGroupPath(app.group.id);
    return [...groupPath, app];
  };

  const getApp = async (id: string) => {
    try {
      const res = await http.get<App>(`/api/apps/${id}`);

      DELAY && (await wait(DELAY));

      return res.data;
    } catch (err) {
      return null;
    }
  };

  //#region CRUD
  const createApp = async (data: CreateAppDto) => {
    const res = await http.post<App>(`/api/apps`, data);
    DELAY && (await wait(DELAY));
    return res.data;
  };
  const updateApp = async (id: string, data: UpdateAppDto) => {
    const res = await http.patch<App>(`/api/apps/${id}`, data);
    DELAY && (await wait(DELAY));
    return res.data;
  };
  const deleteApp = async (id: string) => {
    const res = await http.delete<App>(`/api/apps/${id}`);
    DELAY && (await wait(DELAY));
    return res.data;
  };
  //#endregion

  return {
    findAppPath,
    getApp,
    createApp,
    updateApp,
    deleteApp,
  };
});
