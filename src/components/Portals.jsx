import { useEffect, useMemo, useState } from 'react'
import { Stethoscope, Users as UsersIcon, Shield, User, Search, MapPin, Mail, Phone, GraduationCap, Building2, Activity, Calendar, Clock } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const tabs = [
  { key: 'doctors', label: 'Doctors', icon: Stethoscope, accent: 'from-emerald-400/20 via-emerald-500/10 to-transparent' },
  { key: 'patients', label: 'Patients', icon: User, accent: 'from-sky-400/20 via-sky-500/10 to-transparent' },
  { key: 'families', label: 'Families', icon: UsersIcon, accent: 'from-violet-400/20 via-violet-500/10 to-transparent' },
  { key: 'admins', label: 'Admins', icon: Shield, accent: 'from-amber-400/20 via-amber-500/10 to-transparent' },
]

function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-slate-800/60 border border-slate-700 px-3 py-1 text-slate-200">
      <Icon className="h-4 w-4 text-slate-300" />
      <span className="text-slate-300/90">{label}</span>
      <span className="ml-1 font-semibold text-white">{value}</span>
    </div>
  )
}

function Avatar({ name }) {
  const letter = (name || '?').trim().charAt(0).toUpperCase()
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent blur" />
      <div className="relative h-12 w-12 rounded-full bg-slate-800 ring-2 ring-slate-700 grid place-items-center text-white font-semibold">
        {letter}
      </div>
    </div>
  )
}

function DoctorCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5 hover:border-emerald-500/50 transition-all">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
      <div className="flex items-start gap-4">
        <Avatar name={item.name} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-emerald-400" />
            <h4 className="text-white font-semibold leading-tight">{item.name || 'Unknown Doctor'}</h4>
          </div>
          <div className="mt-1 text-sm text-slate-300">{item.specialization || 'General'}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-slate-400" /><span>{item.qualification || '—'}</span></div>
            <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-slate-400" /><span>{item.current_hospital || '—'}</span></div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-slate-400" /><span>{item.years_of_experience != null ? `${item.years_of_experience} yrs` : '—'}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /><span>{item.location || '—'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PatientCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5 hover:border-sky-500/50 transition-all">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-sky-500/10 to-transparent pointer-events-none" />
      <div className="flex items-start gap-4">
        <Avatar name={item.full_name || item.patient_id} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-sky-400" />
            <h4 className="text-white font-semibold leading-tight">{item.full_name || 'Unnamed Patient'}</h4>
          </div>
          <div className="mt-1 text-sm text-slate-300">ID: {item.patient_id}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /><span>{item.contact_number || '—'}</span></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" /><span>{item.email || '—'}</span></div>
            <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-slate-400" /><span>{item.gender || '—'}</span></div>
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-400" /><span>{item.date_of_birth || '—'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FamilyCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5 hover:border-violet-500/50 transition-all">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none" />
      <div className="flex items-start gap-4">
        <Avatar name={item.family_id} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-violet-400" />
            <h4 className="text-white font-semibold leading-tight">Family #{item.family_id}</h4>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /><span>{item.contact_number || '—'}</span></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /><span>{item.address || '—'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-5 hover:border-amber-500/50 transition-all">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
      <div className="flex items-start gap-4">
        <Avatar name={item.full_name || item.admin_id} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-400" />
            <h4 className="text-white font-semibold leading-tight">{item.full_name || 'Admin'}</h4>
          </div>
          <div className="mt-1 text-sm text-slate-300">Role: {item.role || '—'}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" /><span>{item.email || '—'}</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" /><span>{item.phone || '—'}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div className="col-span-full text-center py-10 text-slate-400">
      No {label} found yet.
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 animate-pulse">
      <div className="h-4 w-28 bg-slate-700/70 rounded mb-4" />
      <div className="h-3 w-full bg-slate-800 rounded mb-2" />
      <div className="h-3 w-2/3 bg-slate-800 rounded" />
    </div>
  )
}

function Toolbar({ activeTab, onSearch }) {
  const Icon = tabs.find(t => t.key === activeTab)?.icon || User
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-slate-800 border border-slate-700">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div className="text-white font-semibold text-lg">{tabs.find(t => t.key === activeTab)?.label}</div>
      </div>
      <div className="relative max-w-sm w-full">
        <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input onChange={e=>onSearch(e.target.value)} placeholder="Search by name..." className="w-full pl-10 pr-3 h-10 rounded-xl bg-slate-900/70 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-600" />
      </div>
    </div>
  )
}

function SectionShell({ children, accent }) {
  return (
    <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 overflow-hidden">
      <div className={`pointer-events-none absolute -top-32 -left-28 h-64 w-64 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className={`pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative">{children}</div>
    </div>
  )
}

function Grid({ children }) {
  return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">{children}</div>
}

export default function Portals() {
  const [active, setActive] = useState('doctors')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ doctors: [], patients: [], families: [], admins: [] })

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true)
        const endpoints = ['doctors', 'patients', 'families', 'admins']
        const results = await Promise.all(
          endpoints.map(ep => fetch(`${API}/${ep}`).then(r => r.ok ? r.json() : []))
        )
        setData({ doctors: results[0] || [], patients: results[1] || [], families: results[2] || [], admins: results[3] || [] })
      } catch (e) {
        setData({ doctors: [], patients: [], families: [], admins: [] })
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    const pick = (list, keys) => list.filter(it => keys.some(k => String(it[k] || '').toLowerCase().includes(q)))
    return {
      doctors: pick(data.doctors, ['name', 'specialization', 'current_hospital']),
      patients: pick(data.patients, ['full_name', 'patient_id', 'email']),
      families: pick(data.families, ['family_id', 'address']),
      admins: pick(data.admins, ['full_name', 'email', 'role']),
    }
  }, [data, search])

  const counts = {
    doctors: data.doctors.length,
    patients: data.patients.length,
    families: data.families.length,
    admins: data.admins.length,
  }

  const renderCards = () => {
    if (loading) {
      return (
        <Grid>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </Grid>
      )
    }

    const list = filtered[active]
    if (!list || list.length === 0) {
      return <EmptyState label={tabs.find(t => t.key === active)?.label || 'items'} />
    }

    return (
      <Grid>
        {list.map((item, idx) => {
          if (active === 'doctors') return <DoctorCard key={idx} item={item} />
          if (active === 'patients') return <PatientCard key={idx} item={item} />
          if (active === 'families') return <FamilyCard key={idx} item={item} />
          return <AdminCard key={idx} item={item} />
        })}
      </Grid>
    )
  }

  return (
    <section className="py-14 bg-slate-950">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Portals</h2>
            <p className="text-slate-400 mt-2">Browse all profiles with elegant, glanceable cards and quick search.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <StatPill icon={Stethoscope} label="Doctors" value={counts.doctors} />
            <StatPill icon={User} label="Patients" value={counts.patients} />
            <StatPill icon={UsersIcon} label="Families" value={counts.families} />
            <StatPill icon={Shield} label="Admins" value={counts.admins} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative rounded-xl px-4 py-2 text-sm transition-all border ${
                active === t.key
                  ? 'text-white border-slate-700 bg-slate-900/70'
                  : 'text-slate-300 border-slate-800 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <t.icon className={`h-4 w-4 ${active === t.key ? 'text-white' : 'text-slate-300'}`} />
                <span>{t.label}</span>
                <span className="ml-1 rounded-full bg-slate-800 border border-slate-700 px-2 text-xs text-slate-300">{counts[t.key]}</span>
              </div>
              {active === t.key && (
                <div className={`absolute inset-x-2 -bottom-px h-px bg-gradient-to-r ${t.accent}`} />
              )}
            </button>
          ))}
        </div>

        <SectionShell accent={tabs.find(t => t.key === active)?.accent}>
          <Toolbar activeTab={active} onSearch={setSearch} />
          {renderCards()}
        </SectionShell>
      </div>
    </section>
  )
}
