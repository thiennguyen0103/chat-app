"use client";

import { REFRESH_TOKEN_MUTATION } from "@/graphql/mutations/auth.mutation";
import { useUserStore } from "@/store/userStore";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  split,
} from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { FC, PropsWithChildren } from "react";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

loadErrorMessages();
loadDevMessages();

async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
  try {
    await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
    });
  } catch (err) {
    throw new Error("Error getting new access token.");
  }
}

let retryCount = 0;
const maxRetry = 3;

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   },
// });

// const uploadLink = createUploadLink({
//   uri: "http://localhost:3000/graphql",
//   credentials: "include",
//   headers: {
//     "apollo-require-preflight": "true",
//   },
// });

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === "UNAUTHENTICATED" && retryCount < maxRetry) {
        retryCount++;
        return new Observable((observer) => {
          refreshToken(client)
            .then((token) => {
              console.log("token", token);
              operation.setContext((previousContext: any) => ({
                headers: {
                  ...previousContext.headers,
                  authorization: token,
                },
              }));
              const forward$ = forward(operation);
              forward$.subscribe(observer);
            })
            .catch((error) => observer.error(error));
        });
      }

      if (err.message === "Refresh token not found") {
        console.log("refresh token not found!");
        useUserStore.setState({
          id: undefined,
          fullName: "",
          email: "",
        });
      }
    }
  }
});

// const link = split(
//   // Split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   ApolloLink.from([errorLink, uploadLink])
// );

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
