'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const sounds = [
  { name: 'Rain Drops', emoji: '🌧️', gradient: 'gradient-blue', color: 'text-blue-800', duration: '∞', mood: 'Calming', type: 'rain' },
  { name: 'Ocean Waves', emoji: '🌊', gradient: 'gradient-lavender', color: 'text-purple-800', duration: '∞', mood: 'Relaxing', type: 'ocean' },
  { name: 'Calm Piano', emoji: '🎹', gradient: 'gradient-peach', color: 'text-pink-800', duration: '∞', mood: 'Peaceful', type: 'piano' },
  { name: 'Forest Birds', emoji: '🌲', gradient: 'gradient-green', color: 'text-green-800', duration: '∞', mood: 'Grounding', type: 'forest' },
];

function OceanAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {[0, 1, 2]?.map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-8 rounded-full opacity-20"
          style={{ background: 'linear-gradient(180deg, #a2d2ff 0%, #6fa8dc 100%)', bottom: `${i * 6}px` }}
          animate={{ x: ['-10%', '10%', '-10%'], scaleX: [1, 1.05, 1] }}
          transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

function RainAnimation() {
  const drops = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {drops?.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 rounded-full opacity-30"
          style={{
            background: 'linear-gradient(180deg, #a2d2ff, transparent)',
            height: `${8 + Math.random() * 10}px`,
            left: `${(i / drops?.length) * 100}%`,
            top: '-10px',
          }}
          animate={{ y: ['0px', '120px'], opacity: [0.4, 0] }}
          transition={{
            duration: 0.8 + (i % 4) * 0.2,
            repeat: Infinity,
            delay: (i * 0.15) % 1.2,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function ForestAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {['🍃', '🌿', '🍀']?.map((leaf, i) => (
        <motion.span
          key={i}
          className="absolute text-sm opacity-25"
          style={{ left: `${20 + i * 25}%`, bottom: '10px' }}
          animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {leaf}
        </motion.span>
      ))}
    </div>
  );
}

function PianoAnimation() {
  const notes = ['♩', '♪', '♫', '♬'];
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      {notes?.map((note, i) => (
        <motion.span
          key={i}
          className="absolute text-xs opacity-30 text-pink-600"
          style={{ left: `${15 + i * 20}%`, bottom: '8px' }}
          animate={{ y: [0, -30, -60], opacity: [0.4, 0.3, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.45,
            ease: 'easeOut',
          }}
        >
          {note}
        </motion.span>
      ))}
    </div>
  );
}

export default function SoundCards() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-nunito font-700 text-lg text-purple-900">Relaxing Sounds 🎶</h2>
        <span className="text-xs font-dm text-purple-400">Tap to play</span>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {sounds?.map((s, i) => (
          <motion.button
            key={s?.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setPlaying(playing === i ? null : i)}
            className={`relative ${s?.gradient} rounded-3xl p-4 flex flex-col items-center gap-3 min-w-[100px] border border-white/60 shadow-sm transition-all duration-300 overflow-hidden ${playing === i ? 'ring-2 ring-purple-300 shadow-lg' : ''}`}
          >
            {/* Sound-specific animation overlay */}
            <AnimatePresence>
              {playing === i && (
                <>
                  {s?.type === 'ocean' && <OceanAnimation />}
                  {s?.type === 'rain' && <RainAnimation />}
                  {s?.type === 'forest' && <ForestAnimation />}
                  {s?.type === 'piano' && <PianoAnimation />}
                </>
              )}
            </AnimatePresence>

            <motion.span
              className="text-4xl relative z-10"
              animate={playing === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: playing === i ? Infinity : 0 }}
            >
              {s?.emoji}
            </motion.span>
            <div className="text-center relative z-10">
              <p className={`font-nunito font-700 text-xs ${s?.color} leading-tight`}>{s?.name}</p>
              <p className={`text-[10px] font-dm ${s?.color} opacity-60 mt-0.5`}>{s?.mood}</p>
            </div>
            <div className={`w-8 h-8 rounded-xl ${playing === i ? 'bg-white/80' : 'bg-white/50'} flex items-center justify-center transition-all relative z-10`}>
              {playing === i
                ? <Pause size={14} className={s?.color} />
                : <Play size={14} className={s?.color} />
              }
            </div>
            {playing === i && (
              <div className="flex gap-0.5 items-end h-4 relative z-10">
                {[3, 5, 4, 6, 3]?.map((h, j) => (
                  <motion.div
                    key={j}
                    className="w-0.5 rounded-full bg-current opacity-60"
                    style={{ height: `${h * 2}px` }}
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.1 }}
                  />
                ))}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}