// src/utils/motivationalMessages.js

export default function motivationalMessages(field, score) {
  let message = "";

  if (score >= 50) {
    message = "Excellent! You’ve demonstrated strong understanding and potential.";
  } else if (score >= 35) {
    message = "Good work! You’re on the right path — keep sharpening your skills.";
  } else if (score >= 20) {
    message = "You’re learning steadily. Consistent practice will make you stronger.";
  } else {
    message = "Don’t be discouraged — every expert was once a beginner. Keep trying!";
  }

  const fieldSpecific = {
    "Web Development": "Build projects daily — hands-on coding is your best teacher.",
    "AI/ML": "Experiment with datasets — practical ML practice leads to breakthroughs.",
    "Data Science": "Master Python & visualization to transform data into insights.",
    "UI/UX": "Observe design patterns — great UX comes from empathy and iteration.",
  };

  return `${message} ${fieldSpecific[field] || "Keep exploring and growing!"}`;
}
