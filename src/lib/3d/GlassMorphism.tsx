
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassMorphismProps = {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  blurStrength?: 'light' | 'medium' | 'strong';
  opacity?: 'low' | 'medium' | 'high';
  borderGlow?: boolean;
  animate?: boolean;
};

export const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  hoverEffect = false,
  blurStrength = 'medium',
  opacity = 'medium',
  borderGlow = false,
  animate = false,
}) => {
  // Map blur strength to Tailwind classes
  const blurClass = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    strong: 'backdrop-blur-lg',
  }[blurStrength];

  // Map opacity to values
  const opacityClass = {
    low: 'bg-opacity-30',
    medium: 'bg-opacity-50',
    high: 'bg-opacity-70',
  }[opacity];

  // Generate border glow effect
  const borderClass = borderGlow 
    ? 'border border-shesoul-pastel border-opacity-50 shadow-[0_0_10px_rgba(254,186,237,0.5)]'
    : 'border border-white border-opacity-10';

  const variants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
    animate: {
      boxShadow: [
        '0 0 10px rgba(254,186,237,0.3)',
        '0 0 20px rgba(254,186,237,0.5)',
        '0 0 10px rgba(254,186,237,0.3)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'bg-white',
        opacityClass,
        blurClass,
        borderClass,
        'rounded-2xl transition-all duration-300',
        className
      )}
      initial="initial"
      animate={animate ? 'animate' : undefined}
      whileHover={hoverEffect ? 'hover' : undefined}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphism;
