// src/pages/_app.tsx

import "../styles/globals.css"; // ✅ import global styles here
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
