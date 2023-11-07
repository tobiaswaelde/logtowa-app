import { Group } from './group';

export type App = {
  id: string;
  name: string;
  repoUrl?: string;
  group: Group;
};

export type CreateAppDto = {
  group: string;
  name: string;
  repoUrl?: string;
};

export type UpdateAppDto = {
  group?: string;
  name?: string;
  repoUrl?: string;
};
