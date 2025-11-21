import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Nearby() {
  const [coords, setCoords] = useState(null)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const search = async (lat, lng) => {
    try {
      const res = await fetch(`${API}/nearby-hospitals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, radius_km: 25 })
      })
      const data = await res.json()
      setResults(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to fetch nearby hospitals')
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported')
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setCoords(c)
        search(c.lat, c.lng)
      },
      err => setError(err.message)
    )
  }, [])

  return (
    <section id="nearby" className="py-10 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Nearby Hospitals</h2>
        {error && <div className="text-red-400 mb-3">{error}</div>}
        {coords && <div className="text-slate-400 text-sm mb-4">Your location: {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}</div>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((h, i) => (
            <div key={i} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="text-white font-medium">{h.name || 'Hospital'}</div>
              <div className="text-slate-300 text-sm">{h.address}</div>
              <div className="text-slate-400 text-xs">{h.city}</div>
              {h.phone && <div className="text-slate-400 text-xs">{h.phone}</div>}
              {h.distance_km !== undefined && <div className="text-blue-300 text-xs">{h.distance_km} km away</div>}
            </div>
          ))}
          {!results.length && !error && (
            <div className="text-slate-400">No nearby hospitals found in the saved database.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Nearby
