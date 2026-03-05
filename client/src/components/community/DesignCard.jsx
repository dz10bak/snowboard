import { motion } from 'framer-motion';
import LikeButton from './LikeButton';

export default function DesignCard({ design, onClick }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden bg-forge-800/50 border border-forge-600/30 hover:border-forge-500/50 transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={design.imageUrl}
          alt={`${design.graphicStyle} snowboard design`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {design.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full bg-accent-cyan/90 text-white">
            Featured
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
            {design.shape}
          </span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
            {design.ridingStyle}
          </span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
            {design.graphicStyle}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <LikeButton designId={design._id} initialLikes={design.likes} />
          <span className="text-xs text-forge-500">
            {formatDate(design.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
