'use client';

import { useState, useEffect, useRef } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Bell, Settings, X, User, Users, FileText, ChevronRight, Eye, EyeOff, Menu, Home, Users2, BookOpen, Brain, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';


interface AppLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const navItems = [
  { label: 'Home', path: '/home-dashboard', Icon: Home },
  { label: 'Community', path: '/community-section', Icon: Users2 },
  { label: 'Diary', path: '/mood-tracker-diary', Icon: BookOpen },
  { label: 'Tests', path: '/psychology-tests', Icon: Brain },
  { label: 'Motivation', path: '/daily-motivation', Icon: Star },
];

export default function AppLayout({ children, hideHeader = false }: AppLayoutProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUsername] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [notifGranted, setNotifGranted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [usernamePublic, setUsernamePublic] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('mindbloom_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsername(parsed.username || '');
        setCommunityName(parsed.communityName || '');
        setUsernamePublic(parsed.usernamePublic !== false);
      } catch {}
    }
    if (typeof Notification !== 'undefined') {
      setNotifGranted(Notification.permission === 'granted');
    }
  }, [showSettings]);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  const toggleUsernameVisibility = () => {
    const newVal = !usernamePublic;
    setUsernamePublic(newVal);
    const stored = localStorage.getItem('mindbloom_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        localStorage.setItem('mindbloom_user', JSON.stringify({ ...parsed, usernamePublic: newVal }));
      } catch {}
    }
  };

  const requestNotifications = async () => {
    if (typeof Notification === 'undefined') return;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifGranted(true);
      const scheduleNotif = (title: string, body: string, delayMs: number) => {
        setTimeout(() => {
          new Notification(title, { body, icon: '/favicon.ico' });
        }, delayMs);
      };
      scheduleNotif('Daily Check-in', 'How are you feeling today? Take a moment to log your mood in MindBloom.', 5000);
      scheduleNotif('Exercise Reminder', 'Time for your daily breathing exercise! Just 5 minutes can transform your day.', 10000);
    }
  };

  const handleNavClick = (path: string) => {
    setShowMenu(false);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50" style={{ WebkitOverflowScrolling: 'touch' }}>
      {!hideHeader && (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl border-b border-white/60" ref={menuRef}>
          <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <AppLogo size={28} />
              <span className="font-nunito font-800 text-lg text-purple-800 tracking-tight hidden sm:block">MindBloom</span>
            </div>

            {/* Center: current page label */}
            <div className="flex-1 flex justify-center">
              <span className="font-nunito font-700 text-sm text-purple-700">
                {navItems.find(n => n.path === pathname)?.label ?? 'MindBloom'}
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={requestNotifications}
                title={notifGranted ? 'Notifications enabled' : 'Enable daily reminders'}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-colors relative ${notifGranted ? 'bg-pink-100 text-pink-500' : 'bg-pink-50 hover:bg-pink-100 text-pink-400'}`}
              >
                <Bell size={17} />
                {notifGranted && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-green-400" />
                )}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 rounded-2xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
              >
                <Settings size={17} />
              </motion.button>
              {/* Hamburger menu */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(v => !v)}
                className="w-9 h-9 rounded-2xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={17} />
              </motion.button>
            </div>
          </div>

          {/* Slide-down task menu */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="overflow-hidden border-t border-purple-100/60 bg-white/95 backdrop-blur-xl"
              >
                <nav className="max-w-screen-2xl mx-auto px-4 py-3 flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const { Icon } = item;
                    return (
                      <motion.button
                        key={item.path}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleNavClick(item.path)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-nunito font-600 transition-all duration-200 text-left w-full ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :'text-purple-500 hover:bg-purple-50 hover:text-purple-700'
                        }`}
                      >
                        <Icon size={18} className={isActive ? 'text-purple-600' : 'text-purple-400'} />
                        <span>{item.label}</span>
                        {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
                      </motion.button>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      <main className="max-w-screen-2xl mx-auto px-4 py-4 xl:px-8 2xl:px-12 pt-20" style={{ scrollBehavior: 'smooth' }}>
        {children}
      </main>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowSettings(false); }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white/95 backdrop-blur-xl rounded-4xl p-6 w-full max-w-sm border border-purple-100 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-nunito font-800 text-lg text-purple-900">Profile & Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center text-purple-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Profile info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-4 border border-purple-100/60 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-2xl border border-white/60">
                    🌸
                  </div>
                  <div>
                    <p className="font-nunito font-800 text-base text-purple-900">{communityName || 'Anonymous'}</p>
                    <p className="text-xs font-dm text-purple-500">MindBloom Member</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                    <User size={14} className="text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Username</p>
                      <p className="text-sm font-nunito font-700 text-purple-800 truncate">
                        {username ? `@${username}` : 'Not set'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 rounded-2xl px-3 py-2 border border-white/60">
                    <Users size={14} className="text-purple-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-dm text-purple-400 uppercase tracking-wide">Community Name</p>
                      <p className="text-sm font-nunito font-700 text-purple-800 truncate">{communityName || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Username Visibility Toggle */}
              <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden mb-4">
                <button
                  onClick={toggleUsernameVisibility}
                  className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${usernamePublic ? 'bg-purple-100' : 'bg-gray-100'}`}>
                    {usernamePublic ? <Eye size={16} className="text-purple-600" /> : <EyeOff size={16} className="text-gray-400" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-nunito font-700 text-sm text-purple-900">Username Visibility</p>
                    <p className="text-xs font-dm text-purple-400">
                      {usernamePublic ? 'Public — visible in community' : 'Hidden — shown as Anonymous'}
                    </p>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-all duration-300 relative ${usernamePublic ? 'bg-purple-400' : 'bg-gray-200'}`}>
                    <motion.div
                      animate={{ x: usernamePublic ? 20 : 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </div>
                </button>
              </div>

              {/* Notifications */}
              <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden mb-4">
                <button
                  onClick={requestNotifications}
                  className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${notifGranted ? 'bg-green-100' : 'bg-pink-50'}`}>
                    <Bell size={16} className={notifGranted ? 'text-green-600' : 'text-pink-400'} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-nunito font-700 text-sm text-purple-900">Daily Reminders</p>
                    <p className="text-xs font-dm text-purple-400">{notifGranted ? 'Notifications enabled' : 'Tap to enable check-in reminders'}</p>
                  </div>
                  <ChevronRight size={16} className="text-purple-300" />
                </button>
              </div>

              {/* Terms & Service */}
              <div className="bg-white/70 rounded-3xl border border-purple-100/60 overflow-hidden">
                <button
                  onClick={() => setShowTerms(!showTerms)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-purple-50/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <FileText size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-nunito font-700 text-sm text-purple-900">Terms & Service Policy</p>
                    <p className="text-xs font-dm text-purple-400">View our terms and privacy policy</p>
                  </div>
                  <motion.div animate={{ rotate: showTerms ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight size={16} className="text-purple-300" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {showTerms && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-xs font-dm text-purple-600 leading-relaxed border-t border-purple-50">
                        <p className="pt-3">MindBloom is a wellness companion app. All data is stored locally on your device. We do not collect or share personal information. This app is not a substitute for professional mental health care.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}