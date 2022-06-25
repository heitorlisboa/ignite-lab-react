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
        <div className="bg-gray-500 w-full h-full max-h-[60vh] mx-auto aspect-video">
          {/* The vime player does not out of the box with Next.js, but I'm also
          having other issues with it, so I'll replace it with another video
          player library */}
          {/* <Player>
            <Youtube videoId={lesson.videoId} />
            <DefaultUi />
          </Player> */}
        </div>
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
