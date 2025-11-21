import { Menu } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#dashboard', label: 'Dashboard' },
    { href: '#portals', label: 'Portals' },
    { href: '#ai', label: 'AI Nurse' },
    { href: '#nearby', label: 'Nearby' },
    { href: '#emergency', label: 'Emergency' },
    { href: '#articles', label: 'Articles' },
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-slate-950/70 backdrop-blur border-b border-white/10">
      <div className="container mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-semibold text-lg">HealthTrack</a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-slate-300 hover:text-white text-sm">{l.label}</a>
          ))}
          <a href="/test" className="text-blue-300 text-sm">Backend Test</a>
        </nav>
        <button className="md:hidden text-white" onClick={()=>setOpen(!open)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/90">
          <div className="px-6 py-3 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-slate-200 text-sm">{l.label}</a>
            ))}
            <a href="/test" className="text-blue-300 text-sm">Backend Test</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
