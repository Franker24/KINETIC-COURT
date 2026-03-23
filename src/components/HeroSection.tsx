import { motion } from 'motion/react';

interface HeroSectionProps {
  onShopClick: () => void;
  onWatchVideoClick: () => void;
}

export function HeroSection({ onShopClick, onWatchVideoClick }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20" id="home">
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full scale-105 object-cover opacity-50"
          src="https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000"
          alt="Basketball Action"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-[#0e0e0e] to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="mb-6 inline-block font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#ff9069] md:text-sm">
            SEASON 24 // NEW ARRIVAL
          </span>
          <h1 className="mb-10 font-headline text-6xl leading-[0.85] font-black italic uppercase tracking-tighter md:text-9xl">
            IGNITE THE
            <br />
            <span className="bg-gradient-to-r from-[#ff9069] to-[#fe5e1e] bg-clip-text text-transparent">
              HARDWOOD.
            </span>
          </h1>
          <p className="mb-12 max-w-xl text-lg leading-relaxed font-medium text-white/60 md:text-xl">
            Engineered for explosive verticality and razor-sharp cuts. Experience the next
            evolution of performance footwear.
          </p>
          <div className="flex flex-wrap gap-6">
            <button
              onClick={onShopClick}
              className="rounded-2xl bg-[#ff9069] px-10 py-5 font-headline text-xl font-black italic tracking-tight text-black shadow-[0_20px_50px_rgba(255,144,105,0.3)] transition-all duration-300 hover:bg-[#fe5e1e]"
            >
              SHOP COLLECTION
            </button>
            <button
              onClick={onWatchVideoClick}
              className="rounded-2xl border border-white/10 bg-white/10 px-10 py-5 font-headline text-xl font-black italic tracking-tight text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              WATCH VIDEO
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-12 bottom-24 hidden items-end gap-12 lg:flex lg:flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-right"
        >
          <div className="font-headline text-6xl leading-none font-black italic text-white">
            12%
          </div>
          <div className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#ff9069]">
            Lighter Response
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-right"
        >
          <div className="font-headline text-6xl leading-none font-black italic text-white">
            4.2S
          </div>
          <div className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#ff9069]">
            Peak Acceleration
          </div>
        </motion.div>
      </div>
    </section>
  );
}
