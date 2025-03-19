document.addEventListener("DOMContentLoaded", () => {
  let currentQuestionIndex =
    parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
  let timeLeft = parseInt(localStorage.getItem("timeLeft")) || 200;
  const questions = document.querySelectorAll(".questions");
  const prevButton = document.querySelector(
    ".pre-next-container button:first-child"
  );
  const nextButton = document.querySelector(
    ".pre-next-container button:last-child"
  );
  const submitButton = document.querySelector(".button-container button");
  const modal = document.getElementById("customModal");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");
  let timerInterval;

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      localStorage.setItem("timeLeft", timeLeft);
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById(
        "timer"
      ).textContent = `Time left: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }

  function showQuestion(index) {
    questions.forEach((q, i) => {
      q.style.display = i === index ? "block" : "none";
    });
    prevButton.style.display = index === 0 ? "none" : "inline-block";
    nextButton.style.display =
      index === questions.length - 1 ? "none" : "inline-block";
    submitButton.style.display =
      index === questions.length - 1 ? "inline-block" : "none";
    // checkSelection();
  }

  // function checkSelection() {
  //   const selected =
  //     questions[currentQuestionIndex].querySelector("input:checked");
  //   nextButton.disabled = !selected;
   
  // }

  function saveProgress() {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  }

  function saveAnswers() {
    const answers = {};
    document
      .querySelectorAll("input[type='radio']:checked")
      .forEach((input) => {
        answers[input.name] = input.value;
      });
    localStorage.setItem("selectedAnswers", JSON.stringify(answers));
  }

  function restoreAnswers() {
    const savedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));
    if (savedAnswers) {
      for (let key in savedAnswers) {
        const radioButton = document.querySelector(
          `input[name="${key}"][value="${savedAnswers[key]}"]`
        );
        if (radioButton) {
          radioButton.checked = true;
        }
      }
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      saveProgress();
      showQuestion(currentQuestionIndex);
    }
  });

  // nextButton.addEventListener("click", () => {
  //   if (currentQuestionIndex < questions.length - 1) {
  //     currentQuestionIndex++;
  //     saveProgress();
  //     showQuestion(currentQuestionIndex);
  //   }
  // });


nextButton.addEventListener("click", () => {
  const selected =
    questions[currentQuestionIndex].querySelector("input:checked");
  if (!selected) {
    alert("Please select an answer before proceeding.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    saveProgress();
    showQuestion(currentQuestionIndex);
  }
});



  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
    
  });

  confirmYes.addEventListener("click", () => {
    modal.style.display = "none";
    submitQuiz();
  });

  confirmNo.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function submitQuiz() {
    let score = 0;
    let answers = {
      q1: "John the Baptist",
      q2: "5",
      q3: "Peter",
      q4: "Matthew",
      q5: "Paul",
      q6: "Tax collector",
      q7: "Stephen",
      q8: "Wine",
      q9: "Pilate",
      q10: "Revelation",
    };

    let formData = new FormData(document.getElementById("quizForm"));
    for (let key in answers) {
      if (formData.get(key) === answers[key]) {
        score++;
      }
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      console.error("User data not found in sessionStorage");
      return;
    }

    const payload = {
      records: [
        {
          fields: {
            Name: user.name,
            ExamNumber: user.examNumber,
            Region: user.region,
            PhoneNumber: user.phone,
            Score: score,
          },
        },
      ],
    };
    console.log("Sending data to Airtable:", JSON.stringify(payload, null, 2));

    fetch("https://api.airtable.com/v0/appqjeKHmQT1mDZZq/QuizScores", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer patV5Wjs0eJYiMKKL.656f2ef17d3aada133c85e73e69e3d0c11166910c018cce1d64b3e23453e79be",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Airtable response:", data);
        alert("Quiz submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // let resultDiv = document.getElementById("result");
    // resultDiv.innerHTML = `<h3>Your score is: ${score}/10</h3>`;

    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = true));

    prevButton.disabled = true;
    nextButton.disabled = true;
    submitButton.disabled = true;

    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("selectedAnswers");
  }

  document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      // checkSelection();
      saveProgress();
      saveAnswers();
    });
  });

  startTimer();
  showQuestion(currentQuestionIndex);
  restoreAnswers();
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});
