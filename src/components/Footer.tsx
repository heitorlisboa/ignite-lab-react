import classNames from 'classnames';

import { LogoRocketseat } from '@/components/LogoRocketseat';

type FooterProps = {
  classNames?: {
    footer?: string;
    rightAnchor?: string;
  };
};

export function Footer({ classNames: customClassNames }: FooterProps) {
  return (
    <footer
      className={classNames(
        'text-gray-300',
        'flex flex-col md:flex-row flex-wrap gap-6 items-center',
        '2xl:max-w-7xl',
        'py-6 mx-6 2xl:mx-auto border-t border-gray-500',
        customClassNames?.footer
      )}
    >
      <a href="https://www.rocketseat.com.br" target="_blank" rel="noreferrer">
        <LogoRocketseat />
      </a>
      <span className="text-center">
        Rocketseat - Todos os direitos reservados
      </span>
      <a
        className={classNames(
          'md:ml-auto hover:text-gray-200 transition-colors',
          customClassNames?.rightAnchor
        )}
        href="#"
      >
        Políticas de privacidade
      </a>
    </footer>
  );
}
