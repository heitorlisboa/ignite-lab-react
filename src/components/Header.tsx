import { LogoIgniteLab } from '@/components/LogoIgniteLab';

export function Header() {
  return (
    <header className="w-full py-5 flex justify-center bg-gray-700 border-b border-b-gray-600">
      <LogoIgniteLab className="max-h-8" />
    </header>
  );
}
