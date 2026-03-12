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
  },
};
