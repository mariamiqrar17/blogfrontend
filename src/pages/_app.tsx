import Topbarr from "@/components/Topbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import { Provider } from 'react-redux'
// import { store } from "@/Store/store";
export default function App({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>

      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
      // </Provider>

  );
}
