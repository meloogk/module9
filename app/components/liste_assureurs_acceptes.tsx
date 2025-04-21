import { Assureur } from "@/types"
import { FaSearch, FaBuilding, FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaEdit, FaTrash } from 'react-icons/fa'

interface Props {
  readonly assureurs: Assureur[]; 
  readonly onEdit: (assureur: Assureur) => void; 
  readonly onDelete: (id?: string) => void; 
  readonly search: string; 
  readonly setSearch: (value: string) => void; 
}

export default function ListeAssureurs({ assureurs, onEdit, onDelete, search, setSearch }: Props) {
  const filteredAssureurs = assureurs.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex items-center mb-4 bg-gray-100 rounded px-3 py-2">
        <FaSearch className="text-black mr-2" />
        <input
          type="text"
          placeholder="Rechercher un assureur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-black w-full text-sm"
        />
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {filteredAssureurs.length > 0 ? (
          filteredAssureurs.map((a) => (
            <div key={a._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <FaBuilding className="text-green-500" /> {a.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-700">
                    <p className="flex items-center gap-2"><FaUserTie className="text-yellow-500" /> {a.contactPerson}</p>
                    <p className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> {a.email}</p>
                    <p className="flex items-center gap-2"><FaPhone className="text-red-500" /> {a.phone}</p>
                    {a.address && <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-black" /> {a.address}</p>}
                    <p className="flex items-center gap-2">
                      {a.isActive ? (
                        <>
                          <FaCheckCircle className="text-green-500" />
                          <span className="text-green-700 font-medium">Actif</span>
                        </>
                      ) : (
                        <>
                          <FaTimesCircle className="text-red-500" />
                          <span className="text-red-700 font-medium">Inactif</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => onEdit(a)} 
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`Modifier ${a.name}`} 
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => onDelete(a._id)} 
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Supprimer ${a.name}`} 
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-black italic">Aucun assureur trouvé.</p>
        )}
      </div>
    </div>
  )
}
