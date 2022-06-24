import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { LogoIgniteLab } from '@/components/LogoIgniteLab';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

const PUBLISH_SUBSCRIBER_MUTATION = gql`
  mutation PublishSubscriber($email: String!) {
    publishSubscriber(where: { email: $email }) {
      id
    }
  }
`;

type FormFields = {
  name: string;
  email: string;
};

export function Subscribe() {
  const { register, handleSubmit } = useForm<FormFields>();

  const [createSubscriber, { loading: createSubLoading }] = useMutation(
    CREATE_SUBSCRIBER_MUTATION
  );
  const [publishSubscriber, { loading: publishSubLoading }] = useMutation(
    PUBLISH_SUBSCRIBER_MUTATION
  );
  const loading = createSubLoading || publishSubLoading;

  const navigate = useNavigate();

  async function handleSubscribe({ name, email }: FormFields) {
    await createSubscriber({ variables: { name, email } });
    await publishSubscriber({ variables: { email } });

    navigate('/event');
  }

  return (
    <>
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
            <LogoIgniteLab className="max-h-7 mb-8" />
            <h1 className="text-[2.5rem] leading-tight mb-6">
              Construa uma{' '}
              <strong className="text-blue-500 font-medium">
                aplicação completa
              </strong>
              , do zero, com{' '}
              <strong className="text-blue-500 font-medium">React</strong>
            </h1>
            <p className="text-gray-200 leading-relaxed">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </p>
          </div>

          <div className="bg-gray-700 w-full sm:w-auto sm:min-w-[30rem] xl:min-w-[24.5rem] p-8 border border-gray-500 rounded">
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

        <img
          className="mt-auto"
          src="/src/assets/code-mockup-desktop.png"
          alt=""
        />
      </main>

      <Footer />
    </>
  );
}
