import { motion } from 'framer-motion';
import { RIDING_STYLES } from '../../utils/constants';
import { useDesign } from '../../context/DesignContext';
import Card from '../ui/Card';

const styleIcons = {
  park: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <path d="M12 52 L28 20 L32 28 L40 12 L52 52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 52 H56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  'all-mountain': (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <path d="M4 52 L20 20 L28 32 L36 16 L44 28 L52 8 L60 52" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 52 H62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  freeride: (
    <svg viewBox="0 0 64 64" className="w-16 h-16">
      <path d="M8 52 L24 16 L32 28 L48 4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 52 H60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q46 18 52 22 Q48 16 40 20Z" fill="currentColor" opacity="0.3" />
      <path d="M44 28 Q50 26 56 30 Q52 24 44 28Z" fill="currentColor" opacity="0.2" />
    </svg>
  ),
};

export default function StyleSelector() {
  const { state, dispatch } = useDesign();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-snow text-center mb-2">Choose Your Riding Style</h2>
      <p className="text-forge-400 text-center mb-8">This shapes the energy of your design</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {RIDING_STYLES.map((style) => (
          <Card
            key={style.id}
            hover
            selected={state.ridingStyle === style.id}
            onClick={() => dispatch({ type: 'SET_RIDING_STYLE', payload: style.id })}
            className="p-8 flex flex-col items-center text-center"
          >
            <div className="text-accent-cyan mb-4">
              {styleIcons[style.id]}
            </div>
            <h3 className="text-snow font-semibold text-lg mb-1">{style.name}</h3>
            <p className="text-forge-400 text-sm">{style.description}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
