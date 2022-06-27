import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import classNames from 'classnames';

import { LessonType } from '@/enums/LessonType';

type LessonProps = {
  title: string;
  slug: string;
  type: keyof typeof LessonType;
  availableAt: Date;
};

export function Lesson({ title, slug, type, availableAt }: LessonProps) {
  const {
    query: { slug: currentPageSlug },
  } = useRouter();
  const isActiveLesson = currentPageSlug === slug;

  const isLessonAvailable = isPast(availableAt);
  const formattedAvailableDate = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBr }
  );
  const capitalizedAvailableDate =
    formattedAvailableDate.charAt(0).toUpperCase() +
    formattedAvailableDate.slice(1);

  return (
    <li>
      <time
        className="text-gray-300 block mb-3"
        dateTime={availableAt.toISOString()}
      >
        {capitalizedAvailableDate}
      </time>
      <Link href={`/event/lesson/${slug}`} passHref>
        <a
          className={classNames('block p-4 border rounded', {
            'bg-green-500 border-green-500 active-lesson-arrow':
              isActiveLesson && isLessonAvailable,
            'bg-orange-500 border-orange-500 active-lesson-arrow lesson-arrow-orange':
              isActiveLesson && !isLessonAvailable,
            'border-gray-500 hover:border-green-500': !isActiveLesson,
          })}
        >
          <header className="flex items-center justify-between mb-4">
            {isLessonAvailable ? (
              <span
                className={classNames(
                  'text-sm font-medium flex gap-2 items-center',
                  {
                    'text-white': isActiveLesson,
                    'text-blue-500': !isActiveLesson,
                  }
                )}
              >
                <CheckCircle size={20} />
                Conteúdo liberado
              </span>
            ) : (
              <span
                className={classNames(
                  'text-sm font-medium flex gap-2 items-center',
                  {
                    'text-white': isActiveLesson,
                    'text-orange-500': !isActiveLesson,
                  }
                )}
              >
                <Lock size={20} />
                Em breve
              </span>
            )}
            <span
              className={classNames(
                'text-white text-xs font-bold uppercase px-2 py-1 border rounded',
                {
                  'border-white': isActiveLesson,
                  'border-green-300': !isActiveLesson,
                }
              )}
            >
              {LessonType[type]}
            </span>
          </header>

          <strong
            className={classNames({
              'text-white': isActiveLesson,
              'text-gray-200': !isActiveLesson,
            })}
          >
            {title}
          </strong>
        </a>
      </Link>
    </li>
  );
}
