import { useQuery } from "@tanstack/react-query";
import { CloseIcon, SearchIcon } from "./icons";
import { SearchResult } from "./SearchResult";
import { type ChangeEvent, useState } from "react";
import { type ApiResponse, type SpotifySearchResponse } from "~/lib/types";
import useDebounceValue from "~/hooks/useDebounceValue";

type SearchWindowProps = {
  handleAddSeedTrack: (track: Spotify.Track) => void;
  handleNavStateChange: (target: string) => void;
};

export const SearchWindow = ({
  handleAddSeedTrack,
  handleNavStateChange,
}: SearchWindowProps) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  // const [searchValue, setSearchValue] = useState("");
  const debouncedQuery = useDebounceValue(searchInputValue, 500);

  const { data } = useQuery<ApiResponse<SpotifySearchResponse>>(
    ["searchQuery", debouncedQuery],
    () =>
      fetch(`/api/search?query=${debouncedQuery}`).then((res) => res.json()),
    {
      keepPreviousData: true,
      enabled: debouncedQuery.length > 0,
    }
  );

  // event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  // const handleOnClick = () => {
  //   setSearchValue(searchInputValue);
  // };

  return (
    <div className="flex max-h-96 flex-col rounded-md border-[#d39a5d] bg-[#d89349] p-4">
      <div className="sticky top-0 z-10 flex flex-row justify-between">
        <p className="pb-2 text-center text-xl font-light">Search for a song</p>
        <button onClick={() => handleNavStateChange("showSearchWindow")}>
          <CloseIcon />
        </button>
      </div>

      <div className="flex flex-row items-center space-x-2 pb-4">
        <input
          type="text"
          placeholder="...find a"
          className="w-4/5 rounded-full border-2 border-black p-2"
          value={searchInputValue}
          onChange={handleInputChange}
        />

        <SearchIcon />
      </div>

      <div className="flex max-h-full flex-col space-y-1 overflow-y-auto">
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
