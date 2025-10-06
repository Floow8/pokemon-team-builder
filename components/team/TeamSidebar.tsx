'use client';

import { TeamMember } from '@/types/tyradex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamActions } from './TeamActions';
import { MAX_TEAM_SIZE } from '@/lib/constants';

interface TeamSidebarProps {
  team: TeamMember[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onShare: () => void;
}

export function TeamSidebar({
  team,
  onRemove,
  onClear,
  onShare,
}: TeamSidebarProps) {
  const emptySlots = MAX_TEAM_SIZE - team.length;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mon Équipe</span>
          <Badge variant="secondary" className="text-sm font-normal">
            {team.length}/{MAX_TEAM_SIZE}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {team.map((member, index) => (
            <TeamMemberCard
              key={`${member.pokemon.pokedex_id}-${index}`}
              member={member}
              onRemove={onRemove}
            />
          ))}

          {Array.from({ length: emptySlots }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25"
            >
              <span className="text-sm text-muted-foreground">Slot vide</span>
            </div>
          ))}
        </div>

        <TeamActions
          team={team}
          onClear={onClear}
          onShare={onShare}
          disabled={team.length === 0}
        />
      </CardContent>
    </Card>
  );
}
