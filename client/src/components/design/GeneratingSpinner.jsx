import { motion } from 'framer-motion';

export default function GeneratingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="relative mb-8">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-2 border-forge-600 border-t-accent-cyan"
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-forge-700 border-b-accent-blue"
        />
        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50" />
        </motion.div>
      </div>

      <motion.h3
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-xl font-semibold text-snow mb-2"
      >
        Forging your board...
      </motion.h3>
      <p className="text-forge-400 text-sm">
        AI is generating your custom snowboard design
      </p>
      <p className="text-forge-500 text-xs mt-2">
        This may take 10-30 seconds
      </p>
    </motion.div>
  );
}
