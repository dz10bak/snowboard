import { motion } from 'framer-motion';

export default function Card({
  children,
  hover = false,
  selected = false,
  onClick,
  className = '',
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        rounded-xl border transition-colors
        ${selected
          ? 'bg-accent-blue/10 border-accent-cyan/50 shadow-lg shadow-accent-cyan/10'
          : 'bg-forge-800/50 border-forge-600/30 hover:border-forge-500/50'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
