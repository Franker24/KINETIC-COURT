import { motion } from 'motion/react';
import { CountdownTimer } from './CountdownTimer';

export function DropCountdownSection() {
  return (
    <section className="relative overflow-hidden py-40" id="drops">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0e0e0e] opacity-95" />
        <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-[#ff9069]/10 via-transparent to-transparent blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center gap-24 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#262626]/40 p-10 backdrop-blur-xl md:p-16"
            >
              <img
                className="absolute inset-0 h-full w-full object-cover opacity-20"
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200"
                alt="Basketball background"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#111111]/78 to-[#ff9069]/10" />
              <div className="relative z-10">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#ff9069] shadow-[0_0_15px_rgba(255,144,105,0.8)]" />
                <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#ff9069]">
                  LIVE DROP COUNTDOWN
                </span>
              </div>
              <h2 className="mb-12 font-headline text-6xl leading-[0.9] font-black italic uppercase tracking-tighter text-white md:text-8xl">
                THE MIDNIGHT
                <br />
                PACK
              </h2>

              <div className="mb-12 space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff9069]">
                  Signature sneaker drop
                </p>
                <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
                  A darker, limited-run court silhouette with reflective detailing, responsive foam
                  and an editorial finish built for late-night sessions.
                </p>
              </div>

              <div className="mb-16">
                <CountdownTimer />
              </div>

              <button className="w-full rounded-2xl bg-white py-6 font-headline text-xl font-black italic tracking-tight text-black shadow-2xl transition-all duration-500 hover:bg-[#ff9069]">
                GET NOTIFIED OF DROP
              </button>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full lg:w-1/2">
            <motion.div
              initial={{ rotate: 0, scale: 0.9 }}
              whileInView={{ rotate: 3, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
            >
              <img
                className="h-[600px] w-full object-cover"
                src="https://images.unsplash.com/photo-1512374382149-4332c6c02151?auto=format&fit=crop&q=80&w=1000"
                alt="Midnight Pack Sneaker"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-8 md:p-10">
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff9069]">
                    The Midnight Pack Sneaker
                  </p>
                  <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="font-headline text-4xl font-black italic uppercase tracking-tight text-white md:text-5xl">
                        Night Shift Elite
                      </h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/55">
                        Obsidian black / reflective silver
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                        Drop price
                      </p>
                      <p className="mt-2 font-headline text-3xl font-black text-white">$198</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-10 -left-10 z-0 h-full w-full -rotate-3 rounded-[2.5rem] bg-[#1a1919]" />
          </div>
        </div>
      </div>
    </section>
  );
}
