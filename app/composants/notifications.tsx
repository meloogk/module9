'use client'

import { useEffect, useState } from 'react'
import { Facture } from '@/type'

interface Props {
  readonly factures: readonly Facture[]
}

export default function Notification({ factures }: Props) {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    // Vérifie que factures est un tableau avant d'effectuer des opérations dessus
    if (Array.isArray(factures)) {
      const newNotifs = factures
        .filter((facture) => facture.statut !== 'en_attente')
        .map((facture) => `La facture #${facture._id} est maintenant ${facture.statut}`)
      setNotifications(newNotifs)
    } else {
      console.error("factures n'est pas un tableau valide", factures)
    }
  }, [factures])

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notif) => (
        <div
          key={notif} // ✅ Utilise le message comme clé, plus stable que l'index
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-slideUp"
        >
          {notif}
        </div>
      ))}
    </div>
  )
}
