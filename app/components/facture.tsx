'use client'

import { useState } from 'react'
import { Factures, Patient } from '@/types'
import {
  FaUser,
  FaHashtag,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaWallet,
  FaCreditCard,
  FaFileInvoice,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa'

type Props = Readonly<{
  patients: Patient[]
  initialData?: Factures
  onSubmit: (data: Factures) => Promise<void>
}>

export default function FacturesForm({ patients, initialData, onSubmit }: Props) {
  const [form, setForm] = useState<Factures>({
    patientId: '',
    invoiceNumber: '',
    totalAmount: 0,
    coveredAmount: 0,
    patientResponsibility: 0,
    paymentMethod: 'cash',
    ...initialData
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const newForm = {
      ...form,
      [name]: name.includes("Amount") || name === "patientResponsibility" ? Number(value) : value
    }

    if (['totalAmount', 'coveredAmount'].includes(name)) {
      newForm.patientResponsibility = newForm.totalAmount - newForm.coveredAmount
    }

    setForm(newForm)
  }

  const validateForm = () => {
    if (!form.patientId || !form.invoiceNumber) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return false
    }
    if (form.totalAmount < 0 || form.coveredAmount < 0 || form.patientResponsibility < 0) {
      setError('Les montants doivent être positifs.')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!validateForm()) return

    setLoading(true)
    try {
      await onSubmit(form)
      setSuccess(true)
      setForm({
        patientId: '',
        invoiceNumber: '',
        totalAmount: 0,
        coveredAmount: 0,
        patientResponsibility: 0,
        paymentMethod: 'cash'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-blue-100 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2 mb-6">
        <FaFileInvoice className="text-blue-500" />
        Formulaire de Facturation
      </h2>

      {/* Feedback messages */}
      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3 rounded transition">
          <FaCheckCircle /> Facture enregistrée avec succès !
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded transition">
          <FaExclamationTriangle /> {error}
        </div>
      )}

      {/* Champs du formulaire */}
      {[
        {
          id: 'patientId',
          label: 'Patient *',
          icon: <FaUser />,
          component: (
            <select
              id="patientId"
              name="patientId"
              title="Sélectionner un patient"
              value={form.patientId}
              onChange={handleChange}
              className="select select-bordered w-full bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Sélectionner un patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          )
        },
        {
          id: 'invoiceNumber',
          label: 'Numéro de facture *',
          icon: <FaHashtag />,
          component: (
            <input
              id="invoiceNumber"
              name="invoiceNumber"
              value={form.invoiceNumber}
              onChange={handleChange}
              placeholder="Ex : FAC123456"
              className="input input-bordered w-full bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )
        },
        {
          id: 'totalAmount',
          label: 'Montant total',
          icon: <FaMoneyBillWave />,
          component: (
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={form.totalAmount}
              onChange={handleChange}
              placeholder="Ex : 100"
              className="input input-bordered w-full bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )
        },
        {
          id: 'coveredAmount',
          label: 'Montant couvert',
          icon: <FaHandHoldingUsd />,
          component: (
            <input
              type="number"
              id="coveredAmount"
              name="coveredAmount"
              value={form.coveredAmount}
              onChange={handleChange}
              placeholder="Ex : 80"
              className="input input-bordered w-full bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          )
        },
        {
          id: 'patientResponsibility',
          label: 'Part du patient',
          icon: <FaWallet />,
          component: (
            <input
              type="number"
              id="patientResponsibility"
              name="patientResponsibility"
              value={form.patientResponsibility}
              onChange={handleChange}
              placeholder="Ex : 20"
              className="input input-bordered w-full bg-blue-100 text-black focus:outline-none"
              readOnly
            />
          )
        },
        {
          id: 'paymentMethod',
          label: 'Mode de paiement',
          icon: <FaCreditCard />,
          component: (
            <select
              id="paymentMethod"
              name="paymentMethod"
              title="Mode de paiement"
              value={form.paymentMethod}
              onChange={handleChange}
              className="select select-bordered w-full bg-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="cash">Espèces</option>
              <option value="card">Carte</option>
              <option value="bank_transfer">Virement</option>
              <option value="insurance">Assurance</option>
              <option value="other">Autre</option>
            </select>
          )
        }
      ].map(({ id, label, icon, component }) => (
        <div key={id}>
          <label htmlFor={id} className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
            {icon} {label}
          </label>
          {component}
        </div>
      ))}

      {/* Résumé en direct */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Résumé du Montant</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li className="flex justify-between">
            <span className="font-medium">Montant total :</span>
            <span>{form.totalAmount} €</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Montant couvert :</span>
            <span>{form.coveredAmount} €</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Part du patient :</span>
            <span>{form.patientResponsibility} €</span>
          </li>
          <li className="flex justify-between border-t pt-2 mt-2 font-bold text-blue-800">
            <span>Total à payer :</span>
            <span>{(form.totalAmount - form.coveredAmount).toFixed(2)} €</span>
          </li>
        </ul>
      </div>

      {/* Bouton d'enregistrement */}
      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full flex items-center justify-center transition"
        disabled={loading}
      >
        {loading && <FaSpinner className="animate-spin mr-2" />}
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  )
}
