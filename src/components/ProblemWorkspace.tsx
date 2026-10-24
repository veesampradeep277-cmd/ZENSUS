import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Send,
  Bookmark,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Terminal,
  History,
  FileCode,
  Copy,
  Check,
  Cpu,
} from 'lucide-react';
import {
  ProblemDetail,
  SupportedLanguage,
  RunResult,
  SubmissionRecord,
  JudgeVerdict,
} from '../types/dsa.types';
import { runCode, submitCode, fetchProblemSubmissions, toggleBookmark } from '../lib/api';

interface ProblemWorkspaceProps {
  problem: ProblemDetail;
  onBack: () => void;
  onNavigateProblem?: (delta: number) => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  isBookmarked: boolean;
  onBookmarkChanged?: (bookmarked: boolean) => void;
}

export const ProblemWorkspace: React.FC<ProblemWorkspaceProps> = ({
  problem,
  onBack,
  onNavigateProblem,
  hasPrev = true,
  hasNext = true,
  isBookmarked,
  onBookmarkChanged,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('python');
  
  // Independent drafts storage per language
  const [codeDrafts, setCodeDrafts] = useState<Record<SupportedLanguage, string>>({
    python: problem.starterCode.python || '',
    cpp: problem.starterCode.cpp || '',
    c: problem.starterCode.c || problem.starterCode.cpp || '',
    java: problem.starterCode.java || '',
    javascript: problem.starterCode.javascript || '',
  });

  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [activeTestTab, setActiveTestTab] = useState<number>(0);
  
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string>('Saved');

  // Update starter code when problem changes
  useEffect(() => {
    setCodeDrafts({
      python: problem.starterCode.python || '',
      cpp: problem.starterCode.cpp || '',
      c: problem.starterCode.c || problem.starterCode.cpp || '',
      java: problem.starterCode.java || '',
      javascript: problem.starterCode.javascript || '',
    });
    setRunResult(null);
    setSubmitResult(null);
    setBookmarked(isBookmarked);
    loadSubmissions();
  }, [problem.id]);

  const loadSubmissions = async () => {
    try {
      const data = await fetchProblemSubmissions(problem.id);
      setSubmissions(data);
    } catch (err) {
      console.warn('Failed to load submissions:', err);
    }
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setSelectedLanguage(newLang);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return;
    setCodeDrafts((prev) => ({
      ...prev,
      [selectedLanguage]: value,
    }));
    setSaveStatus('Saving...');
    setTimeout(() => setSaveStatus('Saved draft'), 500);
  };

  const handleResetCode = () => {
    if (confirm('Reset code to starter template for ' + selectedLanguage + '?')) {
      setCodeDrafts((prev) => ({
        ...prev,
        [selectedLanguage]: problem.starterCode[selectedLanguage] || '',
      }));
    }
  };

  const handleToggleBookmark = async () => {
    try {
      const res = await toggleBookmark(problem.id);
      setBookmarked(res);
      onBookmarkChanged?.(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Run visible tests
  const handleRun = async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    setSubmitResult(null);
    try {
      const code = codeDrafts[selectedLanguage];
      const res = await runCode(problem.id, selectedLanguage, code);
      setRunResult(res);
      setActiveTestTab(0);
    } catch (err: any) {
      setRunResult({
        success: false,
        verdict: 'SERVER_OFFLINE',
        runtimeMs: 0,
        compilationError: err.message,
        testResults: [],
        passedTests: 0,
        totalTests: problem.visibleTests.length,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit against visible + hidden tests
  const handleSubmit = async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setRunResult(null);
    try {
      const code = codeDrafts[selectedLanguage];
      const res = await submitCode(problem.id, selectedLanguage, code);
      setSubmitResult(res);
      loadSubmissions();
    } catch (err: any) {
      setSubmitResult({
        verdict: 'SERVER_OFFLINE',
        runtimeError: err.message,
        passedTests: 0,
        totalTests: problem.visibleTests.length,
        runtimeMs: 0,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard shortcuts: Ctrl+Enter / Cmd+Enter = Run, Ctrl+S = Save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        setSaveStatus('Saved draft');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLanguage, codeDrafts]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const monacoLanguage =
    selectedLanguage === 'python'
      ? 'python'
      : selectedLanguage === 'cpp'
      ? 'cpp'
      : selectedLanguage === 'c'
      ? 'c'
      : selectedLanguage === 'java'
      ? 'java'
      : 'javascript';

  return (
    <div className="flex flex-col h-[calc(100vh-4.2rem)] bg-slate-100 overflow-hidden -m-4 sm:-m-6 lg:-m-8">
      {/* Top Workspace Bar */}
      <div className="h-12 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Topic</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          {/* Navigation Previous / Next */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigateProblem?.(-1)}
              disabled={!hasPrev}
              title="Previous Problem"
              className="p-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateProblem?.(1)}
              disabled={!hasNext}
              title="Next Problem"
              className="p-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-400">
              #{String(problem.order).padStart(3, '0')}
            </span>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
              {problem.title}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                problem.difficulty === 'Easy'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : problem.difficulty === 'Medium'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {problem.difficulty}
            </span>
            {(problem.status === 'draft' || problem.isDraft) && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300">
                Draft
              </span>
            )}
          </div>
        </div>

        {/* Action buttons on workspace top bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
              bookmarked
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            <span className="hidden md:inline">{bookmarked ? 'Saved' : 'Bookmark'}</span>
          </button>

          <span className="text-[11px] text-slate-400 font-mono hidden lg:inline mr-2">
            {saveStatus}
          </span>

          <button
            onClick={handleRun}
            disabled={isRunning || isSubmitting || problem.status === 'draft' || problem.isDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50 shadow-xs"
            title={problem.status === 'draft' || problem.isDraft ? 'Execution disabled for draft problem' : 'Execute against visible tests (Ctrl+Enter)'}
          >
            <Play className={`w-3.5 h-3.5 fill-current text-slate-600 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
            <span className="hidden xl:inline text-[10px] text-slate-400 font-normal">(Ctrl+↵)</span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting || problem.status === 'draft' || problem.isDraft}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50"
            title={problem.status === 'draft' || problem.isDraft ? 'Submission disabled for draft problem' : 'Submit against visible and hidden tests'}
          >
            <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Body: Left Panel & Right Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Problem Statement / Submissions */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white border-r border-slate-200 overflow-hidden">
          {/* Left panel tabs */}
          <div className="flex items-center gap-2 px-4 border-b border-slate-200 bg-slate-50/75 shrink-0 h-10">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'description'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Description
            </button>
            <button
              onClick={() => {
                setActiveTab('submissions');
                loadSubmissions();
              }}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'submissions'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Submissions ({submissions.length})
            </button>
          </div>

          {/* Left panel scrollable content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800">
            {activeTab === 'description' ? (
              <>
                {/* Title & Metadata */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                      {problem.topicTitle}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Stage: {problem.progressionStage}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {problem.title}
                  </h2>
                </div>

                {/* Problem Description */}
                <div className="prose prose-slate max-w-none text-xs md:text-sm leading-relaxed text-slate-700">
                  <p>{problem.description}</p>
                </div>

                {/* Input Format & Output Format */}
                <div className="space-y-4 pt-2">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Input Format
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-mono">
                      {problem.inputFormat}
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Output Format
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-mono">
                      {problem.outputFormat}
                    </p>
                  </div>
                </div>

                {/* Constraints */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Constraints
                  </h4>
                  <ul className="space-y-1 font-mono text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-slate-400 select-none">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2 text-slate-500 pt-1 border-t border-slate-200/60 font-sans">
                      <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <span>Time Limit: {problem.timeLimitMs}ms | Memory Limit: {problem.memoryLimitMb}MB</span>
                    </li>
                  </ul>
                </div>

                {/* Examples */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Examples
                  </h4>
                  {problem.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs space-y-2.5 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900">
                          Example {idx + 1}
                        </span>
                        <button
                          onClick={() => copyToClipboard(ex.input, `ex-${idx}`)}
                          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
                        >
                          {copiedExample === `ex-${idx}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Input</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">
                          Input:
                        </span>
                        <pre className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 border border-slate-200 overflow-x-auto whitespace-pre-wrap">
                          {ex.input}
                        </pre>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 block uppercase">
                          Output:
                        </span>
                        <pre className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-800 border border-slate-200 overflow-x-auto whitespace-pre-wrap">
                          {ex.output}
                        </pre>
                      </div>

                      {ex.explanation && (
                        <div className="text-xs text-slate-600 italic bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                          <span className="font-bold not-italic text-slate-700">Explanation: </span>
                          {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500 mr-1">Tags:</span>
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Submissions History Tab */
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Your Submissions</h3>
                {submissions.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No submissions yet for this problem. Click "Submit" to evaluate your code.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                                sub.verdict === 'ACCEPTED'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {sub.verdict}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                              {sub.language}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {new Date(sub.createdAt).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                          <span>
                            Test Cases Passed: <strong className="text-slate-800">{sub.passedTests} / {sub.totalTests}</strong>
                          </span>
                          <span>Runtime: <strong className="text-slate-800">{sub.runtimeMs}ms</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Code Editor & Results Console */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] overflow-hidden">
          {/* Editor Header Bar */}
          <div className="h-10 bg-[#252526] border-b border-[#333333] px-4 flex items-center justify-between shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-[#1e1e1e] text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-md border border-[#444] focus:outline-hidden focus:border-indigo-500"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="java">Java (OpenJDK 17)</option>
                <option value="c">C (gcc)</option>
                <option value="cpp">C++ (g++)</option>
              </select>
            </div>

            {/* Editor Utilities */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetCode}
                title="Reset code to starter template"
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded-md hover:bg-[#333] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 min-h-[300px] overflow-hidden relative">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vs-dark"
              value={codeDrafts[selectedLanguage]}
              onChange={handleCodeChange}
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                lineNumbers: 'on',
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                tabSize: 4,
              }}
            />
          </div>

          {/* Bottom Results & Test Console */}
          <div className="h-64 bg-white border-t border-slate-200 flex flex-col shrink-0 overflow-hidden">
            {/* Console Tabs / Header */}
            <div className="h-9 bg-slate-50 border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">Test Cases &amp; Verdict</span>
              </div>

              {/* Status summary pill */}
              {runResult && (
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      runResult.verdict === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : runResult.verdict === 'WRONG_ANSWER'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : runResult.verdict === 'COMPILATION_ERROR'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {runResult.verdict} ({runResult.passedTests}/{runResult.totalTests} Passed in {runResult.runtimeMs}ms)
                  </span>
                </div>
              )}

              {submitResult && (
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      submitResult.verdict === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    Submit Verdict: {submitResult.verdict} ({submitResult.passedTests}/{submitResult.totalTests} in {submitResult.runtimeMs}ms)
                  </span>
                </div>
              )}
            </div>

            {/* Console Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {/* Submission Result view if just submitted */}
              {submitResult ? (
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      submitResult.verdict === 'ACCEPTED'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {submitResult.verdict === 'ACCEPTED' ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-extrabold text-sm">{submitResult.verdict}</h4>
                        <p className="text-xs opacity-90 mt-0.5">
                          Evaluated against all visible and hidden test cases.
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-xs space-y-0.5 font-mono">
                      <div>Passed: <strong>{submitResult.passedTests} / {submitResult.totalTests}</strong></div>
                      <div>Runtime: <strong>{submitResult.runtimeMs}ms</strong></div>
                    </div>
                  </div>

                  {submitResult.compilationError && (
                    <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap">
                      <span className="font-bold text-amber-400 block mb-1">Compiler Output:</span>
                      {submitResult.compilationError}
                    </div>
                  )}

                  {submitResult.runtimeError && (
                    <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap">
                      <span className="font-bold text-rose-400 block mb-1">Runtime Diagnostics:</span>
                      {submitResult.runtimeError}
                    </div>
                  )}
                </div>
              ) : runResult ? (
                /* Run Result View */
                <div className="space-y-3">
                  {runResult.verdict === 'RUNNER_UNAVAILABLE' ? (
                    <div className="p-4 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Runner Unavailable</span>
                      </div>
                      <p className="text-xs text-amber-700 font-mono">
                        {runResult.errorMessage || 'Compiler/interpreter toolchain not found on host.'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Please install the toolchain for {selectedLanguage} on the host machine to execute this code.
                      </p>
                    </div>
                  ) : runResult.compilationError ? (
                    <div className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-xl overflow-x-auto whitespace-pre-wrap">
                      <span className="font-bold text-amber-400 block mb-1">Compilation Error:</span>
                      {runResult.compilationError}
                    </div>
                  ) : (
                    <>
                      {/* Test case tabs */}
                      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-100 pb-2">
                        {runResult.testResults.map((t, idx) => (
                          <button
                            key={t.testId}
                            onClick={() => setActiveTestTab(idx)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                              activeTestTab === idx
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {t.passed ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3 h-3 text-rose-400" />
                            )}
                            <span>Case {idx + 1}</span>
                          </button>
                        ))}
                      </div>

                      {/* Active test case inspection */}
                      {runResult.testResults[activeTestTab] && (
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[11px] font-bold text-slate-500 uppercase block">
                              Input:
                            </span>
                            <pre className="p-2 bg-slate-50 rounded-lg font-mono text-slate-800 border border-slate-200 overflow-x-auto whitespace-pre-wrap">
                              {runResult.testResults[activeTestTab].input}
                            </pre>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                                Expected Output:
                              </span>
                              <pre className="p-2 bg-slate-50 rounded-lg font-mono text-slate-800 border border-slate-200 overflow-x-auto whitespace-pre-wrap">
                                {runResult.testResults[activeTestTab].expectedOutput}
                              </pre>
                            </div>

                            <div>
                              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                                Your Output:
                              </span>
                              <pre
                                className={`p-2 rounded-lg font-mono border overflow-x-auto whitespace-pre-wrap ${
                                  runResult.testResults[activeTestTab].passed
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                    : 'bg-rose-50 text-rose-900 border-rose-200'
                                }`}
                              >
                                {runResult.testResults[activeTestTab].actualOutput || '(No output)'}
                              </pre>
                            </div>
                          </div>

                          {runResult.testResults[activeTestTab].errorMessage && (
                            <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg font-mono text-[11px]">
                              {runResult.testResults[activeTestTab].errorMessage}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                /* Initial Test Case View */
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <span>Visible Test Cases ({problem.visibleTests.length}):</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {problem.visibleTests.map((t, idx) => (
                      <div
                        key={t.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Case {idx + 1}</span>
                          <span className="text-[11px] text-slate-400">{t.label}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block uppercase">
                            Input:
                          </span>
                          <pre className="p-1.5 bg-white rounded-md border border-slate-200 font-mono text-[11px] text-slate-800 overflow-x-auto">
                            {t.input.trim()}
                          </pre>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block uppercase">
                            Expected:
                          </span>
                          <pre className="p-1.5 bg-white rounded-md border border-slate-200 font-mono text-[11px] text-slate-800 overflow-x-auto">
                            {t.expectedOutput.trim()}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Click <strong>Run</strong> to test your solution against visible cases, or <strong>Submit</strong> to evaluate all hidden cases.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
