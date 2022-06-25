import { type NextRequest, NextResponse } from 'next/server';

import { client } from '@/lib/apollo';
import { GetFirstLessonDocument } from '@/graphql/generated';

export async function middleware(req: NextRequest) {
  const nextPath = req.nextUrl.pathname;
  if (nextPath === '/event' || nextPath === '/event/lesson') {
    const { data } = await client.query({ query: GetFirstLessonDocument });
    const firstLesson = data.lessons[0];

    if (!firstLesson) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(`/event/lesson/${firstLesson.slug}`, req.url)
    );
  }
}
