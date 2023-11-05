import { defineStore } from 'pinia';
import { CreateGroupDto, Group, UpdateGroupDto } from '../types/group';
import { useHttp } from '../composables/http';
import { onBeforeMount, reactive, ref } from 'vue';

export const useGroups = defineStore('groups-store', () => {
  const http = useHttp();

  const groups = reactive<Map<string, Group>>(new Map());
  const group = ref<Group | null>(null);

  const getGroups = async () => {
    try {
      const res = await http.get<Group[]>(`/api/groups`);

      for (const group of res.data) {
        groups.set(group.id, group);
      }

      return res.data;
    } catch (err) {}
  };

  const getGroup = async (id: string) => {
    try {
      const res = await http.get<Group>(`/api/groups/${id}`);
      const group = res.data;

      groups.set(group.id, group);

      return group;
    } catch (err) {}
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
      return null;
    }
  };

  const updateGroup = async (id: string, data: UpdateGroupDto) => {
    try {
      const res = await http.patch<Group>(`/api/project-groups/${id}`, data);
      const updatedGroup = res.data;

      groups.set(id, updatedGroup);
      return updatedGroup;
    } catch (err) {
      return null;
    }
  };

  const deleteGroup = async (id: string) => {
    try {
      const res = await http.delete<Group>(`/api/groups/${id}`);
      const deletedGroup = res.data;

      groups.delete(deletedGroup.id);
      return deletedGroup;
    } catch (err) {
      return null;
    }
  };
  //#endregion

  onBeforeMount(async () => {
    await getGroups();
  });

  return {
    groups,
    group,
    getGroups,
    getGroup,
    findGroupPath,
    createGroup,
    updateGroup,
    deleteGroup,
  };
});
