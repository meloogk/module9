'use client'

import { useState } from 'react'
import { ContratAssurance, Patient, Assureur } from '@/types'

type ContratAssuranceFormProps = {
  readonly onSubmit: (data: ContratAssurance) => void
  readonly patients: readonly Patient[]
  readonly providers: readonly Assureur[]
  readonly initialData?: Partial<ContratAssurance>
}

export default function ContratAssuranceForm({
  onSubmit,
  patients = [],
  providers = [],
  initialData = {},
}: ContratAssuranceFormProps) {
  const [formData, setFormData] = useState<ContratAssurance>({
    patientId: initialData.patientId ?? '',
    providerId: initialData.providerId ?? '',
    policyNumber: initialData.policyNumber ?? '',
    startDate: initialData.startDate ?? '',
    endDate: initialData.endDate ?? '',
    coveragePercentage: initialData.coveragePercentage ?? 0,
    maxCoverageAmount: initialData.maxCoverageAmount ?? 0,
    isActive: initialData.isActive ?? true,
    notes: initialData.notes ?? '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData(prev => ({ ...prev, [name]: target.checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500)) 
    onSubmit(formData)
    setLoading(false)
    setSuccess(true)

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-100 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contrat d’assurance</h2>

      {success && (
        <div className="absolute top-2 right-2 bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-md shadow animate-slideIn">
          ✅ Contrat enregistré avec succès !
        </div>
      )}

      {/* Patient */}
      <div>
        <label htmlFor="patientId" className="block mb-1 font-medium text-gray-700">Patient</label>
        <select
          id="patientId"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Sélectionner un patient --</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Assureur (optionnel) */}
      <div>
        <label htmlFor="providerId" className="block mb-1 font-medium text-gray-700">Assureur (optionnel)</label>
        <select
          id="providerId"
          name="providerId"
          value={formData.providerId}
          onChange={handleChange}
          className="w-full rounded-md border border-purple-300 bg-purple-50 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">-- Aucun assureur --</option>
          {providers.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Numéro de police */}
      <div>
        <label htmlFor="policyNumber" className="block mb-1 font-medium text-gray-700">Numéro de police</label>
        <input
          id="policyNumber"
          name="policyNumber"
          placeholder="Numéro de police"
          value={formData.policyNumber}
          onChange={handleChange}
          required
          className="w-full rounded-md border  text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Date de début */}
      <div>
        <label htmlFor="startDate" className="block mb-1 font-medium text-gray-700">Date de début</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full rounded-md border  text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Date de fin */}
      <div>
        <label htmlFor="endDate" className="block mb-1 font-medium text-gray-700">Date de fin</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full rounded-md border  text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Pourcentage de couverture */}
      <div>
        <label htmlFor="coveragePercentage" className="block mb-1 font-medium text-gray-700">Pourcentage de couverture</label>
        <input
          type="number"
          id="coveragePercentage"
          name="coveragePercentage"
          value={formData.coveragePercentage}
          onChange={handleChange}
          min="0"
          max="100"
          required
          className="w-full rounded-md border  text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Montant max. de couverture */}
      <div>
        <label htmlFor="maxCoverageAmount" className="block mb-1 font-medium text-gray-700">Montant max. de couverture</label>
        <input
          type="number"
          id="maxCoverageAmount"
          name="maxCoverageAmount"
          value={formData.maxCoverageAmount}
          onChange={handleChange}
          min="0"
          required
          className="w-full rounded-md border  text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block mb-1 font-medium text-gray-700">Notes</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Ajouter des notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full rounded-md border text-black border-gray-300 px-4 py-2"
        />
      </div>

      {/* Actif */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="checkbox"
        />
        <label htmlFor="isActive" className="text-gray-700">Actif</label>
      </div>

      {/* Bouton */}
      <button
        type="submit"
        className={`w-full text-white font-semibold py-2 rounded-md transition duration-300
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        `}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="loader border-t-2 border-white border-solid rounded-full w-4 h-4 animate-spin" />
            Traitement en cours...
          </div>
        ) : (
          'Enregistrer le contrat'
        )}
      </button>
    </form>
  )
}
