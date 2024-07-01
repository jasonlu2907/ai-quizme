'use client';

import { useMemo, useState } from 'react';

import { AnswerBox } from '@/components/quiz/AnswerBox';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuizSubmission from '@/components/quiz/QuizSubmission';
import { SafeQuiz } from '@/types';

import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RxExit } from 'react-icons/rx';
import { cn } from '@/libs/utils';
interface QuizClientProps {
  quiz: SafeQuiz;
}

const QuizClient: React.FC<QuizClientProps> = ({ quiz }) => {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState(
    Array(quiz.questions.length).fill(null)
  ); // array of answers

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [review, setReview] = useState<boolean>(false);

  // reset the states
  const handleExit: any = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers(Array(quiz.questions.length).fill(null));
    setSelectedAnswer(null);
    setSubmitted(false);
    setReview(false);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((value) => value - 1);
    }
  };

  const handleNext = () => {
    // if haven't started yet
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (review) {
        handleExit();
        return;
      }
      setSubmitted(true);
      return;
    }

    setSelectedAnswer(null);
  };

  const scorePercentage = useMemo(() => {
    return Math.round((score / quiz.questions.length) * 100);
  }, [quiz.questions.length, score]);

  const handleAnswer = (answer: any) => {
    if (answers[currentQuestion] !== null) return; // prevent re-answer the question

    // select the answer and update the answer list
    setSelectedAnswer(answer.id);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer.id;
    setAnswers(newAnswers);

    if (answer.isCorrect) {
      setScore(score + 1);
    }
    // setIsCorrect(isCurrentCorrect);
  };

  const handleReview = (): void => {
    setReview(true);
    setCurrentQuestion(0);
  };

  if (submitted && !review) {
    // make sure to have && !review
    return (
      <div>
        <QuizSubmission
          score={score}
          scorePercentage={scorePercentage}
          totalQuestions={quiz.questions.length}
          onClick={handleReview}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col flex-1'>
      {started && (
        <div className='flex flex-row justify-center items-center gap-8 position-sticky top-0 z-10 shadow-md py-4 px-8 mb-5'>
          <button disabled={currentQuestion === 0} onClick={handleBack}>
            <MdOutlineKeyboardBackspace size={28} />
            Back
          </button>
          <ProgressBar
            value={(currentQuestion / quiz.questions.length) * 100}
          />
          <div className='hover:cursor-pointer' onClick={handleExit}>
            <RxExit size={28} />
            <button>Exit</button>
          </div>
        </div>
      )}

      {review && (
        <div className='block max-w-max font-light px-3 py-2 ml-12 border-2 rounded-sm border-slate-600 italic'>
          Reviewing...
        </div>
      )}

      <main className='flex justify-center flex-1 mt-4'>
        {!started ? (
          <div>
            <h1 className='text-3xl font-bold'>Your quiz is ready</h1>
            <h2 className='text-xl mt-2 font-serif'>
              {' '}
              <u>Title:</u> {quiz.title}
            </h2>
            <div className='text-lg font-serif'>{quiz.description}</div>
          </div>
        ) : (
          <div>
            {/* QUESTION */}
            <h2 className='text-3xl font-bold'>
              {quiz.questions[currentQuestion].questionText}
            </h2>

            {/* ANSWERS */}
            <div className='grid grid-cols-1 gap-6 mt-6'>
              {quiz.questions[currentQuestion].answers.map(
                (answer: {
                  id: string;
                  questionId: string;
                  answerText: string;
                  isCorrect: boolean;
                }) => {
                  const variant =
                    answers[currentQuestion] === answer.id
                      ? answer.isCorrect
                        ? 'neoSuccess'
                        : 'neoDanger'
                      : 'neoOutline';
                  return (
                    <AnswerBox
                      key={answer.id}
                      variant={variant}
                      size='xl'
                      onClick={() => handleAnswer(answer)}
                    >
                      <p className='whitespace-normal'>{answer.answerText}</p>
                    </AnswerBox>
                  );
                }
              )}
            </div>

            {/* IF WRONG ANSWER */}
            {review && (
              <div
                className={cn(
                  'border-green-500',
                  'border-2',
                  'rounded-lg',
                  'p-4',
                  'text-center',
                  'text-lg',
                  'font-semibold',
                  'mt-14',
                  'bg-secondary'
                )}
              >
                The right answer is:{' '}
                {quiz.questions[currentQuestion].answers.find(
                  (answer) => answer.isCorrect
                )?.answerText || ''}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className='footer mt-10 pb-9 px-6 relative mb-0'>
        <div className='mx-auto w-40'>
          <AnswerBox
            variant='neo'
            size='lg'
            onClick={handleNext}
            disabled={!answers[currentQuestion] && started}
          >
            {!started
              ? 'Start'
              : currentQuestion === quiz.questions.length - 1
              ? review
                ? 'Close the review!'
                : 'Submit'
              : 'Next'}
          </AnswerBox>
        </div>
      </footer>
    </div>
  );
};

export default QuizClient;
