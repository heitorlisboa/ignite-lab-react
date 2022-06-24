import { LogoRocketseat } from '@/components/LogoRocketseat';

export function Footer() {
  return (
    <footer
      className="
        text-gray-300
        flex flex-col md:flex-row flex-wrap gap-6 items-center
        2xl:max-w-7xl
        py-6 mx-6 2xl:mx-auto border-t border-gray-500
      "
    >
      <a href="https://www.rocketseat.com.br" target="_blank" rel="noreferrer">
        <LogoRocketseat />
      </a>
      <span>Rocketseat - Todos os direitos reservados</span>
      <a className="md:ml-auto hover:text-gray-200 transition-colors" href="#">
        Políticas de privacidade
      </a>
    </footer>
  );
}
