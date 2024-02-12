import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const initialQuestions = [
  {
    question: 'What is 1 + 2?',
    answers: ['3', '4', '5', '6'],
    correctAnswer: '3',
  },
  {
    question: 'What is 1 + 3?',
    answers: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  {
    question: 'What is 1 + 4?',
    answers: ['3', '4', '5', '6'],
    correctAnswer: '5',
  },
  {
    question: 'What is 1 + 5?',
    answers: ['3', '4', '5', '6'],
    correctAnswer: '6',
  },
  {
    question: 'What is 1 + 6?',
    answers: ['4', '5', '6', '7'],
    correctAnswer: '7',
  },
  {
    question: 'What is 1 + 7?',
    answers: ['7', '8', '9', '10'],
    correctAnswer: '8',
  },
  {
    question: 'What is 1 + 8?',
    answers: ['8', '9', '10', '11'],
    correctAnswer: '9',
  },
  {
    question: 'What is 1 + 9?',
    answers: ['9', '10', '11', '12'],
    correctAnswer: '10',
  },
  {
    question: 'What is 1 + 10?',
    answers: ['10', '11', '12', '13'],
    correctAnswer: '11',
  },
  {
    question: 'What is 1 + 11?',
    answers: ['11', '12', '13', '14'],
    correctAnswer: '12',
  },
  {
    question: 'What is 1 + 12?',
    answers: ['12', '13', '14', '15'],
    correctAnswer: '13',
  },
  {
    question: 'What is 1 + 13?',
    answers: ['13', '14', '15', '16'],
    correctAnswer: '14',
  },
  {
    question: 'What is 1 + 14?',
    answers: ['14', '15', '16', '17'],
    correctAnswer: '15',
  },
  {
    question: 'What is 1 + 15?',
    answers: ['15', '16', '17', '18'],
    correctAnswer: '16',
  },
  {
    question: 'What is 1 + 16?',
    answers: ['16', '17', '18', '19'],
    correctAnswer: '17',
  },
  {
    question: 'What is 1 + 17?',
    answers: ['17', '18', '19', '20'],
    correctAnswer: '18',
  },
  {
    question: 'What is 1 + 18?',
    answers: ['18', '19', '20', '21'],
    correctAnswer: '19',
  },
  {
    question: 'What is 1 + 19?',
    answers: ['19', '20', '21', '22'],
    correctAnswer: '20',
  },
  {
    question: 'What is 1 + 20?',
    answers: ['20', '21', '22', '23'],
    correctAnswer: '21',
  },
  {
    question: 'What is 1 + 21?',
    answers: ['21', '22', '23', '24'],
    correctAnswer: '22',
  },
  {
    question: 'What is 1 + 22?',
    answers: ['22', '23', '24', '25'],
    correctAnswer: '23',
  },
  {
    question: 'What is 1 + 23?',
    answers: ['23', '24', '25', '26'],
    correctAnswer: '24',
  },
  {
    question: 'What is 1 + 24?',
    answers: ['24', '25', '26', '27'],
    correctAnswer: '25',
  },
  {
    question: 'What is 1 + 25?',
    answers: ['25', '26', '27', '28'],
    correctAnswer: '26',
  },
  {
    question: 'What is 1 + 26?',
    answers: ['26', '27', '28', '29'],
    correctAnswer: '27',
  },
  {
    question: 'What is 1 + 27?',
    answers: ['27', '28', '29', '30'],
    correctAnswer: '28',
  },
  {
    question: 'What is 1 + 28?',
    answers: ['28', '29', '30', '31'],
    correctAnswer: '29',
  },
  {
    question: 'What is 1 + 29?',
    answers: ['29', '30', '31', '32'],
    correctAnswer: '30',
  },
  {
    question: 'What is 1 + 30?',
    answers: ['30', '31', '32', '33'],
    correctAnswer: '31',
  },
  {
    question: 'What is 1 + 31?',
    answers: ['31', '32', '33', '34'],
    correctAnswer: '32',
  },
  {
    question: 'What is 1 + 32?',
    answers: ['32', '33', '34', '35'],
    correctAnswer: '33',
  },
  {
    question: 'What is 1 + 33?',
    answers: ['33', '34', '35', '36'],
    correctAnswer: '34',
  },
];

let score = 0;
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionScreen: React.FC = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    setQuestions(shuffleArray(initialQuestions));
  }, []);

  useEffect(() => {
    setShuffledAnswers(shuffleArray(questions[currentQuestionIndex].answers));
  }, [currentQuestionIndex, questions]);

  const handleAnswer = (answer: string) => {
    if (currentQuestionIndex >= 20) {
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      score++;
    }
  };

  if (currentQuestionIndex >= 20) {
    return (
      <View>
        <Text>Congratulations! You've completed the quiz.</Text>
        {score > 0 && <Text>Your score is {score}.</Text>}
      </View>
    );
  }

  return (
    <View>
      <Text>Question {currentQuestionIndex + 1}/20</Text>
      <Text>{questions[currentQuestionIndex].question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <Button key={index} title={answer} onPress={() => handleAnswer(answer)} />
      ))}
    </View>
  );
};

export default QuestionScreen;