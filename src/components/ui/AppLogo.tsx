'use client';

import React, { memo } from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  showTagline?: boolean;
  showName?: boolean;
  compact?: boolean;
}

const AppLogo = memo(function AppLogo({
  size = 36,
  className = '',
  onClick,
}: AppLogoProps) {
  const iconSize = size;

  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Image */}
      <div className="flex-shrink-0 relative" style={{ width: iconSize, height: iconSize }}>
        <img
          src="/assets/images/ChatGPT_Image_Mar_16__2026__04_44_37_PM-1773661162598.png"
          alt="AureMind logo"
          style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
        />
      </div>
      {/* Brand Name */}
      <span
        className="font-nunito font-bold text-lg leading-none"
        style={{
          background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        AureMind
      </span>
    </div>
  );
});

export default AppLogo;
