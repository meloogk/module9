'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Patient } from '@/type'
import { FaIdCard, FaRegCalendarAlt, FaUserShield, FaCheckCircle } from "react-icons/fa"

interface Props {
  readonly patient: Patient
  readonly onUpdate: (updated: Patient) => void
}

export default function PatientInsurance({ patient, onUpdate }: Props) {
  const [assurance, setAssurance] = useState(
    patient.assurance ?? {
      assureurId: "",
      numeroAdherent: "",
      dateDebut: "",
      dateFin: ""
    }
  )

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setAssurance(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    const { assureurId, numeroAdherent, dateDebut, dateFin } = assurance
    if (!assureurId || !numeroAdherent || !dateDebut || !dateFin) {
      setError("Veuillez remplir tous les champs.")
      return
    }

    setError("")
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simule un délai réseau

    onUpdate({ ...patient, assurance })

    setLoading(false)
    setSuccess(true)

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <Card className="w-full max-w-xl mx-auto bg-white shadow-lg border border-blue-100">
      <CardHeader>
        <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
          <FaUserShield className="text-blue-600" />
          Assurance du patient
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="assureurId" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaIdCard className="text-blue-500" />
            ID de l&aposassureur
          </Label>
          <Input
            id="assureurId"
            placeholder="ID de l'assureur"
            value={assurance.assureurId}
            onChange={(e) => handleChange("assureurId", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="numeroAdherent" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <FaIdCard className="text-green-500" />
            Numéro d&apos;adhérent
          </Label>
          <Input
            id="numeroAdherent"
            placeholder="Numéro d'adhérent"
            value={assurance.numeroAdherent}
            onChange={(e) => handleChange("numeroAdherent", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dateDebut" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaRegCalendarAlt className="text-purple-500" />
              Date début
            </Label>
            <Input
              id="dateDebut"
              type="date"
              value={assurance.dateDebut}
              onChange={(e) => handleChange("dateDebut", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="dateFin" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaRegCalendarAlt className="text-purple-500" />
              Date fin
            </Label>
            <Input
              id="dateFin"
              type="date"
              value={assurance.dateFin ?? ""}
              onChange={(e) => handleChange("dateFin", e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Traitement...
            </span>
          ) : (
            "Mettre à jour"
          )}
        </Button>

        {success && (
          <div className="flex items-center justify-center text-green-600 font-medium mt-2 gap-2">
            <FaCheckCircle className="text-xl" />
            Mise à jour effectuée avec succès !
          </div>
        )}
      </CardContent>
    </Card>
  )
}
