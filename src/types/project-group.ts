import { Project } from './project';

export type ProjectGroup = {
  id: string;
  name: string;
  parent?: ProjectGroup;
  children: ProjectGroup[];
  projects: Project[];
};

export type CreateProjectGroupDto = {
  name: string;
  parent?: string;
};

export type UpdateProjectGroupDto = {
  name?: string;
  parent?: string;
};
