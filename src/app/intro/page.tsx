'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    // If user has already seen intro AND completed onboarding, skip to dashboard
    const seenIntro = localStorage.getItem('auremind_intro_seen');
    const user = localStorage.getItem('mindbloom_user');
    if (seenIntro && user) {
      router.replace('/home-dashboard');
    }
  }, [router]);

  const handleGetStarted = () => {
    localStorage.setItem('auremind_intro_seen', 'true');
    router.push('/home-dashboard');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-x-hidden">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-12 pb-24">

        {/* ── Header ── */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-14"
        >
          {/* Logo icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
              <span className="text-3xl">🌸</span>
            </div>
          </div>

          <h1 className="font-nunito font-extrabold text-4xl md:text-5xl text-purple-900 tracking-tight mb-3">
            AureMind
          </h1>
          <p className="font-dm font-semibold text-lg text-purple-600 whitespace-nowrap">
            Elevate Your Mind, Embrace Your Calm
          </p>
        </motion.div>

        {/* ── Section 1: Problem Statement & Solution ── */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6"
        >
          {/* Problem Statement */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/80 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-sm">
                <span className="text-base">💭</span>
              </div>
              <h2 className="font-nunito font-bold text-xl text-purple-900">Problem Statement</h2>
            </div>
            <p className="font-dm text-sm text-purple-700 leading-relaxed">
              Millions of people struggle with stress, anxiety, emotional burnout, and mental health challenges in their daily lives. Many individuals lack a safe and supportive space to understand their emotions, reflect on their thoughts, and improve their mental wellbeing.
            </p>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-7 border border-purple-100/60 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-sm">
                <span className="text-base">✨</span>
              </div>
              <h2 className="font-nunito font-bold text-xl text-purple-900">Solution</h2>
            </div>
            <p className="font-dm text-sm text-purple-700 leading-relaxed">
              AureMind provides a calm and supportive digital environment where users can track their emotions, reflect through journaling, explore self-reflection tools, and connect with a positive community. Our goal is to help people build healthier mental habits through mindfulness, motivation, and self-awareness.
            </p>
          </div>
        </motion.div>

        {/* ── Section 2: Why We Exist & About AureMind ── */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10"
        >
          {/* Why Do We Exist */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-7 border border-blue-100/60 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-sm">
                <span className="text-base">🌱</span>
              </div>
              <h2 className="font-nunito font-bold text-xl text-purple-900">Why Do We Exist</h2>
            </div>
            <p className="font-dm text-sm text-purple-700 leading-relaxed">
              AureMind exists to empower individuals to understand their inner world and take small steps toward emotional balance. In a fast-paced world where mental wellbeing is often overlooked, AureMind offers a peaceful digital companion designed to guide users toward self-reflection, emotional awareness, and positive growth.
            </p>
          </div>

          {/* About AureMind */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/80 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-sm">
                <span className="text-base">🧠</span>
              </div>
              <h2 className="font-nunito font-bold text-xl text-purple-900">About AureMind</h2>
            </div>
            <p className="font-dm text-sm text-purple-700 leading-relaxed">
              AureMind is a personal mental wellness platform designed to support self-care and emotional wellbeing. Through mood tracking, self-reflection exercises, motivational content, and community support, AureMind helps individuals build stronger mental resilience and maintain a healthier relationship with their thoughts and emotions.
            </p>
          </div>
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGetStarted}
            className="px-10 py-4 rounded-2xl font-nunito font-bold text-base text-white bg-gradient-to-r from-purple-500 to-pink-400 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transition-shadow duration-300"
          >
            Begin Your Journey 🌸
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center text-xs font-dm text-purple-400 mt-6"
        >
          Your data stays on your device. We respect your privacy.
        </motion.p>
      </div>
    </div>
  );
}
