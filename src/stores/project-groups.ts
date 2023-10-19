import { Project } from '../types/project';
import { CreateProjectGroupDto, ProjectGroup } from '../types/project-group';

export const useProjectGroups = defineStore('project-groups-store', () => {
  const http = useHttp();

  const projectGroups = ref<ProjectGroup[]>([]);
  const projectGroup = ref<ProjectGroup | null>(null);

  // const updateState = (projectGroup: ProjectGroup) => {
  //   const update = (updatedGroup: ProjectGroup, state: ProjectGroup[]) => {
  //     for (const group of state) {
  //       if (group.id === updatedGroup.id) {
  //         group.name = updatedGroup.name;
  //         group.parent = updatedGroup.parent;
  //       } else {
  //         update(updatedGroup, group.children);
  //       }
  //     }
  //     return state;
  //   };

  //   return update(projectGroup, projectGroups.value);
  // };

  const updateState = (updatedGroup: ProjectGroup) => {
    const findAndUpdateGroup = (
      groups: ProjectGroup[],
      updatedGroup: ProjectGroup,
    ) => {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === updatedGroup.id) {
          // Replace the group with the updated group
          groups[i] = { ...updatedGroup };

          // If the parent has changed, update the parent reference
          if (groups[i].parent?.id !== updatedGroup.parent?.id) {
            groups[i].parent = updatedGroup.parent;
          }

          return;
        }

        // Recursively search for the group in children
        if (groups[i].children) {
          findAndUpdateGroup(groups[i].children, updatedGroup);
        }
      }
    };

    // Check if the group exists in the state
    const existingGroupIndex = projectGroups.value.findIndex(
      (group) => group.id === updatedGroup.id,
    );

    if (existingGroupIndex !== -1) {
      // If the group exists, update it
      findAndUpdateGroup(projectGroups.value, updatedGroup);
    } else {
      // If the group doesn't exist, add it to the root level
      projectGroups.value.push(updatedGroup);
    }
  };

  const findAndDeleteGroup = (groupToDelete: ProjectGroup) => {
    const findAndDeleteRecursive = (
      groups: ProjectGroup[],
      groupToDelete: ProjectGroup,
    ) => {
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].id === groupToDelete.id) {
          // Delete the group by splicing it out of the array
          groups.splice(i, 1);
          return;
        }

        if (groups[i].children) {
          findAndDeleteRecursive(groups[i].children, groupToDelete);
        }
      }
    };

    findAndDeleteRecursive(projectGroups.value, groupToDelete);
  };

  const findGroupPath = (
    groups: ProjectGroup[],
    groupId: string,
  ): ProjectGroup[] | null => {
    const findGroupPathRecursive = (
      currentGroup: ProjectGroup,
      targetId: string,
    ): ProjectGroup[] | null => {
      if (currentGroup.id === targetId) {
        return [currentGroup];
      }

      for (const childGroup of currentGroup.children) {
        const pathFromChild = findGroupPathRecursive(childGroup, targetId);
        if (pathFromChild) {
          return [currentGroup, ...pathFromChild];
        }
      }

      return null;
    };

    for (const group of groups) {
      const groupPath = findGroupPathRecursive(group, groupId);
      if (groupPath) {
        return groupPath;
      }
    }

    return null;
  };

  const getGroupWithChildren = async (id: string): Promise<ProjectGroup> => {
    try {
      const res = await http.get<ProjectGroup>(`/api/project-groups/${id}`);
      const group = res.data;

      let children: ProjectGroup[] = [];
      for (const child of group.children) {
        const g = await getGroupWithChildren(child.id);
        children.push(g);
      }

      return { ...group, children };
    } catch (err) {
      console.log(err);
      throw new Error('Error getting group with children.');
    }
  };
  const getAllProjectGroups = async (): Promise<ProjectGroup[]> => {
    const res = await http.get<ProjectGroup[]>(`/api/project-groups`);
    const groups = await Promise.all(
      res.data.map((group) => getGroupWithChildren(group.id)),
    );
    return groups;
  };

  const getProjectGroup = async (id: string) => {
    try {
      const res = await http.get(`/api/project-groups/${id}`);
      projectGroup.value = res.data;
    } catch (err) {
      projectGroup.value = null;
    }
  };

  const createProjectGroup = async (data: CreateProjectGroupDto) => {
    try {
      const res = await http.post<ProjectGroup>(`/api/project-groups`, data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  onBeforeMount(async () => {
    console.log('before mount');
    projectGroups.value = await getAllProjectGroups();
  });

  return {
    projectGroups,
    projectGroup: projectGroup,
    findGroupPath,
    getProjectGroup,
    createProjectGroup,
  };
});
