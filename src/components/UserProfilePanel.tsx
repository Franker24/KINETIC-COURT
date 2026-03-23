import { AnimatePresence, motion } from 'motion/react';
import {
  Bell,
  Heart,
  PlayCircle,
  ShoppingBag,
  Star,
  UserRound,
  X,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { WishlistItem } from '../types/wishlist';

interface UserProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string) => void;
  onOpenVideo: () => void;
  wishlist: WishlistItem[];
  onToggleWishlist: (productId: string) => void;
  profileName: string;
  favoriteTeam: string;
  avatarImage: string | null;
  onOpenAccountSettings: () => void;
}

const QUICK_ACTIONS = [
  { label: 'Open Store', target: 'store', icon: ShoppingBag },
  { label: 'Best Sellers', target: 'roster', icon: Star },
  { label: 'Labs', target: 'labs', icon: Heart },
];

export function UserProfilePanel({
  isOpen,
  onClose,
  onNavigate,
  onOpenVideo,
  wishlist,
  onToggleWishlist,
  profileName,
  favoriteTeam,
  avatarImage,
  onOpenAccountSettings,
}: UserProfilePanelProps) {
  const wishlistProducts = wishlist
    .map((item) => PRODUCTS.find((product) => product.id === item.productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
    .slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[75] bg-black/65 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-0 right-0 h-full w-full max-w-md border-l border-white/10 bg-[#101010] p-6 shadow-[-30px_0_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-headline text-2xl font-black italic uppercase tracking-tight text-white">
                Player Profile
              </p>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#262626] text-[#ff9069]">
                  {avatarImage ? (
                    <img
                      src={avatarImage}
                      alt={profileName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound size={28} />
                  )}
                </div>
                <div>
                  <p className="font-headline text-2xl font-black italic text-white">
                    {profileName}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[#ff9069]">
                    {favoriteTeam ? `${favoriteTeam} supporter` : 'Pro member'}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#171717] p-4 text-center">
                  <p className="font-headline text-2xl font-black text-white">{wishlist.length}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Saved
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#171717] p-4 text-center">
                  <p className="font-headline text-2xl font-black text-white">4</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Orders
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#171717] p-4 text-center">
                  <p className="font-headline text-2xl font-black text-white">VIP</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Tier
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/40">
                Wishlist
              </p>
              <div className="mt-4 space-y-3">
                {wishlistProducts.length > 0 ? (
                  wishlistProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#161616] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-headline text-lg font-black italic text-white">
                            {product.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                            {product.category}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onToggleWishlist(product.id)}
                        className="text-[#ff9069] transition-colors hover:text-white"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center text-white/45">
                    No saved products yet.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-white/40">
                Quick actions
              </p>
              <div className="mt-4 space-y-3">
                {QUICK_ACTIONS.map(({ label, target, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => {
                      onNavigate(target);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 text-left transition-colors hover:border-[#ff9069]/40 hover:bg-[#1d1d1d]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[#ff9069]">
                        <Icon size={18} />
                      </div>
                      <span className="font-headline text-xl font-black italic text-white">
                        {label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#151515] p-5">
              <div className="flex items-center gap-3 text-[#ff9069]">
                <Bell size={18} />
                <p className="text-xs font-bold uppercase tracking-[0.25em]">Latest access</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Early access for the next jersey capsule opens in 2 days. Keep your profile ready
                to secure preferred sizes before public release.
              </p>
              <button
                onClick={() => {
                  onOpenVideo();
                  onClose();
                }}
                className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <PlayCircle size={18} />
                Watch launch video
              </button>
            </div>

            <button
              onClick={onOpenAccountSettings}
              className="mt-8 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-left transition-colors hover:border-[#ff9069]/40 hover:bg-[#1d1d1d]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-[#ff9069]">
                <UserRound size={18} />
              </div>
              <div>
                <p className="font-headline text-lg font-black italic text-white">
                  Account ready
                </p>
                <p className="text-sm text-white/50">
                  Personalized area activated from the navbar avatar.
                </p>
              </div>
            </button>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
