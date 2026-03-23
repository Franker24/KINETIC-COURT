import { useState } from 'react';
import { animated, useTransition } from '@react-spring/web';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BEST_SELLERS } from '../data/products';
import { ProductCard } from './ProductCard';

interface BestSellersSectionProps {
  onNavigate: (target: string) => void;
}

export function BestSellersSection({ onNavigate }: BestSellersSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const transitions = useTransition(activeIndex, {
    from: { opacity: 0, transform: 'translate3d(60px,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0px,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-60px,0,0)' },
    config: { tension: 240, friction: 24 },
  });

  function showPrevious() {
    setActiveIndex((current) => (current === 0 ? BEST_SELLERS.length - 1 : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current === BEST_SELLERS.length - 1 ? 0 : current + 1));
  }

  return (
    <section className="bg-[#131313] py-32" id="roster">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div>
            <span className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#ff9069]">
              THE ROSTER
            </span>
            <h2 className="mt-4 font-headline text-5xl font-black italic uppercase tracking-tighter text-white md:text-7xl">
              BEST SELLERS
            </h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={showPrevious}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:border-[#ff9069] hover:bg-[#ff9069] hover:text-black"
              aria-label="Show previous best seller"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={showNext}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:border-[#ff9069] hover:bg-[#ff9069] hover:text-black"
              aria-label="Show next best seller"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.3fr)_380px]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818] p-6 md:p-8">
            {transitions((style, index) => (
              <animated.div style={style} className="absolute inset-0 p-6 md:p-8">
                <div className="grid h-full gap-8 md:grid-cols-[1.2fr_minmax(0,0.8fr)]">
                  <div className="overflow-hidden rounded-[1.75rem] bg-[#111111]">
                    <img
                      src={BEST_SELLERS[index].image}
                      alt={BEST_SELLERS[index].name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff9069]">
                      BEST SELLER 0{index + 1}
                    </p>
                    <h3 className="mt-5 font-headline text-4xl font-black italic uppercase tracking-tighter text-white md:text-5xl">
                      {BEST_SELLERS[index].name}
                    </h3>
                    <p className="mt-4 text-base font-medium uppercase tracking-[0.15em] text-white/45">
                      {BEST_SELLERS[index].colors}
                    </p>
                    <p className="mt-6 text-base leading-relaxed text-white/60">
                      {BEST_SELLERS[index].description}
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="font-headline text-3xl font-black text-white">
                        {BEST_SELLERS[index].price}
                      </span>
                      <span className="rounded-full border border-[#ff9069]/25 bg-[#ff9069]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb296]">
                        {BEST_SELLERS[index].category}
                      </span>
                    </div>
                    <button
                      onClick={() => onNavigate('store')}
                      className="mt-10 w-fit rounded-2xl bg-[#ff9069] px-7 py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e]"
                    >
                      Shop This Pair
                    </button>
                  </div>
                </div>
              </animated.div>
            ))}
          </div>

          <div className="grid gap-5">
            {BEST_SELLERS.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setActiveIndex(index)}
                className={`rounded-[1.5rem] border p-4 text-left transition-all ${
                  index === activeIndex
                    ? 'border-[#ff9069]/50 bg-[#1b1b1b]'
                    : 'border-white/10 bg-[#151515] hover:border-white/20'
                }`}
              >
                <div className="grid items-center gap-4 sm:grid-cols-[92px_minmax(0,1fr)]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-full rounded-2xl object-cover sm:w-24"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                      {product.category}
                    </p>
                    <h4 className="mt-2 font-headline text-2xl font-black italic uppercase tracking-tight text-white">
                      {product.name}
                    </h4>
                    <p className="mt-2 text-sm text-white/50">{product.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
