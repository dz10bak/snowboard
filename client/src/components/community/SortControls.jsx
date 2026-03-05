import { motion } from 'framer-motion';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Liked' },
  { value: 'featured', label: 'Featured' },
];

export default function SortControls({ activeSort, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-forge-800/50 border border-forge-600/30">
      {sortOptions.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className="relative px-4 py-2 text-sm font-medium rounded-md transition-colors"
        >
          {activeSort === value && (
            <motion.div
              layoutId="sortActive"
              className="absolute inset-0 bg-forge-700 rounded-md"
              transition={{ type: 'spring', duration: 0.4 }}
            />
          )}
          <span className={`relative z-10 ${activeSort === value ? 'text-snow' : 'text-forge-400 hover:text-forge-300'}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
