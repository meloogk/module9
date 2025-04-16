
'use client';

import { Facture } from '@/type';;
import { Badge } from '@/components/ui/badge';

interface Props {
  factures: Facture[];
}

export default function SuiviRemboursement({ factures }: Props) {
  return (
    <div className="space-y-4">
      {factures.map((facture) => (
        <div
          key={facture._id}
          className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">Facture #{facture._id}</p>
            <p className="text-sm text-gray-500">Émise le {facture.dateEmission}</p>
            <p className="text-sm">Montant : {facture.montantTotal} TND</p>
            {facture.montantRemboursé && (
              <p className="text-sm text-green-600">Remboursé : {facture.montantRemboursé} TND</p>
            )}
          </div>
          <Badge
            variant={
              facture.statut === 'remboursée'
                ? 'success'
                : facture.statut === 'en_attente'
                ? 'outline'
                : 'destructive'
            }
          >
            {facture.statut}
          </Badge>
        </div>
      ))}
    </div>
  );
}
