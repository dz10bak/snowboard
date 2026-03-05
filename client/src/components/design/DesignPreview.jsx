import { motion } from 'framer-motion';
import { useDesign } from '../../context/DesignContext';
import Button from '../ui/Button';

export default function DesignPreview() {
  const { state, dispatch } = useDesign();
  const design = state.generatedDesign;

  if (!design) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(design.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `boardforge-${design._id || 'design'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(design.imageUrl, '_blank');
    }
  };

  const handleRegenerate = () => {
    dispatch({ type: 'GENERATION_SUCCESS', payload: null });
    dispatch({ type: 'SET_STEP', payload: 4 });
  };

  const handleNewDesign = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-snow text-center mb-2">Your Board is Ready</h2>
      <p className="text-forge-400 text-center mb-8">Here's your AI-generated snowboard design</p>

      {/* Snowboard mockup */}
      <div className="relative mb-8">
        <div className="relative w-48 sm:w-56 mx-auto">
          {/* Board silhouette clip */}
          <div
            className="overflow-hidden rounded-[40%] shadow-2xl shadow-black/50"
            style={{
              aspectRatio: '3/8',
              clipPath: 'ellipse(50% 50% at 50% 50%)',
            }}
          >
            <img
              src={design.imageUrl}
              alt="Generated snowboard design"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Glossy overlay */}
          <div
            className="absolute inset-0 rounded-[40%] pointer-events-none"
            style={{
              clipPath: 'ellipse(50% 50% at 50% 50%)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />
        </div>
      </div>

      {/* Design info */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
          {design.shape}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
          {design.ridingStyle}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
          {design.graphicStyle}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={handleDownload} variant="primary" size="lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download
        </Button>
        <Button onClick={handleRegenerate} variant="secondary" size="lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Regenerate
        </Button>
        <Button onClick={handleNewDesign} variant="ghost" size="lg">
          New Design
        </Button>
      </div>
    </motion.div>
  );
}
