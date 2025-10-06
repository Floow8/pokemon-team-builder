'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TyradexPokemon } from '@/types/tyradex';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Check, Info } from 'lucide-react';
import { TYPE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: TyradexPokemon;
  onAdd?: (pokemon: TyradexPokemon) => void;
  onShowDetails?: (pokemon: TyradexPokemon) => void;
  isInTeam?: boolean;
  isTeamFull?: boolean;
  index?: number;
}

export function PokemonCard({
  pokemon,
  onAdd,
  onShowDetails,
  isInTeam = false,
  isTeamFull = false,
  index = 0,
}: PokemonCardProps) {
  const formattedNumber = `#${pokemon.pokedex_id.toString().padStart(3, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <Badge variant="outline" className="text-xs font-semibold">
              {formattedNumber}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onShowDetails?.(pokemon)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative mx-auto mb-4 h-32 w-32">
            {pokemon.sprites.regular && (
              <Image
                src={pokemon.sprites.regular}
                alt={pokemon.name.fr}
                fill
                className="object-contain transition-transform group-hover:scale-110"
                sizes="128px"
                unoptimized
              />
            )}
          </div>

          <h3 className="mb-3 text-center text-lg font-bold">
            {pokemon.name.fr}
          </h3>

          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types?.map((type) => (
              <Badge
                key={type.name}
                className={cn(
                  TYPE_COLORS[type.name] || 'bg-gray-400 text-white',
                  'border-0'
                )}
              >
                {type.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => onAdd?.(pokemon)}
            disabled={isInTeam || (isTeamFull && !isInTeam)}
            variant={isInTeam ? 'secondary' : 'default'}
          >
            {isInTeam ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Dans l&apos;équipe
              </>
            ) : isTeamFull ? (
              <>Équipe pleine</>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
