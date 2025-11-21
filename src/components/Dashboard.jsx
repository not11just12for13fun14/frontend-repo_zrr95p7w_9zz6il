import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ label, value, unit }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
      <div className="text-slate-300 text-sm">{label}</div>
      <div className="text-white text-2xl font-semibold">
        {value ?? '--'}{unit ? <span className="text-slate-400 text-base ml-1">{unit}</span> : null}
      </div>
    </div>
  )
}

function Dashboard() {
  const [patientId, setPatientId] = useState('demo-001')
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchSummary = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/dashboard/summary?patient_id=${patientId}`)
      const data = await res.json()
      setSummary(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <section className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Health Dashboard</h2>
          <div className="flex gap-2">
            <input value={patientId} onChange={(e)=>setPatientId(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            <button onClick={fetchSummary} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">Refresh</button>
          </div>
        </div>

        {loading ? (
          <div className="text-slate-300">Loading...</div>
        ) : summary ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Stat label="BP" value={summary.health?.bp?.[0] && summary.health?.bp?.[1] ? `${summary.health.bp[0]}/${summary.health.bp[1]}` : '--'} />
            <Stat label="Oxygen" value={summary.health?.oxygen} unit="%" />
            <Stat label="WBC" value={summary.health?.wbc} />
            <Stat label="Platelet" value={summary.health?.platelet} />
            <Stat label="Sugar" value={summary.health?.sugar} unit="mg/dL" />
            <Stat label="Reports" value={summary.reports_count} />
          </div>
        ) : (
          <div className="text-slate-400">No data available yet. Add health metrics to see stats here.</div>
        )}

        <div className="mt-8">
          <h3 className="text-white font-medium mb-3">Vitamin Deficiencies</h3>
          <div className="flex flex-wrap gap-2">
            {summary?.vitamin_deficiencies?.length ? summary.vitamin_deficiencies.map((v, i) => (
              <span key={i} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full border border-amber-400/30">{v}</span>
            )) : <span className="text-slate-500 text-sm">None</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
