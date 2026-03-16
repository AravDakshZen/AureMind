'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import CommunityFeed from './components/CommunityFeed';
import CommunityHeader from './components/CommunityHeader';
import CommunityGuidelinesModal from './components/CommunityGuidelinesModal';

const GUIDELINES_KEY = 'mindbloom_community_guidelines_accepted';

export default function CommunitySectionPage() {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(GUIDELINES_KEY) === 'true';
    }
    return false;
  });

  return (
    <AppLayout>
      {!guidelinesAccepted && (
        <CommunityGuidelinesModal onAccepted={() => setGuidelinesAccepted(true)} />
      )}
      {guidelinesAccepted && (
        <div className="space-y-5 py-2">
          <CommunityHeader />
          <CommunityFeed />
        </div>
      )}
    </AppLayout>
  );
}