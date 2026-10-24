import React from 'react';
import { Bookmark, ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { ProblemDetail } from '../types/dsa.types';

interface BookmarksViewProps {
  problems: ProblemDetail[];
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
  onRemoveBookmark: (problemId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  problems,
  onBack,
  onSelectProblem,
  onRemoveBookmark,
}) => {
  return (
    <div className="space-y-6 pb-16">
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Bookmark className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              My Bookmarked Problems
            </h1>
            <p className="text-xs text-slate-500">
              Problems saved for revision and interview prep
            </p>
          </div>
        </div>
      </div>

      {problems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs space-y-2">
          <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-bold text-slate-700 text-sm">No bookmarked problems yet</p>
          <p>Click the bookmark icon on any problem to save it for quick review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                    {p.topicTitle}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      p.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : p.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectProblem(p.id)}
                  className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer text-sm"
                >
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onRemoveBookmark(p.id)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  Remove
                </button>

                <button
                  onClick={() => onSelectProblem(p.id)}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform"
                >
                  Solve Now <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
