import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function AISection() {
  const [patientId, setPatientId] = useState('demo-001')
  const [status, setStatus] = useState('')

  const scheduleAppt = async () => {
    const appointmentTime = new Date(Date.now() + 24*60*60*1000).toISOString()
    const params = new URLSearchParams({ appointment_id: 'apt-1', appointment_time: appointmentTime, patient_id: patientId })
    const res = await fetch(`${API}/ai-nurse/appointment-reminder?${params.toString()}`, { method: 'POST' })
    const data = await res.json()
    setStatus(`Appointment reminder scheduled: ${data.id || ''}`)
  }

  const meds = async () => {
    const res = await fetch(`${API}/ai-nurse/medication-reminders?patient_id=${patientId}&times_per_day=2&days=3`, { method: 'POST' })
    const data = await res.json()
    setStatus(`Medication reminders created: ${data.created}`)
  }

  const hydrate = async () => {
    const res = await fetch(`${API}/ai-nurse/hydration?patient_id=${patientId}&interval_hours=2&hours=12`, { method: 'POST' })
    const data = await res.json()
    setStatus(`Hydration reminders created: ${data.created}`)
  }

  return (
    <section id="ai" className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-semibold text-white mb-4">AI Nurse</h2>
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <input value={patientId} onChange={(e)=>setPatientId(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
            <button onClick={scheduleAppt} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg">Appointment Reminder</button>
            <button onClick={meds} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">Medication Reminders</button>
            <button onClick={hydrate} className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg">Hydration Reminders</button>
          </div>
          <div className="text-slate-300 text-sm">{status}</div>
        </div>
      </div>
    </section>
  )
}

export default AISection
