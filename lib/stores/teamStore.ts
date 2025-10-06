'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TyradexPokemon, TeamMember } from '@/types/tyradex';
import { MAX_TEAM_SIZE } from '@/lib/constants';
import { getPokemonByIds } from '@/lib/api/pokemon';

interface TeamStore {
  team: TeamMember[];
  maxSize: number;

  // Actions
  addPokemon: (pokemon: TyradexPokemon) => void;
  removePokemon: (id: number) => void;
  clearTeam: () => void;
  reorderTeam: (fromIndex: number, toIndex: number) => void;

  // Queries
  isPokemonInTeam: (id: number) => boolean;
  isTeamFull: () => boolean;
  getTeamIds: () => number[];

  // URL sharing
  loadFromUrl: (ids: number[]) => Promise<void>;
  exportToUrl: () => string;
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set, get) => ({
      team: [],
      maxSize: MAX_TEAM_SIZE,

      addPokemon: (pokemon) => {
        if (get().isTeamFull()) {
          console.warn('Team is full! Cannot add more Pokémon.');
          return;
        }
        if (get().isPokemonInTeam(pokemon.pokedex_id)) {
          console.warn('This Pokémon is already in your team!');
          return;
        }

        set((state) => ({
          team: [...state.team, {
            pokemon,
            addedAt: new Date().toISOString(),
            slot: state.team.length
          }]
        }));
      },

      removePokemon: (id) => {
        set((state) => ({
          team: state.team
            .filter(m => m.pokemon.pokedex_id !== id)
            .map((m, index) => ({ ...m, slot: index }))
        }));
      },

      clearTeam: () => set({ team: [] }),

      reorderTeam: (fromIndex, toIndex) => {
        set((state) => {
          const newTeam = [...state.team];
          const [removed] = newTeam.splice(fromIndex, 1);
          newTeam.splice(toIndex, 0, removed);
          return {
            team: newTeam.map((m, index) => ({ ...m, slot: index }))
          };
        });
      },

      isPokemonInTeam: (id) => {
        return get().team.some(m => m.pokemon.pokedex_id === id);
      },

      isTeamFull: () => get().team.length >= get().maxSize,

      getTeamIds: () => get().team.map(m => m.pokemon.pokedex_id),

      exportToUrl: () => {
        const ids = get().getTeamIds();
        if (typeof window !== 'undefined') {
          return `${window.location.origin}?team=${ids.join(',')}`;
        }
        return '';
      },

      loadFromUrl: async (ids) => {
        try {
          const validIds = ids.slice(0, MAX_TEAM_SIZE);
          const pokemons = await getPokemonByIds(validIds);
          set({
            team: pokemons.map((p, i) => ({
              pokemon: p,
              addedAt: new Date().toISOString(),
              slot: i
            }))
          });
        } catch (error) {
          console.error('Failed to load team from URL:', error);
        }
      }
    }),
    {
      name: 'pokemon-team-storage',
      partialize: (state) => ({ team: state.team }),
    }
  )
);
