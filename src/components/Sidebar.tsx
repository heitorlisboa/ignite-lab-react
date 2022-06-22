import { gql, useQuery } from '@apollo/client';

import type { LessonType } from '@/enums/LessonType';

import { Lesson } from './Lesson';

type GetLessonsQueryResponse = {
  lessons: {
    id: string;
    title: string;
    slug: string;
    lessonType: keyof typeof LessonType;
    availableAt: string;
  }[];
};

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      slug
      lessonType
      availableAt
    }
  }
`;

export function Sidebar() {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);

  return (
    <aside className="bg-gray-700 w-[21.75rem] p-6 border-l border-gray-500">
      <span className="font-bold text-2xl block pb-6 mb-6 border-b border-b-gray-500">
        Cronograma de aulas
      </span>

      <ul className="flex flex-col gap-8">
        {data?.lessons.map(({ id, title, slug, lessonType, availableAt }) => (
          <Lesson
            key={id}
            title={title}
            slug={slug}
            type={lessonType}
            availableAt={new Date(availableAt)}
          />
        ))}
      </ul>
    </aside>
  );
}
