import { motion } from 'framer-motion';
import DesignCard from './DesignCard';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DesignGrid({ designs, onDesignClick }) {
  if (designs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-forge-400 text-lg">No designs yet</p>
        <p className="text-forge-500 text-sm mt-1">Be the first to forge a board!</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {designs.map((design) => (
        <motion.div key={design._id} variants={item}>
          <DesignCard
            design={design}
            onClick={() => onDesignClick?.(design)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
