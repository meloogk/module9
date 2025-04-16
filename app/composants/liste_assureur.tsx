'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Assureur } from '@/type'
import { FaMapMarkerAlt, FaPhoneAlt, FaHospitalSymbol } from "react-icons/fa"

interface Props {
  readonly assureurs: Assureur[]
  readonly onSelect: (assureur: Assureur) => void
}

export default function AssureurList({ assureurs, onSelect }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {assureurs.map((assureur) => (
        <Card
          key={assureur._id}
          onClick={() => onSelect(assureur)}
          className="cursor-pointer hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl"
        >
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center space-x-3">
              <FaHospitalSymbol className="text-blue-600 text-xl" />
              <h2 className="text-xl font-bold text-blue-900">{assureur.nom}</h2>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-600" />
                {assureur.adresse}
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-600" />
                {assureur.telephone}
              </p>
            </div>

            {assureur.conventions && assureur.conventions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {assureur.conventions.map((conv) => (
                  <Badge
                    key={`${assureur._id}-${conv.acte}`}
                    className="bg-green-100 text-green-700 border border-green-300"
                  >
                    {conv.acte}: {conv.tauxPriseEnCharge * 100}%
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
