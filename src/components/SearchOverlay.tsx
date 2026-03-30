import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { NAV_ITEMS } from '../data/navigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string, param?: string) => void;
}

export function SearchOverlay({ isOpen, onClose, onNavigate }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    const productMatches = PRODUCTS.filter((product) =>
      [
        product.name,
        product.colors,
        product.category,
        product.description,
        product.collection,
        product.material,
        product.sizes.join(' '),
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    ).map((product) => ({
      id: product.id,
      title: product.name,
      subtitle: `${product.category} · ${product.price}`,
      target: 'product',
      param: product.id,
      type: 'Product',
    }));

    const sectionMatches = NAV_ITEMS.filter((item) =>
      item.label.toLowerCase().includes(normalized),
    ).map((item) => ({
      id: item.target,
      title: item.label,
      subtitle: item.target === 'store' ? 'Open the store page' : `Jump to ${item.label.toLowerCase()}`,
      target: item.target,
      type: 'Section',
    }));

    return [...sectionMatches, ...productMatches].slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#121212] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1919] px-4 py-4">
              <Search size={20} className="text-[#ff9069]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, categories or sections"
                className="w-full bg-transparent font-sans text-lg text-white outline-none placeholder:text-white/25"
              />
              <button
                onClick={onClose}
                className="rounded-full p-2 text-white/60 transition-colors hover:text-[#ff9069]"
              >
                <X size={18} />
              </button>
            </div>

            {!query.trim() && (
              <div className="grid gap-3 md:grid-cols-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => {
                      onNavigate(item.target);
                      onClose();
                    }}
                    className="rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-left transition-colors hover:border-[#ff9069]/40 hover:bg-[#1f1f1f]"
                  >
                    <p className="font-headline text-xl font-black italic text-white">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      {item.target === 'store' ? 'Open store page' : 'Open section'}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && (
              <div className="space-y-3">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => {
                        onNavigate(result.target, (result as any).param);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-left transition-all hover:border-[#ff9069]/40 hover:bg-[#1f1f1f]"
                    >
                      <div>
                        <p className="font-headline text-xl font-black italic text-white">
                          {result.title}
                        </p>
                        <p className="mt-1 text-sm text-white/45">{result.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-3 text-[#ff9069]">
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">
                          {result.type}
                        </span>
                        <ArrowRight size={18} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center text-white/45">
                    No results for "{query}".
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
