import { motion } from 'motion/react';
import { ArrowRight, Bolt } from 'lucide-react';

interface FeaturedGridSectionProps {
  onNavigate: (target: string) => void;
}

export function FeaturedGridSection({ onNavigate }: FeaturedGridSectionProps) {
  return (
    <section className="mesh-pattern px-6 py-32 md:px-12" id="gear">
      <div className="container mx-auto">
        <div className="grid h-auto grid-cols-1 grid-rows-2 gap-8 md:h-[700px] md:grid-cols-4">
          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-[#131313] md:col-span-2 md:row-span-2"
            onClick={() => onNavigate('store')}
          >
            <img
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"
              alt="Kinetic Elite X"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <h3 className="mb-4 font-headline text-5xl font-black italic uppercase tracking-tighter text-white">
                KINETIC ELITE X
              </h3>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                Footwear Engineering
              </p>
              <span className="inline-flex items-center gap-3 text-lg font-black italic text-[#ff9069] transition-all group-hover:gap-6">
                EXPLORE SNEAKERS <ArrowRight size={20} />
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-[#131313] md:col-span-2"
            onClick={() => onNavigate('store')}
          >
            <img
              className="h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&q=80&w=1000"
              alt="Apparel"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline text-3xl font-black italic uppercase tracking-tighter text-white">
                PRO JERSEY SERIES
              </h3>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#ff9069]">
                SHOP APPAREL
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-3xl bg-[#131313] md:col-span-1"
            onClick={() => onNavigate('store')}
          >
            <img
              className="h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
              src="https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800"
              alt="Essentials"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h3 className="font-headline text-2xl font-black italic uppercase tracking-tighter text-white">
                ESSENTIALS
              </h3>
              <span className="mt-1 text-xs font-bold text-[#ff9069]">VIEW ALL</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 0.98 }}
            className="group flex flex-col items-center justify-center rounded-3xl border border-[#ff9069]/10 bg-[#262626] p-8 text-center md:col-span-1"
            onClick={() => onNavigate('labs')}
          >
            <Bolt size={48} className="mb-6 text-[#ff9069]" />
            <h3 className="mb-2 font-headline text-2xl font-black italic uppercase tracking-tighter text-white">
              KINETIC LABS
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Custom performance tuning
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
