import { Project } from './project';

export type ProjectGroup = {
  id: string;
  name: string;
  parent?: ProjectGroup;
  children: ProjectGroup[];
  projects: Project[];
};
