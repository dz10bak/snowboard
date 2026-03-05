import { motion } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';
import { QUICK_SUGGESTIONS } from '../../utils/constants';

export default function CustomTextInput() {
  const { state, dispatch } = useDesign();

  const addSuggestion = (suggestion) => {
    const current = state.customText;
    const newText = current
      ? `${current}, ${suggestion}`
      : suggestion;
    if (newText.length <= 200) {
      dispatch({ type: 'SET_CUSTOM_TEXT', payload: newText });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="text-2xl font-bold text-snow text-center mb-2">Add Custom Details</h2>
      <p className="text-forge-400 text-center mb-8">Optional — describe extra elements for your design</p>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <textarea
            value={state.customText}
            onChange={(e) => dispatch({ type: 'SET_CUSTOM_TEXT', payload: e.target.value.slice(0, 200) })}
            placeholder="e.g., A howling wolf under northern lights with neon colors..."
            rows={4}
            className="w-full bg-forge-800/50 border border-forge-600/30 rounded-xl p-4 text-forge-200 placeholder-forge-500 resize-none focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/25 transition-colors"
          />
          <span className="absolute bottom-3 right-3 text-xs text-forge-500">
            {state.customText.length}/200
          </span>
        </div>

        <div className="mt-4">
          <p className="text-forge-500 text-sm mb-3">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSuggestion(suggestion)}
                className="px-3 py-1.5 text-xs rounded-full border border-forge-600/50 text-forge-300 hover:bg-forge-700/50 hover:border-accent-cyan/30 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
