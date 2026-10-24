import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { DsaTopic, ProgressSummary } from '../types/dsa.types';

interface DsaDashboardProps {
  topics: DsaTopic[];
  progress: ProgressSummary | null;
  onSelectTopic: (topicId: string) => void;
  onStartPracticing: () => void;
}

const CATEGORIES = [
  'All',
  'Fundamentals',
  'Linear Data Structures',
  'Non-Linear Data Structures',
  'Algorithms',
  'Advanced Topics',
] as const;

export const DsaDashboard: React.FC<DsaDashboardProps> = ({
  topics,
  progress,
  onSelectTopic,
  onStartPracticing,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(t.number).includes(searchQuery.trim());
      return matchCat && matchSearch;
    });
  }, [topics, selectedCategory, searchQuery]);

  const totalProblemsCount = useMemo(() => {
    return topics.reduce((acc, t) => acc + t.totalProblems, 0);
  }, [topics]);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-blue-100/50 text-slate-900 p-8 md:p-12 shadow-md border border-blue-100">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Direction Before Destination · Coding Problems
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Master <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Data Structures &amp; Algorithms</span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            A comprehensive curriculum of 41 topics and 3,075 data-driven problems. Write and execute code in Python, JavaScript, Java, and C++, with real test cases, execution and judge verification.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartPracticing}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Start Practicing (01. Input &amp; Output)
            </button>
            <button
              onClick={() => onSelectTopic('03-arrays')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 font-bold text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              Jump to Arrays (#03)
            </button>
          </div>
        </div>

        {/* 5 Real Clean Stat Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-8 mt-8 border-t border-slate-200">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Topics</span>
            <span className="text-2xl font-black tracking-tight text-blue-600">{topics.length}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Structured</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Problems</span>
            <span className="text-2xl font-black tracking-tight text-indigo-600">{totalProblemsCount.toLocaleString()}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">75 per topic</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Easy Level</span>
            <span className="text-2xl font-black tracking-tight text-emerald-600">1,025</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Foundation (33%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Medium Level</span>
            <span className="text-2xl font-black tracking-tight text-amber-600">1,435</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Core (47%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Hard Level</span>
            <span className="text-2xl font-black tracking-tight text-rose-600">615</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">Advanced (20%)</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 text-blue-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. Arrays, Trees, Dynamic Programming)..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTopics.map((topic) => {
          const solved = topic.solvedCount ?? 0;
          const total = topic.totalProblems;
          const percentage = Math.round((solved / total) * 100);

          return (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                    #{String(topic.number).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {topic.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                {/* Difficulty distribution badges */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-600 font-bold">25 Easy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-amber-600 font-bold">35 Med</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-rose-600 font-bold">15 Hard</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Progress</span>
                    <span className="font-bold text-slate-900">
                      {solved} / {total} <span className="text-slate-400 font-normal">({percentage}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Explore 75 Problems <ChevronRight className="w-4 h-4 ml-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No topics match your query</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All" categories.</p>
        </div>
      )}
    </div>
  );
};
