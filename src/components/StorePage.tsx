import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductQuickViewModal } from './ProductQuickViewModal';
import type { Product } from '../types/product';

interface StorePageProps {
  onNavigate: (target: string) => void;
  onAddToCart: (productId: string, size: string, sourceElement?: HTMLElement | null) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const CATEGORY_OPTIONS = ['Todos', 'Zapatillas', 'Camisetas', 'Shorts'];
const SIZE_OPTIONS = [
  'Todos',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
];

const FEATURED_COLLECTIONS = [
  {
    title: 'Lakers Drop',
    team: 'Lakers',
    copy: 'Gold and purple game-night staples with a more premium store presentation.',
  },
  {
    title: 'Bulls Pack',
    team: 'Bulls',
    copy: 'High-contrast statement pieces with sharper lines and a stronger edge.',
  },
  {
    title: 'Celtics City Edition',
    team: 'Celtics',
    copy: 'Green-led city styles mixed into a tighter editorial capsule.',
  },
];

export function StorePage({
  onNavigate,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}: StorePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedSize, setSelectedSize] = useState('Todos');
  const [query, setQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSize =
        selectedSize === 'Todos' || product.sizes.includes(selectedSize);
      const matchesQuery =
        normalized.length === 0 ||
        [
          product.name,
          product.category,
          product.team ?? '',
          product.colors,
          product.collection,
          product.material,
          product.description,
          product.sizes.join(' '),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalized);

      return matchesCategory && matchesSize && matchesQuery;
    });
  }, [query, selectedCategory, selectedSize]);

  const featuredCollections = FEATURED_COLLECTIONS.map((collection) => ({
    ...collection,
    items: PRODUCTS.filter((product) => product.team === collection.team),
  }));

  useEffect(() => {
    setIsLoadingProducts(true);
    const timer = window.setTimeout(() => {
      setIsLoadingProducts(false);
    }, 550);

    return () => window.clearTimeout(timer);
  }, [query, selectedCategory, selectedSize]);

  const filtersPanel = (
    <aside className="h-fit rounded-[2rem] border border-white/10 bg-[#141414] p-6">
      <div className="flex items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={18} className="text-[#ff9069]" />
          <h2 className="font-headline text-2xl font-black italic uppercase tracking-tight">
            Filters
          </h2>
        </div>
        <button
          onClick={() => setIsMobileFiltersOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-[#ff9069]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search store"
            className="w-full bg-transparent text-white outline-none placeholder:text-white/25"
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">Category</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
                selectedCategory === category
                  ? 'bg-[#ff9069] text-black'
                  : 'bg-[#1c1c1c] text-white/60 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">Size</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-12 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
                selectedSize === size
                  ? 'bg-[#ff9069] text-black'
                  : 'bg-[#1c1c1c] text-white/60 hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          setSelectedCategory('Todos');
          setSelectedSize('Todos');
          setQuery('');
        }}
        className="mt-8 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
      >
        Reset filters
      </button>
    </aside>
  );

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-6 pb-24 pt-32 md:px-12">
      <ProductQuickViewModal
        product={activeProduct}
        isOpen={activeProduct !== null}
        onClose={() => setActiveProduct(null)}
        onAddToCart={onAddToCart}
      />
      <section className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#151515] p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,144,105,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="font-sans text-sm font-bold uppercase tracking-[0.3em] text-[#ff9069]">
                Kinetic Store
              </span>
              <h1 className="mt-4 font-headline text-5xl font-black italic uppercase tracking-tighter text-white md:text-7xl">
                Basketball essentials for every rotation
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
                Browse zapatillas, camisetas y shorts con talles reales para ropa y calzado.
                Ahora la tienda vive en su propia ruta para que se sienta como una pagina aparte.
              </p>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="w-fit rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069]"
            >
              Back Home
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-10">
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                Featured collections
              </p>
              <h2 className="mt-2 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                NBA edit
              </h2>
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-headline text-lg font-black italic tracking-tight text-white transition-colors hover:border-[#ff9069]/40 hover:text-[#ff9069] lg:hidden"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredCollections.map((collection) => (
              <button
                key={collection.title}
                onClick={() => {
                  setSelectedCategory('Camisetas');
                  setQuery(collection.team.toLowerCase());
                }}
                className="rounded-[2rem] border border-white/10 bg-[#151515] p-6 text-left transition-colors hover:border-[#ff9069]/35 hover:bg-[#1a1a1a]"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                  {collection.team}
                </p>
                <h3 className="mt-3 font-headline text-3xl font-black italic uppercase tracking-tight text-white">
                  {collection.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{collection.copy}</p>
                <div className="mt-5 flex -space-x-3">
                  {collection.items.slice(0, 3).map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-full border-2 border-[#151515] object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[290px_minmax(0,1fr)]">
        <div className="hidden lg:block">{filtersPanel}</div>

        <div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff9069]">
                Catalog
              </p>
              <h2 className="mt-2 font-headline text-4xl font-black italic uppercase tracking-tight text-white">
                {filteredProducts.length} items available
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/50">
              Filter by product type and talle to browse basketball jerseys, sneakers and shorts
              without mixing clothing sizes with shoe sizes unless you want to.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {isLoadingProducts
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="animate-pulse rounded-[2rem] border border-white/10 bg-[#151515] p-5"
                  >
                    <div className="aspect-[4/5] rounded-2xl bg-[#202020]" />
                    <div className="mt-5 h-3 w-20 rounded-full bg-[#242424]" />
                    <div className="mt-4 h-6 w-3/4 rounded-full bg-[#242424]" />
                    <div className="mt-3 h-4 w-1/2 rounded-full bg-[#242424]" />
                    <div className="mt-5 h-4 w-full rounded-full bg-[#202020]" />
                    <div className="mt-2 h-4 w-5/6 rounded-full bg-[#202020]" />
                    <div className="mt-5 flex gap-2">
                      <div className="h-8 w-12 rounded-full bg-[#242424]" />
                      <div className="h-8 w-12 rounded-full bg-[#242424]" />
                      <div className="h-8 w-12 rounded-full bg-[#242424]" />
                    </div>
                    <div className="mt-5 h-12 rounded-2xl bg-[#242424]" />
                  </div>
                ))
              : filteredProducts.map((product) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                    <ProductCard
                      product={product}
                      showCategory
                      onAddToCart={(selectedProduct, size) => onAddToCart(selectedProduct.id, size)}
                      onOpenProduct={setActiveProduct}
                      onToggleWishlist={onToggleWishlist}
                      isWishlisted={wishlist.includes(product.id)}
                    />
                  </motion.div>
                ))}
          </div>

          {!isLoadingProducts && filteredProducts.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-white/10 px-6 py-16 text-center text-white/45">
              No products match that filter combination.
            </div>
          )}
        </div>
        </div>
      </section>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[82] bg-black/70 px-4 py-6 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-xl">{filtersPanel}</div>
        </div>
      )}
    </main>
  );
}
