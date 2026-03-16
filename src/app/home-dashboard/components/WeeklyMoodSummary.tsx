'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MoodEntry {
  date: string;
  mood: number;
  label: string;
  emoji: string;
  timestamp: string;
}

interface WeeklyStats {
  averageScore: number | null;
  bestDay: { day: string; score: number; emoji: string } | null;
  lowestDay: { day: string; score: number; emoji: string } | null;
  entriesLogged: number;
}

function getDayName(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function getMoodEmoji(score: number): string {
  if (score >= 9) return '😄';
  if (score >= 7) return '😊';
  if (score >= 5) return '😐';
  if (score >= 3) return '😔';
  return '😢';
}

function computeWeeklyStats(entries: MoodEntry[]): WeeklyStats {
  const today = new Date();
  const last7Days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    last7Days.push(d.toISOString().split('T')[0]);
  }

  const weekEntries = entries.filter(e => last7Days.includes(e.date));

  if (weekEntries.length === 0) {
    return { averageScore: null, bestDay: null, lowestDay: null, entriesLogged: 0 };
  }

  const total = weekEntries.reduce((sum, e) => sum + e.mood, 0);
  const averageScore = Math.round((total / weekEntries.length) * 10) / 10;

  const best = weekEntries.reduce((a, b) => (a.mood >= b.mood ? a : b));
  const lowest = weekEntries.reduce((a, b) => (a.mood <= b.mood ? a : b));

  return {
    averageScore,
    bestDay: { day: getDayName(best.date), score: best.mood, emoji: best.emoji || getMoodEmoji(best.mood) },
    lowestDay: { day: getDayName(lowest.date), score: lowest.mood, emoji: lowest.emoji || getMoodEmoji(lowest.mood) },
    entriesLogged: weekEntries.length,
  };
}

export default function WeeklyMoodSummary() {
  const [stats, setStats] = useState<WeeklyStats>({
    averageScore: null,
    bestDay: null,
    lowestDay: null,
    entriesLogged: 0,
  });

  useEffect(() => {
    try {
      const entries: MoodEntry[] = JSON.parse(localStorage.getItem('mindbloom_mood_entries') || '[]');
      setStats(computeWeeklyStats(entries));
    } catch {
      // keep defaults
    }
  }, []);

  const noData = stats.averageScore === null;

  const statCards = [
    {
      icon: '📊',
      label: 'Average Mood',
      value: noData ? '—' : `${stats.averageScore} / 10`,
      sub: noData ? 'No data yet' : getMoodEmoji(stats.averageScore!),
      bg: 'from-purple-100 to-indigo-100',
      border: 'border-purple-200/60',
    },
    {
      icon: '🌟',
      label: 'Best Mood Day',
      value: stats.bestDay ? stats.bestDay.day : '—',
      sub: stats.bestDay ? `${stats.bestDay.emoji} ${stats.bestDay.score}/10` : 'No data yet',
      bg: 'from-pink-100 to-rose-100',
      border: 'border-pink-200/60',
    },
    {
      icon: '🌧️',
      label: 'Lowest Mood Day',
      value: stats.lowestDay ? stats.lowestDay.day : '—',
      sub: stats.lowestDay ? `${stats.lowestDay.emoji} ${stats.lowestDay.score}/10` : 'No data yet',
      bg: 'from-violet-100 to-purple-100',
      border: 'border-violet-200/60',
    },
    {
      icon: '📅',
      label: 'Entries Logged',
      value: `${stats.entriesLogged}/7`,
      sub: 'days this week',
      bg: 'from-fuchsia-100 to-pink-100',
      border: 'border-fuchsia-200/60',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="relative overflow-hidden rounded-4xl p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 border border-white/60 shadow-md"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl -translate-x-10 -translate-y-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-pink-200/40 blur-2xl translate-x-8 translate-y-8 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">🧠</span>
          <p className="font-nunito font-700 text-sm text-purple-800 uppercase tracking-wide">Weekly Mood Summary</p>
        </div>

        {/* Stat cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.07 }}
              className={`rounded-2xl p-4 bg-gradient-to-br ${card.bg} border ${card.border} shadow-sm flex flex-col gap-1`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">{card.icon}</span>
                <span className="text-xs font-dm text-purple-600 font-medium">{card.label}</span>
              </div>
              <p className="font-nunito font-700 text-purple-900 text-xl leading-tight">{card.value}</p>
              <p className="text-xs font-dm text-purple-500">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {noData && (
          <p className="text-center text-xs font-dm text-purple-400 mt-4">
            Start logging your mood in the Diary to see your weekly summary here.
          </p>
        )}
      </div>
    </motion.div>
  );
}
