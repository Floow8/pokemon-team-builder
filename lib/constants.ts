export const POKEMON_TYPES = [
  'Normal',
  'Feu',
  'Eau',
  'Plante',
  'Électrik',
  'Glace',
  'Combat',
  'Poison',
  'Sol',
  'Vol',
  'Psy',
  'Insecte',
  'Roche',
  'Spectre',
  'Dragon',
  'Ténèbres',
  'Acier',
  'Fée',
] as const;

export const GENERATIONS = [
  { value: 1, label: 'Génération 1', range: '1-151' },
  { value: 2, label: 'Génération 2', range: '152-251' },
  { value: 3, label: 'Génération 3', range: '252-386' },
  { value: 4, label: 'Génération 4', range: '387-493' },
  { value: 5, label: 'Génération 5', range: '494-649' },
  { value: 6, label: 'Génération 6', range: '650-721' },
  { value: 7, label: 'Génération 7', range: '722-809' },
  { value: 8, label: 'Génération 8', range: '810-905' },
  { value: 9, label: 'Génération 9', range: '906-1010' },
] as const;

export const TYPE_COLORS: Record<string, string> = {
  Normal: 'bg-[#A8A878] text-white',
  Feu: 'bg-[#F08030] text-white',
  Eau: 'bg-[#6890F0] text-white',
  Plante: 'bg-[#78C850] text-white',
  Électrik: 'bg-[#F8D030] text-gray-900',
  Glace: 'bg-[#98D8D8] text-gray-900',
  Combat: 'bg-[#C03028] text-white',
  Poison: 'bg-[#A040A0] text-white',
  Sol: 'bg-[#E0C068] text-gray-900',
  Vol: 'bg-[#A890F0] text-white',
  Psy: 'bg-[#F85888] text-white',
  Insecte: 'bg-[#A8B820] text-white',
  Roche: 'bg-[#B8A038] text-white',
  Spectre: 'bg-[#705898] text-white',
  Dragon: 'bg-[#7038F8] text-white',
  Ténèbres: 'bg-[#705848] text-white',
  Acier: 'bg-[#B8B8D0] text-gray-900',
  Fée: 'bg-[#EE99AC] text-white',
};

export const TYRADEX_API_BASE = 'https://tyradex.vercel.app/api/v1';

export const MAX_TEAM_SIZE = 6;

export const STAT_NAMES: Record<string, string> = {
  hp: 'PV',
  atk: 'Attaque',
  def: 'Défense',
  spe_atk: 'Att. Spé.',
  spe_def: 'Déf. Spé.',
  vit: 'Vitesse',
};
