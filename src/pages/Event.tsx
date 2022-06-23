import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import { Header } from '@/components/Header';
import { Video } from '@/components/Video';
import { Sidebar } from '@/components/Sidebar';

const GET_FIRST_LESSON_QUERY = gql`
  query GetFirstLesson {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED, first: 1) {
      slug
    }
  }
`;

type GetFirstLessonQueryResponse = {
  lessons: {
    slug: string;
  }[];
};

type Params = {
  slug: string;
};

export function Event() {
  const { slug } = useParams<Params>();
  const navigateFunction = useNavigate();
  const [getFirstLesson] = useLazyQuery<GetFirstLessonQueryResponse>(
    GET_FIRST_LESSON_QUERY
  );

  useEffect(() => {
    if (!slug) {
      getFirstLesson().then(({ data }) => {
        if (data) {
          const firstLessonSlug = data.lessons[0].slug;
          navigateFunction(`/event/lesson/${firstLessonSlug}`, {
            replace: true,
          });
        }
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  );
}
