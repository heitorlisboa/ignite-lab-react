import { LogoRocketseat } from '@/components/LogoRocketseat';

export function Footer() {
  return (
    <footer className="text-gray-300 flex gap-6 items-center py-8 mx-8 border-t border-gray-500">
      <a href="https://www.rocketseat.com.br" target="_blank" rel="noreferrer">
        <LogoRocketseat />
      </a>
      <span>Rocketseat - Todos os direitos reservados</span>
      <a className="ml-auto hover:text-gray-200 transition-colors" href="#">
        Políticas de privacidade
      </a>
    </footer>
  );
}
