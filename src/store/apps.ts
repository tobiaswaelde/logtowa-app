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

  const findProjectPath = (project: App): (Group | App)[] | null => {
    const groupPath = findGroupPath(project.group.id);
    return [...groupPath, project];
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
    try {
      const res = await http.post<App>(`/api/apps`, data);
      DELAY && (await wait(DELAY));
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  const updateApp = async (id: string, data: UpdateAppDto) => {
    try {
      const res = await http.patch<App>(`/api/apps/${id}`, data);
      DELAY && (await wait(DELAY));
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  const deleteApp = async (id: string) => {
    try {
      const res = await http.delete<App>(`/api/apps/${id}`);
      DELAY && (await wait(DELAY));
      return res.data;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  //#endregion

  return {
    findProjectPath,
    getApp,
    createApp,
    updateApp,
    deleteApp,
  };
});
