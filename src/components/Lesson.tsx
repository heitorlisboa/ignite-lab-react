import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import classNames from 'classnames';

import { LessonType } from '@/enums/LessonType';

type Params = {
  slug: string;
};

type LessonProps = {
  title: string;
  slug: string;
  type: keyof typeof LessonType;
  availableAt: Date;
};

export function Lesson({ title, slug, type, availableAt }: LessonProps) {
  const { slug: currentPageSlug } = useParams<Params>();
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
      <Link
        className={classNames('block p-4 border rounded', {
          'bg-green-500 border-green-500 active-lesson-arrow': isActiveLesson,
          'border-gray-500 hover:border-green-500': !isActiveLesson,
        })}
        to={`/event/lesson/${slug}`}
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
            <span className="text-orange-500 text-sm font-medium flex gap-2 items-center">
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
      </Link>
    </li>
  );
}
