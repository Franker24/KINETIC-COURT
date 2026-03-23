import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { motion } from 'motion/react';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  onAddToCart?: (product: Product, size: string, sourceElement?: HTMLElement | null) => void;
  onOpenProduct?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  showCategory = false,
  onAddToCart,
  onOpenProduct,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showSecondaryImage, setShowSecondaryImage] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: '50%', y: '50%' });
  const primarySpring = useSpring({
    opacity: showSecondaryImage ? 0 : 1,
    transform: showSecondaryImage ? 'scale(1.08)' : 'scale(1)',
    config: { tension: 220, friction: 24 },
  });
  const secondarySpring = useSpring({
    opacity: showSecondaryImage ? 1 : 0,
    transform: showSecondaryImage ? 'scale(1)' : 'scale(1.08)',
    config: { tension: 220, friction: 24 },
  });

  useEffect(() => {
    if (!isHovered) {
      setShowSecondaryImage(false);
      return;
    }

    setShowSecondaryImage(true);
    const timer = window.setInterval(() => {
      setShowSecondaryImage((current) => !current);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setGlowPosition({ x: `${x}%`, y: `${y}%` });
      }}
      onClick={() => onOpenProduct?.(product)}
    >
      <div className="relative mb-6 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-[#1a1919] p-8">
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x} ${glowPosition.y}, rgba(255,144,105,0.24), transparent 35%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff9069]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <animated.img
          src={product.image}
          alt={product.name}
          style={primarySpring}
          className="absolute inset-0 h-full w-full object-contain group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <animated.img
          src={product.secondaryImage}
          alt={`${product.name} alternate`}
          style={secondarySpring}
          className="absolute inset-0 h-full w-full object-contain group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart?.(product, selectedSize, event.currentTarget);
          }}
          className="absolute right-6 bottom-6 flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={24} />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={`absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'border-[#ff9069]/40 bg-[#ff9069] text-black'
              : 'border-white/10 bg-black/35 text-white hover:border-[#ff9069]/40 hover:text-[#ff9069]'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        {[product.image, product.secondaryImage].map((image, index) => (
          <div key={image} className="overflow-hidden rounded-xl border border-white/10 bg-[#121212]">
            <img
              src={image}
              alt={`${product.name} thumbnail ${index + 1}`}
              className="h-20 w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {showCategory && (
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
            {product.category}
          </p>
        )}
        <div className="flex items-start justify-between">
          <h4 className="font-headline text-lg font-bold uppercase tracking-tight text-white transition-colors group-hover:text-[#ff9069]">
            {product.name}
          </h4>
          <span className="font-headline text-lg font-bold text-white">{product.price}</span>
        </div>
        <p className="text-sm font-medium uppercase tracking-wider text-white/40">
          {product.colors}
        </p>
        {showCategory && (
          <>
            <p className="pt-2 text-sm leading-relaxed text-white/55">{product.description}</p>
            <div className="pt-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                Talles
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                      selectedSize === size
                        ? 'border-[#ff9069]/50 bg-[#ff9069] text-black'
                        : 'border-white/10 bg-[#171717] text-white/65 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <p className="pt-4 text-xs uppercase tracking-[0.18em] text-white/35">
              {product.collection} - {product.material}
            </p>
            {onAddToCart && (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onAddToCart(product, selectedSize, event.currentTarget);
                }}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
              >
                Add to cart
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
