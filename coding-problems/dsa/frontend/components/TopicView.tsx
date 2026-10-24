import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Bookmark,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  BarChart,
  Tag,
} from 'lucide-react';
import { DsaTopic, ProblemSummary } from '../types/dsa.types';

interface TopicViewProps {
  topic: DsaTopic;
  problems: ProblemSummary[];
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
  onToggleBookmark: (problemId: string) => void;
  bookmarks: string[];
}

export const TopicView: React.FC<TopicViewProps> = ({
  topic,
  problems,
  onBack,
  onSelectProblem,
  onToggleBookmark,
  bookmarks,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Solved' | 'Unsolved' | 'Attempted'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
      const isBookmarked = bookmarks.includes(p.id);

      let matchStatus = true;
      if (statusFilter === 'Solved') matchStatus = !!p.solved;
      else if (statusFilter === 'Attempted') matchStatus = !!p.attempted && !p.solved;
      else if (statusFilter === 'Unsolved') matchStatus = !p.solved;

      const matchSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.order).includes(searchQuery.trim()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchDiff && matchStatus && matchSearch;
    });
  }, [problems, difficultyFilter, statusFilter, searchQuery, bookmarks]);

  const solvedCount = problems.filter((p) => p.solved).length;
  const progressPercent = Math.round((solvedCount / (problems.length || 1)) * 100);

  return (
    <div className="space-y-6 pb-16">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Topics
        </button>
      </div>

      {/* Topic Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                Topic {String(topic.number).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-500 font-medium">{topic.category}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {topic.title}
            </h1>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              {topic.description}
            </p>
          </div>

          {/* Topic Progress Card */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 min-w-[260px] space-y-3 shrink-0">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-600">Completion</span>
              <span className="font-bold text-slate-900">
                {solvedCount} / {problems.length} Solved ({progressPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-1">
              <span className="text-emerald-700">25 Easy</span>
              <span className="text-amber-700">35 Medium</span>
              <span className="text-rose-700">15 Hard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  difficultyFilter === diff
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Solved', 'Attempted', 'Unsolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Problem Listing Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4 w-16">#</th>
                <th className="py-3 px-4">Problem Title</th>
                <th className="py-3 px-4 w-28">Difficulty</th>
                <th className="py-3 px-4 hidden md:table-cell w-36">Stage</th>
                <th className="py-3 px-4 hidden lg:table-cell">Tags</th>
                <th className="py-3 px-4 w-16 text-center">Save</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProblems.map((problem) => {
                const isBookmarked = bookmarks.includes(problem.id);

                return (
                  <tr
                    key={problem.id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      {problem.solved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : problem.attempted ? (
                        <Clock className="w-4 h-4 text-amber-500 mx-auto" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-200 block mx-auto" />
                      )}
                    </td>

                    {/* Order */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-400">
                      {String(problem.order).padStart(3, '0')}
                    </td>

                    {/* Title */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onSelectProblem(problem.id)}
                        className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-left focus:outline-hidden"
                      >
                        {problem.title}
                      </button>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                          problem.difficulty === 'Easy'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : problem.difficulty === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>

                    {/* Progression Stage */}
                    <td className="py-3 px-4 hidden md:table-cell text-slate-500 font-medium">
                      {problem.progressionStage}
                    </td>

                    {/* Tags */}
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Bookmark */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => onToggleBookmark(problem.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isBookmarked
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark problem'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectProblem(problem.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 transition-all shadow-2xs"
                      >
                        Solve
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No problems match your selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
