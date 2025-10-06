import { Pokemon } from './pokemon';

export interface TeamMember {
  pokemon: Pokemon;
  addedAt: Date;
}

export interface Team {
  members: TeamMember[];
  maxSize: number;
}

export interface TeamStore {
  team: TeamMember[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (id: number) => void;
  clearTeam: () => void;
  isInTeam: (id: number) => boolean;
  isFull: () => boolean;
  loadFromUrl: (ids: number[]) => Promise<void>;
  getTeamIds: () => number[];
}
