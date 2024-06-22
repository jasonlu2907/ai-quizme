import { NextRequest, NextResponse } from 'next/server';

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';

import getCurrentUser from '@/app/actions/getCurrentUser';
import { saveQuiz, QuizOpenAI, deleteQuiz } from './saveQuiz';

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser(); // cannot generate a quiz if not signed in
  if (!currentUser) return NextResponse.error();

  const body = await req.formData();
  const document = body.get('pdf');

  if (!document) throw new Error('No document uploaded!');

  try {
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: ' ',
    });
    const docs = await pdfLoader.load(); //PDFLoader treats each page in a pdf as a "Document" obj

    const selectedDocuments = docs.filter(
      (doc) => doc.pageContent !== undefined
    );
    const texts = selectedDocuments.map((doc) => doc.pageContent);
    // console.log('Selected Texts:', texts); // the questions?

    const prompt =
      'given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quiz object with fields: title, description and questions. The questions is an array of 3 objects with fields: questionText, answers. The answers is an array of 3 objects with fields: answerText, isCorrect. There should be only one answer whose isCorrect property is true';

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not provided' },
        { status: 435 }
      );
    }

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-3.5-turbo',
      maxTokens: 500,
    });

    const parser = new JsonOutputFunctionsParser();
    const extractionFunctionSchema = {
      name: 'extractor',
      description: 'Extracts fields from the output',
      parameters: {
        type: 'object',
        properties: {
          quiz: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              questions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    questionText: { type: 'string' },
                    answers: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          answerText: { type: 'string' },
                          isCorrect: { type: 'boolean' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const runnable = model
      .bind({
        functions: [extractionFunctionSchema],
        function_call: { name: 'extractor' },
      })
      .pipe(parser);

    const message = new HumanMessage({
      content: [
        {
          type: 'text',
          text: prompt + '\n' + texts.join('\n'),
        },
      ],
    });

    const result = (await runnable.invoke([message])) as QuizOpenAI;
    console.log('Result NORMAL: ', result);
    // console.log('Result in String: ', JSON.stringify(result, null, 2));

    const newQuiz = await saveQuiz({ ...result.quiz, userId: currentUser.id });
    // const newQuiz = await deleteQuiz();
    // return NextResponse.json({ msg: 'Success' }, { status: 200 });
    return NextResponse.json({ newQuiz }, { status: 200 });
  } catch (e: any) {
    console.log(e);
    return NextResponse.error();
  }
}
