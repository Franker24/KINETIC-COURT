import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';

interface NavbarProps {
  onNavigate: (target: string) => void;
  onSearchOpen: () => void;
  onProfileOpen: () => void;
  onCartOpen: () => void;
  cartCount: number;
  avatarImage: string | null;
}

export function Navbar({
  onNavigate,
  onSearchOpen,
  onProfileOpen,
  onCartOpen,
  cartCount,
  avatarImage,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        <button
          onClick={() => onNavigate('home')}
          className="font-headline text-2xl font-black italic tracking-tighter text-white"
        >
          KINETIC COURT
        </button>

        <div className="hidden items-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              onClick={() => onNavigate(item.target)}
              className="group relative font-headline text-sm font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-[#ff9069]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#ff9069] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={onSearchOpen}
            className="text-white transition-colors hover:text-[#ff9069]"
            aria-label="Open search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={onCartOpen}
            className="relative text-white transition-colors hover:text-[#ff9069]"
            aria-label="Open cart"
            data-cart-anchor="true"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff9069] px-1 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onProfileOpen}
            className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#262626] text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069] md:flex"
            aria-label="Open user profile"
          >
            {avatarImage ? (
              <img
                src={avatarImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={18} />
            )}
          </button>
          <button
            className="text-white md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full border-b border-white/10 bg-[#0e0e0e] px-6 py-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => {
                    onNavigate(item.target);
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-headline text-2xl font-black italic text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
