import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Header } from '@/components/Header';
import { Video } from '@/components/Video';
import { Sidebar } from '@/components/Sidebar';

import { GetFirstLessonDocument } from '@/graphql/generated';

type Params = {
  slug: string;
};

export function Event() {
  const { slug } = useParams<Params>();
  const navigate = useNavigate();
  const [getFirstLesson] = useLazyQuery(GetFirstLessonDocument);

  useEffect(() => {
    if (!slug) {
      getFirstLesson().then(({ data }) => {
        if (data) {
          const firstLessonSlug = data.lessons[0].slug;
          navigate(`/event/lesson/${firstLessonSlug}`);
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
