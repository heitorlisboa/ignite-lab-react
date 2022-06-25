import { DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';

import type { GetLessonBySlugQuery } from '@/graphql/generated';

type VideoProps = {
  lesson: NonNullable<GetLessonBySlugQuery['lesson']>;
};

export function Video({ lesson }: VideoProps) {
  return (
    <div className="flex-1 max-w-[68.75rem] mx-auto">
      <div className="bg-black">
        <iframe
          className="w-full h-full max-h-[60vh] aspect-video"
          src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}`}
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="p-8 mx-auto mb-12">
        <div className="flex gap-16 items-start mb-20">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-gray-200 leading-relaxed mb-6">
              {lesson.description}
            </p>

            {lesson.teacher && (
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 border-2 border-blue-500 rounded-full"
                  src={lesson.teacher.avatarURL}
                  alt="Foto do professor"
                />

                <div className="leading-relaxed">
                  <strong className="text-2xl font-bold">
                    {lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {lesson.teacher.bio}
                  </span>
                </div>
              </div>
            )}
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
