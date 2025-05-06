export interface EventConfig {
  id: string;
  code: string;
  name: string;
  theme_color: string;
  naming: NamingConfig;
}

export interface NamingConfig {
  category: string;
  region: string;
}

export const OMVNConfig: EventConfig = {
  id: "f435939b-ddd1-4bba-a067-e32eca25d010",
  code: "omvn2026",
  name: "Olimpiade Matematika Vektor Nasional (OMVN)",
  theme_color: "oklch(39.8% 0.195 277.366)",
  naming: {
    category: "Jenjang & Kategori",
    region: "Rayon",
  },
};

export const DefaultConfig: EventConfig = {
  id: "default",
  code: "default",
  name: "Event",
  theme_color: "oklch(39.8% 0.195 277.366)",
  naming: {
    category: "Kategori",
    region: "Region",
  },
};

export function getEventConfigById(id: string): EventConfig {
  switch (id) {
    case OMVNConfig.id:
      return OMVNConfig;
    default:
      return DefaultConfig;
  }
}

export function getEventConfigByCode(code: string): EventConfig {
  switch (code) {
    case OMVNConfig.code:
      return OMVNConfig;
    default:
      return DefaultConfig;
  }
}

export function extractEventCodeFromPath(pathname: string) {
  const match = pathname.match(/^\/e\/([^/]+)/);
  return match ? match[1] : null;
}
