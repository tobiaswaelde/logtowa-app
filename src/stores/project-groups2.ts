import { compareBy } from 'compare-by';
import { ProjectGroup } from './../types/project-group';

export const useProjectGroups2 = defineStore('project-groups-store2', () => {
  const http = useHttp();
  const route = useRoute();

  const projectGroups = reactive<ProjectGroup[]>([]);
  const projectGroup = ref<ProjectGroup | null>(null);

  //#region state updates
  const updateState = (projects: ProjectGroup) => {
    //
  };
  //#endregion

  const getProjectGroups = async () => {
    try {
      const res = await http.get<ProjectGroup[]>(`/api/project-groups`);
      const groups = res.data;

      // remove groups from state
      for (const group of groups) {
        const index = projectGroups.findIndex((g) => g.id === group.id);
        if (index !== -1) projectGroups.splice(index, 1);
      }

      // add groups to state
      projectGroups.push(...groups);
      projectGroups.sort(compareBy({ key: 'name' }));
    } catch (err) {}
  };

  watch([route], () => {
    if (route.name === 'groups-id') {
      const id = route.params.id as string;
      console.log(id);
    } else {
      console.log('reset current project');
    }
  });

  return { projectGroups, projectGroup };
});
