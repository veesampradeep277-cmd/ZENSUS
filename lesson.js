/* =========================================================
   ZENSUS LEARNING ENGINE
   ========================================================= */

/* =========================================================
   GET URL PARAMETERS
   ========================================================= */

const params = new URLSearchParams(window.location.search);

const selectedLanguage =
    params.get("language") || "Python";

let currentLesson =
    parseInt(params.get("lesson"), 10) || 0;


/* =========================================================
   COURSE DATABASE
   ========================================================= */

const courses = {


    /* =====================================================
       PYTHON COURSE
    ===================================================== */

    Python: [

        {
            title: "Introduction to Python",

            subtitle:
                "Understand Python, why it is popular, and write your first program.",

            concept: `
                <p>
                    <strong>Python</strong> is a high-level programming
                    language designed to make programming simple and readable.
                </p>

                <p>
                    Python is widely used in web development, automation,
                    data science, artificial intelligence and machine learning.
                </p>

                <div class="learning-highlight">
                    💡 <strong>Think of Python like this:</strong>
                    You tell the computer what you want in a simple,
                    human-readable way.
                </div>
            `,

            realLife: `
                <p>Python is used in many real-world technologies:</p>

                <ul>
                    <li>🤖 Artificial Intelligence</li>
                    <li>🧠 Machine Learning</li>
                    <li>🌐 Web Development</li>
                    <li>📊 Data Science</li>
                    <li>⚙️ Automation</li>
                    <li>🔐 Cybersecurity</li>
                </ul>
            `,

            howItWorks: `
                <div class="flow-diagram">

                    <div class="flow-box">
                        📝
                        <strong>Python Code</strong>
                        <small>.py file</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        ⚙️
                        <strong>Python Interpreter</strong>
                        <small>Processes code</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        🖥️
                        <strong>Output</strong>
                        <small>Program result</small>
                    </div>

                </div>

                <p>
                    The Python interpreter reads your instructions
                    and executes them.
                </p>
            `,

            example: `
                <p>
                    Let's start with one of the simplest Python programs.
                </p>

                <p>
                    We can use <strong>print()</strong> to display
                    something on the screen.
                </p>
            `,

            codeLanguage: "Python",

            code:
`print("Hello, Zensus!")
print("Welcome to Python!")`,

            output:
`Hello, Zensus!
Welcome to Python!`,

            keyPoints: [
                "Python is a high-level programming language.",
                "Python has simple and readable syntax.",
                "Python is widely used in AI, ML and web development.",
                "Python files normally use the .py extension.",
                "print() is used to display output."
            ],

            mistakes: `
                <ul>
                    <li>Forgetting quotation marks around text.</li>
                    <li>Writing print incorrectly.</li>
                    <li>Forgetting brackets.</li>
                    <li>Incorrect indentation in larger programs.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a Python program that prints your name and college.",

                answer:
`name = "Your Name"
college = "Your College"

print(name)
print(college)`
            }
        },


        /* =====================================================
           PYTHON LESSON 2
        ===================================================== */

        {
            title: "Python Variables and Data Types",

            subtitle:
                "Learn how Python stores different kinds of information.",

            concept: `
                <p>
                    A <strong>variable</strong> is a name used to store
                    information in a program.
                </p>

                <div class="learning-highlight">
                    📦 Imagine a variable as a box.
                    The variable name is the label on the box,
                    and the value is what is stored inside it.
                </div>
            `,

            realLife: `
                <p>
                    A student application may store:
                </p>

                <ul>
                    <li>👤 Name</li>
                    <li>🎂 Age</li>
                    <li>📊 Marks</li>
                    <li>✅ Pass status</li>
                </ul>
            `,

            howItWorks: `
                <p>
                    Python automatically determines the type of
                    value stored in a variable.
                </p>

                <ul>
                    <li><strong>str</strong> → text</li>
                    <li><strong>int</strong> → whole numbers</li>
                    <li><strong>float</strong> → decimal numbers</li>
                    <li><strong>bool</strong> → True or False</li>
                </ul>
            `,

            example: `
                <p>
                    Let's create some variables for a student.
                </p>
            `,

            codeLanguage: "Python",

            code:
`name = "Pradeep"
age = 19
cgpa = 8.6
student = True

print(name)
print(age)
print(cgpa)
print(student)`,

            output:
`Pradeep
19
8.6
True`,

            keyPoints: [
                "Variables store information.",
                "Python is dynamically typed.",
                "int stores whole numbers.",
                "float stores decimal numbers.",
                "str stores text.",
                "bool stores True or False."
            ],

            mistakes: `
                <ul>
                    <li>Using invalid variable names.</li>
                    <li>Forgetting quotation marks around strings.</li>
                    <li>Using a variable before assigning a value.</li>
                </ul>
            `,

            practice: {
                question:
                    "Create variables for your name, age and CGPA and print them.",

                answer:
`name = "Your Name"
age = 19
cgpa = 8.6

print(name)
print(age)
print(cgpa)`
            }
        },


        /* =====================================================
           PYTHON LESSON 3
        ===================================================== */

        {
            title: "Python Input and Output",

            subtitle:
                "Learn how to interact with users using input() and print().",

            concept: `
                <p>
                    A useful program should be able to communicate
                    with the user.
                </p>

                <p>
                    Python uses <strong>input()</strong> to receive
                    information and <strong>print()</strong> to display
                    information.
                </p>
            `,

            realLife: `
                <p>
                    Think about a registration form.
                    The user enters their name and age.
                    The application receives that information
                    and processes it.
                </p>
            `,

            howItWorks: `
                <div class="flow-diagram">

                    <div class="flow-box">
                        👤
                        <strong>User</strong>
                        <small>Input</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        🐍
                        <strong>Python</strong>
                        <small>Process</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        🖥️
                        <strong>Output</strong>
                        <small>Result</small>
                    </div>

                </div>
            `,

            example: `
                <p>
                    We can ask the user for their name and
                    display a personalized greeting.
                </p>
            `,

            codeLanguage: "Python",

            code:
`name = input("Enter your name: ")

print("Hello", name)`,

            output:
`Enter your name: Pradeep
Hello Pradeep`,

            keyPoints: [
                "input() receives information from the user.",
                "print() displays information.",
                "input() normally returns a string.",
                "Numbers can be converted using int() or float()."
            ],

            mistakes: `
                <ul>
                    <li>Forgetting parentheses in input().</li>
                    <li>Forgetting to convert numeric input.</li>
                    <li>Using incorrect variable names.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a program that asks the user for their age and prints it.",

                answer:
`age = input("Enter your age: ")

print("Your age is", age)`
            }
        },


        /* =====================================================
           PYTHON LESSON 4
        ===================================================== */

        {
            title: "Python Operators",

            subtitle:
                "Learn how to perform calculations and comparisons.",

            concept: `
                <p>
                    Operators are symbols used to perform operations
                    on values and variables.
                </p>

                <ul>
                    <li>➕ Arithmetic</li>
                    <li>⚖️ Comparison</li>
                    <li>🧠 Logical</li>
                    <li>📝 Assignment</li>
                </ul>
            `,

            realLife: `
                <p>
                    Shopping applications use operators to calculate
                    prices, discounts and totals.
                </p>
            `,

            howItWorks: `
                <p>
                    Arithmetic operators include:
                </p>

                <ul>
                    <li>+ Addition</li>
                    <li>- Subtraction</li>
                    <li>* Multiplication</li>
                    <li>/ Division</li>
                    <li>% Remainder</li>
                </ul>
            `,

            example: `
                <p>
                    Let's calculate the total price of two products.
                </p>
            `,

            codeLanguage: "Python",

            code:
`price1 = 100
price2 = 250

total = price1 + price2

print("Total:", total)`,

            output:
`Total: 350`,

            keyPoints: [
                "+ performs addition.",
                "- performs subtraction.",
                "* performs multiplication.",
                "/ performs division.",
                "% returns the remainder.",
                "Comparison operators return True or False."
            ],

            mistakes: `
                <ul>
                    <li>Confusing = with ==.</li>
                    <li>Forgetting operator precedence.</li>
                    <li>Using the wrong operator.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a Python program to calculate the area of a rectangle.",

                answer:
`length = 10
width = 5

area = length * width

print("Area:", area)`
            }
        },


        /* =====================================================
           PYTHON LESSON 5
        ===================================================== */

        {
            title: "Python Conditional Statements",

            subtitle:
                "Teach your program how to make decisions using if, elif and else.",

            concept: `
                <p>
                    Conditional statements allow a program to
                    make decisions.
                </p>

                <div class="learning-highlight">
                    🧠 <strong>Think:</strong>
                    "If this happens, do this. Otherwise, do something else."
                </div>
            `,

            realLife: `
                <p>
                    Imagine a college result system.
                </p>

                <ul>
                    <li>Marks ≥ 40 → Pass</li>
                    <li>Marks < 40 → Fail</li>
                </ul>
            `,

            howItWorks: `
                <p>
                    Python provides three important conditional
                    keywords:
                </p>

                <ul>
                    <li><strong>if</strong></li>
                    <li><strong>elif</strong></li>
                    <li><strong>else</strong></li>
                </ul>
            `,

            example: `
                <p>
                    Let's check whether a student passed.
                </p>
            `,

            codeLanguage: "Python",

            code:
`marks = 75

if marks >= 40:
    print("Pass")
else:
    print("Fail")`,

            output:
`Pass`,

            keyPoints: [
                "if checks a condition.",
                "elif checks another condition.",
                "else executes when conditions are false.",
                "Indentation is important in Python."
            ],

            mistakes: `
                <ul>
                    <li>Forgetting the colon.</li>
                    <li>Incorrect indentation.</li>
                    <li>Using = instead of == for comparison.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a program to check whether a number is positive, negative or zero.",

                answer:
`number = 10

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")`
            }
        }

    ],


    /* =====================================================
       JAVA COURSE
    ===================================================== */

    Java: [

        {
            title: "Introduction to Java",

            subtitle:
                "Understand Java, the JVM and write your first Java program.",

            concept: `
                <p>
                    <strong>Java</strong> is a high-level,
                    object-oriented programming language.
                </p>

                <p>
                    Java follows the idea
                    <strong>"Write Once, Run Anywhere."</strong>
                </p>

                <div class="learning-highlight">
                    ☕ Java code is compiled into bytecode,
                    which can run on systems containing a JVM.
                </div>
            `,

            realLife: `
                <ul>
                    <li>🏦 Banking applications</li>
                    <li>🏢 Enterprise applications</li>
                    <li>📱 Android applications</li>
                    <li>🌐 Web applications</li>
                    <li>☁️ Cloud systems</li>
                </ul>
            `,

            howItWorks: `
                <div class="flow-diagram">

                    <div class="flow-box">
                        📝
                        <strong>Java Code</strong>
                        <small>.java</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        ⚙️
                        <strong>Compiler</strong>
                        <small>javac</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        📦
                        <strong>Bytecode</strong>
                        <small>.class</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        ☕
                        <strong>JVM</strong>
                        <small>Run</small>
                    </div>

                </div>
            `,

            example: `
                <p>
                    Every normal Java application starts execution
                    from the <strong>main()</strong> method.
                </p>
            `,

            codeLanguage: "Java",

            code:
`public class Main {

    public static void main(String[] args) {

        System.out.println("Hello, Zensus!");

    }

}`,

            output:
`Hello, Zensus!`,

            keyPoints: [
                "Java is object-oriented.",
                "Java source files normally use .java.",
                "Java code is compiled into bytecode.",
                "JVM executes bytecode.",
                "main() is the normal starting point."
            ],

            mistakes: `
                <ul>
                    <li>Incorrect capitalization.</li>
                    <li>Forgetting semicolons.</li>
                    <li>Writing System incorrectly.</li>
                    <li>Incorrect class/file naming.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a Java program that prints your name, college and branch.",

                answer:
`public class Main {

    public static void main(String[] args) {

        System.out.println("Your Name");
        System.out.println("Your College");
        System.out.println("CSE");

    }

}`
            }
        },


        {
            title: "Java Variables and Data Types",

            subtitle:
                "Learn how Java stores different types of information.",

            concept: `
                <p>
                    A variable is a named memory location used
                    to store a value.
                </p>

                <div class="learning-highlight">
                    📦 Think of a variable as a labelled box
                    containing a value.
                </div>
            `,

            realLife: `
                <ul>
                    <li>👤 Name → String</li>
                    <li>🎂 Age → int</li>
                    <li>📊 CGPA → double</li>
                    <li>✅ Student → boolean</li>
                </ul>
            `,

            howItWorks: `
                <p>
                    Java is statically typed, so the data type
                    is specified when a variable is declared.
                </p>

                <ul>
                    <li><strong>int</strong> → whole numbers</li>
                    <li><strong>double</strong> → decimal numbers</li>
                    <li><strong>char</strong> → single character</li>
                    <li><strong>boolean</strong> → true / false</li>
                    <li><strong>String</strong> → text</li>
                </ul>
            `,

            example: `
                <p>
                    Let's create variables for a student.
                </p>
            `,

            codeLanguage: "Java",

            code:
`public class Main {

    public static void main(String[] args) {

        String name = "Pradeep";
        int age = 19;
        double cgpa = 8.6;
        boolean student = true;

        System.out.println(name);
        System.out.println(age);
        System.out.println(cgpa);
        System.out.println(student);

    }

}`,

            output:
`Pradeep
19
8.6
true`,

            keyPoints: [
                "Every Java variable has a data type.",
                "int stores whole numbers.",
                "double stores decimal values.",
                "String stores text.",
                "boolean stores true or false."
            ],

            mistakes: `
                <ul>
                    <li>Using an undeclared variable.</li>
                    <li>Using the wrong data type.</li>
                    <li>Forgetting semicolons.</li>
                    <li>Using invalid variable names.</li>
                </ul>
            `,

            practice: {
                question:
                    "Create variables for your name, age and CGPA.",

                answer:
`String name = "Your Name";
int age = 19;
double cgpa = 8.6;

System.out.println(name);
System.out.println(age);
System.out.println(cgpa);`
            }
        },


        {
            title: "Java Input and Output",

            subtitle:
                "Learn how Java receives input and displays output.",

            concept: `
                <p>
                    Java uses <strong>System.out.println()</strong>
                    to display output.
                </p>

                <p>
                    The <strong>Scanner</strong> class can be used
                    to receive input from the user.
                </p>
            `,

            realLife: `
                <p>
                    A registration form asks the user for information.
                    Java can receive that information using Scanner.
                </p>
            `,

            howItWorks: `
                <div class="flow-diagram">

                    <div class="flow-box">
                        👤
                        <strong>User</strong>
                        <small>Input</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        ☕
                        <strong>Java</strong>
                        <small>Process</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        🖥️
                        <strong>Output</strong>
                        <small>Result</small>
                    </div>

                </div>
            `,

            example: `
                <p>
                    Let's ask the user for their name.
                </p>
            `,

            codeLanguage: "Java",

            code:
`import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter your name: ");

        String name = input.nextLine();

        System.out.println("Hello " + name);

    }

}`,

            output:
`Enter your name: Pradeep
Hello Pradeep`,

            keyPoints: [
                "System.out.println() displays output.",
                "Scanner can receive user input.",
                "nextLine() reads a complete line.",
                "nextInt() reads an integer."
            ],

            mistakes: `
                <ul>
                    <li>Forgetting to import Scanner.</li>
                    <li>Incorrect capitalization.</li>
                    <li>Forgetting to create the Scanner object.</li>
                </ul>
            `,

            practice: {
                question:
                    "Write a Java program that asks for the user's age and displays it.",

                answer:
`import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        System.out.print("Enter your age: ");

        int age = input.nextInt();

        System.out.println("Age: " + age);

    }

}`
            }
        }

    ]

};


/* =========================================================
   GENERATE PLACEHOLDER COURSES
   ========================================================= */

const otherCourses = [
    "C",
    "C++",
    "JavaScript",
    "Kotlin",
    "SQL",
    "HTML",
    "CSS",
    "React",
    "Django",
    "Node.js",
    "REST API",
    "Git & GitHub",
    "AI Fundamentals",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Prompt Engineering",
    "RAG",
    "AI Agents",
    "AI Projects"
];


otherCourses.forEach(name => {

    if (!courses[name]) {

        courses[name] = createPlaceholderCourse(name);

    }

});


/* =========================================================
   PLACEHOLDER COURSE FUNCTION
   ========================================================= */

function createPlaceholderCourse(name) {

    return [

        {
            title: `Introduction to ${name}`,

            subtitle:
                `Start learning ${name} from the fundamentals.`,

            concept: `
                <p>
                    Welcome to the <strong>${name}</strong> course
                    on ZENSUS.
                </p>

                <p>
                    This course will take you from the fundamentals
                    toward practical development.
                </p>

                <div class="learning-highlight">
                    🚀 <strong>Learning path:</strong>
                    Understand → Practice → Build → Master
                </div>
            `,

            realLife: `
                <p>
                    ${name} is used in modern software development
                    and technology applications.
                </p>
            `,

            howItWorks: `
                <p>
                    You will first learn the fundamentals of
                    ${name}, then gradually move toward practical
                    examples and projects.
                </p>

                <div class="flow-diagram">

                    <div class="flow-box">
                        📖
                        <strong>Learn</strong>
                        <small>Concepts</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        💻
                        <strong>Practice</strong>
                        <small>Code</small>
                    </div>

                    <span>→</span>

                    <div class="flow-box">
                        🚀
                        <strong>Build</strong>
                        <small>Projects</small>
                    </div>

                </div>
            `,

            example: `
                <p>
                    Start with a small example and gradually
                    increase the complexity.
                </p>
            `,

            codeLanguage: name,

            code:
`// Your ${name} code will be written here`,

            output:
`Practice the example and observe the result.`,

            keyPoints: [
                `Understand ${name} fundamentals.`,
                "Practice every concept.",
                "Build small projects.",
                "Solve problems regularly."
            ],

            mistakes: `
                <ul>
                    <li>Skipping fundamentals.</li>
                    <li>Only reading without practicing.</li>
                    <li>Trying advanced topics too early.</li>
                </ul>
            `,

            practice: {
                question:
                    `Write a simple example using ${name}.`,

                answer:
                    `Start by implementing one basic concept of ${name}.`
            }
        }

    ];

}


/* =========================================================
   GET COURSE
   ========================================================= */

let course = courses[selectedLanguage];


/* =========================================================
   SAFETY FALLBACK
   ========================================================= */

if (!course) {

    course =
        createPlaceholderCourse(selectedLanguage);

}


/* =========================================================
   VALIDATE LESSON NUMBER
   ========================================================= */

if (
    Number.isNaN(currentLesson) ||
    currentLesson < 0 ||
    currentLesson >= course.length
) {

    currentLesson = 0;

}


const lesson =
    course[currentLesson];


/* =========================================================
   HELPER
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value ?? "";

    }

}


function setHTML(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerHTML =
            value ?? "";

    }

}


/* =========================================================
   BASIC INFORMATION
   ========================================================= */

document.title =
    `Zensus - ${selectedLanguage} - ${lesson.title}`;

setText(
    "courseName",
    selectedLanguage
);

setText(
    "lessonTitle",
    lesson.title
);

setText(
    "lessonSubtitle",
    lesson.subtitle
);

setText(
    "lessonPosition",
    `Lesson ${currentLesson + 1} of ${course.length}`
);


/* =========================================================
   LANGUAGE ICON
   ========================================================= */

const languageIcons = {

    Python: "🐍",

    Java: "☕",

    C: "C",

    "C++": "C++",

    JavaScript: "JS",

    Kotlin: "K",

    HTML: "HTML",

    CSS: "CSS",

    React: "⚛",

    Django: "DJ",

    "Node.js": "JS",

    SQL: "SQL",

    "AI Fundamentals": "🤖",

    "Machine Learning": "🧠",

    "Deep Learning": "🧠",

    "Generative AI": "✨",

    "Prompt Engineering": "💬",

    RAG: "🔎",

    "AI Agents": "🤖",

    "AI Projects": "🚀"

};


setText(
    "lessonLanguageIcon",
    languageIcons[selectedLanguage] || "Z"
);


/* =========================================================
   CONTENT
   ========================================================= */

setHTML(
    "conceptContent",
    lesson.concept
);

setHTML(
    "realLifeContent",
    lesson.realLife
);

setHTML(
    "howItWorksContent",
    lesson.howItWorks
);

setHTML(
    "exampleContent",
    lesson.example
);


/* =========================================================
   CODE
   ========================================================= */

setText(
    "codeLanguage",
    lesson.codeLanguage
);

setText(
    "codeExample",
    lesson.code
);

setText(
    "codeOutput",
    lesson.output
);


/* =========================================================
   KEY POINTS
   ========================================================= */

const keyPoints =
    document.getElementById("keyPoints");

if (keyPoints) {

    keyPoints.innerHTML = "";

    lesson.keyPoints.forEach(point => {

        const li =
            document.createElement("li");

        li.textContent =
            point;

        keyPoints.appendChild(li);

    });

}


/* =========================================================
   COMMON MISTAKES
   ========================================================= */

setHTML(
    "mistakesContent",
    lesson.mistakes
);


/* =========================================================
   PRACTICE
   ========================================================= */

const practiceQuestion =
    document.getElementById("practiceQuestion");

const practiceAnswer =
    document.getElementById("practiceAnswer");

const showAnswerButton =
    document.getElementById("showAnswerButton");


if (practiceQuestion) {

    practiceQuestion.textContent =
        lesson.practice.question;

}


if (practiceAnswer) {

    practiceAnswer.innerHTML =
        `<pre><code>${escapeHTML(
            lesson.practice.answer
        )}</code></pre>`;

    practiceAnswer.style.display =
        "none";

}


if (showAnswerButton) {

    showAnswerButton.textContent =
        "Show Answer";

    showAnswerButton.onclick =
        function () {

            const hidden =
                practiceAnswer.style.display === "none";

            practiceAnswer.style.display =
                hidden ? "block" : "none";

            this.textContent =
                hidden
                    ? "Hide Answer"
                    : "Show Answer";

        };

}


/* =========================================================
   COPY CODE
   ========================================================= */

const copyCodeButton =
    document.getElementById("copyCodeButton");


if (copyCodeButton) {

    copyCodeButton.onclick =
        async function () {

            try {

                await navigator.clipboard.writeText(
                    lesson.code
                );

                this.textContent =
                    "Copied ✓";

                setTimeout(() => {

                    this.textContent =
                        "Copy";

                }, 1500);

            }

            catch (error) {

                /* Fallback */

                const textarea =
                    document.createElement("textarea");

                textarea.value =
                    lesson.code;

                document.body.appendChild(
                    textarea
                );

                textarea.select();

                document.execCommand("copy");

                textarea.remove();

                this.textContent =
                    "Copied ✓";

                setTimeout(() => {

                    this.textContent =
                        "Copy";

                }, 1500);

            }

        };

}


/* =========================================================
   PROGRESS
   ========================================================= */

const progress =
    Math.round(
        ((currentLesson + 1) /
            course.length) * 100
    );


setText(
    "courseProgress",
    `${progress}%`
);


const progressBar =
    document.getElementById("lessonProgress");

if (progressBar) {

    progressBar.style.width =
        `${progress}%`;

}


setText(
    "lessonProgressText",
    `${progress}%`
);


/* =========================================================
   NAVIGATION
   ========================================================= */

function goToLesson(number) {

    window.location.href =
        `lesson.html?language=${encodeURIComponent(
            selectedLanguage
        )}&lesson=${number}`;

}


/* =========================================================
   PREVIOUS LESSON
   ========================================================= */

const previousLesson =
    document.getElementById("previousLesson");


if (previousLesson) {

    previousLesson.disabled =
        currentLesson === 0;

    previousLesson.onclick =
        function () {

            if (currentLesson > 0) {

                goToLesson(
                    currentLesson - 1
                );

            }

        };

}


/* =========================================================
   NEXT LESSON
   ========================================================= */

const nextLesson =
    document.getElementById("nextLesson");


if (nextLesson) {

    if (
        currentLesson === course.length - 1
    ) {

        nextLesson.textContent =
            "Course Completed ✓";

    }

    nextLesson.onclick =
        function () {

            if (
                currentLesson <
                course.length - 1
            ) {

                goToLesson(
                    currentLesson + 1
                );

            }

            else {

                alert(
                    `🎉 Congratulations!

You completed the ${selectedLanguage} course!`
                );

            }

        };

}


/* =========================================================
   MARK LESSON COMPLETE
   ========================================================= */

const completeLesson =
    document.getElementById("completeLesson");


const completedKey =
    `zensus_completed_${selectedLanguage}_${currentLesson}`;


if (completeLesson) {

    if (
        localStorage.getItem(
            completedKey
        ) === "true"
    ) {

        completeLesson.textContent =
            "Completed ✓";

        completeLesson.disabled =
            true;

    }


    completeLesson.onclick =
        function () {

            localStorage.setItem(
                completedKey,
                "true"
            );

            this.textContent =
                "Completed ✓";

            this.disabled =
                true;

        };

}


/* =========================================================
   ASK ZENSUS AI
   ========================================================= */

const askAIButton =
    document.getElementById("askAIButton");


if (askAIButton) {

    askAIButton.onclick =
        function () {

            alert(
                `🤖 ZENSUS AI

Ask me anything about:

"${lesson.title}"

Soon Zensus AI will explain this
lesson interactively.`
            );

        };

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(text) {

    return String(text)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "ZENSUS COURSE:",
    selectedLanguage
);

console.log(
    "ZENSUS LESSON:",
    currentLesson + 1,
    "/",
    course.length
);