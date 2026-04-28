// ── Configuration ──
const QUESTIONS_PER_LEVEL = 5;
const MAX_LIVES = 3;

// ── Game state ──
let state = {
    level : 1,
    score: 0,
    qIndex: 0,
    lives: MAX_LIVES,
    questions: [],
    answered: false
};

  // ── Utility: random integer between min and max (inclusive) ──
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // ── Generate Level 1 questions (addition & subtraction) ──
  function generateLevel1Questions() {
    let questions = [];
    for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
      let type = randInt(0, 1);
      if (type === 0) {
        let a = randInt(2, 15), b = randInt(2, 15);
        let answer = a + b;
        let pos = randInt(0, 2);
        if (pos === 0) questions.push({ display: `? + ${b} = ${answer}`, answer: a });
        else if (pos === 1) questions.push({ display: `${a} + ? = ${answer}`, answer: b });
        else questions.push({ display: `${a} + ${b} = ?`, answer: answer });
      } else {
        let a = randInt(5, 20), b = randInt(1, a - 1);
        let answer = a - b;
        let pos = randInt(0, 1);
        if (pos === 0) questions.push({ display: `${a} - ? = ${answer}`, answer: b });
        else questions.push({ display: `${a} - ${b} = ?`, answer: answer });
      }
    }
    return questions;
  }

    // ── Generate Level 2 questions (multiplication & division) ──
  function generateLevel2Questions() {
    let questions = [];
    for (let i = 0; i < QUESTIONS_PER_LEVEL; i++) {
      let type = randInt(0, 1);
      if (type === 0) {
        let a = randInt(2, 9), b = randInt(2, 9);
        let answer = a * b;
        let pos = randInt(0, 2);
        if (pos === 0) questions.push({ display: `? × ${b} = ${answer}`, answer: a });
        else if (pos === 1) questions.push({ display: `${a} × ? = ${answer}`, answer: b });
        else questions.push({ display: `${a} × ${b} = ?`, answer: answer });
      } else {
        let b = randInt(2, 9), answer = randInt(2, 9);
        let a = b * answer;
        let pos = randInt(0, 1);
        if (pos === 0) questions.push({ display: `${a} ÷ ${b} = ?`, answer: answer });
        else questions.push({ display: `${a} ÷ ? = ${answer}`, answer: b });
      }
    }
    return questions;
  }
