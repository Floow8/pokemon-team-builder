'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { PokemonSearch } from '@/components/pokemon/PokemonSearch';
import { PokemonFilters } from '@/components/pokemon/PokemonFilters';
import { PokemonGrid } from '@/components/pokemon/PokemonGrid';
import { PokemonDetailModal } from '@/components/pokemon/PokemonDetailModal';
import { TeamSidebar } from '@/components/team/TeamSidebar';
import { ShareTeamModal } from '@/components/team/ShareTeamModal';
import { useTeamStore } from '@/lib/stores/teamStore';
import { TyradexPokemon } from '@/types/tyradex';
import { getAllPokemon } from '@/lib/api/pokemon';
import { filterPokemon, sortPokemon } from '@/lib/api/pokemon';
import { toast } from 'sonner';

function HomeContent() {
  const [pokemons, setPokemons] = useState<TyradexPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const {
    team,
    addPokemon,
    removePokemon,
    clearTeam,
    isPokemonInTeam,
    isTeamFull,
    loadFromUrl,
    getTeamIds,
  } = useTeamStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<TyradexPokemon | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Load all Pokémon on mount
  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        const data = await getAllPokemon();
        setPokemons(sortPokemon(data, 'id-asc'));
      } catch (error) {
        console.error('Failed to load Pokémon:', error);
        toast.error('Erreur lors du chargement des Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  // Load team from URL on mount
  useEffect(() => {
    const teamParam = searchParams.get('team');
    if (teamParam) {
      const ids = teamParam.split(',').map(Number).filter(Boolean);
      if (ids.length > 0) {
        loadFromUrl(ids);
        toast.success(`Équipe chargée avec ${ids.length} Pokémon !`);
      }
    }
  }, [searchParams, loadFromUrl]);

  // Filter and search Pokémon
  const filteredPokemons = useMemo(() => {
    return filterPokemon(pokemons, {
      search: searchQuery,
      types: selectedTypes,
      generation: selectedGeneration || undefined,
    });
  }, [pokemons, searchQuery, selectedTypes, selectedGeneration]);

  const handleAddPokemon = (pokemon: TyradexPokemon) => {
    if (isTeamFull()) {
      toast.error('Votre équipe est pleine ! Retirez un Pokémon d\'abord.');
      return;
    }

    if (isPokemonInTeam(pokemon.pokedex_id)) {
      toast.warning('Ce Pokémon est déjà dans votre équipe !');
      return;
    }

    addPokemon(pokemon);
    toast.success(`${pokemon.name.fr} ajouté à votre équipe !`);
  };

  const handleRemovePokemon = (id: number) => {
    const pokemon = team.find((m) => m.pokemon.pokedex_id === id)?.pokemon;
    removePokemon(id);
    if (pokemon) {
      toast.info(`${pokemon.name.fr} retiré de votre équipe.`);
    }
  };

  const handleClearTeam = () => {
    clearTeam();
    toast.success('Équipe vidée !');
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleShowDetails = (pokemon: TyradexPokemon) => {
    setSelectedPokemon(pokemon);
    setShowDetailModal(true);
  };

  const handleShowPokemonById = async (id: number) => {
    const pokemon = pokemons.find(p => p.pokedex_id === id);
    if (pokemon) {
      setSelectedPokemon(pokemon);
      setShowDetailModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <div id="pokedex" className="container py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="space-y-4">
                <PokemonSearch onSearch={setSearchQuery} />
                <PokemonFilters
                  selectedTypes={selectedTypes}
                  selectedGeneration={selectedGeneration}
                  onTypeToggle={handleTypeToggle}
                  onGenerationChange={setSelectedGeneration}
                />
              </div>

              {/* Pokemon Grid */}
              <PokemonGrid
                pokemons={filteredPokemons}
                loading={loading}
                onAddPokemon={handleAddPokemon}
                onShowDetails={handleShowDetails}
                teamPokemonIds={getTeamIds()}
                isTeamFull={isTeamFull()}
              />
            </div>

            {/* Team Sidebar */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <TeamSidebar
                team={team}
                onRemove={handleRemovePokemon}
                onClear={handleClearTeam}
                onShare={() => setShowShareModal(true)}
              />
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        onAdd={handleAddPokemon}
        onShowPokemon={handleShowPokemonById}
        isInTeam={selectedPokemon ? isPokemonInTeam(selectedPokemon.pokedex_id) : false}
        isTeamFull={isTeamFull()}
      />

      <ShareTeamModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        teamIds={getTeamIds()}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <HomeContent />
    </Suspense>
  );
}
