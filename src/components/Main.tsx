/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignOutButton } from "@clerk/nextjs";
import { type ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  type ApiResponse,
  type SpotifySearchResponse,
} from "~/pages/api/search";
import Image from "next/image";
import { MagnifyingGlass } from "./icons/MagnifyingGlass";

export const MainPage = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //   const debouncedQuery = useDebounceValue(searchInputValue, 100);

  const { data } = useQuery<ApiResponse<SpotifySearchResponse>>(
    ["searchQuery", searchValue],
    () =>
      fetch(`/api/search?query=${searchValue}`)
        .then((res) => res.json())
        .then(),
    {
      keepPreviousData: true,
      enabled: searchValue.length > 0,
    }
  );

  // event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const handleOnClick = () => {
    setSearchValue(searchInputValue);
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-center font-serif text-4xl">What [mood] are you in?</p>
      <p className="text-center font-serif text-xl">Pick a song</p>
      <div className="flex flex-row items-center justify-center space-x-2">
        <input
          type="text"
          placeholder="...suck it"
          className="w-4/5 rounded-full border-2 border-black p-2"
          value={searchInputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleOnClick}>
          <MagnifyingGlass />
        </button>
      </div>

      {data &&
        data.data &&
        data.data.items.slice(0, 10).map((item) => {
          const imageURL = item.album.images[2]?.url ?? "";
          return (
            <div
              className="flex flex-row items-center justify-center space-x-2 border-4 border-dashed border-pink-400"
              key={item.uri}
            >
              <Image src={imageURL} alt="albumImage" height={25} width={25} />
              <div className="flex flex-col space-y-1">
                <p className="text-xl">{item.name}</p>
                <p className="font-bold">{item.artists[0]?.name}</p>
              </div>
            </div>
          );
        })}

      <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
        <SignOutButton />
      </div>
    </div>
  );
};
