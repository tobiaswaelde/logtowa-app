import { Project } from './project';

export type ProjectGroup = {
  id: string;
  name: string;
  children: ProjectGroup[];
  projects: Project[];
};
