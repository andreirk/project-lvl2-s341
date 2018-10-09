import readlineSync from 'readline-sync';

const numberOfStepsInTheGame = 3;

export default (game) => {
  console.log('Welcome to the Brain Games!');
  const mainGameQuestion = game.getMainQuestionText();
  console.log(mainGameQuestion);
  const userName = askName();
  for (let i = 0; i < numberOfStepsInTheGame; i += 1) {
    const { questionText,  correctAnswer } = game.getNextQuestionInfo();
    const userAnswer = readlineSync.question(questionText);
    console.log(`You answer: ${userAnswer}`);
    if (userAnswer === correctAnswer) {
      console.log('Correct!');
    } else {
      console.log(`${userAnswer} is wrong answer ;(. Correct answer was ${correctAnswer}`);
      console.log(`Let's try again, ${userName}!`);
      return;
    }
  }
  console.log(`Congratulations, ${userName}!`);
};

