import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDesigns } from '../services/designService';
import DesignCard from '../components/community/DesignCard';
import Button from '../components/ui/Button';

export default function Home() {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);

  useEffect(() => {
    getDesigns({ sort: 'popular', limit: 4 })
      .then((data) => setFeaturedDesigns(data.designs))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-forge-950 via-forge-900 to-forge-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-3xl" />
        </div>

        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-10">
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill="currentColor" d="M0,224L60,208C120,192,240,160,360,154.7C480,149,600,171,720,181.3C840,192,960,192,1080,170.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L0,320Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl font-black text-snow mb-6 leading-tight tracking-tight">
              Forge Your
              <span className="block bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent">
                Dream Board
              </span>
            </h1>
            <p className="text-xl text-forge-400 mb-10 max-w-2xl mx-auto">
              Design custom snowboard graphics with AI. Choose your style, generate unique art, and share with the community.
            </p>
            <Link to="/design">
              <Button size="lg" className="text-lg px-10 py-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Design Your Board
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-forge-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-snow text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Style',
                desc: 'Pick your board shape, riding style, and art direction from curated options.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'AI Generates',
                desc: 'Our AI engine creates a unique, high-quality snowboard graphic in seconds.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Download & Share',
                desc: 'Preview your board, download the design, and share it with the community.',
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-8 rounded-xl bg-forge-800/30 border border-forge-600/20 text-center group hover:border-accent-cyan/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 text-accent-cyan mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="absolute top-4 right-4 text-5xl font-black text-forge-800/50">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-snow mb-2">{item.title}</h3>
                <p className="text-forge-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured designs */}
      {featuredDesigns.length > 0 && (
        <section className="py-24 px-4 bg-forge-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-snow">Community Creations</h2>
                <p className="text-forge-400 mt-1">See what others have forged</p>
              </div>
              <Link to="/community">
                <Button variant="secondary">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredDesigns.map((design, i) => (
                <motion.div
                  key={design._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <DesignCard design={design} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-snow mb-4">
            Ready to forge your board?
          </h2>
          <p className="text-forge-400 mb-8 text-lg">
            It takes less than a minute to create a unique snowboard design.
          </p>
          <Link to="/design">
            <Button size="lg" className="text-lg px-10 py-4">
              Start Designing
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
