import { gql, useQuery } from '@apollo/client';
import { DefaultUi, Player, Youtube } from '@vime/react';
import { DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react';

import '@vime/core/themes/default.css';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        name
        avatarURL
        bio
      }
    }
  }
`;

type GetLessonBySlugQueryResponse = {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      name: string;
      avatarURL: string;
      bio: string;
    };
  };
};

type VideoProps = {
  lessonSlug: string;
};

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugQueryResponse>(
    GET_LESSON_BY_SLUG_QUERY,
    {
      variables: {
        slug: lessonSlug,
      },
    }
  );

  if (!data) {
    return (
      <div className="flex-1">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!data.lesson) {
    return (
      <div className="flex-1">
        <p>Aula não encontrada</p>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[68.75rem] mx-auto">
      <div className="bg-black">
        <div className="bg-gray-500 w-full h-full max-h-[60vh] mx-auto aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 mx-auto mb-12">
        <div className="flex gap-16 items-start mb-20">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{data.lesson.title}</h1>
            <p className="text-gray-200 leading-relaxed mb-6">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4">
              <img
                className="w-16 h-16 border-2 border-blue-500 rounded-full"
                src={data.lesson.teacher.avatarURL}
                alt="Foto do professor"
              />

              <div className="leading-relaxed">
                <strong className="text-2xl font-bold">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button as="a" variant="filled" href="#">
              <DiscordLogo size={24} />
              <span>Comunidade no discord</span>
            </Button>
            <Button as="a" variant="outlined" href="#">
              <Lightning size={24} />
              <span>Acesse o desafio</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-2">
          <Card title="Material complementar" Icon={FileArrowDown} href="#">
            Acesse o material complementar para acelerar o seu desenvolvimento
          </Card>
          <Card title="Wallpapers exclusivos" Icon={Image} href="#">
            Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
            máquina
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
