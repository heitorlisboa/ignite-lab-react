import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { format, isPast } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Header } from '@/components/Header';
import { Video } from '@/components/Video';
import { Sidebar } from '@/components/Sidebar';

import { MobileSidebarProvider } from '@/contexts/mobile-sidebar-context';
import { useResizeAnimationStopper } from '@/hooks/use-resize-animation-stopper';
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
  // Mobile sidebar stuff
  useResizeAnimationStopper();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleMobileSidebar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  // Next.js ISR fallback
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  // Checking if the lesson is available
  const availableAt = new Date(currentLesson.availableAt);
  const isCurrentLessonAvailable = isPast(availableAt);

  return (
    <MobileSidebarProvider
      value={{ isSidebarOpen, toggleMobileSidebar, sidebarId: 'sidebar' }}
    >
      <Head>
        <title>{currentLesson.title}</title>
      </Head>

      <div className="flex flex-col h-screen">
        <Header withSidebar={isCurrentLessonAvailable} />
        {isCurrentLessonAvailable ? (
          <main className="lg:grid lg:grid-cols-[1fr,23rem] overflow-hidden">
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
    </MobileSidebarProvider>
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
