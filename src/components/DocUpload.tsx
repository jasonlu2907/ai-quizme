'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnswerBox } from './quiz/AnswerBox';

const DocUpload = () => {
  const [document, setDocument] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError('Please upload the document first');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('pdf', document as Blob);
    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        body: formData,
      });

      if (res.status === 200) {
        const data = await res.json();
        // console.log('Data: ', data);

        const quizId = data.id;
        router.push(`/quizzes/${quizId}`);
        setIsLoading(false);
      }
    } catch (e) {
      console.log('error while generating the quiz', e);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError('');
    }
  };

  return (
    <div className='w-full md:w-1/2'>
      {isLoading ? (
        // <p>Loading...</p>
        <div className='loader mx-auto'></div>
      ) : (
        <form
          className='w-full flex flex-col gap-5 justify-center items-center'
          onSubmit={handleSubmit}
        >
          <label
            htmlFor='document'
            className='w-full flex h-20 hover:opacity-70 rounded-md border-4 border-dashed border-blue-900 relative'
          >
            <div className='absolute inset-0 m-auto flex justify-center items-center text-base font-bold'>
              {document && document?.name ? document.name : 'Drag a file'}
            </div>
            <input
              type='file'
              id='document'
              className='relative block w-full h-full z-50 opacity-0 hover:cursor-pointer'
              onChange={handleDocumentUpload}
            />
          </label>
          <p className='font-light italic my-2 '>
            Supported file types:{' '}
            <b>
              <u>pdf</u>
            </b>
          </p>
          {error ? <p className='text-red-600'>{error}</p> : null}
          <AnswerBox
            size='lg'
            className='mt-2 font-bold border-4 hover:shadow-sm'
            type='submit'
          >
            Generate Quizz 🪄
          </AnswerBox>
        </form>
      )}
    </div>
  );
};

export default DocUpload;
