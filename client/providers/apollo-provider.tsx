"use client";

import { gql } from "@/graphql/__generated__";
import { REFRESH_TOKEN } from "@/graphql/mutations/auth.mutation";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { FC, PropsWithChildren } from "react";

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN,
    });
    const newAccessToken = data?.refreshToken?.accessToken;
    if (!newAccessToken) {
      throw new Error("New access token not received.");
    }
    return `Bearer ${newAccessToken}`;
  } catch (err) {
    throw new Error("Error getting new access token.");
  }
}

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
