import { useState } from 'react';
import { motion } from 'framer-motion';
import { likeDesign } from '../../services/designService';

export default function LikeButton({ designId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (liked) return;

    setLiked(true);
    setLikes((prev) => prev + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    try {
      await likeDesign(designId);
    } catch {
      setLiked(false);
      setLikes((prev) => prev - 1);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1.5 group"
    >
      <motion.div
        animate={animating ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        <svg
          className={`w-5 h-5 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-forge-400 group-hover:text-red-400'}`}
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </motion.div>
      <span className={`text-sm ${liked ? 'text-red-400' : 'text-forge-400'}`}>
        {likes}
      </span>
    </button>
  );
}
