export const ENDPOINTS = {
  CLIENTS: {
    LIST: "/clients",
    CREATE: "/clients",
    GET: (id: string) => `/clients/${id}`,
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
    TAGS: "/clients/tags",
  },
  CAMPAIGNS: {
    LIST: "/campaigns",
    CREATE: "/campaigns",
    GET: (id: string) => `/campaigns/${id}`,
    UPDATE: (id: string) => `/campaigns/${id}`,
    DELETE: (id: string) => `/campaigns/${id}`,
    DISPATCH: (id: string) => `/campaigns/${id}/dispatch`,
  },
  SENDS: {
    LIST: "/sends",
    CREATE: "/sends",
    GET: (id: string) => `/sends/${id}`,
    UPDATE: (id: string) => `/sends/${id}`,
    DELETE: (id: string) => `/sends/${id}`,
  },
} as const;
