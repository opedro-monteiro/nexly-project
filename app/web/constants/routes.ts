const DASHBOARD = "/dashboard";

export const ROUTES = {
  DASHBOARD: {
    ROOT: DASHBOARD,
    CLIENTS: {
      ROOT: `${DASHBOARD}/clients`,
      CREATE: `${DASHBOARD}/clients/create`,
      LIST: `${DASHBOARD}/clients`,
      DETAIL: (id: string) => `${DASHBOARD}/clients/${id}`,
      EDIT: (id: string) => `${DASHBOARD}/clients/${id}/edit`,
    },
    CAMPAIGNS: {
      ROOT: `${DASHBOARD}/campaigns`,
      CREATE: `${DASHBOARD}/campaigns/create`,
      LIST: `${DASHBOARD}/campaigns`,
      DETAIL: (id: string) => `${DASHBOARD}/campaigns/${id}`,
      EDIT: (id: string) => `${DASHBOARD}/campaigns/${id}/edit`,
    },
    SENDS: {
      ROOT: `${DASHBOARD}/sends`,
      CREATE: `${DASHBOARD}/sends/create`,
      LIST: `${DASHBOARD}/sends`,
      DETAIL: (id: string) => `${DASHBOARD}/sends/${id}`,
      EDIT: (id: string) => `${DASHBOARD}/sends/${id}/edit`,
    },
  },
};
