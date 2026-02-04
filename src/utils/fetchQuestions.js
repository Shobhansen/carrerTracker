// src/utils/fetchQuestions.js

/**
 * Fetch dynamic question sets based on student's chosen field.
 * Returns a promise resolving to an array of 60 shuffled questions.
 * Each question has: { _id, question, options, correct }
 */

import shuffleQuestions from "./shuffleQuestions";

const questionBank = {
  "Web Development": [
    {
      question: "Which of the following is NOT a backend language?",
      options: ["Python", "PHP", "HTML", "Node.js"],
      correct: "HTML",
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Strong Question List",
        "Sequential Query Logic",
        "Stylish Query Language",
      ],
      correct: "Structured Query Language",
    },
    {
      question: "Which HTML tag is used to include JavaScript?",
      options: ["<link>", "<js>", "<script>", "<javascript>"],
      correct: "<script>",
    },
    {
      question: "Which database is NoSQL?",
      options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      correct: "MongoDB",
    },
    {
      question: "Which backend framework uses Express by default?",
      options: ["Flask", "Spring Boot", "Node.js", "Laravel"],
      correct: "Node.js",
    },
  ],

  "Ai/Ml": [
    {
      question: "Which library is primarily used for deep learning?",
      options: ["NumPy", "TensorFlow", "Matplotlib", "Pandas"],
      correct: "TensorFlow",
    },
    {
      question: "What does supervised learning use?",
      options: ["Unlabeled data", "Labeled data", "Both", "None"],
      correct: "Labeled data",
    },
    {
      question: "Which algorithm is used for classification?",
      options: ["K-Means", "Linear Regression", "Decision Tree", "Apriori"],
      correct: "Decision Tree",
    },
    {
      question: "Which of the following is a dimensionality reduction technique?",
      options: ["PCA", "CNN", "RNN", "SVM"],
      correct: "PCA",
    },
    {
      question: "Which Python library is used for numerical operations?",
      options: ["Matplotlib", "NumPy", "Seaborn", "Pandas"],
      correct: "NumPy",
    },
  ],

  "Data Science": [
    {
      question: "Which library is used for data visualization in Python?",
      options: ["TensorFlow", "NumPy", "Matplotlib", "SciPy"],
      correct: "Matplotlib",
    },
    {
      question: "Which of these is a type of data?",
      options: ["Nominal", "Ordinal", "Continuous", "All of the above"],
      correct: "All of the above",
    },
    {
      question: "Which command displays first 5 rows of a DataFrame in Pandas?",
      options: ["df.tail()", "df.head()", "df.show()", "df.describe()"],
      correct: "df.head()",
    },
    {
      question: "Which file format is commonly used for storing tabular data?",
      options: [".json", ".csv", ".exe", ".png"],
      correct: ".csv",
    },
    {
      question: "Which metric is used to measure model accuracy?",
      options: ["Precision", "Recall", "F1-score", "All of the above"],
      correct: "All of the above",
    },
  ],

  "Ui/Ux": [
    {
      question: "Which principle ensures visual elements are arranged properly?",
      options: ["Alignment", "Repetition", "Contrast", "Balance"],
      correct: "Alignment",
    },
    {
      question: "What tool is commonly used for UI design?",
      options: ["Figma", "MySQL", "React", "TensorFlow"],
      correct: "Figma",
    },
    {
      question: "UX stands for?",
      options: [
        "Universal Experience",
        "User Exchange",
        "User Experience",
        "Usage Example",
      ],
      correct: "User Experience",
    },
    {
      question: "What does wireframing mean in UI design?",
      options: [
        "Drawing 3D structures",
        "Creating a layout blueprint",
        "Coding interface",
        "Testing UX flow",
      ],
      correct: "Creating a layout blueprint",
    },
    {
      question: "Which color model is used for digital design?",
      options: ["CMYK", "RGB", "LAB", "HEX"],
      correct: "RGB",
    },
  ],
};

/**
 * Simulates async API call (returns 60 randomized questions per field)
 */
export default function fetchQuestions(field) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Normalize field key (capitalize properly)
      const formattedField = field
        ?.trim()
        .toLowerCase()
        .replace(/[-_]/g, " ")  // converts data-science → data science
        .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize each word

      const baseQuestions = questionBank[formattedField] || [];
      if (baseQuestions.length === 0) {
        console.warn("⚠️ No questions found for field:", formattedField);
      }

      const multiplied = Array(12)
        .fill(baseQuestions)
        .flat()
        .map((q, i) => ({ ...q, _id: `${formattedField}_${i}` }));

      resolve(shuffleQuestions(multiplied).slice(0, 60));
    }, 500);
  });
}

