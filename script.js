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
   // ── Show a screen by id ──
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

   // ── Update heart icons in HUD ──
  function updateHeartsDisplay() {
    for (let i = 1; i <= MAX_LIVES; i++) {
      document.getElementById(`h${i}`).classList.toggle('lost', i > state.lives);
    }
  }

   // ── Deduct a life and trigger shake animation ──
  function loseLife() {
    state.lives--;
    updateHeartsDisplay();
    let livesCard = document.getElementById('hud-lives').parentElement;
    livesCard.classList.remove('shake');
    void livesCard.offsetWidth; // force reflow to restart animation
    livesCard.classList.add('shake');
  }

   // ── Render the current question ──
  function renderQuestion() {
    let q = state.questions[state.qIndex];
    let parts = q.display.split('?');
    let eq = document.getElementById('equation');
    eq.innerHTML = '';

    // Build equation with input field in place of '?'
    parts.forEach((part, i) => {
      if (part.trim()) {
        let span = document.createElement('span');
        span.textContent = part.trim();
        eq.appendChild(span);
      }
      if (i < parts.length - 1) {
        let inp = document.createElement('input');
        inp.type = 'number';
        inp.className = 'blank-input';
        inp.id = 'answer-input';
        inp.placeholder = '?';
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
        eq.appendChild(inp);
      }
    });

     // Update HUD elements
    document.getElementById('hud-q').textContent = `${state.qIndex + 1}/5`;
    document.getElementById('progress-bar').style.width =
      `${(state.qIndex / QUESTIONS_PER_LEVEL) * 100}%`;
    document.getElementById('level-badge').textContent =
      state.level === 1 ? 'LEVEL 1 — ADD & SUBTRACT' : 'LEVEL 2 — MULTIPLY & DIVIDE';

    // Reset feedback
    let fb = document.getElementById('feedback');
    fb.textContent = '';
    fb.className = 'feedback';

    state.answered = false;

    // Auto-focus the input
    setTimeout(() => {
      let inp = document.getElementById('answer-input');
      if (inp) inp.focus();
    }, 50);
  }