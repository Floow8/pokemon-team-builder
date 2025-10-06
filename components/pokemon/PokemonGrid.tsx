'use client';

import { TyradexPokemon } from '@/types/tyradex';
import { PokemonCard } from './PokemonCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonGridProps {
  pokemons: TyradexPokemon[];
  loading?: boolean;
  onAddPokemon?: (pokemon: TyradexPokemon) => void;
  onShowDetails?: (pokemon: TyradexPokemon) => void;
  teamPokemonIds?: number[];
  isTeamFull?: boolean;
}

export function PokemonGrid({
  pokemons,
  loading = false,
  onAddPokemon,
  onShowDetails,
  teamPokemonIds = [],
  isTeamFull = false,
}: PokemonGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Aucun Pokémon trouvé</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Essayez d&apos;ajuster votre recherche ou vos filtres
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.pokedex_id}
          pokemon={pokemon}
          index={index}
          onAdd={onAddPokemon}
          onShowDetails={onShowDetails}
          isInTeam={teamPokemonIds.includes(pokemon.pokedex_id)}
          isTeamFull={isTeamFull}
        />
      ))}
    </div>
  );
}
