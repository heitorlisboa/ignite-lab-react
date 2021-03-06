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
    <div className="max-w-[68.75rem] lg:w-full h-full mx-auto overflow-y-auto">
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

      <div className="p-6 md:p-8 mx-auto mb-12">
        <div
          className="
            flex flex-col md:flex-row lg:flex-col xl:flex-row
            gap-6 md:gap-16 items-start
            mb-16 md:mb-20
          "
        >
          <div className="flex-1">
            <h1 className="text-lg md:text-2xl font-bold mb-4">
              {lesson.title}
            </h1>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6">
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
                  <strong className="text-lg md:text-2xl font-bold">
                    {lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {lesson.teacher.bio}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md mx-auto md:w-auto lg:w-full xl:w-auto">
            <Button
              as="a"
              variant="filled"
              href="https://discord-service.rocketseat.dev/signin/ignite-lab"
              openNewTab
            >
              <DiscordLogo size={24} />
              <span>Comunidade no discord</span>
            </Button>
            <Button
              as="a"
              variant="outlined"
              href={lesson.challenge?.url || '#'}
            >
              <Lightning size={24} />
              <span>Acesse o desafio</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-2 justify-center md:justify-start lg:justify-center">
          <Card
            title="Material complementar"
            Icon={FileArrowDown}
            href="https://efficient-sloth-d85.notion.site/Material-complementar-86d4ef35af16471ebc3ae3eba1a378e5"
          >
            Acesse o material complementar para acelerar o seu desenvolvimento
          </Card>
          <Card
            title="Wallpapers exclusivos"
            Icon={Image}
            href="https://drive.google.com/drive/folders/1mxWnvlqmH7MbVRv2Na9xFNgCQCygM1iR"
          >
            Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
            m??quina
          </Card>
        </div>
      </div>

      <Footer
        classNames={{
          footer: 'lg:flex-col xl:flex-row',
          rightAnchor: 'lg:ml-0 xl:ml-auto',
        }}
      />
    </div>
  );
}
