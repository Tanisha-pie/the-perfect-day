document.addEventListener("DOMContentLoaded", function () {

    const progress = document.querySelector(".progress span");

    window.addEventListener("scroll", function () {

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percent =
            pageHeight > 0
                ? (window.scrollY / pageHeight) * 100
                : 0;

        if (progress) {
            progress.style.width = percent + "%";
        }

    });


    const surprise =
        document.getElementById("surprise");

    const surpriseOverlay =
        document.getElementById("surpriseOverlay");

    const closeSurprise =
        document.getElementById("closeSurprise");

    const missionDone =
        document.getElementById("missionDone");

    const missionText =
        document.getElementById("missionText");


    const missions = [
        "Drink some water and take a proper little break.",
        "Put your favourite song on and dance for one minute.",
        "Tell yourself one thing you are genuinely proud of.",
        "Go outside and look at the sky for a moment.",
        "Text someone who always makes you smile.",
        "Take five quiet minutes completely for yourself.",
        "Make something simply because you want to.",
        "Remember that you are doing better than you think."
    ];


    if (surprise) {

        surprise.addEventListener("click", function () {

            const randomMission =
                missions[
                    Math.floor(
                        Math.random() * missions.length
                    )
                ];

            missionText.textContent =
                randomMission;

            surpriseOverlay.classList.add("open");

        });

    }


    if (closeSurprise) {

        closeSurprise.addEventListener("click", function () {

            surpriseOverlay.classList.remove("open");

        });

    }


    if (missionDone) {

        missionDone.addEventListener("click", function () {

            surpriseOverlay.classList.remove("open");

            createHearts(16);

        });

    }


    if (surpriseOverlay) {

        surpriseOverlay.addEventListener("click", function (event) {

            if (event.target === surpriseOverlay) {
                surpriseOverlay.classList.remove("open");
            }

        });

    }


    const tour =
        document.getElementById("tour");

    const tourOverlay =
        document.getElementById("tourOverlay");

    const tourClose =
        document.getElementById("tourClose");

    const tourTitle =
        document.getElementById("tourTitle");

    const tourText =
        document.getElementById("tourText");

    const tourProgress =
        document.getElementById("tourProgress");


    const tourSteps = [

        {
            title: "Welcome to our world.",
            text: "A little story made from friendship and tiny moments.",
            target: "#home"
        },

        {
            title: "A day of little things.",
            text: "Maybe perfection is simply having the right people around.",
            target: "#story"
        },

        {
            title: "The memories.",
            text: "Three little pieces of a day we wanted to keep.",
            target: "#moments"
        },

        {
            title: "Let's play.",
            text: "A little game before we continue.",
            target: "#play"
        },

        {
            title: "For every girl.",
            text: "A few words every girl deserves to hear.",
            target: "#her"
        },

        {
            title: "Made with love.",
            text: "And finally, the two people who made this little world.",
            target: "#us"
        }

    ];


    let tourIndex = 0;
    let tourTimer;


    function showTourStep() {

        if (!tourOverlay.classList.contains("open")) {
            return;
        }

        const step =
            tourSteps[tourIndex];

        tourTitle.textContent =
            step.title;

        tourText.textContent =
            step.text;

        tourProgress.style.width =
            ((tourIndex + 1) / tourSteps.length) * 100 + "%";


        const destination =
            document.querySelector(step.target);

        if (destination) {

            destination.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        clearTimeout(tourTimer);

        tourTimer =
            setTimeout(function () {

                tourIndex++;

                if (tourIndex < tourSteps.length) {

                    showTourStep();

                } else {

                    setTimeout(function () {

                        tourOverlay.classList.remove("open");

                    }, 500);

                }

            }, 1900);

    }


    if (tour) {

        tour.addEventListener("click", function () {

            clearTimeout(tourTimer);

            tourIndex = 0;

            tourOverlay.classList.add("open");

            showTourStep();

        });

    }


    if (tourClose) {

        tourClose.addEventListener("click", function () {

            clearTimeout(tourTimer);

            tourOverlay.classList.remove("open");

        });

    }


    const cells =
        document.querySelectorAll(".board button");

    const gameStatus =
        document.getElementById("gameStatus");

    const aiMode =
        document.getElementById("aiMode");

    const friendMode =
        document.getElementById("friendMode");

    const restart =
        document.getElementById("restart");

    const xScoreElement =
        document.getElementById("xScore");

    const oScoreElement =
        document.getElementById("oScore");


    let board =
        ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "X";
    let gameMode = "ai";
    let gameOver = false;

    let xScore = 0;
    let oScore = 0;


    const wins = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ];


    function renderBoard() {

        cells.forEach(function (cell, index) {

            cell.textContent =
                board[index];

            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.classList.remove("winner");


            if (board[index] === "X") {
                cell.classList.add("x");
            }


            if (board[index] === "O") {
                cell.classList.add("o");
            }

        });

    }


    function getResult() {

        for (const combo of wins) {

            const a = combo[0];
            const b = combo[1];
            const c = combo[2];


            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            ) {

                return {
                    winner: board[a],
                    combo: combo
                };

            }

        }


        if (
            board.every(function (value) {
                return value !== "";
            })
        ) {

            return {
                winner: "draw",
                combo: []
            };

        }


        return null;

    }


    function finishGame(result) {

        if (!result) {
            return false;
        }

        gameOver = true;


        if (result.winner === "draw") {

            gameStatus.textContent =
                "It's a draw ✦";

            return true;

        }


        result.combo.forEach(function (index) {

            cells[index].classList.add("winner");

        });


        if (result.winner === "X") {

            xScore++;

            xScoreElement.textContent =
                xScore;

            gameStatus.textContent =
                "X wins ♡";

        } else {

            oScore++;

            oScoreElement.textContent =
                oScore;

            gameStatus.textContent =
                "O wins ♡";

        }


        createHearts(8);

        return true;

    }


    function emptySpaces() {

        const spaces = [];

        board.forEach(function (value, index) {

            if (value === "") {
                spaces.push(index);
            }

        });

        return spaces;

    }


    function findWinningMove(symbol) {

        const spaces =
            emptySpaces();


        for (const index of spaces) {

            board[index] =
                symbol;

            const possible =
                getResult();

            board[index] = "";


            if (
                possible &&
                possible.winner === symbol
            ) {

                return index;

            }

        }


        return null;

    }


    function aiMove() {

        if (gameOver) {
            return;
        }


        let move =
            findWinningMove("O");


        if (move === null) {
            move =
                findWinningMove("X");
        }


        if (
            move === null &&
            board[4] === ""
        ) {

            move = 4;

        }


        if (move === null) {

            const corners =
                [0, 2, 6, 8].filter(function (index) {

                    return board[index] === "";

                });


            if (corners.length) {

                move =
                    corners[
                        Math.floor(
                            Math.random() * corners.length
                        )
                    ];

            }

        }


        if (move === null) {

            const spaces =
                emptySpaces();


            if (spaces.length) {

                move =
                    spaces[
                        Math.floor(
                            Math.random() * spaces.length
                        )
                    ];

            }

        }


        if (move !== null) {

            board[move] = "O";

            renderBoard();


            const result =
                getResult();


            if (finishGame(result)) {
                return;
            }


            currentPlayer = "X";

            gameStatus.textContent =
                "Your turn — X";

        }

    }


    function makeMove(index) {

        if (
            gameOver ||
            board[index] !== ""
        ) {
            return;
        }


        board[index] =
            currentPlayer;

        renderBoard();


        const result =
            getResult();


        if (finishGame(result)) {
            return;
        }


        if (gameMode === "friend") {

            currentPlayer =
                currentPlayer === "X"
                    ? "O"
                    : "X";


            gameStatus.textContent =
                currentPlayer + "'s turn";

            return;

        }


        currentPlayer = "O";

        gameStatus.textContent =
            "AI is thinking...";


        setTimeout(aiMove, 400);

    }


    cells.forEach(function (cell) {

        cell.addEventListener("click", function () {

            const index =
                Number(
                    cell.getAttribute("data-cell")
                );

            makeMove(index);

        });

    });


    function resetGame() {

        board =
            ["", "", "", "", "", "", "", "", ""];

        currentPlayer = "X";
        gameOver = false;


        cells.forEach(function (cell) {

            cell.textContent = "";

            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.classList.remove("winner");

        });


        gameStatus.textContent =
            gameMode === "ai"
                ? "Your turn — X"
                : "X's turn";

    }


    if (aiMode) {

        aiMode.addEventListener("click", function () {

            gameMode = "ai";

            aiMode.classList.add("active");
            friendMode.classList.remove("active");

            resetGame();

        });

    }


    if (friendMode) {

        friendMode.addEventListener("click", function () {

            gameMode = "friend";

            friendMode.classList.add("active");
            aiMode.classList.remove("active");

            resetGame();

        });

    }


    if (restart) {
        restart.addEventListener("click", resetGame);
    }


    const characterLinks = {

        Doraemon:
            "https://www.youtube.com/results?search_query=Doraemon+episode",

        Shinchan:
            "https://www.youtube.com/results?search_query=Shinchan+episode",

        "Ninja Hattori":
            "https://www.youtube.com/results?search_query=Ninja+Hattori+episode"

    };


    const characterNote =
        document.getElementById("characterNote");


    document
        .querySelectorAll(".character")
        .forEach(function (character) {

            character.addEventListener(
                "click",
                function () {

                    const name =
                        character.getAttribute(
                            "data-character"
                        );


                    characterNote.textContent =
                        name +
                        " unlocked ✦ opening an episode...";


                    createHearts(6);


                    setTimeout(function () {

                        if (characterLinks[name]) {

                            window.open(
                                characterLinks[name],
                                "_blank"
                            );

                        }

                    }, 350);

                }
            );

        });


    const quotes = [

        {
            text: "She believed she could, so she stopped waiting for permission.",
            author: "Unknown",
            category: "CONFIDENCE"
        },

        {
            text: "You do not have to shrink yourself to make someone else comfortable.",
            author: "Unknown",
            category: "SELF LOVE"
        },

        {
            text: "Your dreams are allowed to be bigger than your fears.",
            author: "Unknown",
            category: "DREAMS"
        },

        {
            text: "Becoming yourself is the most beautiful adventure.",
            author: "Unknown",
            category: "COURAGE"
        },

        {
            text: "You are allowed to begin again as many times as you need.",
            author: "Unknown",
            category: "BEGIN AGAIN"
        }

    ];


    const quoteText =
        document.getElementById("quoteText");

    const quoteAuthor =
        document.getElementById("quoteAuthor");

    const quoteCategory =
        document.getElementById("quoteCategory");

    const newQuote =
        document.getElementById("newQuote");


    function showQuote(quote) {

        quoteText.style.opacity = "0";


        setTimeout(function () {

            quoteText.textContent =
                quote.text;

            quoteAuthor.textContent =
                quote.author;

            quoteCategory.textContent =
                quote.category;

            quoteText.style.opacity =
                "1";

        }, 180);

    }


    if (newQuote) {

        newQuote.addEventListener("click", function () {

            const random =
                quotes[
                    Math.floor(
                        Math.random() * quotes.length
                    )
                ];

            showQuote(random);

        });

    }


    document
        .querySelectorAll(".principle")
        .forEach(function (principle) {

            principle.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".principle")
                        .forEach(function (item) {

                            item.classList.remove("active");

                        });


                    principle.classList.add("active");


                    const category =
                        principle
                            .querySelector("small")
                            .textContent
                            .trim();


                    const matching =
                        quotes.find(function (quote) {

                            return quote.category === category;

                        });


                    if (matching) {
                        showQuote(matching);
                    }

                }
            );

        });


    const lightForm =
        document.getElementById("lightForm");

    const lightNote =
        document.getElementById("lightNote");

    const lightName =
        document.getElementById("lightName");

    const lightWords =
        document.getElementById("lightWords");

    const savedWords =
        document.getElementById("savedWords");

    const savedName =
        document.getElementById("savedName");


    if (lightForm) {

        lightForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    lightName.value.trim();

                const words =
                    lightWords.value.trim();


                if (!name) {

                    lightName.focus();

                    return;

                }


                if (!words) {

                    lightWords.focus();

                    return;

                }


                savedWords.textContent =
                    words;

                savedName.textContent =
                    "— " + name;


                lightNote.classList.add(
                    "visible"
                );


                createHearts(18);


                setTimeout(function () {

                    lightNote.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 250);


                lightName.value = "";
                lightWords.value = "";

            }
        );

    }


    /*
     * CHECKLIST
     */

    const checkItems =
        document.querySelectorAll("[data-check]");

    const dayScore =
        document.getElementById("dayScore");

    const scoreText =
        document.getElementById("scoreText");


    const scoreMessages = [

        "perfect day loading...",

        "you're doing beautifully ♡",

        "look at you go ✦",

        "keep choosing little joys",

        "almost there ♡",

        "one more little thing",

        "you made your perfect day ✦"

    ];


    function updateChecklist() {

        let completed = 0;


        checkItems.forEach(function (item) {

            if (
                item.classList.contains("done")
            ) {

                completed++;

            }

        });


        dayScore.textContent =
            completed +
            " / " +
            checkItems.length;


        scoreText.textContent =
            scoreMessages[completed];


        if (
            completed === checkItems.length
        ) {

            scoreText.textContent =
                "perfect day complete ♡";

        }

    }


    checkItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const alreadyDone =
                    item.classList.contains("done");


                item.classList.toggle(
                    "done"
                );


                updateChecklist();


                if (!alreadyDone) {

                    createHearts(5);

                }

            }
        );

    });


    updateChecklist();


    const gift =
        document.getElementById("gift");


    if (gift) {

        gift.addEventListener(
            "click",
            function () {

                if (
                    !gift.classList.contains("open")
                ) {

                    gift.classList.add("open");

                    createHearts(40);

                } else {

                    gift.classList.remove("open");

                }

            }
        );

    }


    const startAgain =
        document.getElementById("startAgain");


    if (startAgain) {

        startAgain.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    function createHearts(amount) {

        const container =
            document.getElementById("flyingHearts");


        if (!container) {
            return;
        }


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const heart =
                document.createElement("span");


            heart.className =
                "heart-float";


            heart.textContent =
                Math.random() > .25
                    ? "♥"
                    : "♡";


            heart.style.left =
                Math.random() * 100 + "%";


            heart.style.fontSize =
                13 +
                Math.random() * 25 +
                "px";


            heart.style.animationDuration =
                2.7 +
                Math.random() * 2 +
                "s";


            heart.style.animationDelay =
                Math.random() * .6 +
                "s";


            container.appendChild(
                heart
            );


            setTimeout(function () {

                heart.remove();

            }, 5000);

        }

    }

});
