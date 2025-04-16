'use client'

import { Soin, Facture, Assureur } from '@/type'
import { FaHeartbeat, FaFileInvoiceDollar, FaCheckCircle } from 'react-icons/fa'

interface Props {
  readonly assureur: Assureur
  readonly soins: readonly Soin[]
  readonly factures: readonly Facture[]
}

export default function DashboardAssureur({ assureur, soins = [], factures = [] }: Props) {
  if (!assureur || !assureur._id) {
    return <div className="text-red-600 font-semibold">Assureur non valide</div>
  }

  const soinsAssureur = soins.filter((s) => s.validéParAssureur)
  const facturesAssureur = factures.filter((f) => f.assureurId === assureur._id)

  const enAttente = facturesAssureur.filter((f) => f.statut === 'en_attente').length
  const remboursees = facturesAssureur.filter((f) => f.statut === 'remboursée').length

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Dashboard - {assureur.nom}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-3">
            <FaHeartbeat className="text-green-600 text-xl" />
            <p className="text-sm font-medium text-green-700">Soins validés</p>
          </div>
          <h3 className="text-3xl font-bold text-green-800">{soinsAssureur.length}</h3>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-3">
            <FaFileInvoiceDollar className="text-yellow-600 text-xl" />
            <p className="text-sm font-medium text-yellow-700">Factures en attente</p>
          </div>
          <h3 className="text-3xl font-bold text-yellow-800">{enAttente}</h3>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-3">
            <FaCheckCircle className="text-blue-600 text-xl" />
            <p className="text-sm font-medium text-blue-700">Factures remboursées</p>
          </div>
          <h3 className="text-3xl font-bold text-blue-800">{remboursees}</h3>
        </div>
      </div>
    </div>
  )
}
