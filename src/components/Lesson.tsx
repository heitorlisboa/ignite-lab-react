import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { LessonType } from '@/enums/LessonType';

type LessonProps = {
  title: string;
  slug: string;
  type: keyof typeof LessonType;
  availableAt: Date;
};

export function Lesson({ title, slug, type, availableAt }: LessonProps) {
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
      <a className="block p-4 border border-gray-500 rounded" href={slug}>
        <header className="flex items-center justify-between mb-4">
          {isLessonAvailable ? (
            <span className="text-blue-500 text-sm font-medium flex gap-2 items-center">
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
            className="
              text-xs font-bold uppercase
              px-2 py-1
              border border-green-300 rounded
            "
          >
            {LessonType[type]}
          </span>
        </header>
        <strong>{title}</strong>
      </a>
    </li>
  );
}
