// components/PatientInsurance.tsx
'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Patient } from '@/type'

interface Props {
  patient: Patient
  onUpdate: (updated: Patient) => void
}

export default function PatientInsurance({ patient, onUpdate }: Props) {
  const [assurance, setAssurance] = useState(patient.assurance || {
    assureurId: "",
    numeroAdherent: "",
    dateDebut: "",
    dateFin: ""
  })

  const handleChange = (field: string, value: string) => {
    setAssurance(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="ID de l'assureur"
        value={assurance.assureurId}
        onChange={(e) => handleChange("assureurId", e.target.value)}
      />
      <Input
        placeholder="Numéro d'adhérent"
        value={assurance.numeroAdherent}
        onChange={(e) => handleChange("numeroAdherent", e.target.value)}
      />
      <Input
        type="date"
        placeholder="Date début"
        value={assurance.dateDebut}
        onChange={(e) => handleChange("dateDebut", e.target.value)}
      />
      <Input
        type="date"
        placeholder="Date fin"
        value={assurance.dateFin || ""}
        onChange={(e) => handleChange("dateFin", e.target.value)}
      />
      <Button onClick={() => onUpdate({ ...patient, assurance })}>Mettre à jour</Button>
    </div>
  )
}
