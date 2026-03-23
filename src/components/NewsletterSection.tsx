import { motion } from 'motion/react';

export function NewsletterSection() {
  return (
    <section className="border-y border-white/5 bg-gradient-to-b from-transparent to-[#0e0e0e] py-40" id="labs">
      <div className="container mx-auto max-w-5xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 font-headline text-5xl font-black italic uppercase tracking-tighter text-white md:text-7xl">
            JOIN THE INNER CIRCLE
          </h2>
          <p className="mx-auto mb-16 max-w-3xl text-xl leading-relaxed text-white/50 md:text-2xl">
            Get exclusive access to pre-market drops, professional training drills, and athlete
            storytelling.
          </p>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 sm:flex-row">
            <input
              className="flex-1 rounded-2xl border border-white/10 bg-[#1a1919] p-6 font-headline text-lg font-bold text-white outline-none transition-all placeholder:text-white/20 focus:ring-2 focus:ring-[#ff9069]"
              placeholder="ENTER YOUR EMAIL"
              type="email"
            />
            <button className="rounded-2xl bg-[#ff9069] px-12 py-6 font-headline text-xl font-black italic tracking-tight text-black shadow-xl transition-all duration-300 hover:bg-[#fe5e1e]">
              SUBSCRIBE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
