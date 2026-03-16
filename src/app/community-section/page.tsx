'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import CommunityFeed from './components/CommunityFeed';
import CommunityHeader from './components/CommunityHeader';
import CommunityGuidelinesModal from './components/CommunityGuidelinesModal';

export default function CommunitySectionPage() {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);

  return (
    <AppLayout>
      <CommunityGuidelinesModal onAccepted={() => setGuidelinesAccepted(true)} />
      {guidelinesAccepted && (
        <div className="space-y-5 py-2">
          <CommunityHeader />
          <CommunityFeed />
        </div>
      )}
    </AppLayout>
  );
}