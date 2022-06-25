import Head from 'next/head';
import { useRouter } from 'next/router';
import { format, isPast } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Header } from '@/components/Header';
import { Video } from '@/components/Video';
import { Sidebar } from '@/components/Sidebar';

import { client } from '@/lib/apollo';
import {
  GetLessonBySlugDocument,
  GetLessonsDocument,
  type GetLessonBySlugQuery,
  type GetLessonsQuery,
} from '@/graphql/generated';

type EventPageStaticProps = {
  currentLesson: NonNullable<GetLessonBySlugQuery['lesson']>;
  allLessons: GetLessonsQuery['lessons'];
};

export default function EventPage({
  currentLesson,
  allLessons,
}: EventPageStaticProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen />;
  }
  const availableAt = new Date(currentLesson.availableAt);
  const isCurrentLessonAvailable = isPast(availableAt);

  return (
    <>
      <Head>
        <title>{currentLesson.title}</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        {isCurrentLessonAvailable ? (
          <main className="flex flex-1">
            <Video lesson={currentLesson} />
            <Sidebar lessons={allLessons} />
          </main>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <strong className="text-2xl text-center p-8">
              Aula disponível a partir de{' '}
              <time dateTime={availableAt.toISOString()}>
                {format(availableAt, "d' de 'MMMM' às 'k'h'mm", {
                  locale: ptBr,
                })}
              </time>
            </strong>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { lessons },
  } = await client.query({ query: GetLessonsDocument });

  const paths = lessons.map((lesson) => ({
    params: {
      slug: lesson.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  Record<string, unknown>,
  { slug: string }
> = async ({ params }) => {
  if (!params) {
    return { notFound: true };
  }

  const {
    data: { lesson: currentLesson },
  } = await client.query({
    query: GetLessonBySlugDocument,
    variables: { slug: params.slug },
  });

  if (!currentLesson) {
    return { notFound: true };
  }

  const {
    data: { lessons: allLessons },
  } = await client.query({
    query: GetLessonsDocument,
  });

  return {
    props: {
      currentLesson,
      allLessons,
    },
    revalidate: 60 * 10, // 10 minutes
  };
};
