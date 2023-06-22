import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass } from "./icons";
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
    <div>
      <div className="flex flex-row items-center justify-center space-x-2">
        <input
          type="text"
          placeholder="...find a"
          className="w-4/5 rounded-full border-2 border-black p-2"
          value={searchInputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleOnClick}>
          <MagnifyingGlass />
        </button>
      </div>

      <div className="flex max-h-screen flex-col space-y-1 overflow-y-auto border-4 border-red-400">
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
