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
  id: "omvn",
  code: "omvn",
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
