import Head from 'next/head';

import { Button } from '@/components/Button';

export default function Error404Page() {
  return (
    <>
      <Head>
        <title>Página não encontrada &ndash; Ignite Lab</title>
      </Head>

      <div className="bg-gray-700 flex flex-col gap-4 items-center justify-center min-h-screen p-8">
        <h1 className="text-green-300 text-6xl font-bold">Erro 404</h1>
        <p className="text-lg leading-relaxed text-center">
          Opa! Parece que a página que você está procurando não foi
          encontrada...
        </p>
        <Button as="a" variant="filled" href="/">
          Voltar à página incial
        </Button>
      </div>
    </>
  );
}
