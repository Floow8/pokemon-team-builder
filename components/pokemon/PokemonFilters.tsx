'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { POKEMON_TYPES, TYPE_COLORS, GENERATIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface PokemonFiltersProps {
  selectedTypes: string[];
  selectedGeneration: number | null;
  onTypeToggle: (type: string) => void;
  onGenerationChange: (generation: number | null) => void;
}

export function PokemonFilters({
  selectedTypes,
  selectedGeneration,
  onTypeToggle,
  onGenerationChange,
}: PokemonFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Generation Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Génération</h3>
        <Select
          value={selectedGeneration?.toString() || 'all'}
          onValueChange={(value) =>
            onGenerationChange(value === 'all' ? null : parseInt(value))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les générations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les générations</SelectItem>
            {GENERATIONS.map((gen) => (
              <SelectItem key={gen.value} value={gen.value.toString()}>
                {gen.label} ({gen.range})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filtrer par type</h3>
          {selectedTypes.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectedTypes.forEach(onTypeToggle)}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-3 w-3" />
              Effacer
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <Badge
                key={type}
                onClick={() => onTypeToggle(type)}
                className={cn(
                  'cursor-pointer transition-all',
                  TYPE_COLORS[type] || 'bg-gray-400 text-white',
                  'border-2',
                  isSelected
                    ? 'border-foreground ring-2 ring-foreground/20 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                )}
              >
                {type}
              </Badge>
            );
          })}
        </div>
        {selectedTypes.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {selectedTypes.length} type{selectedTypes.length > 1 ? 's' : ''}{' '}
            sélectionné{selectedTypes.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}
