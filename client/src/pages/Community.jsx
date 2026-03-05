import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDesigns } from '../services/designService';
import DesignGrid from '../components/community/DesignGrid';
import SortControls from '../components/community/SortControls';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';

export default function Community() {
  const [designs, setDesigns] = useState([]);
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    fetchDesigns();
  }, [sort, page]);

  const fetchDesigns = async () => {
    setLoading(true);
    try {
      const data = await getDesigns({ sort, page, limit: 12 });
      setDesigns(data.designs);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-snow mb-3">Community Designs</h1>
        <p className="text-forge-400 text-lg">Browse AI-generated snowboard designs from the community</p>
      </motion.div>

      {/* Sort + Count */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SortControls activeSort={sort} onChange={(s) => { setSort(s); setPage(1); }} />
        <p className="text-forge-500 text-sm">{pagination.total} designs</p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-forge-800/50 border border-forge-600/30 overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-forge-700/50" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-forge-700/50 rounded w-2/3" />
                <div className="h-3 bg-forge-700/50 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <DesignGrid designs={designs} onDesignClick={setSelectedDesign} />
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-forge-400 text-sm px-4">
            Page {page} of {pagination.pages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      <Modal isOpen={!!selectedDesign} onClose={() => setSelectedDesign(null)}>
        {selectedDesign && (
          <div className="p-6">
            <img
              src={selectedDesign.imageUrl}
              alt="Snowboard design"
              className="w-full rounded-lg mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
                {selectedDesign.shape}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
                {selectedDesign.ridingStyle}
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-forge-700/50 text-forge-300 border border-forge-600/30">
                {selectedDesign.graphicStyle}
              </span>
            </div>
            {selectedDesign.customText && (
              <p className="text-forge-400 text-sm italic">"{selectedDesign.customText}"</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
