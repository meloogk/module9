'use client'

import { useEffect, useState } from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

import { FaSearch, FaHospitalSymbol, FaUserShield, FaChartBar, FaPizzaSlice, FaChartLine } from 'react-icons/fa'
import type { ServiceMedical, Assureur, StatistiqueItem  } from '@/types'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function StatistiquesAvancees() {
  const [stats, setStats] = useState<StatistiqueItem[]>([])
  const [assureurs, setAssureurs] = useState<Assureur[]>([])
  const [services, setServices] = useState<ServiceMedical[]>([])
  const [search, setSearch] = useState('')
  const [selectedAssureur, setSelectedAssureur] = useState('')
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    ;(async () => {
      const [statsRes, assureursRes, servicesRes] = await Promise.all([
        fetch('/api/statistiques').then(r => r.json()),
        fetch('/api/assureurs').then(r => r.json()),
        fetch('/api/services-medical').then(r => r.json()),
      ])
      setStats(statsRes)
      setAssureurs(assureursRes)
      setServices(servicesRes)
    })()
  }, [])

  const filtered = stats.filter(item =>
    item.serviceName.toLowerCase().includes(search.toLowerCase()) &&
    (selectedAssureur === '' || item.assureurId === selectedAssureur) &&
    (selectedService === '' || item.serviceId === selectedService)
  )

  const labels = filtered.map(i => `${i.serviceName} (${i.assureurName})`)
  const dataValues = filtered.map(i => i.price)

  const barData = {
    labels,
    datasets: [{
      label: 'Montant couvert (€)',
      data: dataValues,
      backgroundColor: 'rgba(16, 185, 129, 0.6)',
    }]
  }

  const pieData = {
    labels,
    datasets: [{
      label: 'Répartition',
      data: dataValues,
      backgroundColor: ['#10B981','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#14B8A6'],
    }]
  }

  const lineData = {
    labels,
    datasets: [{
      label: 'Évolution (€)',
      data: dataValues,
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.4,
    }]
  }

  const chartOptions = {
    responsive: true as const,
    plugins: {
      legend: { position: 'bottom' as const },
      title: { display: false },
    }
  }

  return (
    <div className="space-y-8">
      {/* titre*/}
      <header className="flex items-center gap-3">
        <FaChartBar className="text-teal-600 text-2xl"/>
        <h2 className="text-2xl font-bold text-gray-800">Statistiques Services & Assureurs</h2>
      </header>

      {/* filtres*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center bg-white border rounded-lg px-3 shadow">
          <FaSearch className="text-red-400"/>
          <input
            type="text"
            placeholder="Rechercher un service..."
            className="flex-1 px-2  text-black py-2 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center bg-white border rounded-lg px-3 shadow">
          <FaUserShield className="text-yellow-400"/>
          <select
            className="flex-1 px-2 text-black py-2 focus:outline-none"
            value={selectedAssureur}
            onChange={e => setSelectedAssureur(e.target.value)}
            aria-label="Filtrer par assureur"
          >
            <option value="">Tous les assureurs</option>
            {assureurs.map(a =>
              <option key={a._id} value={a._id}>{a.name}</option>
            )}
          </select>
        </div>

        <div className="flex items-center bg-white border rounded-lg px-3 shadow">
          <FaHospitalSymbol className="text-green-400"/>
          <select
            className="flex-1 text-black px-2 py-2 focus:outline-none"
            value={selectedService}
            onChange={e => setSelectedService(e.target.value)}
            aria-label="Filtrer par service médical"
          >
            <option value="">Tous les services</option>
            {services.map(s =>
              <option key={s._id} value={s._id}>{s.nom}</option>
            )}
          </select>
        </div>
      </div>

      {/* graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Barres */}
        <div className="bg-white p-4 rounded-lg shadow group">
          <div className="flex items-center gap-2 mb-3">
            <FaChartBar className="text-teal-500 text-xl"/>
            <h3 className="text-lg font-semibold text-gray-700">Graphique en Barres</h3>
          </div>
          <Bar data={barData} options={chartOptions}/>
        </div>

        {/* Camembert */}
        <div className="bg-white p-4 rounded-lg shadow group">
          <div className="flex items-center gap-2 mb-3">
            <FaPizzaSlice className="text-indigo-500 text-xl"/>
            <h3 className="text-lg font-semibold text-gray-700">Camembert</h3>
          </div>
          <Pie data={pieData} options={chartOptions}/>
        </div>

        {/* Courbe */}
        <div className="bg-white p-4 rounded-lg shadow group">
          <div className="flex items-center gap-2 mb-3">
            <FaChartLine className="text-blue-500 text-xl"/>
            <h3 className="text-lg font-semibold text-gray-700">Courbe</h3>
          </div>
          <Line data={lineData} options={chartOptions}/>
        </div>
      </div>
    </div>
  )
}
