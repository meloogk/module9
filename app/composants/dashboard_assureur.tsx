
'use client';

import { Soin , Facture, Assureur } from '@/type';


interface Props {
  assureur: Assureur;
  soins: Soin[];
  factures: Facture[];
}

export default function DashboardAssureur({ assureur, soins, factures }: Props) {
  const soinsAssureur = soins.filter((s) => s.validéParAssureur);
  const facturesAssureur = factures.filter((f) => f.assureurId === assureur._id);

  const enAttente = facturesAssureur.filter((f) => f.statut === 'en_attente').length;
  const remboursees = facturesAssureur.filter((f) => f.statut === 'remboursée').length;

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Dashboard - {assureur.nom}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
          <p className="text-sm">Soins validés</p>
          <h3 className="text-2xl font-bold">{soinsAssureur.length}</h3>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
          <p className="text-sm">Factures en attente</p>
          <h3 className="text-2xl font-bold">{enAttente}</h3>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded shadow">
          <p className="text-sm">Remboursées</p>
          <h3 className="text-2xl font-bold">{remboursees}</h3>
        </div>
      </div>
    </div>
  );
}
