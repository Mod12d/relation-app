import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";
import globalStyles from "../styles/global";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <style jsx global>
          {globalStyles}
        </style>
      </ApolloProvider>
    </SessionProvider>
  );
}
