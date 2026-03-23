import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, ShieldCheck, X } from 'lucide-react';
import type { CartItem } from '../types/cart';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onBackToCart: () => void;
  onConfirm: () => void;
}

function parsePrice(price: string) {
  return Number(price.replace('$', ''));
}

export function CheckoutModal({
  isOpen,
  items,
  onClose,
  onBackToCart,
  onConfirm,
}: CheckoutModalProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    cardName: '',
    cardNumber: '',
  });

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0),
    [items],
  );
  const shipping = items.length > 0 ? 18 : 0;
  const total = subtotal + shipping;

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsComplete(true);
    onConfirm();
  }

  function handleClose() {
    setIsComplete(false);
    setForm({
      fullName: '',
      email: '',
      address: '',
      city: '',
      cardName: '',
      cardNumber: '',
    });
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[79] bg-black/75 px-4 py-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="mx-auto max-h-full w-full max-w-6xl overflow-auto rounded-[2.5rem] border border-white/10 bg-[#101010] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:p-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#ff9069]">
                  Secure checkout
                </p>
                <h2 className="mt-2 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                  {isComplete ? 'Order confirmed' : 'Complete your order'}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            {isComplete ? (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-8">
                  <div className="flex items-center gap-4 text-[#ff9069]">
                    <CheckCircle2 size={28} />
                    <p className="font-headline text-3xl font-black italic text-white">
                      Payment approved
                    </p>
                  </div>
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
                    Your order is now in motion. We generated a demo confirmation flow so the cart
                    actually finishes with a clear success state instead of stopping at the drawer.
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Confirmation
                      </p>
                      <p className="mt-2 font-headline text-2xl font-black text-white">KC-2048</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Delivery
                      </p>
                      <p className="mt-2 font-headline text-2xl font-black text-white">3-5 days</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#111111] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        Total
                      </p>
                      <p className="mt-2 font-headline text-2xl font-black text-white">${total}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-8 rounded-2xl bg-[#ff9069] px-6 py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e]"
                  >
                    Back to shopping
                  </button>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                  <p className="font-headline text-2xl font-black italic text-white">
                    Order summary
                  </p>
                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-headline text-lg font-black italic text-white">
                            {item.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                            Size {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-white">
                          ${parsePrice(item.price) * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <section className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                    <div className="flex items-center gap-3 text-[#ff9069]">
                      <MapPin size={18} />
                      <p className="text-xs font-bold uppercase tracking-[0.26em]">
                        Shipping details
                      </p>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <input
                        required
                        value={form.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                        placeholder="Full name"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                      />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="Email"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                      />
                      <input
                        required
                        value={form.address}
                        onChange={(event) => updateField('address', event.target.value)}
                        placeholder="Address"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25 md:col-span-2"
                      />
                      <input
                        required
                        value={form.city}
                        onChange={(event) => updateField('city', event.target.value)}
                        placeholder="City"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                      />
                    </div>
                  </section>

                  <section className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                    <div className="flex items-center gap-3 text-[#ff9069]">
                      <CreditCard size={18} />
                      <p className="text-xs font-bold uppercase tracking-[0.26em]">
                        Payment details
                      </p>
                    </div>
                    <div className="mt-5 grid gap-4">
                      <input
                        required
                        value={form.cardName}
                        onChange={(event) => updateField('cardName', event.target.value)}
                        placeholder="Name on card"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                      />
                      <input
                        required
                        minLength={16}
                        maxLength={19}
                        value={form.cardNumber}
                        onChange={(event) => updateField('cardNumber', event.target.value)}
                        placeholder="Card number"
                        className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4 text-white outline-none placeholder:text-white/25"
                      />
                    </div>
                  </section>

                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={onBackToCart}
                      className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
                    >
                      <ArrowLeft size={18} />
                      Back to cart
                    </button>
                    <button
                      type="submit"
                      className="rounded-2xl bg-[#ff9069] px-6 py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e]"
                    >
                      Confirm order
                    </button>
                  </div>
                </form>

                <aside className="rounded-[2rem] border border-white/10 bg-[#151515] p-6">
                  <div className="flex items-center gap-3 text-[#ff9069]">
                    <ShieldCheck size={18} />
                    <p className="text-xs font-bold uppercase tracking-[0.26em]">Order summary</p>
                  </div>
                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-headline text-lg font-black italic text-white">
                            {item.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                            Size {item.size} · Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-white">
                          ${parsePrice(item.price) * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                    <div className="flex items-center justify-between text-white/55">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex items-center justify-between text-white/55">
                      <span>Shipping</span>
                      <span>${shipping}</span>
                    </div>
                    <div className="flex items-center justify-between font-headline text-2xl font-black text-white">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
