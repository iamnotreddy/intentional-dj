import { SignIn, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { MainPage } from "~/components/Main";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div>
      {user.isSignedIn && <SignIn />}
      {!!user.isSignedIn && <MainPage />}
    </div>
  );
};

export default Home;
