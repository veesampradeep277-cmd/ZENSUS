/* =========================================
   ZENSUS PYTHON - LESSON 01
   Introduction to Python
========================================= */


/* =========================================
   PROGRESS
========================================= */

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const lessonCompleted =
    localStorage.getItem("zensus_python_lesson_01") === "true";

if (lessonCompleted) {

    progressBar.style.width = "100%";
    progressText.textContent = "100%";

} else {

    progressBar.style.width = "0%";
    progressText.textContent = "0%";

}


/* =========================================
   VISUAL ANIMATION
========================================= */

const playAnimation =
    document.getElementById("playAnimation");

const animationStatus =
    document.getElementById("animationStatus");

const nodes = [

    document.getElementById("codeNode"),

    document.getElementById("interpreterNode"),

    document.getElementById("executionNode"),

    document.getElementById("outputNode")

];

const arrows = [

    document.getElementById("arrow1"),

    document.getElementById("arrow2"),

    document.getElementById("arrow3")

];


playAnimation.addEventListener("click", async () => {

    /* Reset */

    nodes.forEach(node => {
        node.classList.remove("active");
    });

    arrows.forEach(arrow => {
        arrow.classList.remove("active");
    });


    playAnimation.disabled = true;

    playAnimation.textContent = "⏳ Playing...";


    /* STEP 1 */

    animationStatus.textContent =
        "Step 1: You write your Python instructions.";

    nodes[0].classList.add("active");

    await wait(1500);


    /* ARROW */

    arrows[0].classList.add("active");

    await wait(800);


    /* STEP 2 */

    animationStatus.textContent =
        "Step 2: The Python interpreter processes your code.";

    nodes[1].classList.add("active");

    await wait(1500);


    arrows[0].classList.remove("active");

    arrows[1].classList.add("active");

    await wait(800);


    /* STEP 3 */

    animationStatus.textContent =
        "Step 3: Python executes the instructions.";

    nodes[2].classList.add("active");

    await wait(1500);


    arrows[1].classList.remove("active");

    arrows[2].classList.add("active");

    await wait(800);


    /* STEP 4 */

    animationStatus.textContent =
        "Step 4: The program produces the output.";

    nodes[3].classList.add("active");

    await wait(1500);


    arrows[2].classList.remove("active");

    animationStatus.textContent =
        "✓ Animation complete — Code has produced the output.";


    playAnimation.disabled = false;

    playAnimation.textContent = "↻ Replay Animation";

});


function wait(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });

}


/* =========================================
   COPY CODE
========================================= */

const copyCode =
    document.getElementById("copyCode");

const pythonCode =
    document.getElementById("pythonCode");


copyCode.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(
            pythonCode.textContent
        );

        copyCode.textContent = "✓ Copied";

        setTimeout(() => {

            copyCode.textContent = "📋 Copy";

        }, 2000);

    } catch (error) {

        copyCode.textContent = "Copy failed";

    }

});


/* =========================================
   QUIZ
========================================= */

const quizOptions =
    document.querySelectorAll(".quiz-option");

const quizResult =
    document.getElementById("quizResult");


quizOptions.forEach(option => {

    option.addEventListener("click", () => {

        /* Prevent multiple answers */

        quizOptions.forEach(button => {

            button.disabled = true;

        });


        if (option.dataset.answer === "correct") {

            option.classList.add("correct-answer");

            quizResult.textContent =
                "✓ Correct! print() is commonly used to display output in Python.";

            quizResult.style.color = "#16a34a";

        } else {

            option.classList.add("wrong-answer");

            quizResult.textContent =
                "✗ Not quite. Try to remember the function used to display output.";

            quizResult.style.color = "#dc2626";


            /* Show correct answer */

            quizOptions.forEach(button => {

                if (button.dataset.answer === "correct") {

                    button.classList.add("correct-answer");

                }

            });

        }

    });

});


/* =========================================
   COMPLETE LESSON
========================================= */

const completeLesson =
    document.getElementById("completeLesson");


if (lessonCompleted) {

    completeLesson.textContent =
        "✓ Lesson Completed";

    completeLesson.classList.add("completed");

}


completeLesson.addEventListener("click", () => {

    localStorage.setItem(
        "zensus_python_lesson_01",
        "true"
    );


    progressBar.style.width = "100%";

    progressText.textContent = "100%";


    completeLesson.textContent =
        "✓ Lesson Completed";

    completeLesson.classList.add("completed");


    /* Small confirmation */

    alert(
        "Lesson 01 completed! 🎉\n\nYou are ready for Lesson 02."
    );

});


/* =========================================
   NEXT LESSON
========================================= */

const nextLesson =
    document.getElementById("nextLesson");


nextLesson.addEventListener("click", () => {

    /*
       Lesson 02 will be created later.
       For now we show a message.
    */

    alert(
        "Lesson 02 is coming next! 🚀"
    );

});