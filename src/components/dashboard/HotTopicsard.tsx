import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card/card';
// import WordCloud from '../WordCloud';
import prisma from '@/libs/prismadb';

type Props = {};

const HotTopicsCard = async (props: Props) => {
  //TODO:
  // const topics = await prisma.topic_count.findMany({});
  // const formattedTopics = topics.map((topic) => {
  //   return {
  //     text: topic.topic,
  //     value: topic.count,
  //   };
  // });

  return (
    <Card className='col-span-4 hover:cursor-pointer hover:opacity-75'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
        <CardDescription>
          Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className='pl-2'>
        {/* <WordCloud formattedTopics='A TOPIC' /> */}
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;
