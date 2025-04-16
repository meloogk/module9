'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Assureur } from '@/type'
import { toast } from "sonner"
import { FaFileMedical,  FaTrashAlt } from "react-icons/fa"

interface Convention {
  acte: string
  tauxPriseEnCharge: number
  [key: string]: string | number 
}

interface Props {
  readonly assureur: Assureur
  readonly onSave: (updated: Assureur) => void
}

export default function ConventionEditor({ assureur, onSave }: Props) {
  const [conventions, setConventions] = useState<Convention[]>(assureur.conventions ?? [])
  const [loading, setLoading] = useState(false)

  const handleChange = (index: number, field: keyof Convention, value: string) => {
    const updated = [...conventions]
    updated[index] = {
      ...updated[index],
      [field]: field === "tauxPriseEnCharge" ? parseFloat(value) : value
    }
    setConventions(updated)
  }

  const addConvention = () => {
    setConventions([...conventions, { acte: "", tauxPriseEnCharge: 0 }])
  }

  const removeConvention = (index: number) => {
    const updated = [...conventions]
    updated.splice(index, 1)
    setConventions(updated)
    toast.info("Convention supprimée")
  }

  const handleSave = async () => {
    const hasEmptyActe = conventions.some(c => !c.acte.trim())
    const hasInvalidTaux = conventions.some(c => isNaN(c.tauxPriseEnCharge) || c.tauxPriseEnCharge < 0 || c.tauxPriseEnCharge > 1)

    if (hasEmptyActe || hasInvalidTaux) {
      toast.error("Veuillez vérifier les champs : acte requis et taux entre 0 et 1.")
      return
    }

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simule un délai

    onSave({ ...assureur, conventions })

    setLoading(false)
    toast.success("Conventions enregistrées avec succès !")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-blue-100 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800 text-lg">
          <FaFileMedical className="text-blue-600" />
          Conventions de l’assureur
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {conventions.map((conv, index) => (
          <div key={`${conv.acte}-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end relative border p-3 rounded-md">
            <div>
              <Label className="text-sm font-semibold text-gray-700">Acte</Label>
              <Input
                value={conv.acte}
                onChange={(e) => handleChange(index, "acte", e.target.value)}
                placeholder="Acte"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Taux (0.8 = 80%)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={conv.tauxPriseEnCharge.toString()}
                onChange={(e) => handleChange(index, "tauxPriseEnCharge", e.target.value)}
                placeholder="Taux de prise en charge"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              onClick={() => removeConvention(index)}
            >
              <FaTrashAlt />
            </Button>
          </div>
        ))}

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="outline" onClick={addConvention}>Ajouter une convention</Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Sauvegarde...
              </span>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
