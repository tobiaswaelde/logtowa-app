import { ProjectGroup } from './project-group';

export type Project = {
  id: string;
  name: string;
  repoUrl?: string;
  group: ProjectGroup;
};

export type CreateProjectDto = {
  group: string;
  name: string;
  repoUrl?: string;
};

export type UpdateProjectDto = {
  group?: string;
  name?: string;
  repoUrl?: string;
};
