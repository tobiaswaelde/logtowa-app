import { useProjectGroups } from './project-groups';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from './../types/project';
import { useHttp } from './../composables/http';
import { ProjectGroup } from '../types/project-group';

export const useProjects = defineStore('projects-store', () => {
  const http = useHttp();
  const { findGroupPath } = useProjectGroups();

  const project = ref<Project | null>(null);

  const findProjectPath = (
    project: Project,
  ): (ProjectGroup | Project)[] | null => {
    const groupPath = findGroupPath(project.group.id);
    return [...groupPath, project];
  };

  const getProject = async (id: string) => {
    try {
      const res = await http.get<Project>(`/api/projects/${id}`);
      project.value = res.data;
    } catch (err) {
      project.value = null;
    }
  };

  const createProject = async (data: CreateProjectDto) => {
    try {
      const res = await http.post<Project>(`/api/projects`, data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  const updateProject = async (id: string, data: UpdateProjectDto) => {
    try {
      const res = await http.patch<Project>(`/api/projects/${id}`, data);
      return res.data;
    } catch (err) {
      return null;
    }
  };

  return {
    project,
    findProjectPath,
    getProject,
    createProject,
    updateProject,
  };
});
