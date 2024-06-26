import getQuizById from '@/app/actions/getQuizById';
import EmptyState from '@/components/EmptyState';
import QuizClient from './QuizClient';
import { SafeQuiz } from '@/types';

interface QuizPageProps {
  quizId: string;
}

// const questions = [
//   {
//     questionText: 'What is React?',
//     answers: [
//       {
//         answerText: 'A library for building user interfaces',
//         isCorrect: true,
//         id: 1,
//       },
//       { answerText: 'A front-end framework', isCorrect: false, id: 2 },
//       { answerText: 'A back-end framework', isCorrect: false, id: 3 },
//       { answerText: 'A database', isCorrect: false, id: 4 },
//     ],
//   },
//   {
//     questionText: 'What is JSX?',
//     answers: [
//       { answerText: 'JavaScript XML', isCorrect: true, id: 1 },
//       { answerText: 'JavaScript', isCorrect: false, id: 2 },
//       { answerText: 'JavaScript and XML', isCorrect: false, id: 3 },
//       { answerText: 'JavaScript and HTML', isCorrect: false, id: 4 },
//     ],
//   },
//   {
//     questionText: 'What is the virtual DOM?',
//     answers: [
//       {
//         answerText: 'A virtual representation of the DOM',
//         isCorrect: true,
//         id: 1,
//       },
//       { answerText: 'A real DOM', isCorrect: false, id: 2 },
//       {
//         answerText: 'A virtual representation of the browser',
//         isCorrect: false,
//         id: 3,
//       },
//       {
//         answerText: 'A virtual representation of the server',
//         isCorrect: false,
//         id: 4,
//       },
//     ],
//   },
// ];

const QuizPage = async ({ params }: { params: QuizPageProps }) => {
  const quiz: SafeQuiz | null = await getQuizById(params);
  console.log(quiz ? 'good' : 'bad');

  if (!quiz)
    return (
      <EmptyState
        title='No quiz was found!'
        subtitle='Something wrong happened.'
      />
    );

  return <QuizClient quiz={quiz} />;
};

export default QuizPage;
