'use client'

import { ContratAssurance } from "@/types"
import { 
  FaUser, FaShieldAlt, FaCalendarAlt, 
  FaMoneyCheckAlt, FaCheckCircle, 
  FaTimesCircle, FaClipboardList 
} from "react-icons/fa"

interface Props {
  readonly contrats: readonly ContratAssurance[]
}

export default function ListeContratsAssurance({ contrats }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <FaClipboardList className="text-blue-500" />
        Contrats d’assurance des patients
      </h2>

      {contrats.length === 0 ? (
        <p className="text-gray-500 italic">Aucun contrat d’assurance disponible.</p>
      ) : (
        <div className="space-y-4">
          {contrats.map((contrat) => (
            <div key={contrat._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gray-50">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaUser className="text-blue-400" />
                    <span className="font-semibold">Patient ID :</span> {contrat.patientId}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaShieldAlt className="text-indigo-500" />
                    <span className="font-semibold">Assureur ID :</span> {contrat.providerId}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaClipboardList className="text-yellow-500" />
                    <span className="font-semibold">N° de police :</span> {contrat.policyNumber}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    {contrat.isActive ? (
                      <>
                        <FaCheckCircle className="text-green-600" />
                        <span className="font-semibold text-green-700">Actif</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-red-500" />
                        <span className="font-semibold text-red-600">Inactif</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaCalendarAlt className="text-blue-600" />
                    <span className="font-semibold">Début :</span> {new Date(contrat.startDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaCalendarAlt className="text-red-600" />
                    <span className="font-semibold">Fin :</span> {new Date(contrat.endDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaMoneyCheckAlt className="text-green-600" />
                    <span className="font-semibold">Prise en charge :</span> {contrat.coveragePercentage}%
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaMoneyCheckAlt className="text-green-400" />
                    <span className="font-semibold">Max prise en charge :</span> {contrat.maxCoverageAmount} €
                  </p>
                </div>
              </div>

              {contrat.notes && (
                <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-700 text-sm">
                  <strong>Note :</strong> {contrat.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
