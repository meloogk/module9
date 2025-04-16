// components/AssureurList.tsx
'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assureur } from '@/type'

interface Props {
  assureurs: Assureur[]
  onSelect: (assureur: Assureur) => void
}

export default function AssureurList({ assureurs, onSelect }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {assureurs.map((assureur) => (
        <Card key={assureur._id} className="cursor-pointer hover:shadow-lg" onClick={() => onSelect(assureur)}>
          <CardContent className="space-y-2 p-4">
            <h2 className="text-lg font-semibold">{assureur.nom}</h2>
            <p className="text-sm text-muted-foreground">{assureur.adresse}</p>
            <p className="text-sm text-muted-foreground">{assureur.telephone}</p>
            {assureur.conventions?.map((conv, i) => (
              <Badge key={i} className="mr-1">{conv.acte}: {conv.tauxPriseEnCharge * 100}%</Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
