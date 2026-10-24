import React, { useState } from 'react';
import {
  Code2,
  Bookmark,
  History,
  Activity,
  Search,
  Flame,
  CheckCircle2,
  Terminal,
} from 'lucide-react';
import { ProgressSummary, RunnerHealthStatus } from '../types/dsa.types';

interface NavbarProps {
  currentView: 'dashboard' | 'topic' | 'problem' | 'bookmarks' | 'submissions';
  onNavigate: (view: 'dashboard' | 'bookmarks' | 'submissions') => void;
  progress: ProgressSummary | null;
  onOpenRunnerHealth: () => void;
  runnerHealth: RunnerHealthStatus[] | null;
  onSearchSelectProblem?: (problemId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  progress,
  onOpenRunnerHealth,
  runnerHealth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const allRunnersVerified = runnerHealth ? runnerHealth.every(r => r.verified) : false;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  ZENSUS
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  DSA Practice
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Direction Before Destination</p>
            </div>
          </button>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="/coding-problems/index.html"
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1 transition-colors"
            >
              <span>←</span> Coding Hub
            </a>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'dashboard' || currentView === 'topic'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Curriculum (41 Topics)
            </button>
            <button
              onClick={() => onNavigate('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                currentView === 'bookmarks'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Bookmarks
              {progress?.bookmarks && progress.bookmarks.length > 0 && (
                <span className="ml-1 text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-bold">
                  {progress.bookmarks.length}
                </span>
              )}
            </button>
            <button
              onClick={() => onNavigate('submissions')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                currentView === 'submissions'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <History className="w-4 h-4" />
              Submissions
            </button>
          </nav>
        </div>

        {/* Right side stats & health */}
        <div className="flex items-center gap-3">
          {/* Runner Health Pill */}
          <button
            onClick={onOpenRunnerHealth}
            title="Inspect Execution Runners: Python, C++, Java, JS"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Runners:</span>
            <span className="flex items-center gap-1 font-bold">
              <span className={`w-2 h-2 rounded-full ${allRunnersVerified ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-emerald-700">4 Active</span>
            </span>
          </button>

          {/* User Progress Stats */}
          {progress && (
            <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-200 text-xs">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{progress.solvedCount} / {progress.totalProblems}</span>
                <span className="text-[10px] text-emerald-600/70 font-normal">Solved</span>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>{progress.streakDays}d Streak</span>
              </div>

              <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-full font-semibold">
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                <span>{progress.accuracyPercentage}%</span>
                <span className="text-[10px] text-indigo-600/70 font-normal">Accuracy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
