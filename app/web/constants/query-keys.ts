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
  CAMPAINS: {
    LIST: () => ["campains"],
    CREATE: () => ["create-campains"],
    GET: (id: string) => ["campains", id],
    UPDATE: (id: string) => ["update-campains", id],
    DELETE: (id: string) => ["delete-campains", id],
  },
} as const;
