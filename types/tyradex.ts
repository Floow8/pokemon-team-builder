export interface TyradexPokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string;
  };
  types: Array<{
    name: string;
    image: string;
  }> | null;
  talents: Array<{
    name: string;
    tc: boolean;
  }> | null;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  };
  resistances: Array<{
    name: string;
    multiplier: number;
  }> | null;
  evolution: {
    pre?: Array<{
      pokedex_id: number;
      name: string;
      condition?: string;
    }>;
    next?: Array<{
      pokedex_id: number;
      name: string;
      condition?: string;
    }>;
    mega?: Array<{
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }>;
  } | null;
  height: string;
  weight: string;
  egg_groups: string[] | null;
  sexe: {
    male: number;
    female: number;
  } | null;
  catch_rate: number;
  level_100: number;
  formes: any | null;
}

export interface TeamMember {
  pokemon: TyradexPokemon;
  addedAt: string;
  slot: number; // 0-5
}

export interface Team {
  members: TeamMember[];
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export type PokemonTypeNames =
  | 'Normal'
  | 'Feu'
  | 'Eau'
  | 'Plante'
  | 'Électrik'
  | 'Glace'
  | 'Combat'
  | 'Poison'
  | 'Sol'
  | 'Vol'
  | 'Psy'
  | 'Insecte'
  | 'Roche'
  | 'Spectre'
  | 'Dragon'
  | 'Ténèbres'
  | 'Acier'
  | 'Fée';
