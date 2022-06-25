import { useQuery } from '@apollo/client';

import { Lesson } from '@/components/Lesson';

import { GetLessonsDocument } from '@/graphql/generated';

export function Sidebar() {
  const { data } = useQuery(GetLessonsDocument);

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
            /* Temporarily using non-null assertion as GraphCMS is not working
            properly at the moment, so I can't change the schema to make this
            field required */
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            slug={slug!}
            type={lessonType}
            availableAt={new Date(availableAt)}
          />
        ))}
      </ul>
    </aside>
  );
}
