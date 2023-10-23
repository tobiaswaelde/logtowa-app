import {
  CreateProjectGroupDto,
  ProjectGroup,
  UpdateProjectGroupDto,
} from '../types/project-group';

export const useProjectGroups = defineStore('project-groups-store2', () => {
  const http = useHttp();
  const route = useRoute();

  const projectGroups = reactive<Map<string, ProjectGroup>>(new Map());
  const projectGroup = ref<ProjectGroup | null>(null);

  const getProjectGroups = async () => {
    try {
      const res = await http.get<ProjectGroup[]>(`/api/project-groups`);
      const groups = res.data;

      for (const group of groups) {
        projectGroups.set(group.id, group);
      }

      return groups;
    } catch (err) {}
  };

  const getProjectGroup = async (id: string) => {
    try {
      const res = await http.get<ProjectGroup>(`/api/project-groups/${id}`);
      const group = res.data;

      projectGroups.set(group.id, group);

      return group;
    } catch (err) {}
  };

  const findGroupPath = (id: string): ProjectGroup[] => {
    const path: ProjectGroup[] = [];

    const currentGroup = projectGroups.get(id);
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
  const createProjectGroup = async (data: CreateProjectGroupDto) => {
    try {
      const res = await http.post<ProjectGroup>(`/api/project-groups`, data);
      const createdGroup = res.data;

      projectGroups.set(createdGroup.id, createdGroup);
      return createdGroup;
    } catch (err) {
      return null;
    }
  };

  const updateProjectGroup = async (
    id: string,
    data: UpdateProjectGroupDto,
  ) => {
    try {
      const res = await http.patch<ProjectGroup>(
        `/api/project-groups/${id}`,
        data,
      );
      const updatedGroup = res.data;

      projectGroups.set(id, updatedGroup);
      return updatedGroup;
    } catch (err) {
      return null;
    }
  };

  const deleteProjectGroup = async (id: string) => {
    try {
      const res = await http.delete<ProjectGroup>(`/api/project-groups/${id}`);
      const deletedGroup = res.data;

      projectGroups.delete(deletedGroup.id);
      return deletedGroup;
    } catch (err) {
      return null;
    }
  };
  //#endregion

  watch([route], () => {
    if (route.name === 'groups-id') {
      const id = route.params.id as string;
      console.log(id);
    } else {
      console.log('reset current project');
    }
  });

  onBeforeMount(async () => {
    await getProjectGroups();
  });

  return {
    projectGroups,
    projectGroup,
    getProjectGroups,
    getProjectGroup,
    findGroupPath,
    createProjectGroup,
    updateProjectGroup,
    deleteProjectGroup,
  };
});
