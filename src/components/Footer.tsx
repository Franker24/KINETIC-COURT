import { Globe, PlayCircle, Share2 } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';

const CATEGORY_LINKS = ['Performance', 'Lifestyle', 'Accessories', 'Limited Edition', 'Sale'];
const SOCIAL_ICONS = [Globe, Share2, PlayCircle];

interface FooterProps {
  onNavigate: (target: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full border-t border-white/5 bg-[#000000] px-6 py-24 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="mb-8 flex items-center gap-4">
              <img
                src="/bola.png"
                alt="Kinetic Court"
                className="h-14 w-14 object-contain"
              />
              <div className="font-headline text-4xl font-black italic tracking-tighter text-[#ff9069]">
                KINETIC COURT
              </div>
            </div>
            <p className="max-w-xs text-base leading-relaxed font-medium text-white/30">
              Defining the future of the game through engineering, speed, and uncompromising style.
              High performance editorial since 2024.
            </p>
          </div>

          <div>
            <h4 className="mb-8 font-headline text-sm font-bold uppercase tracking-[0.2em] text-white">
              NAVIGATE
            </h4>
            <ul className="space-y-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.target}>
                  <button
                    onClick={() => onNavigate(item.target)}
                    className="text-base font-medium text-white/40 transition-colors hover:text-[#ff9069]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 font-headline text-sm font-bold uppercase tracking-[0.2em] text-white">
              CATEGORIES
            </h4>
            <ul className="space-y-5">
              {CATEGORY_LINKS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('store')}
                    className="text-base font-medium text-white/40 transition-colors hover:text-[#ff9069]"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 font-headline text-sm font-bold uppercase tracking-[0.2em] text-white">
              FOLLOW
            </h4>
            <div className="flex gap-6">
              {SOCIAL_ICONS.map((Icon, index) => (
                <button
                  key={index}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-[#1a1919] text-white transition-all duration-300 hover:bg-[#262626] hover:text-[#ff9069]"
                  onClick={() => onNavigate('home')}
                >
                  <Icon size={24} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <p className="text-sm font-medium text-white/20">
            &copy; 2024 THE KINETIC COURT. HIGH PERFORMANCE EDITORIAL.
          </p>
          <div className="flex gap-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              Engineered for speed
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              Global fulfillment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
