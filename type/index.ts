
export interface Patient {
    _id?: string;
    nom: string;
    prenom: string;
    dateNaissance: string;
    assurance?: {
      assureurId: string;
      numeroAdherent: string;
      dateDebut: string;
      dateFin?: string;
    };
  }


export interface Assureur {
    _id?: string;
    nom: string;
    adresse?: string;
    telephone?: string;
    email?: string;
    conventions?: {
      acte: string;
      tauxPriseEnCharge: number; // ex: 0.80 pour 80%
    }[];
  }

  
export interface Soin {
    _id?: string;
    patientId: string;
    description: string;
    date: string;
    montant: number;
    validéParAssureur: boolean;
  }
  
  
export interface Facture {
    _id?: string;
    soinId: string;
    patientId: string;
    assureurId: string;
    dateEmission: string;
    montantTotal: number;
    montantRemboursé?: number;
    statut: 'en_attente' | 'remboursée' | 'rejetée';
  }
  
  