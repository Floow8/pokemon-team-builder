import { TyradexPokemon } from '@/types/tyradex';
import { TYRADEX_API_BASE } from '@/lib/constants';

/**
 * Fetch all Pokémon from Tyradex API
 */
export async function getAllPokemon(): Promise<TyradexPokemon[]> {
  const res = await fetch(`${TYRADEX_API_BASE}/pokemon`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  if (!res.ok) throw new Error('Failed to fetch Pokémon');
  return res.json();
}

/**
 * Fetch a single Pokémon by ID
 */
export async function getPokemonById(id: number): Promise<TyradexPokemon> {
  const res = await fetch(`${TYRADEX_API_BASE}/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch Pokémon ${id}`);
  return res.json();
}

/**
 * Fetch Pokémon by generation
 */
export async function getPokemonByGeneration(gen: number): Promise<TyradexPokemon[]> {
  const res = await fetch(`${TYRADEX_API_BASE}/gen/${gen}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch Generation ${gen}`);
  return res.json();
}

/**
 * Fetch all types
 */
export async function getAllTypes(): Promise<string[]> {
  const res = await fetch(`${TYRADEX_API_BASE}/types`, {
    next: { revalidate: 86400 }, // Cache for 24 hours
  });
  if (!res.ok) throw new Error('Failed to fetch types');
  return res.json();
}

/**
 * Filter Pokémon by search query, types, and generation
 */
export function filterPokemon(
  pokemon: TyradexPokemon[],
  filters: {
    search?: string;
    types?: string[];
    generation?: number;
  }
): TyradexPokemon[] {
  return pokemon.filter(p => {
    const matchSearch = !filters.search ||
      p.name?.fr?.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.pokedex_id.toString().includes(filters.search);

    const matchTypes = !filters.types?.length ||
      filters.types.some(type =>
        p.types?.some(t => t.name?.toLowerCase() === type.toLowerCase())
      );

    const matchGen = !filters.generation ||
      p.generation === filters.generation;

    return matchSearch && matchTypes && matchGen;
  });
}

/**
 * Sort Pokémon by various criteria
 */
export function sortPokemon(
  pokemon: TyradexPokemon[],
  sortBy: 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc' | 'stats-desc'
): TyradexPokemon[] {
  const sorted = [...pokemon];

  switch (sortBy) {
    case 'id-asc':
      return sorted.sort((a, b) => a.pokedex_id - b.pokedex_id);
    case 'id-desc':
      return sorted.sort((a, b) => b.pokedex_id - a.pokedex_id);
    case 'name-asc':
      return sorted.sort((a, b) => (a.name?.fr || '').localeCompare(b.name?.fr || ''));
    case 'name-desc':
      return sorted.sort((a, b) => (b.name?.fr || '').localeCompare(a.name?.fr || ''));
    case 'stats-desc':
      return sorted.sort((a, b) => {
        const totalA = Object.values(a.stats).reduce((sum, stat) => sum + stat, 0);
        const totalB = Object.values(b.stats).reduce((sum, stat) => sum + stat, 0);
        return totalB - totalA;
      });
    default:
      return sorted;
  }
}

/**
 * Fetch multiple Pokémon by IDs for team loading
 */
export async function getPokemonByIds(ids: number[]): Promise<TyradexPokemon[]> {
  const promises = ids.map(id => getPokemonById(id));
  return Promise.all(promises);
}
