/* =========================================================
   ZENSUS - UNIVERSAL LEARNING SYSTEM
   Supports Programming, Web Development, Database & AI
========================================================= */


/* =========================================================
   COURSE DATABASE
========================================================= */

const courses = {

    /* =====================================================
       PROGRAMMING LANGUAGES
    ===================================================== */

    Python: {
        icon: "🐍",
        folder: "Python files",
        description: "Learn Python from basics to advanced programming.",
        lessons: [
            "Introduction to Python",
            "Variables and Data Types",
            "Input and Output",
            "Operators",
            "Conditional Statements",
            "Loops",
            "Strings",
            "Lists",
            "Tuples, Sets and Dictionaries",
            "Functions",
            "Modules and Packages",
            "File Handling",
            "Exception Handling",
            "Object-Oriented Programming",
            "List Comprehensions and Lambda",
            "Advanced Python Concepts",
            "Python Project and Final Assessment"
        ]
    },


    Java: {
        icon: "☕",
        folder: "Java files",
        description: "Learn Java fundamentals and object-oriented programming.",
        lessons: [
            "Introduction to Java",
            "Variables and Data Types",
            "Input and Output",
            "Operators",
            "Conditional Statements",
            "Loops",
            "Methods",
            "Arrays",
            "Strings",
            "Object-Oriented Programming",
            "Inheritance",
            "Polymorphism",
            "Abstraction",
            "Interfaces",
            "Exception Handling",
            "Collections",
            "File Handling",
            "Java Mini Projects"
        ]
    },


    C: {
        icon: "C",
        folder: "C files",
        description: "Learn C programming from fundamentals to problem solving.",
        lessons: [
            "Introduction to C",
            "Variables and Data Types",
            "Input and Output",
            "Operators",
            "Conditional Statements",
            "Loops",
            "Functions",
            "Arrays",
            "Strings",
            "Pointers",
            "Structures",
            "Unions",
            "File Handling",
            "Dynamic Memory Allocation",
            "C Mini Projects"
        ]
    },


    "C++": {
        icon: "C++",
        folder: "C++ files",
        description: "Learn C++ programming and object-oriented concepts.",
        lessons: [
            "Introduction to C++",
            "Variables and Data Types",
            "Input and Output",
            "Operators",
            "Conditional Statements",
            "Loops",
            "Functions",
            "Arrays",
            "Strings",
            "Pointers",
            "Classes and Objects",
            "Constructors",
            "Inheritance",
            "Polymorphism",
            "STL",
            "File Handling",
            "C++ Mini Projects"
        ]
    },


    JavaScript: {
        icon: "JS",
        folder: "JavaScript files",
        description: "Learn JavaScript for modern web development.",
        lessons: [
            "Introduction to JavaScript",
            "Variables and Data Types",
            "Operators",
            "Input and Output",
            "Conditional Statements",
            "Loops",
            "Functions",
            "Arrays",
            "Objects",
            "Strings",
            "DOM",
            "Events",
            "Forms",
            "ES6 Features",
            "Asynchronous JavaScript",
            "APIs",
            "JavaScript Mini Projects"
        ]
    },


    /* =====================================================
       DATA STRUCTURES & ALGORITHMS
    ===================================================== */

    DSA: {

        icon: "DSA",

        folder: "DSA files",

        description:
            "Master Data Structures and Algorithms from fundamentals to advanced problem-solving and interview mastery.",

        lessons: [

            "DSA Foundations",

            "Arrays & Array Patterns",

            "Strings & String Patterns",

            "Linked Lists",

            "Stacks, Queues & Deques",

            "Hashing & HashMap",

            "Recursion & Backtracking",

            "Sorting Algorithms",

            "Searching & Binary Search",

            "Binary Trees",

            "Binary Search Trees",

            "Heap & Priority Queue",

            "Graphs & Graph Algorithms",

            "Greedy Algorithms",

            "Dynamic Programming",

            "Trie, Bit Manipulation & Advanced DSA",

            "DSA Patterns & Interview Mastery"

        ]

    },


    /* =====================================================
       WEB DEVELOPMENT
    ===================================================== */

    HTML: {
    icon: "HTML",
    folder: "HTML",
    description: "Learn HTML and build the structure of modern websites.",
        lessons: [
            "Introduction to HTML",
            "HTML Document Structure",
            "Headings and Paragraphs",
            "Links",
            "Images",
            "Lists",
            "Tables",
            "Forms",
            "Input Elements",
            "Semantic HTML",
            "Multimedia",
            "HTML5 Features",
            "HTML Mini Projects"
        ]
    },


    CSS: {
        icon: "CSS",
        folder: "CSS files",
        description: "Learn CSS to design beautiful and responsive websites.",
        lessons: [
            "Introduction to CSS",
            "CSS Syntax",
            "Selectors",
            "Colors and Backgrounds",
            "Fonts and Text",
            "Box Model",
            "Margin and Padding",
            "Display",
            "Positioning",
            "Flexbox",
            "Grid",
            "Responsive Design",
            "Transitions",
            "Animations",
            "CSS Mini Projects"
        ]
    },


    React: {
    icon: "⚛",
    folder: "React files",
    description: "Learn React from fundamentals to advanced concepts and build modern interactive web applications.",
    lessons: [

        "Introduction to React",

        "React Setup, Vite & Project Structure",

        "JSX — JavaScript XML",

        "Components & Component Architecture",

        "Props — Passing Data Between Components",

        "State & useState()",

        "Event Handling in React",

        "Conditional Rendering",

        "Rendering Lists & Keys",

        "Forms & Controlled Components",

        "useEffect() & Side Effects",

        "Component Lifecycle & Effects",

        "APIs & Data Fetching",

        "React Hooks — Complete Guide",

        "useRef() & DOM References",

        "useMemo() & Performance Optimization",

        "useCallback() & Function Optimization",

        "Custom Hooks",

        "Lifting State Up",

        "Component Communication",

        "Context API",

        "useReducer()",

        "Context + Reducer Architecture",

        "Reusable Components & Design Patterns",

        "React Router & Navigation",

        "Authentication & Protected Routes",

        "Redux Toolkit & State Management",

        "React + Backend Integration",

        "Error Handling & Production Practices",

        "Build & Deployment",

        "Advanced React Hooks",

        "Advanced State Management",

        "React Performance Optimization",

        "Suspense & Lazy Loading",

        "Error Boundaries",

        "Advanced Forms & Validation",

        "React + TypeScript",

        "React Testing",

        "React Security",

        "React Architecture & Best Practices",

        "Mini Project — Todo Application",

        "Project — Weather Dashboard",

        "Project — Authentication Dashboard",

        "Queries In React Family ",

        "Final Project — Full-Stack React Application"
    ]
},
Django: {
    icon: "DJ",
    folder: "Django files",
    description: "Learn Django and build powerful Python web applications.",
    lessons: [
        "Introduction to Django",
        "Django Setup & Project Structure",
        "Django Apps & URL Routing",
        "Views",
        "Templates & Static Files",
        "Models & Migrations",
        "Django ORM",
        "Forms & Validation",
        "Authentication & Authorization",
        "Admin Panel",
        "Class-Based Views & Middleware",
        "File & Image Uploads",
        "Django REST Framework",
        "Building REST APIs",
        "Django Mini Projects & Deployment"
    ]
},

   "Node.js": {
    icon: "JS",
    folder: "Node.js files",
    description: "Master Node.js for backend, server-side, API, database, authentication, and full-stack development.",
    lessons: [
        "Introduction to Node.js",
        "Node.js Setup & Project Structure",
        "Node.js Modules",
        "NPM & Package Management",
        "Asynchronous JavaScript in Node.js",
        "File System & Path Module",
        "HTTP Server & Event-Driven Architecture",
        "Express.js Fundamentals",
        "Routing in Express.js",
        "Middleware & Error Handling",
        "REST APIs & CRUD Operations",
        "Database & MongoDB with Mongoose",
        "Authentication, JWT & Security",
        "API Testing, Deployment & Production",
        "Node.js Full-Stack Mini Projects"
    ]
},
"REST API": {
    icon: "API",
    folder: "REST API files",
    description: "Learn how applications communicate with each other using REST APIs, HTTP, JSON, authentication, and CRUD operations.",
    lessons: [
        "Introduction to REST APIs",
        "How Applications Communicate",
        "REST Architecture & API Principles",
        "HTTP Methods & Requests",
        "HTTP Responses & Status Codes",
        "JSON & Data Exchange",
        "API Endpoints & URL Structure",
        "CRUD Operations",
        "Building GET & POST APIs",
        "Building PUT, PATCH & DELETE APIs",
        "API Authentication & Authorization",
        "API Validation & Error Handling",
        "Connecting Frontend with REST APIs",
        "Testing REST APIs with Postman",
        "Complete Application-to-Application API Project"
    ]
},
"Git & GitHub": {
    icon: "GH",
    folder: "Git & GitHub files",
    description: "Learn Git and GitHub to manage code, track changes, collaborate with developers, and deploy projects.",
    lessons: [
        "Introduction to Git & GitHub",
        "Installing Git & Git Configuration",
        "Git Repository & Git Init",
        "Git Status, Add & Commit",
        "Git Log & Viewing History",
        "Branches & Branch Management",
        "Merging Branches & Resolving Conflicts",
        "GitHub Repositories & Remote Connections",
        "Push, Pull & Fetch",
        "Cloning & Forking Repositories",
        "Pull Requests & Code Review",
        "Issues, Projects & GitHub Collaboration",
        "GitHub Actions & Basic CI/CD",
        "Git Best Practices & Common Git Mistakes",
        "Complete Git & GitHub Project Workflow"
    ]
},


    /* =====================================================
       DATABASE
    ===================================================== */

    SQL: {
        icon: "SQL",
        folder: "SQL files",
        description: "Learn SQL and work with relational databases.",
        lessons: [
            "Introduction to SQL",
            "Database Fundamentals",
            "CREATE",
            "INSERT",
            "SELECT",
            "WHERE",
            "ORDER BY",
            "GROUP BY",
            "Aggregate Functions",
            "JOINS",
            "Subqueries",
            "Constraints",
            "Views",
            "Indexes",
            "Transactions",
            "SQL Mini Projects"
        ]
    },


    /* =====================================================
       ARTIFICIAL INTELLIGENCE
    ===================================================== */

    "AI Fundamentals": {
        icon: "🤖",
        folder: "AI Fundamentals files",
        description:
            "Learn the foundations of Artificial Intelligence and intelligent systems.",
        lessons: [
            "Introduction to Artificial Intelligence",
            "Intelligent Agents",
            "Problem Solving in AI",
            "Search Algorithms",
            "Knowledge Representation",
            "Reasoning in AI",
            "Constraint Satisfaction Problems",
            "Minimax Algorithm",
            "Alpha-Beta Pruning",
            "AI Applications",
            "AI Mini Project"
        ]
    },


    "Machine Learning": {
        icon: "ML",
        folder: "Machine Learning files",
        description:
            "Learn how machines learn from data and make predictions.",
        lessons: [
            "Introduction to Machine Learning",
            "Types of Machine Learning",
            "Machine Learning Workflow",
            "Data Preprocessing",
            "Feature Engineering",
            "Linear Regression",
            "Logistic Regression",
            "Classification",
            "Decision Trees",
            "Clustering",
            "Model Evaluation",
            "Machine Learning Project"
        ]
    },


    "Deep Learning": {
        icon: "DL",
        folder: "Deep Learning files",
        description:
            "Learn neural networks and modern deep learning models.",
        lessons: [
            "Introduction to Deep Learning",
            "Neural Networks",
            "Perceptron",
            "Activation Functions",
            "Forward Propagation",
            "Backpropagation",
            "Loss Functions",
            "Convolutional Neural Networks",
            "Recurrent Neural Networks",
            "LSTM",
            "Transfer Learning",
            "Deep Learning Project"
        ]
    },


    "Generative AI": {
        icon: "✨",
        folder: "Generative AI files",
        description:
            "Learn Large Language Models and modern Generative AI applications.",
        lessons: [
            "Introduction to Generative AI",
            "Generative AI vs Traditional AI",
            "Large Language Models",
            "Tokens",
            "Embeddings",
            "Transformers",
            "Prompting Fundamentals",
            "Retrieval Augmented Generation",
            "Vector Databases",
            "AI Agents",
            "LLM APIs",
            "Generative AI Project"
        ]
    },


    "Prompt Engineering": {
        icon: "💬",
        folder: "Prompt Engineering files",
        description:
            "Learn how to communicate effectively with AI systems.",
        lessons: [
            "Introduction to Prompt Engineering",
            "Prompt Structure",
            "Zero-Shot Prompting",
            "Few-Shot Prompting",
            "Role Prompting",
            "Context Engineering",
            "Structured Prompts",
            "Prompt Templates",
            "Prompt Evaluation",
            "Advanced Prompting",
            "Real-World AI Applications"
        ]
    },

    /* =====================================================
      LLM
    ===================================================== */
    /* =====================================================
   LLM ENGINEERING
===================================================== */

"LLM Engineering": {
    icon: "🧩",
    folder: "LLM Engineering files",
    description: "Learn how to engineer reliable, scalable, and production-ready applications powered by Large Language Models.",
    lessons: [

        "Introduction to LLM Engineering",

        "Large Language Models — How They Work",

        "Tokens & Tokenization",

        "Context Windows & Context Management",

        "LLM Architecture — Transformers & Attention",

        "Pretraining, Fine-Tuning & Model Adaptation",

        "Inference & LLM Generation",

        "Temperature, Top-K & Top-P Sampling",

        "LLM APIs & Model Integration",

        "System, User & Developer Instructions",

        "Structured Outputs & JSON Responses",

        "Function Calling & Tool Use",

        "Streaming Responses & Real-Time LLM Applications",

        "Embeddings & Semantic Representations",

        "Model Selection & LLM Trade-offs",

        "LLM Cost, Latency & Performance Optimization",

        "Caching & Efficient LLM Applications",

        "Long-Context LLM Applications",

        "Memory & Conversation Management",

        "LLM Application Architecture",

        "LLM Evaluation & Quality Testing",

        "LLM Reliability & Hallucination Handling",

        "LLM Security Fundamentals",

        "Production LLM Engineering",

        "LLM Observability & Monitoring",

        "LLM Engineering Best Practices",

        "Mini Project — AI Chat Application",

        "Project — Production-Ready LLM Application",

        "Final Project — Full-Stack LLM Application"

    ]
},

    /* =====================================================
       RETRIEVAL AUGMENTED GENERATION
    ===================================================== */

    RAG: {
        icon: "📚",
        folder: "RAG files",
        description:
            "Learn Retrieval Augmented Generation and knowledge-based AI systems.",
        lessons: [
            "Introduction to RAG",
            "Why RAG is Needed",
            "RAG Architecture",
            "Documents and Data Sources",
            "Text Cleaning",
            "Text Chunking",
            "Embeddings",
            "Vector Databases",
            "Semantic Search",
            "Retrieval",
            "Generation",
            "Building a RAG Pipeline",
            "RAG Project"
        ]
    },


    /* =====================================================
       AI AGENTS
    ===================================================== */

    "AI Agents": {
        icon: "🧠",
        folder: "AI Agents files",
        description:
            "Learn how intelligent AI agents reason, plan and use tools.",
        lessons: [
            "Introduction to AI Agents",
            "Agents vs Chatbots",
            "AI Agent Architecture",
            "Agent Reasoning",
            "Planning",
            "Memory",
            "Tools",
            "Function Calling",
            "Agent Workflows",
            "Multi-Agent Systems",
            "Building AI Agents",
            "AI Agent Project"
        ]
    },


    /* =====================================================
       AI PROJECTS
    ===================================================== */

    "AI Projects": {
        icon: "🚀",
        folder: "AI Projects files",
        description:
            "Build real-world Artificial Intelligence applications.",
        lessons: [
            "AI Project Fundamentals",
            "Problem Identification",
            "Project Planning",
            "Dataset Preparation",
            "Data Processing",
            "Building an AI Model",
            "Using AI APIs",
            "Building an AI Chatbot",
            "Building a RAG Application",
            "Building an AI Agent",
            "AI Web Application",
            "Deployment",
            "Final AI Project"
        ]
    }

};


/* =========================================================
   GET SELECTED COURSE
========================================================= */

const params = new URLSearchParams(window.location.search);

let selectedLanguage = params.get("language");


/* =========================================================
   HANDLE OLD KOTLIN LINKS
========================================================= */

/*
   You previously used Kotlin.
   If any old button/link still sends:

       ?language=Kotlin

   it will automatically open DSA.
*/

if (selectedLanguage === "Kotlin") {

    selectedLanguage = "DSA";

}


/* =========================================================
   DEFAULT COURSE
========================================================= */

/*
   If no ?language= is present,
   DSA will be opened.

   Example:

   language.html

   will now show DSA.
*/

if (!selectedLanguage) {

    selectedLanguage = "DSA";

}


/* =========================================================
   NORMALIZE COURSE NAME
========================================================= */

const courseKey =
    Object.keys(courses).find(
        key =>
            key.toLowerCase() ===
            selectedLanguage.toLowerCase()
    );


/* =========================================================
   FINAL COURSE
========================================================= */

const activeCourse =
    courseKey
        ? courses[courseKey]
        : courses.DSA;


/* =========================================================
   FINAL DISPLAY NAME
========================================================= */

const activeCourseName =
    courseKey || "DSA";


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const languageIcon =
    document.getElementById("languageIcon");

const languageName =
    document.getElementById("languageName");

const languageDescription =
    document.getElementById("languageDescription");

const progressText =
    document.getElementById("progressText");

const progressNumber =
    document.getElementById("progressNumber");

const progressFill =
    document.getElementById("progressFill");

const progressMessage =
    document.getElementById("progressMessage");

const courseTitle =
    document.getElementById("courseTitle");

const lessonCount =
    document.getElementById("lessonCount");

const lessonsContainer =
    document.getElementById("lessonsContainer");


/* =========================================================
   DISPLAY COURSE INFORMATION
========================================================= */

if (languageIcon) {

    languageIcon.textContent =
        activeCourse.icon;

}


if (languageName) {

    languageName.textContent =
        activeCourseName;

}


if (languageDescription) {

    languageDescription.textContent =
        activeCourse.description;

}


/* =========================================================
   COURSE TITLE
========================================================= */

if (courseTitle) {

    if (activeCourseName === "DSA") {

        courseTitle.textContent =
            "Data Structures & Algorithms Course";

    } else {

        courseTitle.textContent =
            `${activeCourseName} Course`;

    }

}


/* =========================================================
   COMPLETION KEY
========================================================= */

function getCompletionKey(index) {

    return `zensus_completed_${activeCourseName}_${index}`;

}


/* =========================================================
   CHECK LESSON COMPLETION
========================================================= */

function isLessonCompleted(index) {

    return (
        localStorage.getItem(
            getCompletionKey(index)
        ) === "true"
    );

}


/* =========================================================
   COUNT COMPLETED LESSONS
========================================================= */

function getCompletedLessons() {

    let completed = 0;

    activeCourse.lessons.forEach(
        (lesson, index) => {

            if (
                isLessonCompleted(index)
            ) {

                completed++;

            }

        }
    );

    return completed;

}


/* =========================================================
   UPDATE COURSE PROGRESS
========================================================= */

function updateProgress() {

    const completed =
        getCompletedLessons();

    const total =
        activeCourse.lessons.length;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    /* -----------------------------------------------------
       Progress text
    ----------------------------------------------------- */

    if (progressText) {

        progressText.textContent =
            `${percentage}% Complete`;

    }


    /* -----------------------------------------------------
       Progress number
    ----------------------------------------------------- */

    if (progressNumber) {

        progressNumber.textContent =
            `${percentage}%`;

    }


    /* -----------------------------------------------------
       Progress bar
    ----------------------------------------------------- */

    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    /* -----------------------------------------------------
       Lesson count
    ----------------------------------------------------- */

    if (lessonCount) {

        lessonCount.textContent =
            `${completed} / ${total} Lessons`;

    }


    /* -----------------------------------------------------
       Progress message
    ----------------------------------------------------- */

    if (progressMessage) {

        if (percentage === 0) {

            progressMessage.textContent =
                "Start your first lesson to begin learning.";

        }

        else if (percentage === 100) {

            progressMessage.textContent =
                "🎉 Congratulations! You completed this course.";

        }

        else {

            progressMessage.textContent =
                "Keep learning and complete the next lesson.";

        }

    }

}


/* =========================================================
   CREATE LESSON CARDS
========================================================= */

function createLessonCards() {

    if (!lessonsContainer) {

        console.error(
            "ZENSUS ERROR: lessonsContainer not found."
        );

        return;

    }


    /* -----------------------------------------------------
       Clear old cards
    ----------------------------------------------------- */

    lessonsContainer.innerHTML = "";


    /* -----------------------------------------------------
       Create new cards
    ----------------------------------------------------- */

    activeCourse.lessons.forEach(
        (lessonName, index) => {


            /* =============================================
               CARD
            ============================================= */

            const lessonCard =
                document.createElement("div");

            lessonCard.className =
                "lesson-card";


            /* =============================================
               LESSON NUMBER
            ============================================= */

            const lessonNumber =
                document.createElement("div");

            lessonNumber.className =
                "lesson-number";

            lessonNumber.textContent =
                String(index + 1).padStart(2, "0");


            /* =============================================
               LESSON INFO
            ============================================= */

            const lessonInfo =
                document.createElement("div");

            lessonInfo.className =
                "lesson-info";


            /* ---------------------------------------------
               TITLE
            --------------------------------------------- */

            const title =
                document.createElement("h3");

            title.textContent =
                lessonName;


            /* ---------------------------------------------
               DESCRIPTION
            --------------------------------------------- */

            const description =
                document.createElement("p");

            description.textContent =
                `Lesson ${index + 1} of ${activeCourse.lessons.length}`;


            lessonInfo.appendChild(title);

            lessonInfo.appendChild(description);


            /* =============================================
               STATUS
            ============================================= */

            const status =
                document.createElement("div");

            status.className =
                "lesson-status";


            if (
                isLessonCompleted(index)
            ) {

                status.textContent =
                    "Completed ✓";

                status.classList.add(
                    "completed"
                );

            }

            else {

                status.textContent =
                    index === 0
                        ? "Start"
                        : "Start Lesson";

            }


            /* =============================================
               CLICK EVENT
            ============================================= */

            lessonCard.addEventListener(
                "click",
                () => {

                    openLesson(index);

                }
            );


            /* =============================================
               BUILD CARD
            ============================================= */

            lessonCard.appendChild(
                lessonNumber
            );

            lessonCard.appendChild(
                lessonInfo
            );

            lessonCard.appendChild(
                status
            );


            /* =============================================
               ADD TO CONTAINER
            ============================================= */

            lessonsContainer.appendChild(
                lessonCard
            );

        }
    );

}


/* =========================================================
   OPEN LESSON
========================================================= */

function openLesson(index) {

    const lessonNumber =
        index + 1;


    const folder =
        activeCourse.folder;


    const lessonFile =
        `lesson${lessonNumber}.html`;


    /*
       Example:

       DSA files/lesson1.html

       DSA files/lesson2.html
    */

    const lessonURL =
        `${encodeURIComponent(folder)}/${lessonFile}`;


    console.log(
        "Opening lesson:",
        lessonURL
    );


    window.location.href =
        lessonURL;

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeZensusCourse() {

    console.log(
        "ZENSUS Course:",
        activeCourseName
    );

    console.log(
        "Lessons:",
        activeCourse.lessons.length
    );


    updateProgress();

    createLessonCards();


    /* -----------------------------------------------------
       Page title
    ----------------------------------------------------- */

    document.title =
        `ZENSUS - ${activeCourseName} Course`;

}


/* =========================================================
   START ZENSUS
========================================================= */

initializeZensusCourse();