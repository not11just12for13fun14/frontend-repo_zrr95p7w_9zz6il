import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Articles() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${API}/articles`).then(r=>r.json()).then(setList).catch(()=>{})
  }, [])

  return (
    <section id="articles" className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Health Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((a, i) => (
            <article key={i} className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-white font-semibold">{a.title}</h3>
              <div className="text-slate-400 text-xs mb-2">{(a.tags||[]).join(', ')}</div>
              <p className="text-slate-300 text-sm">{a.excerpt || a.body?.slice(0, 140) + '...'}</p>
            </article>
          ))}
          {!list.length && (
            <div className="text-slate-400">No articles yet.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Articles
