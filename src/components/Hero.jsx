import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 pointer-events-none">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">Your Health, Organized and In Control</h1>
            <p className="mt-3 md:mt-4 text-blue-200/90">Manage doctors, patients, appointments, payments, and real-time health metrics with an intelligent assistant that reminds, suggests diet, and keeps you hydrated.</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero
