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
      className={`flex items-center ${onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Image Only */}
      <div className="flex-shrink-0 relative" style={{ width: iconSize, height: iconSize }}>
        <img
          src="/assets/images/ChatGPT_Image_Mar_16__2026__04_44_37_PM-1773660786216.png"
          alt="AureMind logo"
          style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
        />
      </div>
    </div>
  );
});

export default AppLogo;
