import { UserButton, useUser } from "@clerk/nextjs";

export const Header = () => {
  const user = useUser();

  return (
    <header className="sticky top-0 z-50 rounded-lg bg-transparent">
      <div className="border- mx-8 flex h-14 items-center justify-between">
        <div className="rounded-xl border-white bg-pink-500 bg-opacity-80 p-2 font-sans text-3xl text-white hover:text-blue-200">
          IntentionalDJ
        </div>

        <nav>
          <ul className="flex items-center space-x-4">
            <p>
              {user && user.user && user.user.firstName
                ? user.user.firstName
                : ""}
            </p>
            <div className="flex flex-row items-center justify-center space-x-2 rounded-full bg-slate-400 bg-opacity-60 px-2 text-sm text-black">
              <UserButton />
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};
