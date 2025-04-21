'use client'

import { useState } from 'react'
import { Patient, PaymentMethod } from '@/types'
import {
  FaFileInvoice,
  FaEuroSign,
  FaCreditCard,
  FaCashRegister,
  FaUniversity,
  FaShieldAlt,
  FaEllipsisH,
  FaRegStickyNote
} from 'react-icons/fa'
import type { ReactElement } from 'react'

type Props = Readonly<{
  patient: Patient
}>

const paymentIcons: Record<PaymentMethod, ReactElement> = {
  cash: <FaCashRegister className="text-green-500" />,
  card: <FaCreditCard className="text-indigo-500" />,
  bank_transfer: <FaUniversity className="text-blue-500" />,
  insurance: <FaShieldAlt className="text-teal-500" />,
  other: <FaEllipsisH className="text-gray-500" />
}

export default function FacturesParPatient({ patient }: Props) {
  const [showAll, setShowAll] = useState(false)
  const facturesToShow = showAll ? patient.factures : patient.factures.slice(0, 5)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Factures de {patient.prenom} {patient.name}
      </h2>

      {patient.factures.length === 0 ? (
        <p className="italic text-gray-500">Aucune facture enregistrée pour ce patient.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {facturesToShow.map((facture) => (
              <div
                key={facture._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md bg-white transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-teal-700 flex items-center gap-2">
                    <FaFileInvoice className="text-teal-500" />
                    #{facture.invoiceNumber}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(facture.createdAt ?? '').toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaEuroSign className="text-indigo-500" />
                    <strong>Total :</strong> {facture.totalAmount.toFixed(2)} €
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEuroSign className="text-green-500" />
                    <strong>Couvert :</strong> {facture.coveredAmount.toFixed(2)} €
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEuroSign className="text-red-500" />
                    <strong>Reste à charge :</strong> {facture.patientResponsibility.toFixed(2)} €
                  </p>
                  <p className="flex items-center gap-2">
                    {paymentIcons[facture.paymentMethod]}
                    <strong>Moyen de paiement :</strong> {facture.paymentMethod}
                  </p>
                  <p className="flex items-center gap-2 md:col-span-2">
                    <FaRegStickyNote className="text-yellow-500" />
                    <strong>Notes :</strong> {facture.notes ?? '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {patient.factures.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
            >
              {showAll ? 'Voir moins' : `Voir toutes (${patient.factures.length})`}
            </button>
          )}
        </>
      )}
    </div>
  )
}
