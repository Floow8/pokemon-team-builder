'use client';

import { TeamMember } from '@/types/tyradex';
import { Button } from '@/components/ui/button';
import { Share2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TeamActionsProps {
  team: TeamMember[];
  onClear: () => void;
  onShare: () => void;
  disabled?: boolean;
}

export function TeamActions({
  team,
  onClear,
  onShare,
  disabled = false,
}: TeamActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex-1"
        onClick={onShare}
        disabled={disabled}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Partager
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" disabled={disabled} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Réinitialiser votre équipe ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera {team.length === 1 ? 'le' : 'les'}{' '}
              {team.length} Pokémon de votre équipe. Cette action ne peut pas
              être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={onClear} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Réinitialiser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
