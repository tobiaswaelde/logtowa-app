import { CreateGroupDto, Group, UpdateGroupDto } from '@/types/group';
import { useHttp } from '@/composables/http';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { wait } from 'run-in-sequence';

const DELAY = Number(import.meta.env.VITE_DEBUG_LOADING_DELAY);

export const useGroupsStore = defineStore('groups', () => {
  const http = useHttp();

  const groups = reactive<Map<string, Group>>(new Map());
  const loading = ref<boolean>(false);

  const getGroups = async () => {
    loading.value = true;
    try {
      const res = await http.get<Group[]>(`/api/groups`);

      for (const group of res.data) {
        groups.set(group.id, group);
      }

      DELAY && (await wait(DELAY));

      return res.data;
    } catch (err) {
      return [];
    } finally {
      loading.value = false;
    }
  };

  const getGroup = async (id: string) => {
    try {
      const res = await http.get<Group>(`/api/groups/${id}`);

      DELAY && (await wait(DELAY));

      groups.set(id, res.data);

      return res.data;
    } catch (err) {
      return null;
    }
  };

  const findGroupPath = (id: string): Group[] => {
    const path: Group[] = [];

    const currentGroup = groups.get(id);
    if (currentGroup) {
      const parentId = currentGroup.parent?.id;
      if (parentId) {
        const parentPath = findGroupPath(parentId);
        return [...parentPath, currentGroup];
      } else {
        return [currentGroup];
      }
    }

    return path;
  };

  //#region CRUD
  const createGroup = async (data: CreateGroupDto) => {
    try {
      const res = await http.post<Group>(`/api/groups`, data);
      const createdGroup = res.data;

      groups.set(createdGroup.id, createdGroup);
      return createdGroup;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  const updateGroup = async (id: string, data: UpdateGroupDto) => {
    try {
      const res = await http.patch<Group>(`/api/groups/${id}`, data);
      const updatedGroup = res.data;

      groups.set(updatedGroup.id, updatedGroup);
      return updatedGroup;
    } catch (err) {
      throw new Error('Something went wrong.');
    }
  };
  //#endregion

  return {
    loading,
    groups,
    getGroups,
    findGroupPath,
    getGroup,
    // crud
    createGroup,
    updateGroup,
  };
});
