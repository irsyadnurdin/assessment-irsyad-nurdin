import "@/styles/globals.css";
import { PrimeReactProvider } from "primereact/api";
// import Tailwind from "primereact/passthrough/tailwind";
// import { ThemeSwitcher } from "../components/ThemeSwitcher";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
// import "@/styles/primereact.css";
// import "primereact/resources/themes/lara-light-indigo/theme.css";

export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>

    // <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
    // {
    /* <ThemeSwitcher /> */
    // }
    // <Component {...pageProps} />
    // </PrimeReactProvider>
  );
}
