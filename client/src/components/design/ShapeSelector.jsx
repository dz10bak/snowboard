import { motion } from 'framer-motion';
import { BOARD_SHAPES } from '../../utils/constants';
import { useDesign } from '../../context/DesignContext';
import Card from '../ui/Card';

const shapeSVGs = {
  twin: (
    <svg viewBox="0 0 60 200" className="w-12 h-40">
      <path d="M30 10 Q45 30 45 60 L45 140 Q45 170 30 190 Q15 170 15 140 L15 60 Q15 30 30 10Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  directional: (
    <svg viewBox="0 0 60 200" className="w-12 h-40">
      <path d="M30 5 Q48 30 46 65 L44 145 Q42 170 30 185 Q18 170 16 145 L14 65 Q12 30 30 5Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'directional-twin': (
    <svg viewBox="0 0 60 200" className="w-12 h-40">
      <path d="M30 8 Q46 30 45 62 L44 142 Q43 170 30 188 Q17 170 16 142 L15 62 Q14 30 30 8Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  swallowtail: (
    <svg viewBox="0 0 60 200" className="w-12 h-40">
      <path d="M30 5 Q48 30 46 65 L44 150 Q42 170 38 190 L30 175 L22 190 Q18 170 16 150 L14 65 Q12 30 30 5Z" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

export default function ShapeSelector() {
  const { state, dispatch } = useDesign();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-snow text-center mb-2">Choose Your Board Shape</h2>
      <p className="text-forge-400 text-center mb-8">Select the foundation of your ride</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {BOARD_SHAPES.map((shape) => (
          <Card
            key={shape.id}
            hover
            selected={state.shape === shape.id}
            onClick={() => dispatch({ type: 'SET_SHAPE', payload: shape.id })}
            className="p-6 flex flex-col items-center text-center"
          >
            <div className="text-accent-cyan mb-3">
              {shapeSVGs[shape.id]}
            </div>
            <h3 className="text-snow font-semibold mb-1">{shape.name}</h3>
            <p className="text-forge-400 text-xs">{shape.description}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
