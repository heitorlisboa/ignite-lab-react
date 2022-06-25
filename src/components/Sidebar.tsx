import { Lesson } from '@/components/Lesson';

import type { GetLessonsQuery } from '@/graphql/generated';

type SidebarProps = {
  lessons: GetLessonsQuery['lessons'];
};

export function Sidebar({ lessons }: SidebarProps) {
  return (
    <aside className="bg-gray-700 w-[21.75rem] p-6 border-l border-gray-500">
      <span className="font-bold text-2xl block pb-6 mb-6 border-b border-b-gray-500">
        Cronograma de aulas
      </span>

      <ul className="flex flex-col gap-8">
        {lessons.map(({ id, title, slug, lessonType, availableAt }) => (
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
