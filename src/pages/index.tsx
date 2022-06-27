import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';

import { LogoIgniteLab } from '@/components/LogoIgniteLab';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

import {
  CreateSubscriberDocument,
  GetFirstLessonDocument,
  PublishSubscriberDocument,
} from '@/graphql/generated';

type FormFields = {
  name: string;
  email: string;
};

export default function SubscribePage() {
  const { register, handleSubmit } = useForm<FormFields>();

  const [createSubscriber, { loading: createSubLoading }] = useMutation(
    CreateSubscriberDocument
  );
  const [publishSubscriber, { loading: publishSubLoading }] = useMutation(
    PublishSubscriberDocument
  );
  const [getFirstLesson] = useLazyQuery(GetFirstLessonDocument);
  const loading = createSubLoading || publishSubLoading;

  const router = useRouter();

  async function handleSubscribe({ name, email }: FormFields) {
    await createSubscriber({ variables: { name, email } });
    await publishSubscriber({ variables: { email } });

    const { data } = await getFirstLesson();
    const firstLesson = data?.lessons[0];

    if (!firstLesson) {
      return alert(
        'Obrigado por fazer sua inscrição! Você será avisado no seu email quando a primeira aula for liberada.'
      );
    }

    router.push(`/event/lesson/${firstLesson.slug}`);
  }

  return (
    <>
      <Head>
        <title>Ignite Lab &ndash; React</title>
      </Head>

      <main
        className="
          bg-blur bg-center-top bg-cover bg-no-repeat
          grid justify-items-center
          min-h-screen
          !pb-0 sm:p-12 md:18 lg:p-20 xl:p-28
        "
      >
        <div
          className="
            flex flex-col gap-8 items-center justify-between xl:flex-row xl:gap-[12.5rem]
            max-w-[50rem] xl:max-w-[76rem]
          "
        >
          <div className="px-6 pt-10 sm:p-0">
            <LogoIgniteLab className="max-h-7 mb-6 mx-auto sm:mb-8 sm:mx-0" />
            <h1
              className="
                text-[clamp(2rem,2.5vw+1rem,2.5rem)] leading-tight
                text-center sm:text-left mb-6
              "
            >
              Construa uma{' '}
              <strong className="text-blue-500 font-medium">
                aplicação completa
              </strong>
              , do zero, com{' '}
              <strong className="text-blue-500 font-medium">React</strong>
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed text-center sm:text-base sm:text-left">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </p>
          </div>

          <div
            className="
              bg-gray-700
              w-full sm:w-auto sm:min-w-[30rem] xl:min-w-[24.5rem]
              p-8 border border-gray-500 rounded
            "
          >
            <strong className="text-2xl block mb-6">
              Inscreva-se gratuitamente
            </strong>

            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={handleSubmit(handleSubscribe)}
            >
              <label htmlFor="name" className="sr-only">
                Nome completo
              </label>
              <input
                id="name"
                className="bg-gray-900 p-5 rounded-md"
                type="text"
                placeholder="Seu nome completo"
                required
                {...register('name', { required: true })}
              />
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                className="bg-gray-900 p-5 rounded-md mb-4"
                type="email"
                placeholder="Digite seu e-mail"
                required
                {...register('email', { required: true })}
              />
              <Button
                as="button"
                variant="filled"
                buttonType="submit"
                buttonDisabled={loading}
              >
                Garantir minha vaga
              </Button>
            </form>
          </div>
        </div>

        <img className="mt-auto" src="/assets/code-mockup.png" alt="" />
      </main>

      <Footer />
    </>
  );
}
