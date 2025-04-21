'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  FaChartBar,
  FaFileInvoice,
  FaRegFileAlt,
  FaHeartbeat,
  FaListUl,
  FaRegAddressCard,
  FaUserShield,
  FaClipboardList
} from 'react-icons/fa'

import PriseenchargeFormMultiStep from './components/prise_en_charge'
import SuiviPriseEnCharge from './components/suivi_prise_en_charge'
import FacturesForm from './components/facture'
import FacturesParPatient from './components/historique_factures'
import StatistiquesAvancees from './components/statistiques'
import ContratAssuranceForm from './components/formulaire_assurance'
import AssureurForm from './components/formulaire_assureur'
import ListeAssureurs from './components/liste_assureurs_acceptes'
import ListeContratsAssurance from './components/liste_contrat_assurance_patients'

import type { Patient, ContratAssurance, Assureur, Priseencharge, Factures } from '@/types'

export default function Dashboard() {
  const [view, setView] = useState<
    | 'stats'
    | 'factures'
    | 'facturesPatient'
    | 'priseEnCharge'
    | 'suivi'
    | 'contratAssurance'
    | 'assureurForm'
    | 'contrats'
  >('stats')

  // State mocks 
  const [patients, setPatients] = useState<Patient[]>([])
  const [prises, setPrises] = useState<Priseencharge[]>([])
  const [assureurs, setAssureurs] = useState<Assureur[]>([])
  const [searchAss, setSearchAss] = useState('')
  const [editingAssureur, setEditingAssureur] = useState<Assureur>()
  const [contrats, setContrats] = useState<ContratAssurance[]>([])

  const patientsMap = useMemo(
    () =>
      patients.reduce<Record<string, string>>((acc, p) => {
        acc[p._id] = `${p.prenom} ${p.name}`
        return acc
      }, {}),
    [patients]
  )

  useEffect(() => {
    setPatients([
      { _id: 'p1', name: 'Dupont', prenom: 'Jean', date_naissance: new Date(), sexe: 'M', adresse: '', telephone: '', email: '', groupe_sanguin: '', situation_medicale: '', assurance: { nom:'', numero_contrat:'', couverture:'', date_expiration:new Date() }, factures:[], contacts_urgences:[] },
      { _id: 'p2', name: 'Curie', prenom: 'Marie', date_naissance: new Date(), sexe: 'F', adresse: '', telephone: '', email: '', groupe_sanguin: '', situation_medicale: '', assurance: { nom:'', numero_contrat:'', couverture:'', date_expiration:new Date() }, factures:[], contacts_urgences:[] }
    ])
    setPrises([
      { _id:'pc1', patientId:'p1', providerId:'a1', coverageType:'Consultation', authorizedAmount:50, expirationDate:'2025-04-30', status:'pending', notes:'Premier rendez-vous' },
      { _id:'pc2', patientId:'p2', providerId:'a2', coverageType:'Radio', authorizedAmount:80, expirationDate:'2025-05-15', status:'approved' }
    ])
    setAssureurs([])
    setContrats([
      { _id:'c1', patientId:'p1', providerId:'a1', policyNumber:'POL123', startDate:'2025-01-01', endDate:'2025-12-31', coveragePercentage:80, maxCoverageAmount:1000, isActive:true, notes:'Renouvellement auto' }
    ])
  }, [])

  // Handlers
  const handleContratAssuranceSubmit = async (data: ContratAssurance) => {
    console.log('Contrat soumis :', data)
  }

  const handleFactureSubmit = async (data: Factures) => {
    console.log('Facture soumise :', data)
  }

  const handlePriseEnChargeSubmit = async (data: Priseencharge) => {
    console.log('Prise en charge soumise :', data)
  }

  const handleAssureurSubmit = (data: Assureur) => {
    if (editingAssureur?._id) {
      setAssureurs(prev => prev.map(a => a._id === editingAssureur._id ? data : a))
    } else {
      setAssureurs(prev => [...prev, { ...data, _id: Date.now().toString() }])
    }
    setEditingAssureur(undefined)
  }

  const handleEditAssureur = (a: Assureur) => setEditingAssureur(a)
  const handleDeleteAssureur = (id?: string) =>
    id && confirm('Supprimer cet assureur ?') && setAssureurs(prev => prev.filter(a => a._id !== id))

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-teal-700">Assurances • Dashboard</h1>
        </div>
      </header>

      <nav className="container mx-auto px-6 mt-6">
        <ul className="flex flex-wrap gap-4">
          {[
            { key: 'stats', icon: <FaChartBar />, label: 'Statistiques' },
            { key: 'factures', icon: <FaFileInvoice />, label: 'Facturation' },
            { key: 'facturesPatient', icon: <FaRegFileAlt />, label: 'Factures patient' },
            { key: 'priseEnCharge', icon: <FaHeartbeat />, label: 'Nouvelle prise en charge' },
            { key: 'suivi', icon: <FaListUl />, label: 'Suivi prises en charge' },
            { key: 'contratAssurance', icon: <FaRegAddressCard />, label: ' Enregistrement Contrats ' },
            { key: 'assureurForm', icon: <FaUserShield />, label: 'Assureurs' },
            { key: 'contrats', icon: <FaClipboardList />, label: 'Contrats patients' }
          ].map(({ key, icon, label }) => (
            <li key={key}>
              <button
                onClick={() => setView(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition
                  ${view === key ? 'bg-teal-600 text-white' : 'bg-white text-teal-700 hover:bg-teal-100'}`}
              >
                {icon}<span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {view === 'stats' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <StatistiquesAvancees />
            </div>
          )}

          {view === 'factures' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <FacturesForm patients={patients} onSubmit={handleFactureSubmit} />
            </div>
          )}

          {view === 'facturesPatient' && patients[0] && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <FacturesParPatient patient={patients[0]} />
            </div>
          )}

          {view === 'priseEnCharge' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <PriseenchargeFormMultiStep patients={patients} providers={[]} onSubmit={handlePriseEnChargeSubmit} />
            </div>
          )}

          {view === 'suivi' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <SuiviPriseEnCharge prisesEnCharge={prises} patients={patientsMap} />
            </div>
          )}

          {view === 'contratAssurance' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ContratAssuranceForm patients={patients} providers={[]} onSubmit={handleContratAssuranceSubmit} />
            </div>
          )}

          {view === 'assureurForm' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <AssureurForm onSubmit={handleAssureurSubmit} initialData={editingAssureur || {}} />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ListeAssureurs assureurs={assureurs} onEdit={handleEditAssureur} onDelete={handleDeleteAssureur} search={searchAss} setSearch={setSearchAss} />
              </div>
            </div>
          )}

          {view === 'contrats' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <ListeContratsAssurance contrats={contrats} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
