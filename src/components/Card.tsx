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
      className="bg-gray-700 hover:bg-gray-600 flex rounded overflow-hidden transition-colors"
      href={href}
    >
      <div className="bg-green-700 flex items-center justify-center px-8 py-12">
        <Icon size={40} />
      </div>
      <div className="leading-relaxed p-6 my-auto">
        <strong className="text-2xl font-bold block mb-2">{title}</strong>
        <p className="text-gray-200 text-sm">{children}</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <CaretRight className="text-blue-500" size={24} />
      </div>
    </a>
  );
}
