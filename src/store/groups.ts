import { Group } from '@/types/group';
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

  const getGroup = async (parentId: string) => {
    try {
      const res = await http.get<Group>(`/api/groups/${parentId}`);

      DELAY && (await wait(DELAY));

      groups.set(parentId, res.data);

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

  return {
    loading,
    groups,
    getGroups,
    findGroupPath,
    getGroup,
  };
});
