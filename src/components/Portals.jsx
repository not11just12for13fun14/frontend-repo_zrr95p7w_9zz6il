import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ title, children }) {
  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

function List({ items, fields }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((it, idx) => (
        <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          {fields.map(f => (
            <div key={f.key} className="text-sm text-slate-300"><span className="text-slate-400">{f.label}: </span>{String(it[f.key] ?? '')}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Portals() {
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [families, setFamilies] = useState([])
  const [admins, setAdmins] = useState([])

  const loadAll = async () => {
    const endpoints = ['doctors','patients','families','admins']
    const [d, p, f, a] = await Promise.all(endpoints.map(ep => fetch(`${API}/${ep}`).then(r=>r.json())))
    setDoctors(d); setPatients(p); setFamilies(f); setAdmins(a)
  }

  useEffect(()=>{ loadAll() }, [])

  return (
    <section className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10 space-y-6">
        <h2 className="text-2xl font-semibold text-white">Portals</h2>
        <Section title="Doctors">
          <List items={doctors} fields={[
            {key:'name', label:'Name'},
            {key:'specialization', label:'Specialization'},
            {key:'qualification', label:'Qualification'},
            {key:'current_hospital', label:'Hospital'},
            {key:'years_of_experience', label:'Experience'},
            {key:'location', label:'Location'}
          ]} />
        </Section>
        <Section title="Patients">
          <List items={patients} fields={[
            {key:'patient_id', label:'Patient ID'},
            {key:'full_name', label:'Name'},
            {key:'gender', label:'Gender'},
            {key:'contact_number', label:'Phone'},
            {key:'email', label:'Email'}
          ]} />
        </Section>
        <Section title="Families">
          <List items={families} fields={[
            {key:'family_id', label:'Family ID'},
            {key:'contact_number', label:'Phone'},
            {key:'address', label:'Address'}
          ]} />
        </Section>
        <Section title="Admins">
          <List items={admins} fields={[
            {key:'admin_id', label:'Admin ID'},
            {key:'full_name', label:'Name'},
            {key:'role', label:'Role'},
            {key:'email', label:'Email'}
          ]} />
        </Section>
      </div>
    </section>
  )
}

export default Portals
