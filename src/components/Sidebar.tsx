import classNames from 'classnames';

import { Lesson } from '@/components/Lesson';

import { useMobileSidebar } from '@/contexts/mobile-sidebar-context';
import type { GetLessonsQuery } from '@/graphql/generated';

type SidebarProps = {
  lessons: GetLessonsQuery['lessons'];
};

export function Sidebar({ lessons }: SidebarProps) {
  const { isSidebarOpen, sidebarId } = useMobileSidebar();

  return (
    <aside
      id={sidebarId}
      className={classNames(
        'bg-gray-700 p-6 border-l border-gray-500 overflow-y-auto transition-transform',
        'fixed top-[calc(3.5rem+1px)] bottom-0 w-full lg:static lg:translate-x-0',
        { 'translate-x-full': !isSidebarOpen }
      )}
    >
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
