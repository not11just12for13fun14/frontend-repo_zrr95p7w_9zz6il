import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Emergency() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${API}/emergencies`).then(r=>r.json()).then(setList).catch(()=>{})
  }, [])

  return (
    <section id="emergency" className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Emergency Numbers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((e, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="text-white font-medium">{e.area}</div>
              <div className="text-rose-300 text-xl font-mono">{e.number}</div>
              <div className="text-slate-400 text-sm">{e.description}</div>
            </div>
          ))}
          {!list.length && (
            <div className="text-slate-400">No emergency contacts added yet.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Emergency
