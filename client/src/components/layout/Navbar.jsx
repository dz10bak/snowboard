import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/design', label: 'Design' },
  { to: '/community', label: 'Community' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="text-snow font-bold text-lg tracking-tight">
              Board<span className="text-accent-cyan">Forge</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg"
              >
                {pathname === to && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-forge-700/50 rounded-lg"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <span className={`relative z-10 ${pathname === to ? 'text-snow' : 'text-forge-400 hover:text-forge-200'}`}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
