import { ApolloProvider } from '@apollo/client';

import { Event } from '@/pages/Event';

import { client } from '@/lib/apollo';

export function App() {
  return (
    <ApolloProvider client={client}>
      <Event />
    </ApolloProvider>
  );
}
