'use client';

import Image from 'next/image';
import { TeamMember } from '@/types/tyradex';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { TYPE_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface TeamMemberCardProps {
  member: TeamMember;
  onRemove: (id: number) => void;
}

export function TeamMemberCard({ member, onRemove }: TeamMemberCardProps) {
  const { pokemon } = member;

  return (
    <div className="group relative flex items-center gap-3 rounded-lg border bg-card p-2 transition-colors hover:bg-accent">
      <div className="relative h-12 w-12 flex-shrink-0">
        {pokemon.sprites.regular && (
          <Image
            src={pokemon.sprites.regular}
            alt={pokemon.name.fr}
            fill
            className="object-contain"
            sizes="48px"
            unoptimized
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">
          {pokemon.name.fr}
        </p>
        <div className="mt-1 flex gap-1">
          {pokemon.types?.slice(0, 2).map((type, index) => (
            <Badge
              key={`${type.name}-${index}`}
              className={cn(
                'h-5 px-2 text-[10px]',
                TYPE_COLORS[type.name] || 'bg-gray-400 text-white',
                'border-0'
              )}
            >
              {type.name}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => onRemove(pokemon.pokedex_id)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
