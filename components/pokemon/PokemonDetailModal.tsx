'use client';

import Image from 'next/image';
import { TyradexPokemon } from '@/types/tyradex';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, Check } from 'lucide-react';
import { TYPE_COLORS, STAT_NAMES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PokemonDetailModalProps {
  pokemon: TyradexPokemon | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd?: (pokemon: TyradexPokemon) => void;
  onShowPokemon?: (id: number) => void;
  isInTeam?: boolean;
  isTeamFull?: boolean;
}

export function PokemonDetailModal({
  pokemon,
  open,
  onOpenChange,
  onAdd,
  onShowPokemon,
  isInTeam = false,
  isTeamFull = false,
}: PokemonDetailModalProps) {
  if (!pokemon) return null;

  const totalStats = Object.values(pokemon.stats).reduce((a, b) => a + b, 0);

  // Helper to get stat color based on value
  const getStatColor = (value: number) => {
    if (value >= 100) return 'bg-green-500';
    if (value >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Helper to get resistance color
  const getResistanceColor = (multiplier: number) => {
    if (multiplier === 0) return 'bg-gray-500 text-white';
    if (multiplier < 0.5) return 'bg-green-600 text-white';
    if (multiplier < 1) return 'bg-green-500 text-white';
    if (multiplier === 1) return 'bg-gray-400 text-white';
    if (multiplier <= 2) return 'bg-orange-500 text-white';
    return 'bg-red-600 text-white';
  };

  const getResistanceText = (multiplier: number) => {
    if (multiplier === 0) return 'Immunité';
    return `×${multiplier}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold">{pokemon.name.fr}</span>
            <span className="text-lg text-muted-foreground">
              #{pokemon.pokedex_id.toString().padStart(3, '0')}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image and Basic Info */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-48 w-48">
              {pokemon.sprites.regular && (
                <Image
                  src={pokemon.sprites.regular}
                  alt={pokemon.name.fr}
                  fill
                  className="object-contain"
                  sizes="192px"
                  unoptimized
                />
              )}
            </div>

            <div>
              <p className="text-center text-sm text-muted-foreground">
                {pokemon.category}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.types?.map((type) => (
                <Badge
                  key={type.name}
                  className={cn(
                    'text-base px-4 py-1',
                    TYPE_COLORS[type.name] || 'bg-gray-400 text-white',
                    'border-0'
                  )}
                >
                  {type.name}
                </Badge>
              ))}
            </div>

            <Button
              onClick={() => onAdd?.(pokemon)}
              disabled={isInTeam || isTeamFull}
              className="w-full max-w-xs"
              size="lg"
            >
              {isInTeam ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Dans l&apos;équipe
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-5 w-5" />
                  Ajouter à l&apos;équipe
                </>
              )}
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="evolutions">Évolutions</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-4 pt-4">
              {Object.entries(pokemon.stats).map(([key, value]) => {
                const percentage = (value / 255) * 100;
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {STAT_NAMES[key] || key}
                      </span>
                      <span className="text-muted-foreground font-semibold">
                        {value}
                      </span>
                    </div>
                    <div className="relative h-3 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          getStatColor(value)
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>{totalStats}</span>
                </div>
              </div>
            </TabsContent>

            {/* Evolutions Tab */}
            <TabsContent value="evolutions" className="pt-4">
              {pokemon.evolution ? (
                <div className="space-y-6">
                  {/* Pre-evolution */}
                  {pokemon.evolution.pre && pokemon.evolution.pre.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Pré-évolution
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {pokemon.evolution.pre.map((pre) => (
                          <button
                            key={pre.pokedex_id}
                            onClick={() => onShowPokemon?.(pre.pokedex_id)}
                            className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer"
                          >
                            <div className="text-sm font-medium">
                              {pre.name}
                            </div>
                            {pre.condition && (
                              <div className="text-xs text-muted-foreground">
                                {pre.condition}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Pokemon */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Actuel
                    </h4>
                    <div className="flex justify-center">
                      <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-primary p-4 bg-primary/5">
                        <div className="relative h-24 w-24">
                          <Image
                            src={pokemon.sprites.regular}
                            alt={pokemon.name.fr}
                            fill
                            className="object-contain"
                            sizes="96px"
                            unoptimized
                          />
                        </div>
                        <div className="text-sm font-bold">
                          {pokemon.name.fr}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next evolution */}
                  {pokemon.evolution.next && pokemon.evolution.next.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Évolution suivante
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {pokemon.evolution.next.map((next) => (
                          <button
                            key={next.pokedex_id}
                            onClick={() => onShowPokemon?.(next.pokedex_id)}
                            className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-accent transition-colors cursor-pointer"
                          >
                            <div className="text-sm font-medium">
                              {next.name}
                            </div>
                            {next.condition && (
                              <div className="text-xs text-muted-foreground">
                                {next.condition}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mega evolution */}
                  {pokemon.evolution.mega && pokemon.evolution.mega.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Méga-Évolution
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {pokemon.evolution.mega.map((mega, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col items-center gap-2 rounded-lg border p-4 bg-accent/50"
                          >
                            <div className="relative h-24 w-24">
                              <Image
                                src={mega.sprites.regular}
                                alt={`Méga ${pokemon.name.fr}`}
                                fill
                                className="object-contain"
                                sizes="96px"
                                unoptimized
                              />
                            </div>
                            <div className="text-sm font-medium">
                              {mega.orbe}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune évolution disponible
                </p>
              )}
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="pt-4">
              <Accordion type="single" collapsible className="w-full">
                {/* Informations */}
                <AccordionItem value="info">
                  <AccordionTrigger>Informations</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold">Catégorie</p>
                        <p className="text-sm text-muted-foreground">
                          {pokemon.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Génération</p>
                        <p className="text-sm text-muted-foreground">
                          {pokemon.generation}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Taille</p>
                        <p className="text-sm text-muted-foreground">
                          {pokemon.height}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Poids</p>
                        <p className="text-sm text-muted-foreground">
                          {pokemon.weight}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Talents */}
                <AccordionItem value="talents">
                  <AccordionTrigger>Talents</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.talents?.map((talent, idx) => (
                        <Badge
                          key={idx}
                          variant={talent.tc ? 'default' : 'outline'}
                        >
                          {talent.name}
                          {talent.tc && ' (TC)'}
                        </Badge>
                      )) || <p className="text-sm text-muted-foreground">Aucun talent disponible</p>}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Resistances */}
                <AccordionItem value="resistances">
                  <AccordionTrigger>Résistances</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-3 gap-2">
                      {pokemon.resistances?.map((resistance) => (
                        <div
                          key={resistance.name}
                          className={cn(
                            'flex flex-col items-center gap-1 rounded p-2',
                            getResistanceColor(resistance.multiplier)
                          )}
                        >
                          <span className="text-xs font-semibold">
                            {resistance.name}
                          </span>
                          <span className="text-xs">
                            {getResistanceText(resistance.multiplier)}
                          </span>
                        </div>
                      )) || <p className="text-sm text-muted-foreground">Aucune résistance disponible</p>}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Reproduction */}
                <AccordionItem value="reproduction">
                  <AccordionTrigger>Reproduction</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {pokemon.egg_groups && (
                        <div>
                          <p className="text-sm font-semibold">
                            Groupes d&apos;œuf
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {pokemon.egg_groups.join(', ')}
                          </p>
                        </div>
                      )}
                      {pokemon.sexe && (
                        <div>
                          <p className="text-sm font-semibold">Ratio sexe</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">
                              ♂ {pokemon.sexe.male}%
                            </Badge>
                            <Badge variant="outline">
                              ♀ {pokemon.sexe.female}%
                            </Badge>
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold">
                          Taux de capture
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {pokemon.catch_rate}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
