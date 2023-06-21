/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import useDebounceValue from "~/hooks/useDebounceValue";
import { useQuery } from "@tanstack/react-query";

export const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchQuery = useDebounceValue(searchValue, 500);

  const { data } = useQuery(
    ["searchQuery", debouncedSearchQuery],
    async () =>
      fetch(`/api/search?query=${debouncedSearchQuery}`).then((res) =>
        res.json()
      ),
    {
      keepPreviousData: true,
      enabled: debouncedSearchQuery.length > 0,
    }
  );

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-center font-serif text-4xl">What [mood] are you in?</p>
      <p className="text-center font-serif text-xl">Pick a song</p>
      <input
        type="text"
        placeholder="...suck it"
        className="rounded-full border-2 border-black p-2"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <p>{`This is the debounced Value ${debouncedSearchQuery}`}</p>
      <div className="flex">{JSON.stringify(data)}</div>
      <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
        <SignOutButton />
      </div>
    </div>
  );
};
