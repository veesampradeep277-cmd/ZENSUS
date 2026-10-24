import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DsaDashboard } from './components/DsaDashboard';
import { TopicView } from './components/TopicView';
import { ProblemWorkspace } from './components/ProblemWorkspace';
import { BookmarksView } from './components/BookmarksView';
import { SubmissionsList } from './components/SubmissionsList';
import { RunnerHealthModal } from './components/RunnerHealthModal';
import {
  DsaTopic,
  ProblemDetail,
  ProblemSummary,
  ProgressSummary,
  RunnerHealthStatus,
} from './types/dsa.types';
import {
  fetchTopics,
  fetchTopic,
  fetchTopicProblems,
  fetchProblem,
  fetchProgress,
  fetchBookmarks,
  fetchRunnersHealth,
  fetchAllSubmissions,
  toggleBookmark,
} from './lib/api';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'topic' | 'problem' | 'bookmarks' | 'submissions'
  >('dashboard');

  const [topics, setTopics] = useState<DsaTopic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<DsaTopic | null>(null);
  const [topicProblems, setTopicProblems] = useState<ProblemSummary[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<ProblemDetail | null>(null);
  const [bookmarkedProblems, setBookmarkedProblems] = useState<ProblemDetail[]>([]);
  const [bookmarksList, setBookmarksList] = useState<string[]>([]);
  const [submissionsList, setSubmissionsList] = useState<any[]>([]);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);

  // Runner Health state
  const [runnerHealth, setRunnerHealth] = useState<RunnerHealthStatus[] | null>(null);
  const [isHealthModalOpen, setIsHealthModalOpen] = useState<boolean>(false);
  const [isRefreshingHealth, setIsRefreshingHealth] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial Data Load
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        const [loadedTopics, loadedProgress, health] = await Promise.all([
          fetchTopics(),
          fetchProgress(),
          fetchRunnersHealth(),
        ]);
        setTopics(loadedTopics);
        setProgress(loadedProgress);
        setBookmarksList(loadedProgress.bookmarks || []);
        setRunnerHealth(health);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const refreshProgress = async () => {
    try {
      const p = await fetchProgress();
      setProgress(p);
      setBookmarksList(p.bookmarks || []);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSelectTopic = async (topicId: string) => {
    setIsLoading(true);
    try {
      const [topic, problems] = await Promise.all([
        fetchTopic(topicId),
        fetchTopicProblems(topicId),
      ]);
      setSelectedTopic(topic);
      setTopicProblems(problems);
      setCurrentView('topic');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProblem = async (problemId: string) => {
    setIsLoading(true);
    try {
      const problem = await fetchProblem(problemId);
      setSelectedProblem(problem);

      // If we don't have current topic loaded, load it
      if (!selectedTopic || selectedTopic.id !== problem.topicId) {
        const [topic, problems] = await Promise.all([
          fetchTopic(problem.topicId),
          fetchTopicProblems(problem.topicId),
        ]);
        setSelectedTopic(topic);
        setTopicProblems(problems);
      }

      setCurrentView('problem');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateProblem = (delta: number) => {
    if (!selectedProblem || topicProblems.length === 0) return;
    const currentIndex = topicProblems.findIndex((p) => p.id === selectedProblem.id);
    if (currentIndex === -1) return;
    const nextIndex = currentIndex + delta;
    if (nextIndex >= 0 && nextIndex < topicProblems.length) {
      handleSelectProblem(topicProblems[nextIndex].id);
    }
  };

  const handleToggleBookmark = async (problemId: string) => {
    try {
      const isBookmarked = await toggleBookmark(problemId);
      setBookmarksList((prev) =>
        isBookmarked ? [...prev, problemId] : prev.filter((id) => id !== problemId)
      );
      refreshProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenBookmarks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBookmarks();
      setBookmarkedProblems(data.problems);
      setCurrentView('bookmarks');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllSubmissions();
      setSubmissionsList(data);
      setCurrentView('submissions');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshRunners = async () => {
    setIsRefreshingHealth(true);
    try {
      const health = await fetchRunnersHealth();
      setRunnerHealth(health);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshingHealth(false);
    }
  };

  const isCurrentProblemBookmarked = selectedProblem
    ? bookmarksList.includes(selectedProblem.id)
    : false;

  const currentProblemIndex = selectedProblem
    ? topicProblems.findIndex((p) => p.id === selectedProblem.id)
    : -1;
  const hasPrevProblem = currentProblemIndex > 0;
  const hasNextProblem =
    currentProblemIndex >= 0 && currentProblemIndex < topicProblems.length - 1;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Genesis Main Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'dashboard') {
            setCurrentView('dashboard');
            refreshProgress();
          } else if (view === 'bookmarks') {
            handleOpenBookmarks();
          } else if (view === 'submissions') {
            handleOpenSubmissions();
          }
        }}
        progress={progress}
        onOpenRunnerHealth={() => setIsHealthModalOpen(true)}
        runnerHealth={runnerHealth}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {isLoading && !selectedProblem ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">
              Loading Genesis DSA Practice System...
            </p>
          </div>
        ) : currentView === 'dashboard' ? (
          <DsaDashboard
            topics={topics}
            progress={progress}
            onSelectTopic={handleSelectTopic}
            onStartPracticing={() => handleSelectTopic(topics[0]?.id || 'array')}
          />
        ) : currentView === 'topic' && selectedTopic ? (
          <TopicView
            topic={selectedTopic}
            problems={topicProblems}
            onBack={() => {
              setCurrentView('dashboard');
              refreshProgress();
            }}
            onSelectProblem={handleSelectProblem}
            onToggleBookmark={handleToggleBookmark}
            bookmarks={bookmarksList}
          />
        ) : currentView === 'problem' && selectedProblem ? (
          <ProblemWorkspace
            problem={selectedProblem}
            onBack={() => {
              if (selectedTopic) setCurrentView('topic');
              else setCurrentView('dashboard');
              refreshProgress();
            }}
            onNavigateProblem={handleNavigateProblem}
            hasPrev={hasPrevProblem}
            hasNext={hasNextProblem}
            isBookmarked={isCurrentProblemBookmarked}
            onBookmarkChanged={(b) => {
              handleToggleBookmark(selectedProblem.id);
            }}
          />
        ) : currentView === 'bookmarks' ? (
          <BookmarksView
            problems={bookmarkedProblems}
            onBack={() => setCurrentView('dashboard')}
            onSelectProblem={handleSelectProblem}
            onRemoveBookmark={async (id) => {
              await handleToggleBookmark(id);
              setBookmarkedProblems((prev) => prev.filter((p) => p.id !== id));
            }}
          />
        ) : currentView === 'submissions' ? (
          <SubmissionsList
            submissions={submissionsList}
            onBack={() => setCurrentView('dashboard')}
            onSelectProblem={handleSelectProblem}
          />
        ) : null}
      </main>

      {/* Live Compiler/Runner Health Modal */}
      <RunnerHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
        health={runnerHealth}
        onRefresh={handleRefreshRunners}
        isLoading={isRefreshingHealth}
      />
    </div>
  );
}
