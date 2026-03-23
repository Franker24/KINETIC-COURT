import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface MediaAdShowcaseProps {
  onNavigate: (target: string) => void;
}

const VIDEO_FEATURES = [
  {
    id: 'VXZjVl3dLHE',
    title: 'Game energy spotlight',
    copy: 'A motion-heavy ad cut to keep the homepage feeling alive and fast.',
  },
  {
    id: 'acqN-5h_Ftc',
    title: 'Hardwood mood reel',
    copy: 'A second editorial piece rotating into the ad slot for variety and atmosphere.',
  },
];

const IMAGE_FEATURES = [
  {
    src: 'https://fanatics.frgimages.com/boston-celtics/mens-mitchell-and-ness-larry-bird-kelly-green-boston-celtics-hardwood-classics-swingman-jersey_pi2751000_altimages_ff_2751337alt1_full.jpg?_hv=2&w=1018',
    title: 'Celtics classic swingman',
    team: 'Boston Celtics',
  },
  {
    src: 'https://fanatics.frgimages.com/dallas-mavericks/mens-mitchell-and-ness-dirk-nowitzki-navy-dallas-mavericks-2011/12-hardwood-classics-swingman-jersey_pi4437000_altimages_ff_4437740-d44e712852a67b0788c5alt1_full.jpg?_hv=2&w=1018',
    title: 'Dirk hardwood classic',
    team: 'Dallas Mavericks',
  },
  {
    src: 'https://fanatics.frgimages.com/golden-state-warriors/mens-mitchell-and-ness-stephen-curry-white-golden-state-warriors-hardwood-classics-swingman-jersey_ss5_p-4380802+pv-1+u-evqegd079kzdfsma4jpp+v-qp9lxrmacc3au94svmgq.jpg?_hv=2&w=1018',
    title: 'Curry retro jersey',
    team: 'Golden State Warriors',
  },
];

export function MediaAdShowcase({ onNavigate }: MediaAdShowcaseProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVideoIndex((current) => (current + 1) % VIDEO_FEATURES.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % IMAGE_FEATURES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const activeVideo = VIDEO_FEATURES[activeVideoIndex];
  const activeImage = IMAGE_FEATURES[activeImageIndex];

  return (
    <section className="px-6 py-24 md:px-12">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9069]">
              Home Ad Feature
            </p>
            <h2 className="mt-3 font-headline text-5xl font-black italic uppercase tracking-tight text-white md:text-7xl">
              Motion Meets Merch
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            A rotating media block built from the videos and jerseys you passed in, so the landing
            page gets a stronger ad/editorial presence instead of feeling static.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px]">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#141414] p-4 md:p-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
              <div className="aspect-video">
                <iframe
                  key={activeVideo.id}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#ff9069]/20 bg-[#ff9069]/10 px-4 py-2 text-[#ffb296]">
                  <PlayCircle size={18} />
                  <span className="text-xs font-bold uppercase tracking-[0.26em]">
                    Rotating video ad
                  </span>
                </div>
                <h3 className="mt-4 font-headline text-3xl font-black italic uppercase tracking-tight text-white">
                  {activeVideo.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                  {activeVideo.copy}
                </p>
              </div>
              <button
                onClick={() => onNavigate('store')}
                className="inline-flex items-center gap-3 rounded-2xl bg-[#ff9069] px-5 py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e]"
              >
                Shop the store
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {VIDEO_FEATURES.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                    activeVideoIndex === index
                      ? 'border-[#ff9069]/40 bg-[#1b1b1b]'
                      : 'border-white/10 bg-[#171717] hover:border-white/20'
                  }`}
                >
                  <p className="font-headline text-xl font-black italic text-white">{video.title}</p>
                  <p className="mt-2 text-sm text-white/45">{video.copy}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-[#141414] p-4 md:p-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#1a1a1a]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.src}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  src={activeImage.src}
                  alt={activeImage.title}
                  className="h-[430px] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                Jersey rotation
              </p>
              <h3 className="mt-3 font-headline text-3xl font-black italic uppercase tracking-tight text-white">
                {activeImage.title}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/45">
                {activeImage.team}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {IMAGE_FEATURES.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => setActiveImageIndex(index)}
                  className={`overflow-hidden rounded-[1.35rem] border transition-colors ${
                    activeImageIndex === index
                      ? 'border-[#ff9069]/50'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="h-28 w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
