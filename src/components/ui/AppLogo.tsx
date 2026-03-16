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
  showTagline = false,
  showName = true,
  compact = false,
}: AppLogoProps) {
  const iconSize = size;

  return (
    <div
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      {/* SVG Wave Mark */}
      <div className="flex-shrink-0 relative" style={{ width: iconSize, height: iconSize }}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGrad1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6d28d9" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          {/* First wave ribbon */}
          <path
            d="M4 28 C8 28, 10 12, 16 12 C22 12, 24 28, 30 28 C34 28, 36 22, 36 20"
            stroke="url(#waveGrad1)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Second wave ribbon — offset */}
          <path
            d="M4 20 C8 20, 10 8, 16 8 C22 8, 24 32, 30 32 C34 32, 36 26, 36 24"
            stroke="url(#waveGrad2)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
          {/* Dot accent */}
          <circle cx="20" cy="20" r="2.5" fill="url(#waveGrad1)" opacity="0.9" />
        </svg>
      </div>

      {/* Brand text */}
      {showName && (
        <div className="flex flex-col leading-none">
          <span
            className="font-nunito font-extrabold tracking-tight"
            style={{
              fontSize: compact ? '1rem' : '1.2rem',
              background: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            AureMind
          </span>
          {showTagline && (
            <span
              className="font-dm font-medium tracking-widest uppercase"
              style={{
                fontSize: '0.45rem',
                color: '#7c3aed',
                opacity: 0.7,
                letterSpacing: '0.12em',
                marginTop: '2px',
              }}
            >
              Elevate Your Mind · Embrace Your Calm
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default AppLogo;
