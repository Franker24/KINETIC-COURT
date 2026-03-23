import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ShoppingBag, X } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, size: string, sourceElement?: HTMLElement | null) => void;
}

export function ProductQuickViewModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductQuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState<'primary' | 'secondary'>('primary');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return null;
  }

  useEffect(() => {
    setSelectedImage('primary');
    setSelectedSize(product.sizes[0] ?? null);
  }, [product]);

  const currentImage = selectedImage === 'primary' ? product.image : product.secondaryImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[81] bg-black/80 px-4 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="mx-auto max-h-full w-full max-w-6xl overflow-auto rounded-[2rem] border border-white/10 bg-[#101010] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:p-6 lg:rounded-[2.5rem] lg:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#ff9069]">
                  Product view
                </p>
                <h2 className="mt-2 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                  {product.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_420px] lg:gap-8">
              <div>
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818]">
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[product.image, product.secondaryImage].map((image, index) => {
                    const isActive =
                      (index === 0 && selectedImage === 'primary') ||
                      (index === 1 && selectedImage === 'secondary');
                    return (
                      <button
                        key={image}
                        onClick={() => setSelectedImage(index === 0 ? 'primary' : 'secondary')}
                        className={`overflow-hidden rounded-[1.5rem] border ${
                          isActive ? 'border-[#ff9069]/50' : 'border-white/10'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="h-40 w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-[#151515] p-5 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                  {product.category}
                </p>
                <p className="mt-4 font-headline text-5xl font-black text-white">{product.price}</p>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-white/45">
                  {product.colors}
                </p>
                <p className="mt-6 text-base leading-relaxed text-white/60">
                  {product.description}
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-[#101010] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Collection</p>
                  <p className="mt-2 font-headline text-2xl font-black italic text-white">
                    {product.collection}
                  </p>
                  <p className="mt-3 text-sm text-white/50">{product.material}</p>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                    Select size
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
                          selectedSize === size
                            ? 'border-[#ff9069]/50 bg-[#ff9069] text-black'
                            : 'border-white/10 bg-[#1c1c1c] text-white/65 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">Look</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      Two product views so the shopper can see the item from a stronger editorial angle.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
                    <div className="flex items-center gap-3 text-[#ff9069]">
                      <Check size={16} />
                      <p className="text-xs uppercase tracking-[0.22em]">Ready to ship</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">
                      Available in the sizes listed above.
                    </p>
                  </div>
                </div>

                <button
                  onClick={(event) => {
                    onAddToCart(product.id, selectedSize ?? product.sizes[0], event.currentTarget);
                    onClose();
                  }}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ff9069] py-4 font-headline text-lg font-black italic tracking-tight text-black transition-colors hover:bg-[#fe5e1e] lg:sticky lg:bottom-0"
                >
                  <ShoppingBag size={18} />
                  Add to cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
