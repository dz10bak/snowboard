export default function Footer() {
  return (
    <footer className="border-t border-forge-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
              <span className="text-white font-bold text-xs">BF</span>
            </div>
            <span className="text-forge-400 text-sm">
              BoardForge &mdash; AI Snowboard Designer
            </span>
          </div>
          <p className="text-forge-500 text-sm">
            Powered by AI. Built for riders.
          </p>
        </div>
      </div>
    </footer>
  );
}
