'use client';

import { useEffect, useState } from 'react';
import AssureurList from './composants/liste_assureur';
import ConventionEditor from './composants/convention';
import PatientInsurance from './composants/assurance_patient';
import { Assureur, Patient, Facture } from '@/type';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import DashboardAssureur from './composants/dashboard_assureur';
import SuiviRemboursement from './composants/suivi_remboursement';
import Notification from './composants/notifications';

import { Toaster, toast } from 'sonner';  
import { Button } from '@/components/ui/button';
import { FaClipboardList, FaPencilAlt, FaTrash, FaUserShield, FaMoneyCheckAlt, FaChartBar } from 'react-icons/fa'; // Import des icônes de react-icons

export default function AssurancePage() {
  const [assureurs, setAssureurs] = useState<Assureur[]>([
    {
      _id: '1',
      nom: 'CNAM',
      email: 'contact@cnam.tn',
      telephone: '71 123 456',
      conventions: [
        { acte: 'Consultation', tauxPriseEnCharge: 0.8 },
        { acte: 'Radiologie', tauxPriseEnCharge: 0.6 },
      ],
    },
    {
      _id: '2',
      nom: 'Assurex',
      email: 'info@assurex.tn',
      telephone: '70 987 654',
      conventions: [],
    },
  ]);

  const [selectedAssureur, setSelectedAssureur] = useState<Assureur | null>(null);

  const updateAssureur = (updated: Assureur) => {
    setAssureurs((prev) => prev.map((a) => (a._id === updated._id ? updated : a)));
    setSelectedAssureur(null);
    toast.success("✅ Assureur mis à jour avec succès.");
  };

  const deleteAssureur = (id: string) => {
    setAssureurs((prev) => prev.filter((a) => a._id !== id));
    setSelectedAssureur(null);
    toast.error("🗑️ Assureur supprimé.");
  };

  const [patient, setPatient] = useState<Patient>({
    _id: 'p1',
    nom: 'Doe',
    prenom: 'Jane',
    dateNaissance: '1990-01-01',
    assurance: {
      assureurId: '1',
      numeroAdherent: 'CN123456',
      dateDebut: '2023-01-01',
      dateFin: '2024-01-01',
    },
  });

  const updatePatient = (p: Patient) => {
    setPatient(p);
    toast.success("✅ Infos patient mises à jour !");
  };

  const [factures, setFactures] = useState<Facture[]>([
    {
      _id: 'f1',
      soinId: 's1',
      patientId: 'p1',
      assureurId: '1',
      dateEmission: '2024-04-01',
      montantTotal: 100 ,
      montantRemboursé: 80,
      statut: 'remboursée',
    },
    {
      _id: 'f2',
      soinId: 's2',
      patientId: 'p1',
      assureurId: '1',
      dateEmission: '2024-04-10',
      montantTotal: 150,
      statut: 'en_attente',
    },
  ]);

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const changed = factures.filter(f => f.statut === 'remboursée');
    if (changed.length > 0) {
      setNotifications([`✅ ${changed.length} facture(s) remboursée(s)`]);
    }
  }, [factures]);

  return (
    <div className="p-6 space-y-10 bg-muted min-h-screen">
      <h1 className="text-3xl font-bold text-primary">
        <FaClipboardList /> Gestion des Assurances
      </h1>

      <Notification messages={notifications} />

      <Card className="p-6 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Liste des Assureurs</h2>
        </div>
        <AssureurList assureurs={assureurs} onSelect={setSelectedAssureur} />
      </Card>

      {selectedAssureur && (
        <Card className="p-6 space-y-4 shadow-md border-primary border">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              <FaPencilAlt /> Modifier les Conventions de {selectedAssureur.nom}
            </h2>
            <Button variant="destructive" onClick={() => deleteAssureur(selectedAssureur._id)}>
              <FaTrash /> Supprimer l’assureur
            </Button>
          </div>
          <ConventionEditor assureur={selectedAssureur} onSave={updateAssureur} />
        </Card>
      )}

      <Separator />

      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <FaUserShield /> Assurance du Patient
        </h2>
        <PatientInsurance
          patient={patient}
          assureurs={assureurs}
          onUpdate={updatePatient}
        />
      </Card>

      <Separator />

      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <FaMoneyCheckAlt /> Suivi des Remboursements
        </h2>
        <SuiviRemboursement factures={factures} />
      </Card>

      <Separator />

      <Card className="p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          <FaChartBar /> Dashboard des Assureurs
        </h2>
        <DashboardAssureur assureurs={assureurs} factures={factures} />
      </Card>

      {/* Toaster component added */}
      <Toaster richColors position="top-right" />
    </div>
  );
}
