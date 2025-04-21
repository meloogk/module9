export interface Assureur {
    _id?: string
    name: string
    contactPerson: string
    email: string
    phone: string
    address?: string
    contractFile?: string
    isActive?: boolean
    createdAt?: string
    updatedAt?: string
  }
  

  export type ChargeStatus = 'pending' | 'approved' | 'denied' | 'expired'

export interface Priseencharge {
  _id?: string
  patientId: string
  providerId: string
  coverageType: string
  authorizedAmount: number
  expirationDate: string 
  status: ChargeStatus
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export type PaymentMethod =
  | 'cash'
  | 'card'
  | 'bank_transfer'
  | 'insurance'
  | 'other'

export interface Factures {
  _id?: string
  patientId: string
  authorizationId?: string
  invoiceNumber: string
  totalAmount: number
  coveredAmount: number
  patientResponsibility: number
  paymentMethod: PaymentMethod
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface Patient {
    _id: string
    name: string
    prenom:string
    date_naissance:Date
    sexe:string
    adresse:string
    telephone:string
    email:string
    groupe_sanguin:string
    situation_medicale:string
    assurance:{
      nom:string,
      numero_contrat:string,
      couverture:string,
      date_expiration:Date
    },
    factures:Factures[]
    contacts_urgences: { nom:string, telephone:string, lien:string }[]

  }
  
  export interface ContratAssurance {
    _id?: string
    patientId: string
    providerId: string
    policyNumber: string
    startDate: string
    endDate: string
    coveragePercentage: number
    maxCoverageAmount: number
    isActive: boolean
    notes?: string
    createdAt?: string
    updatedAt?: string
  }

  export type ServiceMedical = {
    _id: string
    nom: string
    coutTotal: number
    coutPrisEnCharge: number
    patientId: string
    factureId?: string
    date: string
  }
  
  export interface StatistiqueItem {
    serviceId: string
    serviceName: string
    assureurId: string
    assureurName: string
    price: number
  }