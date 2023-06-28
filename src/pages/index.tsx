import { SignIn, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const user = useUser();

  return <div>{user.isSignedIn && <SignIn afterSignInUrl={"/player"} />}</div>;
};

export default Home;
