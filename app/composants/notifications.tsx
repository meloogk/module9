
'use client';

import { useEffect, useState } from 'react';
import { Facture } from '@/type';;

interface Props {
  factures: Facture[];
}

export default function Notification({ factures }: Props) {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const newNotifs = factures
      .filter((facture) => facture.statut !== 'en_attente')
      .map((facture) => `La facture #${facture._id} est maintenant ${facture.statut}`);
    setNotifications(newNotifs);
  }, [factures]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notif, index) => (
        <div
          key={index}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-slideUp"
        >
          {notif}
        </div>
      ))}
    </div>
  );
}
