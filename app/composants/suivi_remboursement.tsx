'use client'

import { Facture } from '@/type'

import { cn } from '@/lib/utils'

interface Props {
  readonly factures: readonly Facture[]
}

export default function SuiviRemboursement({ factures }: Props) {
  const getBadgeStyle = (statut: string): string => {
    switch (statut) {
      case 'remboursée':
        return 'bg-green-100 text-green-700 border border-green-300'
      case 'en_attente':
        return 'bg-blue-100 text-blue-700 border border-blue-300'
      case 'refusée':
        return 'bg-red-100 text-red-700 border border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300'
    }
  }

  return (
    <div className="space-y-4">
      {factures.map((facture) => (
        <div
          key={facture._id}
          className="p-5 rounded-xl shadow-md border border-gray-200 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition duration-300 flex justify-between items-center"
        >
          <div className="space-y-1">
            <p className="font-bold text-blue-900 text-lg">Facture #{facture._id}</p>
            <p className="text-sm text-gray-500">Émise le {facture.dateEmission}</p>
            <p className="text-sm text-gray-700">Montant : <span className="font-medium text-blue-800">{facture.montantTotal} FCFA</span></p>
            {facture.montantRemboursé && (
              <p className="text-sm text-green-700 font-medium">Remboursé : {facture.montantRemboursé} FCFA</p>
            )}
          </div>
          <div>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold capitalize",
                getBadgeStyle(facture.statut)
              )}
            >
              {facture.statut}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
