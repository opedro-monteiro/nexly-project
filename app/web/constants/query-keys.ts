export const QUERY_KEYS = {
  CLIENTS: {
    LIST: () => ["clients"],
    CREATE: () => ["create-clients"],
    GET: (id: string) => ["clients", id],
    UPDATE: (id: string) => ["update-clients", id],
    DELETE: (id: string) => ["delete-clients", id],
  },
  SENDS: {
    LIST: () => ["sends"],
    CREATE: () => ["create-sends"],
    GET: (id: string) => ["sends", id],
    UPDATE: (id: string) => ["update-sends", id],
    DELETE: (id: string) => ["delete-sends", id],
  },
  CAMPAIGNS: {
    LIST: () => ["campaigns"],
    CREATE: () => ["create-campaigns"],
    GET: (id: string) => ["campaigns", id],
    UPDATE: (id: string) => ["update-campaigns", id],
    DELETE: (id: string) => ["delete-campaigns", id],
    DISPATCHED: () => ["dispatched"],
  },
  DASHBOARD_KPIS: {
    GET: () => ["dashboard-kpis"],
  },
} as const;
