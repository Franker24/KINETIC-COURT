import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartItem } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

function parsePrice(price: string) {
  return Number(price.replace('$', ''));
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[78] bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            className="absolute top-0 right-0 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#101010] p-6 shadow-[-30px_0_80px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#ff9069]" />
                <h2 className="font-headline text-2xl font-black italic uppercase tracking-tight text-white">
                  Cart
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-white/10 px-6 py-16 text-center text-white/45">
                  Your cart is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-[1.75rem] border border-white/10 bg-[#161616] p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-headline text-xl font-black italic text-white">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#ff9069]">
                              Size {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-white/40 transition-colors hover:text-[#ff9069]"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="font-headline text-2xl font-black text-white">{item.price}</p>
                          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#111111] px-3 py-2">
                            <button onClick={() => onDecrement(item.id)} className="text-white/60 hover:text-[#ff9069]">
                              <Minus size={14} />
                            </button>
                            <span className="min-w-5 text-center text-sm font-bold text-white">
                              {item.quantity}
                            </span>
                            <button onClick={() => onIncrement(item.id)} className="text-white/60 hover:text-[#ff9069]">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#151515] p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.2em] text-white/45">Subtotal</span>
                <span className="font-headline text-3xl font-black text-white">${total}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={onCheckout}
                className="mt-5 w-full rounded-2xl bg-[#ff9069] py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#fe5e1e]"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
