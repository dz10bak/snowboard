import { motion } from 'framer-motion';
import { GRAPHIC_STYLES } from '../../utils/constants';
import { useDesign } from '../../context/DesignContext';
import Card from '../ui/Card';

const graphicColors = {
  minimal: 'from-gray-400 to-gray-600',
  graffiti: 'from-pink-500 to-yellow-400',
  japanese: 'from-red-500 to-pink-300',
  cyberpunk: 'from-cyan-400 to-purple-600',
  vintage: 'from-amber-600 to-orange-400',
  'brutal-black': 'from-gray-800 to-black',
};

export default function GraphicSelector() {
  const { state, dispatch } = useDesign();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-snow text-center mb-2">Choose Your Graphic Style</h2>
      <p className="text-forge-400 text-center mb-8">Define the art direction for your board</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {GRAPHIC_STYLES.map((style) => (
          <Card
            key={style.id}
            hover
            selected={state.graphicStyle === style.id}
            onClick={() => dispatch({ type: 'SET_GRAPHIC_STYLE', payload: style.id })}
            className="p-5 flex flex-col items-center text-center"
          >
            <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${graphicColors[style.id]} mb-4 opacity-80`} />
            <h3 className="text-snow font-semibold mb-1">{style.name}</h3>
            <p className="text-forge-400 text-xs">{style.description}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
