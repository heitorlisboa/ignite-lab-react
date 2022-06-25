import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import '@/styles/global.css';

import { client } from '@/lib/apollo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
