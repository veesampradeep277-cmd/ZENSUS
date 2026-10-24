import React from 'react';
import { ArrowLeft, History, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { SubmissionRecord } from '../types/dsa.types';

interface SubmissionsListProps {
  submissions: SubmissionRecord[];
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({
  submissions,
  onBack,
  onSelectProblem,
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
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              All Submissions History
            </h1>
            <p className="text-xs text-slate-500">
              Audit log of all code evaluations and judge verdicts
            </p>
          </div>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs space-y-2">
          <History className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="font-bold text-slate-700 text-sm">No submissions recorded yet</p>
          <p>Submit your code on any problem to track your execution verdicts and runtime history.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Verdict</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Language</th>
                  <th className="py-3 px-4">Tests Passed</th>
                  <th className="py-3 px-4">Runtime</th>
                  <th className="py-3 px-4 text-right">Submitted At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-indigo-50/20 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                          sub.verdict === 'ACCEPTED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {sub.verdict === 'ACCEPTED' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-rose-600" />
                        )}
                        {sub.verdict}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => onSelectProblem(sub.problemId)}
                        className="font-bold text-slate-900 hover:text-indigo-600 transition-colors text-left"
                      >
                        {sub.problemTitle}
                      </button>
                    </td>

                    <td className="py-3 px-4 font-mono uppercase text-slate-600 font-semibold">
                      {sub.language}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-700">
                      {sub.passedTests} / {sub.totalTests}
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-700">
                      {sub.runtimeMs}ms
                    </td>

                    <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
