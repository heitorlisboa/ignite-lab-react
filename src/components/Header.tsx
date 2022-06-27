import { List, X } from 'phosphor-react';
import classNames from 'classnames';

import { LogoIgniteLab } from '@/components/LogoIgniteLab';

import { useMobileSidebar } from '@/contexts/mobile-sidebar-context';

type HeaderProps = {
  withSidebar?: boolean;
};

export function Header({ withSidebar = true }: HeaderProps) {
  const { isSidebarOpen, toggleMobileSidebar, sidebarId } = useMobileSidebar();
  const CurrentIcon = isSidebarOpen ? X : List;

  return (
    <header
      className={classNames(
        'bg-gray-700 flex items-center w-full',
        'px-6 py-3 lg:py-5 border-b border-b-gray-600',
        {
          'justify-between lg:justify-center': withSidebar,
          'justify-center': !withSidebar,
        }
      )}
    >
      <LogoIgniteLab className="max-h-6 lg:max-h-8" />

      {withSidebar && (
        <div className="flex gap-2 items-center lg:hidden">
          <span className="text-sm">Aulas</span>
          <button
            aria-controls={sidebarId}
            aria-expanded={isSidebarOpen}
            onClick={toggleMobileSidebar}
          >
            <CurrentIcon className="text-blue-500" size={32} />
          </button>
        </div>
      )}
    </header>
  );
}
