'use client';

import AppLayout from '@/components/AppLayout';
import SelfCareHero from './components/SelfCareHero';
import BreathingExercise from './components/BreathingExercise';
import SelfCareGrid from './components/SelfCareGrid';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SelfCareSectionPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6 py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router?.push('/home-dashboard')}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl bg-white/70 border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-white transition-colors active:scale-90"
            aria-label="Back to Home"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="font-nunito font-800 text-2xl text-purple-900">Self Care 🌿</h1>
            <p className="text-sm font-dm text-purple-500 mt-0.5">Nurture your mind, body & soul</p>
          </div>
        </div>
        <SelfCareHero />
        <BreathingExercise />
        <SelfCareGrid />
      </div>
    </AppLayout>
  );
}