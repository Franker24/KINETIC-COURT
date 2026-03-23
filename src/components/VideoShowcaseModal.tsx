import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, PlayCircle, X } from 'lucide-react';

interface VideoShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoShowcaseModal({ isOpen, onClose }: VideoShowcaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/80 px-4 py-10 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl justify-end">
            <button
              onClick={onClose}
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="mx-auto grid max-w-6xl gap-8 rounded-[2.5rem] border border-white/10 bg-[#111111] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:grid-cols-[minmax(0,1.25fr)_380px] lg:p-8"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src="https://www.youtube.com/embed/IJsVs6Nw6ls?autoplay=1&rel=0"
                  title="Kinetic Court featured video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#ff9069]/20 bg-[#ff9069]/10 px-4 py-2 text-[#ffb296]">
                  <PlayCircle size={18} />
                  <span className="text-xs font-bold uppercase tracking-[0.28em]">
                    Featured video
                  </span>
                </div>
                <h2 className="mt-6 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                  Watch the court story unfold
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/60">
                  A presentation-style video panel that keeps the user inside the experience while
                  highlighting the energy, movement and product attitude behind the collection.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#171717] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                    Playback
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    The video starts directly in this modal so it feels like a launch presentation
                    instead of a hard redirect.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=IJsVs6Nw6ls"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
                >
                  Open on YouTube
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
