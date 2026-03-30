import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Heart, ShoppingBag, Truck } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductDetailPageProps {
  product: Product | null;
  onNavigate: (target: string, param?: string) => void;
  onAddToCart: (productId: string, size: string, sourceElement?: HTMLElement | null) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductDetailPage({
  product,
  onNavigate,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<'primary' | 'secondary'>('primary');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage('primary');
      setSelectedSize(product.sizes[0] ?? null);
    }
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] px-6 pb-24 pt-32 md:px-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-headline font-black italic uppercase text-white mb-4">Product Not Found</h1>
          <button
            onClick={() => onNavigate('store')}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
          >
            Back to Store
          </button>
        </div>
      </main>
    );
  }

  const currentImage = selectedImage === 'primary' ? product.image : product.secondaryImage;

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-6 pb-24 pt-32 md:px-12">
      <div className="container mx-auto">
        <button
          onClick={() => onNavigate('store')}
          className="mb-8 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#ff9069]"
        >
          <ArrowLeft size={18} />
          Back to Store
        </button>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_480px] lg:gap-12 xl:gap-16">
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#151515]">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={currentImage}
                alt={product.name}
                className="h-[500px] w-full object-contain p-8 md:h-[650px] lg:h-[750px] lg:p-12 xl:h-[850px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[product.image, product.secondaryImage].map((image, index) => {
                const isActive =
                  (index === 0 && selectedImage === 'primary') ||
                  (index === 1 && selectedImage === 'secondary');
                return (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index === 0 ? 'primary' : 'secondary')}
                    className={`overflow-hidden rounded-[2rem] border transition-all ${
                      isActive ? 'border-[#ff9069]/50 opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-48 w-full object-cover sm:h-64 lg:h-72"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="sticky top-32 rounded-[2.5rem] border border-white/10 bg-[#151515] p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                    {product.category}
                  </p>
                  <h1 className="mt-4 font-headline text-5xl font-black italic uppercase tracking-tight text-white xl:text-6xl">
                    {product.name}
                  </h1>
                </div>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`mt-2 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isWishlisted
                      ? 'border-[#ff9069]/40 bg-[#ff9069] text-black'
                      : 'border-white/10 bg-[#1e1e1e] text-white hover:border-[#ff9069]/40 hover:text-[#ff9069]'
                  }`}
                >
                  <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <p className="mt-6 font-headline text-5xl font-black text-white">{product.price}</p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-white/50">
                Color: {product.colors}
              </p>

              <div className="my-10 h-px w-full bg-white/10" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                    Select Size
                  </p>
                  <button className="text-xs font-bold uppercase tracking-[0.1em] text-white/40 hover:text-white underline underline-offset-4">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 min-w-16 items-center justify-center rounded-2xl border px-4 text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
                        selectedSize === size
                          ? 'border-[#ff9069]/50 bg-[#ff9069] text-black'
                          : 'border-white/10 bg-[#1c1c1c] text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={(event) => {
                  if (selectedSize) {
                     onAddToCart(product.id, selectedSize, event.currentTarget);
                  }
                }}
                className="mt-10 flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-[#ff9069] py-5 font-headline text-xl font-black italic tracking-tight text-black transition-all hover:scale-[1.02] hover:bg-[#fe5e1e] active:scale-[0.98]"
              >
                <ShoppingBag size={22} />
                Add to Cart
              </button>

              <div className="mt-10 grid gap-4 rounded-[1.5rem] border border-white/5 bg-[#1a1a1a] p-6">
                <div className="flex items-start gap-4 text-white/70">
                  <Truck className="mt-1 shrink-0 text-[#ff9069]" size={20} />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.1em] text-white">
                      Free Standard Delivery
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      Delivery in 3-5 business days. Free returns within 30 days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-10 h-px w-full bg-white/10" />

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                  Product Details
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {product.description}
                </p>

                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-sm text-white/60">
                     <Check size={16} className="text-[#ff9069]" />
                     Collection: {product.collection}
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/60">
                     <Check size={16} className="text-[#ff9069]" />
                     Material: {product.material}
                  </li>
                  {product.brand && (
                     <li className="flex items-center gap-3 text-sm text-white/60">
                       <Check size={16} className="text-[#ff9069]" />
                       Brand: {product.brand}
                     </li>
                  )}
                  {product.team && (
                     <li className="flex items-center gap-3 text-sm text-white/60">
                       <Check size={16} className="text-[#ff9069]" />
                       Team: {product.team}
                     </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
