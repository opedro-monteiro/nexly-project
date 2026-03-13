import { API_VERSION } from "./api-versions";

export const ENDPOINTS = {
  CLIENTS: {
    LIST: API_VERSION.V1 + "/clients",
    CREATE: API_VERSION.V1 + "/clients",
    GET: (id: string) => API_VERSION.V1 + `/clients/${id}`,
    UPDATE: (id: string) => API_VERSION.V1 + `/clients/${id}`,
    DELETE: (id: string) => API_VERSION.V1 + `/clients/${id}`,
    TAGS: API_VERSION.V1 + "/clients/tags",
  },
  CAMPAIGNS: {
    LIST: API_VERSION.V1 + "/campaigns",
    CREATE: API_VERSION.V1 + "/campaigns",
    GET: (id: string) => API_VERSION.V1 + `/campaigns/${id}`,
    UPDATE: (id: string) => API_VERSION.V1 + `/campaigns/${id}`,
    DELETE: (id: string) => API_VERSION.V1 + `/campaigns/${id}`,
    DISPATCH: (id: string) => API_VERSION.V1 + `/campaigns/${id}/dispatch`,
    DISPATCHED: () => API_VERSION.V1 + "/campaigns/dispatched",
  },
  SENDS: {
    LIST: API_VERSION.V1 + "/sends",
    HISTORY: API_VERSION.V1 + "/sends/history",
    CREATE: API_VERSION.V1 + "/sends",
    GET: (id: string) => API_VERSION.V1 + `/sends/${id}`,
    UPDATE: (id: string) => API_VERSION.V1 + `/sends/${id}`,
    DELETE: (id: string) => API_VERSION.V1 + `/sends/${id}`,
  },
  DASHBOARD_KPIS: {
    LIST: API_VERSION.V1 + "/kpis",
  },
} as const;
