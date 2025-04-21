'use client'

import { useState, useEffect } from 'react'
import { Priseencharge, Patient, Assureur } from '@/types'

type Props = Readonly<{
  readonly patients: readonly Patient[]
  readonly providers: readonly Assureur[]
  readonly initialData?: Readonly<Priseencharge>
  readonly onSubmit: (data: Priseencharge) => void
}>

const StepIndicator = ({ step }: { readonly step: number }) => (
  <div className="flex justify-center mb-8 gap-6">
    {[1, 2, 3].map((s) => (
      <div key={s} className="relative text-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white z-10
            ${step >= s ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'}`}
        >
          {s}
        </div>
        <p className="text-sm mt-2 text-gray-600">
          {s === 1 && 'Infos'}
          {s === 2 && 'Détails'}
          {s === 3 && 'Résumé'}
        </p>
        {s < 3 && (
          <div className="absolute top-5 left-10 w-24 h-1 bg-gray-200">
            <div className={`h-1 ${step > s ? 'bg-blue-600 w-full' : 'w-0'} transition-all duration-300`}></div>
          </div>
        )}
      </div>
    ))}
  </div>
)

export default function PriseenchargeFormMultiStep({
  patients,
  providers,
  initialData,
  onSubmit
}: Props) {
  const [step, setStep] = useState(1)
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState<Priseencharge>({
    patientId: '',
    providerId: '',
    coverageType: '',
    authorizedAmount: 0,
    expirationDate: '',
    status: 'pending',
    notes: ''
  })

  useEffect(() => {
    if (initialData) {
      setForm((f) => ({ ...f, ...initialData }))
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'authorizedAmount' ? parseFloat(value) : value
    }))
  }

  const isStepValid = () => {
    if (step === 1) return form.patientId
    if (step === 2) return form.coverageType && form.expirationDate && form.authorizedAmount >= 0
    return true
  }

  const handleNext = () => {
    if (isStepValid()) setStep(step + 1)
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSubmit = () => {
    setShowModal(false)
    onSubmit(form)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Nouvelle Prise en charge</h2>

        <StepIndicator step={step} />

        {/* Étape 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="patientId" className="block text-green-700 font-medium mb-1">Patient *</label>
              <select
                id="patientId"
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                className="select select-bordered  text-black w-full"
                required
              >
                <option value="">-- Sélectionner un patient --</option>
                {patients.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="providerId" className="block text-green-700 font-medium mb-1">Assureur (optionnel)</label>
              <select
                id="providerId"
                name="providerId"
                value={form.providerId}
                onChange={handleChange}
                className="select select-bordered  text-black w-full"
              >
                <option value="">-- Aucun assureur disponible --</option>
                {providers.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Étape 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="coverageType" className="block text-green-700 font-medium mb-1">Type de couverture *</label>
              <input
                type="text"
                id="coverageType"
                name="coverageType"
                placeholder="Ex: Hospitalisation"
                value={form.coverageType}
                onChange={handleChange}
                className="input input-bordered  text-black w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="authorizedAmount" className="block text-green-700 font-medium mb-1">Montant autorisé (€) *</label>
              <input
                type="number"
                id="authorizedAmount"
                name="authorizedAmount"
                min={0}
                value={form.authorizedAmount}
                onChange={handleChange}
                className="input input-bordered text-black w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="expirationDate" className="block text-green-700 font-medium mb-1">Date d’expiration *</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={form.expirationDate}
                onChange={handleChange}
                className="input input-bordered text-black w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-green-700 font-medium mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Ajouter une note optionnelle..."
                value={form.notes}
                onChange={handleChange}
                className="textarea textarea-bordered  text-black w-full"
              />
            </div>
          </div>
        )}

        {/* Étape 3 */}
        {step === 3 && (
          <div className="space-y-5 text-sm text-gray-700 bg-gray-50 p-5 rounded-md">
            <p><strong>Patient :</strong> {patients.find(p => p._id === form.patientId)?.name ?? '-'}</p>
            <p><strong>Assureur :</strong> {providers.find(p => p._id === form.providerId)?.name ?? 'Aucun'}</p>
            <p><strong>Type :</strong> {form.coverageType}</p>
            <p><strong>Montant :</strong> {form.authorizedAmount} €</p>
            <p><strong>Expiration :</strong> {form.expirationDate}</p>
            <p><strong>Statut :</strong> {form.status}</p>
            <p><strong>Notes :</strong> {form.notes ?? '-'}</p>

            <div className="mt-4">
              <label htmlFor="status" className="block text-gray-700 font-medium mb-1">Statut</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="pending">En attente</option>
                <option value="approved">Approuvée</option>
                <option value="denied">Refusée</option>
                <option value="expired">Expirée</option>
              </select>
            </div>
          </div>
        )}

        {/* Boutons */}
        <div className="flex justify-between items-center mt-8">
          {step > 1 && (
            <button type="button" onClick={handlePrev} className="btn btn-outline text-red-500">
              ⬅ Précédent
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`btn btn-primary ml-auto ${!isStepValid() ? 'opacity-50 text-yellow-400 cursor-not-allowed' : ''}`}
            >
              Suivant ➡
            </button>
          ) : (
            <button type="submit" className="btn btn-success  text-green-500 ml-auto">
              ✅ Valider
            </button>
          )}
        </div>
      </form>

      {/* Modale de confirmation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Confirmation</h3>
            <p className="text-gray-600 mb-4">Souhaitez-vous enregistrer cette prise en charge ?</p>
            <div className="flex justify-end gap-3">
              <button className="btn btn-ghost text-red-600" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="btn btn-primary text-green-500" onClick={confirmSubmit}>Oui, enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
