import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "./icons";
import { SearchResult } from "./SearchResult";
import { type ChangeEvent, useState } from "react";
import {
  type SpotifyTrack,
  type ApiResponse,
  type SpotifySearchResponse,
} from "~/lib/types";

type SearchWindowProps = {
  handleAddSeedTrack: (track: SpotifyTrack) => void;
};

export const SearchWindow = ({ handleAddSeedTrack }: SearchWindowProps) => {
  //   const debouncedQuery = useDebounceValue(searchInputValue, 100);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { data } = useQuery<ApiResponse<SpotifySearchResponse>>(
    ["searchQuery", searchValue],
    () => fetch(`/api/search?query=${searchValue}`).then((res) => res.json()),
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
    <div className="flex flex-col overflow-y-auto rounded-2xl border-2 border-black bg-gray-200 bg-opacity-70 p-4">
      <p className="pb-2 text-center font-serif text-xl">Pick a song</p>
      <div className="flex flex-row items-center justify-center space-x-2">
        <input
          type="text"
          placeholder="...find a"
          className="w-4/5 rounded-full border-2 border-black p-2"
          value={searchInputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleOnClick}>
          <SearchIcon />
        </button>
      </div>

      <div className="flex max-h-screen flex-col space-y-1 overflow-y-auto">
        {data &&
          data.data &&
          data.data.items.map((track) => {
            return (
              <SearchResult
                key={track.uri}
                track={track}
                handleAddSeedTrack={handleAddSeedTrack}
              />
            );
          })}
      </div>
    </div>
  );
};
