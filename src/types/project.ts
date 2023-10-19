import { ProjectGroup } from './project-group';

export type Project = {
  id: string;
  name: string;
  repoUrl?: string;
  group: ProjectGroup;
};
