'use client'

import { useState } from 'react'
import { Assureur } from '@/types'
import {
  FaBuilding,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileContract,
  FaToggleOn
} from 'react-icons/fa'

type AssureurFormProps = Readonly<{
  onSubmit: (data: Assureur) => void
  initialData?: Partial<Assureur>
}>

export default function AssureurForm({ onSubmit, initialData = {} }: AssureurFormProps) {
  const [formData, setFormData] = useState<Assureur>({
    name: initialData.name ?? '',
    contactPerson: initialData.contactPerson ?? '',
    email: initialData.email ?? '',
    phone: initialData.phone ?? '',
    address: initialData.address ?? '',
    contractFile: initialData.contractFile ?? '',
    isActive: initialData.isActive ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const fields = [
    {
      id: 'name',
      placeholder: 'Nom de la compagnie',
      icon: <FaBuilding className="text-green-500" />,
      type: 'text',
      required: true
    },
    {
      id: 'contactPerson',
      placeholder: 'Personne de contact',
      icon: <FaUserTie className="text-yellow-500" />,
      type: 'text',
      required: true
    },
    {
      id: 'email',
      placeholder: 'Email',
      icon: <FaEnvelope className="text-blue-500" />,
      type: 'email',
      required: true
    },
    {
      id: 'phone',
      placeholder: 'Téléphone',
      icon: <FaPhone className="text-red-500" />,
      type: 'text',
      required: true
    },
    {
      id: 'address',
      placeholder: 'Adresse',
      icon: <FaMapMarkerAlt className="text-black" />,
      type: 'text',
      required: false
    },
    {
      id: 'contractFile',
      placeholder: 'Lien du contrat',
      icon: <FaFileContract className="text-orange-500" />,
      type: 'text',
      required: false
    }
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto border border-blue-100"
    >
      <h2 className="text-2xl font-bold text-black mb-4 text-center">Ajouter un assureur</h2>

      {fields.map(({ id, placeholder, icon, type, required }) => (
        <div key={id}>
          <label htmlFor={id} className="font-medium text-gray-700 flex items-center gap-2 mb-1">
            {icon} {placeholder}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            required={required}
            placeholder={placeholder}
            value={(formData as any)[id]}
            onChange={handleChange}
            className="input input-bordered w-full bg-blue-50  text-black focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      ))}

      <label className="flex items-center gap-2 text-gray-700 font-medium mt-2">
        <FaToggleOn className="text-blue-500" />
        <span>Actif</span>
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="toggle toggle-primary ml-auto"
        />
      </label>

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 transition"
      >
        Enregistrer
      </button>
    </form>
  )
}
