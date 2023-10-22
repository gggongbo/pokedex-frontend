import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "@styles/globals.css";
import "tailwindcss/tailwind.css";

import Layout from "@pages/_layout";
import { persistor, wrapper } from "~/store";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={props.pageProps.dehydratedState}>
            <Layout>
              <Component {...props.pageProps} />
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
