import { SignIn, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { Header } from "~/components/Header";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div>
      <Header />
      {!user.isSignedIn && <SignIn />}
      <p>hello im here</p>
      <p>{JSON.stringify(!user.isSignedIn)}</p>
      {!!user.isSignedIn && <Home />}
    </div>
  );
};

export default Home;
