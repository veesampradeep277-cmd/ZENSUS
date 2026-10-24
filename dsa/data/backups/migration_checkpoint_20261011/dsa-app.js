/**
 * ZENSUS DSA CODING PROBLEMS — CLIENT APPLICATION ENGINE
 * Clean White + Blue Design Theme matching ZENSUS EdTech UI
 * Supports 41 Topics, 3,075 Problems, Monaco Code Editor, Client-Side & Backend Execution Judge
 */

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    view: 'dashboard', // 'dashboard' | 'topic' | 'problem' | 'bookmarks' | 'submissions'
    selectedTopicId: null,
    selectedProblemId: null,
    selectedCategory: 'All',
    searchQuery: '',
    selectedLanguage: 'python',
    activeTestTab: 0,
    customInput: '',
    isRunning: false,
    isSubmitting: false,
    runResult: null,
    submitResult: null,
    
    // User progress stored in localStorage
    solved: JSON.parse(localStorage.getItem('zensus_dsa_solved') || '[]'),
    attempted: JSON.parse(localStorage.getItem('zensus_dsa_attempted') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('zensus_dsa_bookmarks') || '[]'),
    submissions: JSON.parse(localStorage.getItem('zensus_dsa_submissions') || '[]'),
    drafts: JSON.parse(localStorage.getItem('zensus_dsa_drafts') || '{}'),
  };

  function saveStorage() {
    localStorage.setItem('zensus_dsa_solved', JSON.stringify(state.solved));
    localStorage.setItem('zensus_dsa_attempted', JSON.stringify(state.attempted));
    localStorage.setItem('zensus_dsa_bookmarks', JSON.stringify(state.bookmarks));
    localStorage.setItem('zensus_dsa_submissions', JSON.stringify(state.submissions));
    localStorage.setItem('zensus_dsa_drafts', JSON.stringify(state.drafts));
  }

  // --- DATA ACCESS ---
  const data = window.ZENSUS_DSA_DATA || { topics: [], problemsByTopic: {}, problemsById: {} };

  function getTopic(id) {
    return data.topics.find((t) => t.id === id || t.slug === id);
  }

  function getProblems(topicId) {
    return data.problemsByTopic[topicId] || [];
  }

  function getProblemDetail(problemId) {
    return data.problemsById[problemId] || null;
  }

  // --- STATS CALCULATION ---
  function getStats() {
    const totalProblems = 3075;
    const solvedCount = state.solved.length;
    const attemptedCount = state.attempted.length;
    const totalSubmissions = state.submissions.length;
    const acceptedSubmissions = state.submissions.filter((s) => s.verdict === 'ACCEPTED').length;
    const accuracy = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;
    const streakDays = solvedCount > 0 ? 1 : 0;

    return {
      totalProblems,
      solvedCount,
      attemptedCount,
      accuracy,
      streakDays,
    };
  }

  // Topic Icons mapping
  const topicIcons = {
    '01-input-output': '⚡',
    '02-mathematics': '📐',
    '03-arrays': '▦',
    '04-strings': '🔤',
    '05-hashing': '#',
    '06-sorting': '⇅',
    '07-searching': '🔍',
    '08-two-pointers': '↔',
    '09-sliding-window': '◫',
    '10-prefix-sum': '∑',
    '11-recursion': '↺',
    '12-backtracking': '↩',
    '13-divide-conquer': '✂',
    '14-linked-list': '☍',
    '15-doubly-linked-list': '⇄',
    '16-circular-linked-list': '↻',
    '17-stack': '▤',
    '18-queue': '▧',
    '19-deque': '▥',
    '20-monotonic-stack': '📈',
    '21-binary-trees': '🌳',
    '22-binary-search-trees': '🌲',
    '23-tree-traversals': '🌿',
    '24-avl-red-black-trees': '🍁',
    '25-heaps-priority-queues': '🏔',
    '26-graphs-bfs-dfs': '🕸',
    '27-shortest-path': '🛣',
    '28-minimum-spanning-tree': '🌐',
    '29-topological-sort': '➔',
    '30-disjoint-set-union': '⋈',
    '31-greedy-algorithms': '🎯',
    '32-dynamic-programming-1d': '▰',
    '33-dynamic-programming-2d': '▦',
    '34-dp-subsequences': '▱',
    '35-dp-on-trees': '🎋',
    '36-bit-manipulation': '01',
    '37-trie': '🗂',
    '38-segment-tree': '📊',
    '39-fenwick-tree': '📉',
    '40-string-algorithms': '🧬',
    '41-game-theory-minimax': '♟',
  };

  // --- RENDER APP ---
  function render() {
    const root = document.getElementById('app-root');
    if (!root) return;

    const stats = getStats();

    root.innerHTML = `
      <header class="dsa-navbar">
        <div class="dsa-navbar-container">
          <!-- Logo & Brand -->
          <div class="dsa-brand" id="btn-brand">
            <div class="dsa-brand-logo">Z</div>
            <div>
              <div class="dsa-brand-title">ZENSUS</div>
              <div class="dsa-brand-subtitle">LEARN · CODE · GROW</div>
            </div>
          </div>

          <!-- Navigation items -->
          <nav class="dsa-nav-links">
            <a href="../../dashboard.html" class="dsa-nav-btn">
              <span>⌂</span> Home
            </a>
            <a href="../index.html" class="dsa-nav-btn">
              <span>▦</span> Dashboard
            </a>
            <button class="dsa-nav-btn ${state.view === 'dashboard' || state.view === 'topic' ? 'active' : ''}" id="nav-curriculum">
              <span>🎓</span> Curriculum (41 Topics)
            </button>
            <button class="dsa-nav-btn ${state.view === 'bookmarks' ? 'active' : ''}" id="nav-bookmarks">
              <span>★</span> Bookmarks
            </button>
            <button class="dsa-nav-btn ${state.view === 'submissions' ? 'active' : ''}" id="nav-submissions">
              <span>⏱</span> Submissions
            </button>
          </nav>

          <!-- Stats & Profile -->
          <div class="dsa-nav-stats">
            <div class="stat-pill stat-pill-streak">
              🔥 <span>Streak ${stats.streakDays}</span>
            </div>
            <div class="stat-pill stat-pill-accuracy">
              🎯 <span>${stats.accuracy}% Accuracy</span>
            </div>
            <div class="user-avatar-badge" title="Student Profile">
              👤
            </div>
          </div>
        </div>
      </header>

      <main style="max-width: 1440px; margin: 0 auto; padding: 24px;">
        ${
          state.view === 'dashboard'
            ? renderDashboard()
            : state.view === 'topic'
            ? renderTopicView()
            : state.view === 'problem'
            ? renderProblemWorkspace()
            : state.view === 'bookmarks'
            ? renderBookmarksView()
            : state.view === 'submissions'
            ? renderSubmissionsView()
            : ''
        }
      </main>
    `;

    attachEvents();
  }

  // --- DASHBOARD VIEW ---
  function renderDashboard() {
    const categories = [
      'All',
      'Fundamentals',
      'Linear Data Structures',
      'Non-Linear Data Structures',
      'Algorithms',
      'Advanced Topics',
    ];

    const filteredTopics = data.topics.filter((t) => {
      const matchCat = state.selectedCategory === 'All' || t.category === state.selectedCategory;
      const matchSearch =
        state.searchQuery.trim() === '' ||
        t.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        String(t.number).includes(state.searchQuery.trim());
      return matchCat && matchSearch;
    });

    const solvedTopicsCount = data.topics.filter((t) => {
      const probs = getProblems(t.id);
      return probs.some((p) => state.solved.includes(p.id));
    }).length;

    return `
      <!-- HERO SECTION -->
      <section class="dsa-hero">
        <div class="dsa-hero-top-row">
          <div class="dsa-hero-content">
            <div class="dsa-hero-badge">
              🛡 DIRECTION BEFORE DESTINATION - CODING PROBLEMS
            </div>
            <h1 class="dsa-hero-title">
              Master <span class="hero-gradient-text">Data Structures &amp; Algorithms</span>
            </h1>
            <p class="dsa-hero-desc">
              A comprehensive curriculum of 41 topics and 3,075 data-driven problems. Write and execute code in Python, JavaScript, Java, and C++, with real test cases, execution and judge verification.
            </p>
            <div class="dsa-hero-actions">
              <button class="btn-primary" id="btn-start-practicing">
                ▶ Start Practicing (${solvedTopicsCount}/41, Input &amp; Output)
              </button>
              <button class="btn-secondary" id="btn-jump-arrays">
                ⤢ Jump to Arrays (#03)
              </button>
            </div>
          </div>

          <!-- Hero Laptop Illustration with Floating Tech Badges -->
          <div class="dsa-hero-art">
            <div class="hero-floating-badge badge-pos-py">
              <span>🐍</span> Python
            </div>
            <div class="hero-floating-badge badge-pos-java">
              <span>☕</span> Java
            </div>
            <div class="hero-floating-badge badge-pos-cpp">
              <span>⚙️</span> C++
            </div>
            <div class="hero-floating-badge badge-pos-js">
              <span>⚡</span> JavaScript
            </div>
            <div class="hero-laptop-card">
              <div class="hero-laptop-code">&lt;/&gt;</div>
              <div class="hero-laptop-base"></div>
            </div>
          </div>
        </div>

        <!-- 5 STAT CARDS -->
        <div class="dsa-stats-grid">
          <div class="dsa-stat-box">
            <div class="dsa-stat-box-header">
              <span>📄</span> TOTAL TOPICS
            </div>
            <div class="value" style="color: #2563EB;">41</div>
            <div class="sub">Structured</div>
          </div>

          <div class="dsa-stat-box">
            <div class="dsa-stat-box-header">
              <span>&lt;/&gt;</span> TOTAL PROBLEMS
            </div>
            <div class="value" style="color: #6366F1;">3,075</div>
            <div class="sub">75 per topic</div>
          </div>

          <div class="dsa-stat-box">
            <div class="dsa-stat-box-header">
              <span>📈</span> EASY LEVEL
            </div>
            <div class="value" style="color: #10B981;">1,025</div>
            <div class="sub">Foundation (33%)</div>
          </div>

          <div class="dsa-stat-box">
            <div class="dsa-stat-box-header">
              <span>📊</span> MEDIUM LEVEL
            </div>
            <div class="value" style="color: #F59E0B;">1,435</div>
            <div class="sub">Core (47%)</div>
          </div>

          <div class="dsa-stat-box">
            <div class="dsa-stat-box-header">
              <span>🔥</span> HARD LEVEL
            </div>
            <div class="value" style="color: #EF4444;">615</div>
            <div class="sub">Advanced (20%)</div>
          </div>
        </div>
      </section>

      <!-- FILTER CONTROLS & SEARCH -->
      <div class="dsa-controls">
        <div class="dsa-categories">
          ${categories
            .map(
              (cat) => `
            <button class="cat-pill ${state.selectedCategory === cat ? 'active' : ''}" data-category="${cat}">
              ${cat}
            </button>
          `
            )
            .join('')}
        </div>

        <div class="dsa-search-box">
          <span class="dsa-search-icon">🔍</span>
          <input
            type="text"
            class="dsa-search-input"
            id="input-topic-search"
            placeholder="Search topics (e.g. Arrays, Trees, Dynamic Programming)..."
            value="${escapeHtml(state.searchQuery)}"
          />
        </div>
      </div>

      <!-- 41 TOPIC CARDS GRID -->
      <div class="topics-grid">
        ${filteredTopics
          .map((t) => {
            const problems = getProblems(t.id);
            const solvedInTopic = problems.filter((p) => state.solved.includes(p.id)).length;
            const progressPercent = Math.round((solvedInTopic / 75) * 100);
            const iconSymbol = topicIcons[t.id] || '▦';

            return `
              <div class="topic-card" data-topic-id="${t.id}">
                <div>
                  <div class="topic-header">
                    <span class="topic-num-badge">#${String(t.number).padStart(2, '0')}</span>
                    <span class="topic-cat-badge">${t.category}</span>
                  </div>

                  <div class="topic-icon-box">
                    ${iconSymbol}
                  </div>

                  <div class="topic-title-row">
                    <h3 class="topic-title">${t.title}</h3>
                    <div class="topic-arrow-icon">›</div>
                  </div>

                  <p class="topic-desc">${t.description}</p>
                </div>

                <div>
                  <div class="topic-progress-bar">
                    <div class="topic-progress-fill" style="width: ${progressPercent}%;"></div>
                  </div>
                  <div class="topic-footer">
                    <span>✓ ${solvedInTopic} / 75 Solved</span>
                    <div class="topic-diff-counts">
                      <span class="diff-tag-easy">25E</span>
                      <span class="diff-tag-med">35M</span>
                      <span class="diff-tag-hard">15H</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;
  }

  // --- TOPIC VIEW ---
  function renderTopicView() {
    const topic = getTopic(state.selectedTopicId);
    if (!topic) return `<div>Topic not found</div>`;

    const problems = getProblems(topic.id);
    const solvedCount = problems.filter((p) => state.solved.includes(p.id)).length;

    return `
      <div class="topic-view-container">
        <div class="view-header">
          <button class="back-btn" id="btn-back-dashboard">
            ← Back to Curriculum (41 Topics)
          </button>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-muted);">
            Topic #${String(topic.number).padStart(2, '0')} · ${topic.category}
          </div>
        </div>

        <div class="topic-info-banner">
          <div>
            <h1 style="font-size: 28px; font-weight: 800; color: var(--text-navy); margin-bottom: 6px;">${topic.title}</h1>
            <p style="color: var(--text-secondary); font-size: 14.5px; max-width: 750px;">${topic.description}</p>
          </div>
          <div style="text-align:right;">
            <div style="font-size: 26px; font-weight: 800; color: #2563EB;">${solvedCount} / 75</div>
            <div style="font-size: 12px; font-weight: 600; color: var(--text-muted);">Problems Solved</div>
          </div>
        </div>

        <table class="problems-table">
          <thead>
            <tr>
              <th style="width: 70px;">#</th>
              <th>Problem Title</th>
              <th>Progression Stage</th>
              <th style="width: 120px;">Difficulty</th>
              <th style="width: 110px;">Status</th>
              <th style="width: 90px; text-align:center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${problems
              .map((p, idx) => {
                const isSolved = state.solved.includes(p.id);
                const isAttempted = state.attempted.includes(p.id);
                const isBookmarked = state.bookmarks.includes(p.id);
                const diffClass =
                  p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';

                return `
                  <tr>
                    <td style="font-family: var(--font-mono); color: var(--text-muted); font-weight: 700;">${String(idx + 1).padStart(2, '0')}</td>
                    <td>
                      <div class="prob-title-cell" data-problem-id="${p.id}">
                        ${p.title}
                      </div>
                    </td>
                    <td>
                      <span style="font-size: 11.5px; font-weight: 700; color: #475569; background: #F1F5F9; padding: 3px 9px; border-radius: 6px;">
                        ${p.progressionStage}
                      </span>
                    </td>
                    <td>
                      <span class="badge-difficulty ${diffClass}">${p.difficulty}</span>
                    </td>
                    <td>
                      ${
                        isSolved
                          ? '<span style="color: var(--easy); font-weight: 800; font-size: 12.5px;">✓ Solved</span>'
                          : isAttempted
                          ? '<span style="color: var(--medium); font-weight: 800; font-size: 12.5px;">⚡ Attempted</span>'
                          : '<span style="color: var(--text-muted); font-size: 12.5px;">Todo</span>'
                      }
                    </td>
                    <td style="text-align:center;">
                      <button class="btn-primary" style="padding: 5px 14px; font-size: 12px; border-radius: 8px;" data-problem-id="${p.id}">
                        Solve →
                      </button>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // --- PROBLEM WORKSPACE ---
  function renderProblemWorkspace() {
    const problem = getProblemDetail(state.selectedProblemId);
    if (!problem) return `<div>Problem not found</div>`;

    const topic = getTopic(problem.topicId);
    const isBookmarked = state.bookmarks.includes(problem.id);
    const diffClass =
      problem.difficulty === 'Easy' ? 'badge-easy' : problem.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';

    const savedDraft =
      state.drafts[`${problem.id}_${state.selectedLanguage}`] ||
      problem.starterCode[state.selectedLanguage] ||
      '';

    const currentTopicProblems = getProblems(problem.topicId);
    const currentIndex = currentTopicProblems.findIndex((p) => p.id === problem.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex >= 0 && currentIndex < currentTopicProblems.length - 1;

    return `
      <div class="workspace-layout">
        <!-- LEFT PANEL: PROBLEM STATEMENT -->
        <div class="workspace-left">
          <div class="workspace-left-header">
            <button class="back-btn" id="btn-back-topic">
              ← ${topic ? topic.title : 'Topic'}
            </button>
            <div style="display:flex; gap: 8px;">
              <button class="btn-secondary" style="padding: 4px 10px; font-size: 12px;" id="btn-prev-prob" ${!hasPrev ? 'disabled style="opacity:0.4;"' : ''}>
                ◀ Prev
              </button>
              <button class="btn-secondary" style="padding: 4px 10px; font-size: 12px;" id="btn-next-prob" ${!hasNext ? 'disabled style="opacity:0.4;"' : ''}>
                Next ▶
              </button>
            </div>
          </div>

          <div class="workspace-left-body">
            <h1 class="prob-heading">${problem.title}</h1>
            <div class="prob-meta-row">
              <span class="badge-difficulty ${diffClass}">${problem.difficulty}</span>
              <span style="font-size: 12.5px; font-weight: 600; color: var(--text-secondary);">${topic ? topic.title : ''}</span>
              <button class="btn-secondary" style="padding: 3px 10px; font-size: 11.5px; border-radius: 8px;" id="btn-toggle-bookmark">
                ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
            </div>

            <div class="section-label">Problem Statement</div>
            <div class="prob-desc-text">${problem.description}</div>

            <div class="section-label">Input Format</div>
            <div class="prob-desc-text">${problem.inputFormat}</div>

            <div class="section-label">Output Format</div>
            <div class="prob-desc-text">${problem.outputFormat}</div>

            <div class="section-label">Constraints</div>
            <ul style="padding-left: 20px; font-family: var(--font-mono); font-size: 13px; color: #1D4ED8; margin-top: 6px;">
              ${(problem.constraints || []).map((c) => `<li>${c}</li>`).join('')}
            </ul>

            <div class="section-label">Examples</div>
            ${(problem.examples || [])
              .map(
                (ex, idx) => `
              <div class="example-card">
                <div style="font-weight: 800; font-size: 12px; color: #2563EB; margin-bottom: 8px;">Example ${idx + 1}</div>
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">INPUT:</div>
                <div class="code-box">${escapeHtml(ex.input)}<button class="copy-btn" data-copy="${escapeHtml(ex.input)}">Copy</button></div>
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; margin-top: 8px;">OUTPUT:</div>
                <div class="code-box">${escapeHtml(ex.output)}<button class="copy-btn" data-copy="${escapeHtml(ex.output)}">Copy</button></div>
                ${ex.explanation ? `<div style="font-size: 12.5px; color: var(--text-secondary); margin-top: 8px;"><em>Explanation:</em> ${ex.explanation}</div>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- RIGHT PANEL: CODE EDITOR & TEST BENCH -->
        <div class="workspace-right">
          <div class="editor-toolbar">
            <div style="display:flex; align-items:center; gap: 10px;">
              <select class="lang-select" id="select-language">
                <option value="python" ${state.selectedLanguage === 'python' ? 'selected' : ''}>Python 3</option>
                <option value="javascript" ${state.selectedLanguage === 'javascript' ? 'selected' : ''}>JavaScript (Node.js)</option>
                <option value="java" ${state.selectedLanguage === 'java' ? 'selected' : ''}>Java (OpenJDK)</option>
                <option value="cpp" ${state.selectedLanguage === 'cpp' ? 'selected' : ''}>C++ (g++)</option>
              </select>
              <button class="btn-secondary" style="padding: 4px 10px; font-size: 11px; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: #fff;" id="btn-reset-code">
                Reset Starter Code
              </button>
            </div>
            <div style="font-size: 11px; color: #94A3B8;">
              Ctrl+Enter to Run · Ctrl+S to Save
            </div>
          </div>

          <div class="editor-container" id="monaco-editor-container">
            <textarea class="code-editor-textarea" id="code-textarea" spellcheck="false">${escapeHtml(savedDraft)}</textarea>
          </div>

          <div class="testbench-panel">
            <div class="testbench-header">
              <div class="test-tabs">
                ${(problem.visibleTests || [])
                  .map(
                    (t, i) => `
                  <button class="test-tab-btn ${state.activeTestTab === i ? 'active' : ''}" data-tab="${i}">
                    Case ${i + 1}
                  </button>
                `
                  )
                  .join('')}
                <button class="test-tab-btn ${state.activeTestTab === 99 ? 'active' : ''}" data-tab="99">
                  Custom Input
                </button>
              </div>

              <div style="font-size: 12px; color: #94A3B8;">
                ${state.isRunning ? 'Executing test suite...' : state.isSubmitting ? 'Evaluating against judge...' : ''}
              </div>
            </div>

            <div class="testbench-body" id="testbench-body-content">
              ${renderTestBenchBody(problem)}
            </div>

            <div class="testbench-footer">
              <div style="font-size: 12px; color: #94A3B8;">
                ${state.submitResult ? `Verdict: <strong style="color:#fff;">${state.submitResult.verdict}</strong> (${state.submitResult.passedTests}/${state.submitResult.totalTests} Passed)` : ''}
              </div>
              <div style="display:flex; gap: 10px;">
                <button class="btn-run" id="btn-run-code" ${state.isRunning || state.isSubmitting ? 'disabled' : ''}>
                  ▶ Run Code
                </button>
                <button class="btn-submit" id="btn-submit-code" ${state.isRunning || state.isSubmitting ? 'disabled' : ''}>
                  ⚡ Submit Solution
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTestBenchBody(problem) {
    if (state.runResult) {
      const res = state.runResult;
      const isAccepted = res.verdict === 'ACCEPTED';
      const isCompError = res.verdict === 'COMPILATION_ERROR';
      const verdictClass = isAccepted ? 'verdict-accepted' : res.verdict === 'WRONG_ANSWER' ? 'verdict-wrong' : 'verdict-error';

      // Show compilation error with full message
      if (isCompError) {
        return `
          <div class="verdict-banner ${verdictClass}">
            <div>
              ✗ <strong>${res.verdict}</strong>
              <span style="font-size: 12px; margin-left: 10px; opacity: 0.85;">
                ${res._localFallback ? '(Execution server offline)' : ''}
              </span>
            </div>
          </div>
          <div style="margin: 10px 0; padding: 14px; background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.35); border-radius: 10px;">
            <div style="font-size: 11px; font-weight: 700; color: #FB7185; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Compilation Error Output:</div>
            <pre style="font-family: var(--font-mono); font-size: 12px; color: #FCA5A5; white-space: pre-wrap; word-break: break-word; margin: 0;">${escapeHtml(res.compilationError || 'Unknown compilation error')}</pre>
          </div>
        `;
      }

      return `
        <div class="verdict-banner ${verdictClass}">
          <div>
            ${isAccepted ? '✓' : '✗'} <strong>${res.verdict}</strong>
            <span style="font-size: 12px; margin-left: 10px; opacity: 0.85;">
              ${res.passedTests} / ${res.totalTests} Visible Test Cases Passed (${res.runtimeMs} ms)
              ${res._localFallback ? '<em style="opacity:0.7"> · JS Browser Eval</em>' : ''}
            </span>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap: 10px;">
          ${(res.testResults || [])
            .map(
              (tr, idx) => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid ${tr.passed ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'}; border-radius: 10px; padding: 12px;">
              <div style="display:flex; justify-content:space-between; font-size: 12px; font-weight: 700; margin-bottom: 6px;">
                <span style="color: ${tr.passed ? '#34D399' : '#FB7185'};">
                  ${tr.passed ? '✓ PASSED' : '✗ FAILED'} — Case ${idx + 1}${tr.status ? ' · ' + tr.status : ''}
                </span>
                <span style="color: #94A3B8;">${tr.runtimeMs} ms</span>
              </div>
              <div style="font-size: 11px; color: #94A3B8;">INPUT:</div>
              <div class="code-box" style="background:#090E17; color:#93C5FD; border-color:#334155; margin-bottom:6px; font-size:12px;">${escapeHtml(tr.input || '')}</div>
              <div style="font-size: 11px; color: #94A3B8;">EXPECTED OUTPUT:</div>
              <div class="code-box" style="background:#090E17; color:#34D399; border-color:#334155; margin-bottom:6px; font-size:12px;">${escapeHtml(tr.expectedOutput || '')}</div>
              <div style="font-size: 11px; color: #94A3B8;">YOUR OUTPUT:</div>
              <div class="code-box" style="background:#090E17; color:${tr.passed ? '#93C5FD' : '#FB7185'}; border-color:#334155; font-size:12px;">${escapeHtml(tr.actualOutput || '') || (tr.errorMessage ? '<span style="color:#FB7185">' + escapeHtml(tr.errorMessage) + '</span>' : '<span style="color:#475569">(no output)</span>')}</div>
              ${tr.errorMessage && !tr.passed ? `<div style="margin-top: 6px; font-size: 11px; padding: 8px; background: rgba(244,63,94,0.08); border-radius: 6px; color: #FCA5A5;"><strong>Error:</strong> ${escapeHtml(tr.errorMessage)}</div>` : ''}
            </div>
          `
            )
            .join('')}
        </div>
      `;
    }

    if (state.submitResult) {
      const sub = state.submitResult;
      const isAccepted = sub.verdict === 'ACCEPTED';
      const isCompError = sub.verdict === 'COMPILATION_ERROR';
      const verdictClass = isAccepted ? 'verdict-accepted' : sub.verdict === 'WRONG_ANSWER' ? 'verdict-wrong' : 'verdict-error';

      return `
        <div class="verdict-banner ${verdictClass}">
          <div>
            ${isAccepted ? '🎉' : '⚠'} <strong>${sub.verdict}</strong>
            <div style="font-size: 12px; margin-top: 4px; opacity: 0.9;">
              Passed: ${sub.passedTests} / ${sub.totalTests} Total Tests (Execution time: ${sub.runtimeMs} ms)
              ${sub._localFallback ? '<em style="opacity:0.7"> · JS Browser Eval</em>' : ''}
            </div>
          </div>
        </div>
        ${
          isCompError
            ? `<div style="margin: 10px 0; padding: 14px; background: rgba(244,63,94,0.08); border: 1px solid rgba(244,63,94,0.35); border-radius: 10px;">
                <div style="font-size: 11px; font-weight: 700; color: #FB7185; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Compilation Error Output:</div>
                <pre style="font-family: var(--font-mono); font-size: 12px; color: #FCA5A5; white-space: pre-wrap; word-break: break-word; margin: 0;">${escapeHtml(sub.compilationError || 'Compilation failed')}</pre>
              </div>`
            : isAccepted && !sub._localFallback
              ? `<div style="text-align:center; padding: 20px; color: #34D399; font-weight: 700;">
                  All test cases passed successfully! Problem status updated to SOLVED.
                 </div>`
              : sub.runtimeError
                ? `<div style="padding: 10px; color: #FB7185; font-size: 13px;">
                    <strong>Runtime Error on test #${sub.firstFailedTestIndex || 1}:</strong>
                    <pre style="font-family: var(--font-mono); font-size: 12px; margin-top: 6px; white-space: pre-wrap;">${escapeHtml(sub.runtimeError)}</pre>
                   </div>`
                : `<div style="padding: 10px; color: #FB7185; font-size: 13px;">
                    Your solution failed on test case #${sub.firstFailedTestIndex || 1}. Check constraints and edge cases.
                   </div>`
        }
      `;
    }

    if (state.activeTestTab === 99) {
      return `
        <div>
          <div style="font-size: 11px; color: #94A3B8; font-weight: 700; margin-bottom: 6px;">CUSTOM INPUT:</div>
          <textarea id="textarea-custom-input" style="width:100%; height:120px; background:#090E17; border:1px solid #334155; color:#93C5FD; font-family:var(--font-mono); padding:10px; border-radius:8px;" placeholder="Enter custom standard input here...">${escapeHtml(state.customInput)}</textarea>
        </div>
      `;
    }

    const test = (problem.visibleTests || [])[state.activeTestTab] || problem.visibleTests[0];
    if (!test) return `<div>No visible test cases available.</div>`;

    return `
      <div>
        <div style="font-size: 11px; color: #94A3B8; font-weight: 700; margin-bottom: 4px;">INPUT:</div>
        <div class="code-box" style="background:#090E17; color:#93C5FD; border-color:#334155; margin-bottom: 12px;">${escapeHtml(test.input)}</div>
        <div style="font-size: 11px; color: #94A3B8; font-weight: 700; margin-bottom: 4px;">EXPECTED OUTPUT:</div>
        <div class="code-box" style="background:#090E17; color:#93C5FD; border-color:#334155;">${escapeHtml(test.expectedOutput)}</div>
      </div>
    `;
  }

  // --- BOOKMARKS VIEW ---
  function renderBookmarksView() {
    const bookmarkedProbs = state.bookmarks.map((id) => getProblemDetail(id)).filter(Boolean);

    return `
      <div class="topic-view-container">
        <div class="view-header">
          <button class="back-btn" id="btn-back-dashboard">
            ← Back to Curriculum
          </button>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-muted);">
            Bookmarked Problems (${bookmarkedProbs.length})
          </div>
        </div>

        <h1 style="font-size: 28px; font-weight: 800; color: var(--text-navy); margin-bottom: 20px;">Saved Bookmarks</h1>

        ${
          bookmarkedProbs.length === 0
            ? `<div style="text-align:center; padding: 60px 20px; color: var(--text-muted); background: #fff; border: 1px solid var(--border-color); border-radius: 20px;">
                <div style="font-size: 40px; margin-bottom: 12px;">☆</div>
                <div style="font-size: 16px; font-weight: 700; color: var(--text-navy);">No Bookmarked Problems Yet</div>
                <p style="font-size: 13px; margin-top: 6px; color: var(--text-secondary);">Bookmark problems during your practice sessions to quickly revisit them here.</p>
              </div>`
            : `
            <table class="problems-table">
              <thead>
                <tr>
                  <th>Problem Title</th>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Status</th>
                  <th style="text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${bookmarkedProbs
                  .map((p) => {
                    const isSolved = state.solved.includes(p.id);
                    const diffClass =
                      p.difficulty === 'Easy' ? 'badge-easy' : p.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
                    return `
                      <tr>
                        <td>
                          <div class="prob-title-cell" data-problem-id="${p.id}">
                            ${p.title}
                          </div>
                        </td>
                        <td style="color: var(--text-secondary); font-weight: 600;">${p.topicTitle}</td>
                        <td><span class="badge-difficulty ${diffClass}">${p.difficulty}</span></td>
                        <td>${isSolved ? '<span style="color: var(--easy); font-weight:800;">✓ Solved</span>' : '<span style="color: var(--text-muted);">Todo</span>'}</td>
                        <td style="text-align:center;">
                          <button class="btn-primary" style="padding: 5px 14px; font-size: 12px; border-radius: 8px;" data-problem-id="${p.id}">
                            Solve →
                          </button>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          `
        }
      </div>
    `;
  }

  // --- SUBMISSIONS VIEW ---
  function renderSubmissionsView() {
    return `
      <div class="topic-view-container">
        <div class="view-header">
          <button class="back-btn" id="btn-back-dashboard">
            ← Back to Curriculum
          </button>
          <div style="font-size: 13px; font-weight: 700; color: var(--text-muted);">
            Total Submissions: ${state.submissions.length}
          </div>
        </div>

        <h1 style="font-size: 28px; font-weight: 800; color: var(--text-navy); margin-bottom: 20px;">Submissions History</h1>

        ${
          state.submissions.length === 0
            ? `<div style="text-align:center; padding: 60px 20px; color: var(--text-muted); background: #fff; border: 1px solid var(--border-color); border-radius: 20px;">
                <div style="font-size: 40px; margin-bottom: 12px;">⏱</div>
                <div style="font-size: 16px; font-weight: 700; color: var(--text-navy);">No Submissions Found</div>
                <p style="font-size: 13px; margin-top: 6px; color: var(--text-secondary);">Submit solutions from the Problem Workspace to view your execution records here.</p>
              </div>`
            : `
            <table class="problems-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Problem</th>
                  <th>Verdict</th>
                  <th>Passed Tests</th>
                  <th>Runtime</th>
                  <th>Language</th>
                  <th style="text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${state.submissions
                  .map((sub) => {
                    const isAccepted = sub.verdict === 'ACCEPTED';
                    return `
                      <tr>
                        <td style="color: var(--text-muted); font-size: 12px;">${new Date(sub.createdAt).toLocaleTimeString()}</td>
                        <td style="font-weight: 700; color: var(--text-navy);">${sub.problemTitle || sub.problemId}</td>
                        <td>
                          <span style="font-weight: 800; color: ${isAccepted ? 'var(--easy)' : 'var(--hard)'};">
                            ${sub.verdict}
                          </span>
                        </td>
                        <td style="font-weight: 600;">${sub.passedTests} / ${sub.totalTests}</td>
                        <td style="font-family: var(--font-mono); font-weight: 600;">${sub.runtimeMs} ms</td>
                        <td style="text-transform: uppercase; font-size: 11.5px; font-weight: 800; color: #2563EB;">${sub.language}</td>
                        <td style="text-align:center;">
                          <button class="btn-secondary" style="padding: 4px 10px; font-size: 11.5px; border-radius: 8px;" data-problem-id="${sub.problemId}">
                            Open Problem →
                          </button>
                        </td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          `
        }
      </div>
    `;
  }

  // --- EVENTS ---
  function attachEvents() {
    const brand = document.getElementById('btn-brand');
    if (brand) brand.onclick = () => switchView('dashboard');

    const navCurriculum = document.getElementById('nav-curriculum');
    if (navCurriculum) navCurriculum.onclick = () => switchView('dashboard');

    const navBookmarks = document.getElementById('nav-bookmarks');
    if (navBookmarks) navBookmarks.onclick = () => switchView('bookmarks');

    const navSubmissions = document.getElementById('nav-submissions');
    if (navSubmissions) navSubmissions.onclick = () => switchView('submissions');

    const btnStartPracticing = document.getElementById('btn-start-practicing');
    if (btnStartPracticing) btnStartPracticing.onclick = () => openTopic('01-input-output');

    const btnJumpArrays = document.getElementById('btn-jump-arrays');
    if (btnJumpArrays) btnJumpArrays.onclick = () => openTopic('03-arrays');

    const btnBackDashboard = document.getElementById('btn-back-dashboard');
    if (btnBackDashboard) btnBackDashboard.onclick = () => switchView('dashboard');

    const btnBackTopic = document.getElementById('btn-back-topic');
    if (btnBackTopic) {
      btnBackTopic.onclick = () => {
        if (state.selectedTopicId) switchView('topic');
        else switchView('dashboard');
      };
    }

    // Category pills
    document.querySelectorAll('.cat-pill').forEach((btn) => {
      btn.onclick = (e) => {
        state.selectedCategory = e.target.getAttribute('data-category');
        render();
      };
    });

    // Topic search
    const topicSearch = document.getElementById('input-topic-search');
    if (topicSearch) {
      topicSearch.oninput = (e) => {
        state.searchQuery = e.target.value;
        const currentVal = e.target.value;
        render();
        const nextInput = document.getElementById('input-topic-search');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(currentVal.length, currentVal.length);
        }
      };
    }

    // Topic cards
    document.querySelectorAll('.topic-card').forEach((card) => {
      card.onclick = () => {
        const topicId = card.getAttribute('data-topic-id');
        openTopic(topicId);
      };
    });

    // Problem open buttons
    document.querySelectorAll('[data-problem-id]').forEach((el) => {
      el.onclick = (e) => {
        e.stopPropagation();
        const probId = el.getAttribute('data-problem-id');
        openProblem(probId);
      };
    });

    // Workspace Controls
    const langSelect = document.getElementById('select-language');
    if (langSelect) {
      langSelect.onchange = (e) => {
        state.selectedLanguage = e.target.value;
        render();
      };
    }

    const btnResetCode = document.getElementById('btn-reset-code');
    if (btnResetCode) {
      btnResetCode.onclick = () => {
        const prob = getProblemDetail(state.selectedProblemId);
        if (prob && confirm('Reset code to default template?')) {
          delete state.drafts[`${prob.id}_${state.selectedLanguage}`];
          saveStorage();
          render();
        }
      };
    }

    const codeTextarea = document.getElementById('code-textarea');
    if (codeTextarea) {
      codeTextarea.oninput = (e) => {
        const prob = getProblemDetail(state.selectedProblemId);
        if (prob) {
          state.drafts[`${prob.id}_${state.selectedLanguage}`] = e.target.value;
          saveStorage();
        }
      };

      // Keyboard shortcuts
      codeTextarea.onkeydown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          executeCodeRun();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          const start = codeTextarea.selectionStart;
          const end = codeTextarea.selectionEnd;
          codeTextarea.value = codeTextarea.value.substring(0, start) + '    ' + codeTextarea.value.substring(end);
          codeTextarea.selectionStart = codeTextarea.selectionEnd = start + 4;
          const prob = getProblemDetail(state.selectedProblemId);
          if (prob) {
            state.drafts[`${prob.id}_${state.selectedLanguage}`] = codeTextarea.value;
            saveStorage();
          }
        }
      };
    }

    // Prev / Next Problem
    const btnPrev = document.getElementById('btn-prev-prob');
    if (btnPrev) {
      btnPrev.onclick = () => navigateProblem(-1);
    }
    const btnNext = document.getElementById('btn-next-prob');
    if (btnNext) {
      btnNext.onclick = () => navigateProblem(1);
    }

    // Toggle Bookmark
    const btnBookmark = document.getElementById('btn-toggle-bookmark');
    if (btnBookmark) {
      btnBookmark.onclick = () => {
        const id = state.selectedProblemId;
        if (state.bookmarks.includes(id)) {
          state.bookmarks = state.bookmarks.filter((b) => b !== id);
        } else {
          state.bookmarks.push(id);
        }
        saveStorage();
        render();
      };
    }

    // Copy Buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.onclick = () => {
        const text = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(text);
        btn.innerText = 'Copied!';
        setTimeout(() => (btn.innerText = 'Copy'), 1500);
      };
    });

    // Test tab buttons
    document.querySelectorAll('.test-tab-btn').forEach((btn) => {
      btn.onclick = () => {
        state.activeTestTab = Number(btn.getAttribute('data-tab'));
        state.runResult = null;
        state.submitResult = null;
        render();
      };
    });

    // Run / Submit Buttons
    const btnRun = document.getElementById('btn-run-code');
    if (btnRun) btnRun.onclick = executeCodeRun;

    const btnSubmit = document.getElementById('btn-submit-code');
    if (btnSubmit) btnSubmit.onclick = executeCodeSubmit;
  }

  // --- NAVIGATION HELPERS ---
  function switchView(viewName) {
    state.view = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  function openTopic(topicId) {
    state.selectedTopicId = topicId;
    state.view = 'topic';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  function openProblem(problemId) {
    state.selectedProblemId = problemId;
    const prob = getProblemDetail(problemId);
    if (prob) {
      state.selectedTopicId = prob.topicId;
    }
    state.view = 'problem';
    state.runResult = null;
    state.submitResult = null;
    state.activeTestTab = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render();
  }

  function navigateProblem(delta) {
    const prob = getProblemDetail(state.selectedProblemId);
    if (!prob) return;
    const list = getProblems(prob.topicId);
    const curr = list.findIndex((p) => p.id === prob.id);
    const nextIdx = curr + delta;
    if (nextIdx >= 0 && nextIdx < list.length) {
      openProblem(list[nextIdx].id);
    }
  }

  // --- CODE EXECUTION & JUDGE ---
  async function executeCodeRun() {
    if (state.isRunning || state.isSubmitting) return;
    const prob = getProblemDetail(state.selectedProblemId);
    if (!prob) return;

    const codeTextarea = document.getElementById('code-textarea');
    const code = codeTextarea ? codeTextarea.value : '';

    state.isRunning = true;
    state.runResult = null;
    state.submitResult = null;
    render();

    try {
      // Always attempt the backend judge first
      let result = null;
      let backendError = null;
      try {
        const resp = await fetch('/api/dsa/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: prob.id, language: state.selectedLanguage, code }),
        });
        const data = await resp.json();
        if (data.success) {
          result = data.result;
        } else {
          backendError = data.error || 'Backend judge returned an error.';
        }
      } catch (fetchErr) {
        backendError = fetchErr.message || 'Could not reach the execution server.';
      }

      if (!result) {
        // Backend unavailable: attempt strict local JS evaluation or report error
        result = evaluateLocally(prob, state.selectedLanguage, code, false, backendError);
      }

      state.runResult = result;
    } catch (err) {
      state.runResult = {
        success: false,
        verdict: 'RUNTIME_ERROR',
        runtimeMs: 0,
        errorMessage: err.message,
        testResults: [],
        passedTests: 0,
        totalTests: (prob.visibleTests || []).length,
      };
    } finally {
      state.isRunning = false;
      render();
    }
  }

  async function executeCodeSubmit() {
    if (state.isRunning || state.isSubmitting) return;
    const prob = getProblemDetail(state.selectedProblemId);
    if (!prob) return;

    const codeTextarea = document.getElementById('code-textarea');
    const code = codeTextarea ? codeTextarea.value : '';

    state.isSubmitting = true;
    state.runResult = null;
    state.submitResult = null;
    render();

    try {
      let result = null;
      let backendError = null;
      try {
        const resp = await fetch('/api/dsa/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ problemId: prob.id, language: state.selectedLanguage, code }),
        });
        const data = await resp.json();
        if (data.success) {
          result = data.result;
        } else {
          backendError = data.error || 'Backend judge returned an error.';
        }
      } catch (fetchErr) {
        backendError = fetchErr.message || 'Could not reach the execution server.';
      }

      if (!result) {
        // Backend unavailable: attempt strict local JS evaluation or report error
        result = evaluateLocally(prob, state.selectedLanguage, code, true, backendError);
      }

      state.submitResult = result;

      // Only track progress for ACCEPTED from backend (not from local fallback)
      if (!state.attempted.includes(prob.id)) {
        state.attempted.push(prob.id);
      }

      // Only mark solved if truly ACCEPTED by backend
      if (result.verdict === 'ACCEPTED' && !result._localFallback) {
        if (!state.solved.includes(prob.id)) {
          state.solved.push(prob.id);
        }
      }

      // Record Submission
      const subRecord = {
        id: 'sub_' + Date.now(),
        problemId: prob.id,
        problemTitle: prob.title,
        language: state.selectedLanguage,
        verdict: result.verdict,
        passedTests: result.passedTests,
        totalTests: result.totalTests,
        runtimeMs: result.runtimeMs,
        createdAt: new Date().toISOString(),
      };
      state.submissions.unshift(subRecord);
      saveStorage();
    } catch (err) {
      state.submitResult = {
        verdict: 'RUNTIME_ERROR',
        passedTests: 0,
        totalTests: (prob.visibleTests || []).length + (prob.hiddenTests || []).length,
        runtimeMs: 0,
        runtimeError: err.message,
      };
    } finally {
      state.isSubmitting = false;
      render();
    }
  }

  // --- LOCAL CLIENT-SIDE EVALUATOR ---
  // IMPORTANT: This is a STRICT evaluator.
  // - JavaScript code is executed via Function constructor with real syntax/runtime checking.
  // - All other languages (Python, Java, C++, C) CANNOT be executed client-side.
  //   They require the backend execution server. No fake results are ever returned.
  function evaluateLocally(prob, lang, code, isSubmit, backendError) {
    const tests = isSubmit
      ? [...(prob.visibleTests || []), ...(prob.hiddenTests || [])]
      : (prob.visibleTests || []);

    // --- For non-JavaScript: backend is REQUIRED. Never fake results. ---
    if (lang !== 'javascript') {
      const langName = lang === 'python' ? 'Python' :
                       lang === 'java'   ? 'Java'   :
                       lang === 'cpp'    ? 'C++'    :
                       lang === 'c'      ? 'C'      : lang;
      const errorMsg = backendError
        ? `Execution server unavailable: ${backendError}\n\n${langName} requires the backend compiler/interpreter to run. Please ensure the ZENSUS server is running.`
        : `${langName} code cannot be executed in the browser. Please ensure the ZENSUS backend server is running to compile and execute ${langName} code.`;
      return {
        success: false,
        verdict: 'COMPILATION_ERROR',
        runtimeMs: 0,
        compilationError: errorMsg,
        testResults: [],
        passedTests: 0,
        totalTests: tests.length,
        _localFallback: true,
      };
    }

    // --- JavaScript: run strictly with syntax + runtime error detection ---
    const startTime = performance.now();
    let passedCount = 0;
    const testResults = [];
    let overallVerdict = 'ACCEPTED';
    let firstFailedIndex = null;
    let compilationError = null;

    // Step 1: Syntax check via Function constructor BEFORE running any tests
    try {
      new Function('input', 'console', `"use strict";\n${code}`);
    } catch (syntaxErr) {
      return {
        success: false,
        verdict: 'COMPILATION_ERROR',
        runtimeMs: 0,
        compilationError: `Syntax Error\n\nsolution.js\n${syntaxErr.message}`,
        testResults: [],
        passedTests: 0,
        totalTests: tests.length,
        _localFallback: true,
      };
    }

    // Step 2: Execute each test case
    for (let i = 0; i < tests.length; i++) {
      const t = tests[i];
      let actualOutput = '';
      let passed = false;
      let errorMessage = null;
      let status = 'ACCEPTED';

      try {
        let mockOut = '';
        const mockLog = (...args) => {
          mockOut += args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
        };

        const fn = new Function('input', 'console', `"use strict";\n${code}`);
        fn(t.input, { log: mockLog, error: mockLog, warn: mockLog });
        actualOutput = mockOut;

        // Strict output comparison — never compare against expected to determine output
        passed = normalizeOutput(actualOutput) === normalizeOutput(t.expectedOutput);
        if (!passed) {
          status = 'WRONG_ANSWER';
        }
      } catch (err) {
        passed = false;
        actualOutput = '';
        errorMessage = err.message;
        status = 'RUNTIME_ERROR';
        if (overallVerdict === 'ACCEPTED') {
          overallVerdict = 'RUNTIME_ERROR';
        }
      }

      if (passed) {
        passedCount++;
      } else {
        if (overallVerdict === 'ACCEPTED') {
          overallVerdict = status;
          firstFailedIndex = i + 1;
        }
      }

      testResults.push({
        testId: t.id,
        input: t.input,
        expectedOutput: t.expectedOutput,
        actualOutput: actualOutput,
        passed: passed,
        runtimeMs: Math.round(performance.now() - startTime),
        status: status,
        errorMessage: errorMessage,
      });
    }

    const elapsed = Math.round(performance.now() - startTime + 1);

    return {
      success: overallVerdict === 'ACCEPTED',
      verdict: overallVerdict,
      runtimeMs: elapsed,
      passedTests: passedCount,
      totalTests: tests.length,
      firstFailedTestIndex: firstFailedIndex,
      testResults: testResults,
      _localFallback: true,
    };
  }

  function normalizeOutput(str) {
    if (!str) return '';
    return str
      .trim()
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join('\n');
  }

  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    render();
  });
})();
