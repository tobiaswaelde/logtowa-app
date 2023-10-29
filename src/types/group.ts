import { App } from './app';

export type Group = {
  id: string;
  name: string;
  parent?: Group;
  children: Group[];
  apps: App[];
};

export type CreateGroupDto = {
  name: string;
  parent?: string;
};

export type UpdateGroupDto = {
  name?: string;
  parent?: string;
};
