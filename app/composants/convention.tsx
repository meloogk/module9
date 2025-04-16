
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Assureur } from '@/type'

interface Props {
  assureur: Assureur
  onSave: (updated: Assureur) => void
}

export default function ConventionEditor({ assureur, onSave }: Props) {
  const [conventions, setConventions] = useState(assureur.conventions || [])

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...conventions]
    if (field === "tauxPriseEnCharge") {
      updated[index][field] = parseFloat(value)
    } else {
      updated[index][field] = value
    }
    setConventions(updated)
  }

  const addConvention = () => {
    setConventions([...conventions, { acte: "", tauxPriseEnCharge: 0 }])
  }

  return (
    <div className="space-y-4 mt-4">
      {conventions.map((conv, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input
            value={conv.acte}
            onChange={(e) => handleChange(i, "acte", e.target.value)}
            placeholder="Acte"
          />
          <Input
            value={conv.tauxPriseEnCharge.toString()}
            onChange={(e) => handleChange(i, "tauxPriseEnCharge", e.target.value)}
            placeholder="Taux (0.8 = 80%)"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <Button variant="outline" onClick={addConvention}>Ajouter une convention</Button>
        <Button onClick={() => onSave({ ...assureur, conventions })}>Enregistrer</Button>
      </div>
    </div>
  )
}
