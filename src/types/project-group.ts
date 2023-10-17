export type ProjectGroup = {
  id: string;
  name: string;
  children: ProjectGroup[];
  projects: any[];
};
