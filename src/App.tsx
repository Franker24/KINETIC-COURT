import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BestSellersSection } from './components/BestSellersSection';
import { FeaturedGridSection } from './components/FeaturedGridSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MediaAdShowcase } from './components/MediaAdShowcase';
import { Navbar } from './components/Navbar';
import { NewsletterSection } from './components/NewsletterSection';
import { SearchOverlay } from './components/SearchOverlay';
import { StorePage } from './components/StorePage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FlyToCartOverlay } from './components/FlyToCartOverlay';
import { AccountSettingsModal } from './components/AccountSettingsModal';
import { UserProfilePanel } from './components/UserProfilePanel';
import { VideoShowcaseModal } from './components/VideoShowcaseModal';
import { PRODUCTS } from './data/products';
import type { CartItem } from './types/cart';
import type { WishlistItem } from './types/wishlist';
import type { AccountProfile } from './components/AccountSettingsModal';

type Route = 'home' | 'store';

function getRouteFromLocation(): Route {
  return window.location.pathname === '/store' ? 'store' : 'home';
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [accountProfile, setAccountProfile] = useState<AccountProfile>({
    fullName: 'Felix Carter',
    email: 'felix@bolaorbit.com',
    favoriteTeam: 'Lakers',
    notifyDrops: true,
    notifyRestocks: true,
    avatarImage: null,
  });
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [flyAnimation, setFlyAnimation] = useState<{
    image: string | null;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    visible: boolean;
  }>({
    image: null,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    visible: false,
  });
  const [route, setRoute] = useState<Route>(getRouteFromLocation);
  const [pendingSection, setPendingSection] = useState<string | null>(null);

  function scrollToSection(target: string) {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.location.pathname !== '/') {
        window.history.replaceState(null, '', '/');
      }
      window.history.replaceState(null, '', `/#${target}`);
    }
  }

  function handleNavigate(target: string) {
    if (target === 'store') {
      setRoute('store');
      window.history.pushState(null, '', '/store');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'home') {
      setRoute('home');
      setPendingSection('home');
      window.history.pushState(null, '', '/');
      return;
    }

    if (route === 'store') {
      setRoute('home');
      setPendingSection(target);
      window.history.pushState(null, '', '/');
      return;
    }

    scrollToSection(target);
  }

  function triggerFlyToCart(productId: string, sourceElement?: HTMLElement | null) {
    const product = PRODUCTS.find((item) => item.id === productId);
    const cartAnchor = document.querySelector('[data-cart-anchor="true"]');
    if (!product || !sourceElement || !cartAnchor) {
      return;
    }

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = cartAnchor.getBoundingClientRect();

    setFlyAnimation({
      image: product.image,
      startX: sourceRect.left,
      startY: sourceRect.top,
      endX: targetRect.left,
      endY: targetRect.top,
      visible: true,
    });

    window.setTimeout(() => {
      setFlyAnimation((current) => ({ ...current, visible: false }));
    }, 720);
  }

  function handleAddToCart(productId: string, size: string, sourceElement?: HTMLElement | null) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      return;
    }

    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...current,
        {
          id: `${productId}-${size}`,
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1,
        },
      ];
    });
    triggerFlyToCart(productId, sourceElement);
    setIsCartOpen(true);
  }

  function toggleWishlist(productId: string) {
    setWishlist((current) => {
      const exists = current.some((item) => item.productId === productId);
      if (exists) {
        return current.filter((item) => item.productId !== productId);
      }
      return [...current, { productId, addedAt: Date.now() }];
    });
  }

  function updateCartQuantity(id: string, delta: number) {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeCartItem(id: string) {
    setCartItems((current) => current.filter((item) => item.id !== id));
  }

  function handleCheckoutOpen() {
    if (cartItems.length === 0) {
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }

  function handleCheckoutConfirm() {
    setCartItems([]);
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromLocation());
      if (window.location.pathname === '/') {
        const hash = window.location.hash.replace('#', '');
        setPendingSection(hash || 'home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route !== 'home' || !pendingSection) {
      return;
    }

    const target = pendingSection;
    const timer = window.setTimeout(() => {
      if (target === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', '/');
      } else {
        scrollToSection(target);
      }
      setPendingSection(null);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pendingSection, route]);

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (route === 'home' && initialHash) {
      setPendingSection(initialHash);
    }
  }, [route]);

  useEffect(() => {
    const storedWishlist = window.localStorage.getItem('kinetic-wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist) as WishlistItem[]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('kinetic-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const storedProfile = window.localStorage.getItem('kinetic-account-profile');
    if (storedProfile) {
      setAccountProfile(JSON.parse(storedProfile) as typeof accountProfile);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('kinetic-account-profile', JSON.stringify(accountProfile));
  }, [accountProfile]);

  return (
    <div className="min-h-screen bg-[#0e0e0e] selection:bg-[#ff9069] selection:text-black">
      <Navbar
        onNavigate={handleNavigate}
        onSearchOpen={() => setIsSearchOpen(true)}
        onProfileOpen={() => setIsProfileOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
        cartCount={cartCount}
        avatarImage={accountProfile.avatarImage}
      />
      <FlyToCartOverlay
        image={flyAnimation.image}
        isVisible={flyAnimation.visible}
        startX={flyAnimation.startX}
        startY={flyAnimation.startY}
        endX={flyAnimation.endX}
        endY={flyAnimation.endY}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
      <VideoShowcaseModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrement={(id) => updateCartQuantity(id, 1)}
        onDecrement={(id) => updateCartQuantity(id, -1)}
        onRemove={removeCartItem}
        onCheckout={handleCheckoutOpen}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        onConfirm={handleCheckoutConfirm}
      />
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        profile={accountProfile}
        onClose={() => setIsAccountSettingsOpen(false)}
        onSave={setAccountProfile}
      />
      <UserProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigate={handleNavigate}
        onOpenVideo={() => setIsVideoOpen(true)}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        profileName={accountProfile.fullName}
        favoriteTeam={accountProfile.favoriteTeam}
        avatarImage={accountProfile.avatarImage}
        onOpenAccountSettings={() => {
          setIsProfileOpen(false);
          setIsAccountSettingsOpen(true);
        }}
      />

      <AnimatePresence mode="wait">
        {route === 'store' ? (
          <motion.div
            key="store"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <StorePage
              onNavigate={handleNavigate}
              onAddToCart={handleAddToCart}
              wishlist={wishlist.map((item) => item.productId)}
              onToggleWishlist={toggleWishlist}
            />
          </motion.div>
        ) : (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
          >
            <HeroSection
              onShopClick={() => handleNavigate('store')}
              onWatchVideoClick={() => setIsVideoOpen(true)}
            />
            <MediaAdShowcase onNavigate={handleNavigate} />
            <FeaturedGridSection onNavigate={handleNavigate} />
            <BestSellersSection onNavigate={handleNavigate} />
            <NewsletterSection />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
