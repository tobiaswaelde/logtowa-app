import { Project } from '../types/project';
import {
  CreateProjectGroupDto,
  ProjectGroup,
  UpdateProjectGroupDto,
} from '../types/project-group';

export const useProjectGroups = defineStore('project-groups-store', () => {
  const http = useHttp();

  const projectGroups = reactive<ProjectGroup[]>([]);
  const projectGroup = ref<ProjectGroup | null>(null);

  //#region state updates
  const updateState = (updatedGroup: ProjectGroup) => {
    let found = false;

    const findAndUpdateGroup = (
      groups: ProjectGroup[],
      updatedGroup: ProjectGroup,
    ) => {
      for (let i = 0; i < groups.length; i++) {
        console.log(groups[i].id, updatedGroup.id);
        if (groups[i].id === updatedGroup.id) {
          // Replace the group with the updated group
          groups[i] = { ...updatedGroup };

          // If the parent has changed, update the parent reference
          if (groups[i].parent?.id !== updatedGroup.parent?.id) {
            groups[i].parent = updatedGroup.parent;
          }

          found = true;
          return;
        }

        // Recursively search for the group in children
        if (groups[i].children) {
          findAndUpdateGroup(groups[i].children, updatedGroup);
        }
      }
    };

    if (!found) {
      // If the group doesn't exist anywhere in the object, check if the parent ID is set
      if (updatedGroup.parent?.id) {
        // Find the group with the parent ID and add the updated group as a child
        const parentGroup = projectGroups.find(
          (group) => group.id === updatedGroup.parent!.id,
        );

        if (parentGroup) {
          if (!parentGroup.children) {
            parentGroup.children = [];
          }

          const i = parentGroup.children.findIndex(
            (x) => x.id === updatedGroup.id,
          );
          if (i !== -1) parentGroup.children.splice(i, 1);

          parentGroup.children.push(updatedGroup);
        }
      } else {
        // If the parent ID is not set, add it to the root
        const i = projectGroups.findIndex((x) => x.id === updatedGroup.id);
        if (i !== -1) projectGroups.splice(i, 1);

        projectGroups.push(updatedGroup);
      }
    }
  };

  const addProject = (project: Project) => {
    const findAndUpdateGroup = (
      groups: ProjectGroup[],
      projectId: string,
      projectToAdd: Project,
    ) => {
      for (const group of groups) {
        if (group.id === projectId) {
          // Check if the group has a projects array, and if not, create one
          if (!group.projects) {
            group.projects = [];
          }

          // Add the project to the group's projects
          group.projects.push(projectToAdd);
          return true; // Found and updated the group
        } else if (
          group.children &&
          findAndUpdateGroup(group.children, projectId, projectToAdd)
        ) {
          return true; // Found and updated the group in the children
        }
      }
      return false; // Group not found in this branch
    };

    const foundAndUpdated = findAndUpdateGroup(
      projectGroups,
      project.group.id,
      project,
    );

    if (!foundAndUpdated) {
      // Handle the case where the group with the given ID is not found
      console.error('Group not found for project:', project.name);
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

    findAndDeleteRecursive(projectGroups, groupToDelete);
  };
  //#endregion

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
    return projectGroup.value;
  };

  const createProjectGroup = async (data: CreateProjectGroupDto) => {
    try {
      const res = await http.post<ProjectGroup>(`/api/project-groups`, data);
      const createdGroup = res.data;

      updateState(createdGroup);
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

      updateState(updatedGroup);
      projectGroup.value = updatedGroup;
      return updatedGroup;
    } catch (err) {
      return null;
    }
  };

  onBeforeMount(async () => {
    console.log('before mount');
    const groups = await getAllProjectGroups();
    Object.assign(projectGroups, groups);
  });

  return {
    projectGroups,
    projectGroup: projectGroup,
    findGroupPath,
    addProject,
    findAndDeleteGroup,
    getProjectGroup,
    createProjectGroup,
    updateProjectGroup,
  };
});
