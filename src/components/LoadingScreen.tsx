import Head from 'next/head';
import { CircleNotch } from 'phosphor-react';

export function LoadingScreen() {
  return (
    <>
      <Head>
        <title>Carregando... &ndash; Ignite Lab</title>
      </Head>

      <div className="bg-gray-700 flex gap-2 items-center justify-center min-h-screen">
        <CircleNotch
          className="text-green-300 motion-safe:animate-spin"
          size={24}
        />
        <span className="text-2xl">Carregando...</span>
      </div>
    </>
  );
}
