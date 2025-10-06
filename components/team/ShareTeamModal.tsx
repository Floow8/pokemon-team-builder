'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ShareTeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamIds: number[];
}

export function ShareTeamModal({
  open,
  onOpenChange,
  teamIds,
}: ShareTeamModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && teamIds.length > 0) {
      const url = `${window.location.origin}?team=${teamIds.join(',')}`;
      setShareUrl(url);
    }
  }, [teamIds]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager votre équipe</DialogTitle>
          <DialogDescription>
            Partagez votre équipe avec vos amis via cette URL ou ce code QR
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input value={shareUrl} readOnly className="flex-1" />
            <Button size="icon" onClick={copyToClipboard} variant="outline">
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          {shareUrl && (
            <div className="flex justify-center rounded-lg border p-4 bg-white">
              <QRCodeSVG value={shareUrl} size={200} level="H" />
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Scannez ce code QR pour ouvrir l&apos;équipe
          </p>

          <Button
            onClick={copyToClipboard}
            className="w-full"
            variant={copied ? 'secondary' : 'default'}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copier le lien
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
