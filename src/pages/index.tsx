import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <div>
          {user.isSignedIn && <SignIn />}
          {!!user.isSignedIn && (
            <div className="space-y-4">
              <p>{`Logged in as ${
                user && user.user && user.user.firstName
                  ? user.user.firstName
                  : ""
              }`}</p>
              <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
