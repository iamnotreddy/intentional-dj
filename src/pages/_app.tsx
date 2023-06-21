import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { type AppType } from "next/app";
import Layout from "~/components/layout/Layout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <SignedIn>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
