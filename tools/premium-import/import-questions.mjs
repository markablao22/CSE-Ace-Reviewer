import { readFile } from 'node:fs/promises';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node import-questions.mjs /path/to/premium-questions-v1.json');
  process.exit(2);
}

const questionRows = JSON.parse(await readFile(inputPath, 'utf8'));
if (!Array.isArray(questionRows) || questionRows.length !== 470) {
  throw new Error('Expected exactly 470 Premium questions.');
}
for (const [index, question] of questionRows.entries()) {
  if (!Array.isArray(question) || question.length !== 5 ||
      typeof question[0] !== 'string' || typeof question[1] !== 'string' ||
      !Array.isArray(question[2]) || question[2].length !== 4 ||
      !Number.isInteger(question[3]) || question[3] < 0 || question[3] > 3 ||
      typeof question[4] !== 'string') {
    throw new Error(`Invalid question record at index ${index}.`);
  }
}
// Firestore does not accept arrays nested directly inside arrays, so store
// each question as a map and preserve choices as that map's array field.
const questions = questionRows.map(([category, prompt, choices, answerIndex, explanation]) => ({
  category, prompt, choices, answerIndex, explanation
}));
const payload = {
  questionBankVersion: 500,
  questions,
  importedAt: FieldValue.serverTimestamp()
};
if (Buffer.byteLength(JSON.stringify({ questionBankVersion: 500, questions })) > 900_000) {
  throw new Error('Question bank is too large for one Firestore document.');
}

initializeApp({
  credential: applicationDefault(),
  projectId: 'cse-ace-reviewer'
});
await getFirestore().doc('premiumQuestionBanks/v1').set(payload);
console.log('Imported 470 Premium questions into premiumQuestionBanks/v1.');
