import {
  SignIn,
  SignOutButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const user = useUser();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <p>hello</p>
        <div>
          {user.isSignedIn && <SignIn />}
          {!!user.isSignedIn && <SignOutButton />}
        </div>
        <UserButton afterSignOutUrl="/" />
        <p>{userId}</p>
        <p>{sessionId}</p>
        <p></p>
      </main>
    </>
  );
};

export default Home;
