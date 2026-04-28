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