
/* =====================================================
   ZENSUS DASHBOARD
   COURSE NAVIGATION + ZENSUS AI
===================================================== */


/* =====================================================
   START BUTTONS
===================================================== */

const startButtons =
    document.querySelectorAll(".start-button");


startButtons.forEach(button => {

    button.addEventListener("click", function () {

        /* Get the selected course card */
        const card =
            this.closest(".language-card");


        /* Safety check */
        if (!card) {
            return;
        }


        /* Get course name */
        const language =
            card.dataset.name;


        /* Console check */
        console.log(
            "Selected course:",
            language
        );


        /* Open selected course */

        window.location.href =
            "language.html?language=" +
            encodeURIComponent(language);

    });

});



/* =====================================================
   LANGUAGE SEARCH
===================================================== */

const languageSearch =
    document.getElementById("languageSearch");


const languageCards =
    document.querySelectorAll(".language-card");


if (languageSearch) {

    languageSearch.addEventListener(
        "input",
        function () {

            /* Get search text */

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            /* Track visible courses */

            let visibleCourses = 0;


            languageCards.forEach(card => {

                /* Get course name */

                const name =
                    (card.dataset.name || "")
                        .toLowerCase();


                /* Check search */

                if (
                    name.includes(searchText)
                ) {

                    card.style.display = "";

                    visibleCourses++;

                } else {

                    card.style.display = "none";

                }

            });


            /* Update course count */

            const languageCount =
                document.getElementById(
                    "languageCount"
                );


            if (languageCount) {

                languageCount.textContent =
                    visibleCourses +
                    (
                        visibleCourses === 1
                            ? " course"
                            : " courses"
                    );

            }


            /* Show / hide no-results */

            const noResults =
                document.getElementById(
                    "noResults"
                );


            if (noResults) {

                noResults.style.display =
                    visibleCourses === 0
                        ? "block"
                        : "none";

            }

        }
    );

}



/* =====================================================
   INITIAL COURSE COUNT
===================================================== */

const languageCount =
    document.getElementById(
        "languageCount"
    );


if (languageCount) {

    languageCount.textContent =
        languageCards.length +
        " courses";

}



/* =====================================================
   GLOBAL SEARCH
===================================================== */

const globalSearch =
    document.getElementById("globalSearch");


if (globalSearch) {

    globalSearch.addEventListener(
        "input",
        function () {

            console.log(
                "Global search:",
                this.value
            );

        }
    );

}



/* =====================================================
   ZENSUS AI NAVIGATION
===================================================== */

/*
   These IDs are present in the modified
   dashboard.html:

   1. zensusAISidebar
   2. askZensusAI
*/


const zensusAISidebar =
    document.getElementById(
        "zensusAISidebar"
    );


const askZensusAI =
    document.getElementById(
        "askZensusAI"
    );



/* =====================================================
   SIDEBAR → ZENSUS AI
===================================================== */

if (zensusAISidebar) {

    zensusAISidebar.addEventListener(
        "click",
        function (event) {

            /*
               Prevent the browser from
               handling the link twice.
            */

            event.preventDefault();


            console.log(
                "Opening ZENSUS AI from sidebar..."
            );


            window.location.href =
                "zensus-ai.html";

        }
    );

}



/* =====================================================
   AI BANNER → ZENSUS AI
===================================================== */

if (askZensusAI) {

    askZensusAI.addEventListener(
        "click",
        function () {

            console.log(
                "Opening ZENSUS AI..."
            );


            window.location.href =
                "zensus-ai.html";

        }
    );

}



/* =====================================================
   ZENSUS AI CONNECTION CHECK
===================================================== */

/*
   This does NOT call the AI API.

   It only confirms that the dashboard
   navigation code is loaded correctly.
*/

console.log(
    "ZENSUS Dashboard loaded successfully."
);


console.log(
    "ZENSUS AI navigation ready."
);

