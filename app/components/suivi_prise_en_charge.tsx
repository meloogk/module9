'use client'

import { useState, ReactElement } from 'react'
import { Priseencharge, ChargeStatus } from '@/types'
import {
  FaUser,
  FaFileMedical,
  FaEuroSign,
  FaCalendarAlt,
  FaStickyNote,
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaClock
} from 'react-icons/fa'

type Props = {
  readonly prisesEnCharge: readonly Priseencharge[]
  readonly patients: Readonly<Record<string, string>> // patientId => nom
}

const statusStyles: Record<ChargeStatus, { color: string; icon: ReactElement }> = {
  pending: {
    color: 'text-yellow-600 bg-yellow-100',
    icon: <FaHourglassHalf />
  },
  approved: {
    color: 'text-green-600 bg-green-100',
    icon: <FaCheckCircle />
  },
  denied: {
    color: 'text-red-600 bg-red-100',
    icon: <FaTimesCircle />
  },
  expired: {
    color: 'text-gray-600 bg-gray-200',
    icon: <FaClock />
  }
}

export default function SuiviPriseEnCharge({ prisesEnCharge, patients }: Props) {
  const [search, setSearch] = useState('')

  const filtered = prisesEnCharge.filter((item) =>
    (patients[item.patientId]?.toLowerCase() ?? '').includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom du patient"
          className="w-full px-4 py-2 border rounded text-black focus:ring-2 focus:ring-teal-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((item) => {
            const status = statusStyles[item.status]
            return (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-teal-700 flex items-center gap-2">
                    <FaUser className="text-teal-500" />
                    {patients[item.patientId] ?? 'Inconnu'}
                  </h3>
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                  >
                    {status.icon}
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <FaFileMedical className="text-teal-400" />
                    <span className="font-medium">Type :</span> {item.coverageType}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEuroSign className="text-teal-400" />
                    <span className="font-medium">Montant autorisé :</span> {item.authorizedAmount.toFixed(2)} €
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-teal-400" />
                    <span className="font-medium">Expiration :</span> {new Date(item.expirationDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStickyNote className="text-teal-400" />
                    <span className="font-medium">Notes :</span> {item.notes ?? '—'}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-gray-500 italic">Aucune prise en charge trouvée.</p>
        )}
      </div>
    </div>
  )
}
