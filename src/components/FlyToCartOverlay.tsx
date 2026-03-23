import { AnimatePresence, motion } from 'motion/react';

interface FlyToCartOverlayProps {
  image: string | null;
  isVisible: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function FlyToCartOverlay({
  image,
  isVisible,
  startX,
  startY,
  endX,
  endY,
}: FlyToCartOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && image && (
        <motion.img
          key={`${startX}-${startY}-${endX}-${endY}`}
          src={image}
          initial={{
            opacity: 0.95,
            x: startX,
            y: startY,
            scale: 1,
            rotate: 0,
          }}
          animate={{
            opacity: 0.15,
            x: endX,
            y: endY,
            scale: 0.28,
            rotate: 20,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.72, ease: 'easeInOut' }}
          className="pointer-events-none fixed top-0 left-0 z-[90] h-24 w-24 rounded-2xl border border-white/10 object-cover shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          referrerPolicy="no-referrer"
        />
      )}
    </AnimatePresence>
  );
}
