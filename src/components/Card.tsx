import type { PropsWithChildren } from 'react';
import { CaretRight, type Icon } from 'phosphor-react';

type CardProps = PropsWithChildren<{
  title: string;
  Icon: Icon;
  href: string;
}>;

export function Card({ children, title, Icon, href }: CardProps) {
  return (
    <a
      className="
        bg-gray-700 hover:bg-gray-600
        flex max-w-xl
        rounded overflow-hidden transition-colors
      "
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="bg-green-700 flex items-center justify-center px-5 sm:px-8 py-12">
        <Icon size={40} />
      </div>
      <div className="leading-relaxed p-4 pr-1 xs:pr-4 sm:p-6 my-auto">
        <strong className="text-lg sm:text-2xl font-bold block mb-2">
          {title}
        </strong>
        <p className="text-gray-200 text-xs sm:text-sm">{children}</p>
      </div>
      <div className="flex items-center justify-center p-4 pl-0 sm:p-6 ml-auto">
        <CaretRight className="text-blue-500" size={24} />
      </div>
    </a>
  );
}
