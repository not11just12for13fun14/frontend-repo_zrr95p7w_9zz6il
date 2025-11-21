import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Portals from './components/Portals'
import AISection from './components/AISection'
import Nearby from './components/Nearby'
import Emergency from './components/Emergency'
import Articles from './components/Articles'

function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <div id="dashboard"><Dashboard /></div>
        <div id="portals"><Portals /></div>
        <AISection />
        <Nearby />
        <Emergency />
        <Articles />
        <footer className="py-8 text-center text-slate-500 text-sm">© {new Date().getFullYear()} HealthTrack</footer>
      </main>
    </div>
  )
}

export default App
