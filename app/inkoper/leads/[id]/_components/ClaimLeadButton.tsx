'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { Loader2, CreditCard } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface ClaimLeadButtonProps {
  leadId: string;
  buyerId: string;
}

export default function ClaimLeadButton({ leadId, buyerId }: ClaimLeadButtonProps) {
  const router = useRouter();
  const [claiming, setClaiming] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClaim = async () => {
    setClaiming(true);

    try {
      const { data, error } = await supabase.rpc('claim_lead', {
        p_lead_id: leadId,
        p_buyer_id: buyerId,
      } as any);

      if (error) throw error;

      if (data && (data as any).success) {
        toast.success('Lead succesvol geclaimd!');
        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = (data as any)?.message || 'Fout bij claimen van lead';
        toast.error(errorMessage);
      }
    } catch (error: any) {
      console.error('Claim error:', error);
      toast.error('Er is een fout opgetreden bij het claimen');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
          <CreditCard className="mr-2 h-5 w-5" />
          Claim Lead (1 Credit)
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lead claimen?</AlertDialogTitle>
          <AlertDialogDescription>
            Door deze lead te claimen gebruik je 1 credit. Je krijgt direct toegang tot alle
            contactgegevens, foto's en volledige details van deze lead.
            <br />
            <br />
            Deze actie kan niet ongedaan gemaakt worden.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={claiming}>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleClaim();
            }}
            disabled={claiming}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {claiming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Claimen...
              </>
            ) : (
              <>
                Ja, claim voor 1 credit
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
