export interface EventConfig {
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
  code: "omvn2026",
  name: "Olimpiade Matematika Vektor Nasional (OMVN)",
  theme_color: "oklch(39.8% 0.195 277.366)",
  naming: {
    category: "Jenjang & Kategori",
    region: "Rayon",
  },
};

export const DefaultConfig: EventConfig = {
  code: "default",
  name: "Event",
  theme_color: "oklch(39.8% 0.195 277.366)",
  naming: {
    category: "Kategori",
    region: "Region",
  },
};

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
