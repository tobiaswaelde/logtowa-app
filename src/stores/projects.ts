import { Project } from './../types/project';
import { useHttp } from './../composables/http';
import { ProjectGroup } from '../types/project-group';

export const useProjects = defineStore('projects-store', () => {
  const http = useHttp();

  const project = ref<Project | null>(null);

  const findProjectPath = (
    groups: ProjectGroup[],
    projectId: string,
  ): (ProjectGroup | Project)[] | null => {
    function findProjectPathRecursive(
      currentGroup: ProjectGroup,
      targetId: string,
    ): (ProjectGroup | Project)[] | null {
      if (currentGroup.id === targetId) {
        return [currentGroup];
      }

      if (currentGroup.projects) {
        const project = currentGroup.projects.find((p) => p.id === targetId);
        if (project) {
          return [currentGroup, project];
        }
      }

      for (const childGroup of currentGroup.children) {
        const pathFromChild = findProjectPathRecursive(childGroup, targetId);
        if (pathFromChild) {
          return [currentGroup, ...pathFromChild];
        }
      }

      return null;
    }

    for (const group of groups) {
      const groupOrProjectPath = findProjectPathRecursive(group, projectId);
      if (groupOrProjectPath) {
        return groupOrProjectPath;
      }
    }

    return null;
  };

  const getProject = async (id: string) => {
    try {
      const res = await http.get<Project>(`/api/projects/${id}`);
      project.value = res.data;
    } catch (err) {
      project.value = null;
    }
  };

  return {
    project,
    findProjectPath,
    getProject,
  };
});
