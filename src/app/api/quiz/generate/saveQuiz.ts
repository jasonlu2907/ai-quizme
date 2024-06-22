import prisma from '@/libs/prismadb';

export interface DucCao {
  quiz: Quiz;
}
export interface Quiz {
  title: string;
  description: string;
  questions: Question[];
}
export interface Question {
  questionText: string;
  answers: Answer[];
}
export interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface saveQuizProps {
  title: string;
  description?: string;
  questions: Question[];
  userId: string;
}

export default async function saveQuiz(quizData: saveQuizProps) {
  const { title, description, questions, userId } = quizData;

  const newQuiz = await prisma.quiz.create({
    data: {
      title,
      description,
      questionCount: questions.length,
      userId: userId,
      questions: {
        create: questions.map((question) => ({
          questionText: question.questionText,
          // createdAt: question.createdAt || new Date(),
          answers: {
            create: question.answers.map((answer) => ({
              answerText: answer.answerText,
              isCorrect: answer.isCorrect,
              // createdAt: answer.createdAt || new Date(),
            })),
          },
        })),
      },
    },
  });

  return newQuiz;
}
