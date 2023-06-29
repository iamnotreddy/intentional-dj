/* eslint-disable @typescript-eslint/no-misused-promises */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Header } from "~/components/Header";
import { NavBar } from "~/components/NavBar";
import { SpotifyPlayer } from "~/components/Player";
import { RecsQueue } from "~/components/RecsQueue";
import { SearchWindow } from "~/components/SearchWindow";
import { SeedTracks } from "~/components/SeedTracks";
import { extractIdsFromUriArray } from "~/lib/helpers";
import { type ApiResponse } from "~/lib/types";

export const Home = () => {
  const [seedTracks, setSeedTracks] = useState<Spotify.Track[]>();

  const [navState, setNavState] = useState({
    showSearchWindow: true,
    showSeedQueue: false,
    showRecsQueue: false,
    showLikesQueue: false,
  });

  // const { CLERK_SECRET_KEY = "" } = process.env;
  // const { user } = useUser();
  const [accessToken, setAccessToken] = useState("");

  //   const { data: recommendations, refetch: fetchRecs } = useQuery<
  //     ApiResponse<Spotify.Track[]>
  //   >(
  //     ["recs"],
  //     () => {
  //       const seedUris = extractIdsFromUriArray(seedTracks ?? []);
  //       return fetch(`/api/recs?tracks=${seedUris}`).then((res) => res.json());
  //     },
  //     {
  //       enabled: false,
  //     }
  //   );

  const handleNavStateChange = (target: string) => {
    if ((target = "showSearchWindow")) {
      setNavState((prevState) => ({
        ...prevState,
        showSearchWindow: !prevState.showSearchWindow,
      }));
    } else {
      setNavState((prevState) => ({
        ...prevState,
        showSeedQueue: target === "showSeedQueue",
        showRecsQueue: target === "showRecsQueue",
        showLikesQueue: target === "showLikesQueue",
      }));
    }
  };

  const handleAddSeedTrack = (track: Spotify.Track) => {
    setSeedTracks((prev) => {
      if (prev) {
        // don't allow more than 5 seeds
        return prev.length < 5 ? [...prev, track] : prev;
      }
      return [track];
    });
  };

  const handleRemoveSeedTrack = (track: Spotify.Track) => {
    setSeedTracks((prev) => {
      if (prev) {
        return prev.filter((item) => item !== track);
      }
      return prev;
    });
  };

  const getContainerStyle = (isSearchRendered: boolean) => {
    const opacity = isSearchRendered ? "30" : "70";
    return `flex w-3/5 flex-col overflow-hidden rounded-2xl border-2 border-black bg-gray-200 bg-opacity-${opacity} p-4 backdrop-filter backdrop-blur`;
  };

  const containerStyle = getContainerStyle(navState.showSearchWindow);

  return (
    <div className="relative flex max-h-screen w-full">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>
      {/* {navState.showSearchWindow && (
        <div className="absolute inset-0 flex h-1/2 p-8 pt-20">
          <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />
        </div>
      )} */}

      <div
        style={{ width: "100%", height: "68vh" }}
        className="absolute top-24 flex flex-col items-center justify-start space-y-4"
      >
        {/* {seedTracks && navState.showSeedQueue && (
          <div className={containerStyle}>
            <SeedTracks
              seedTracks={seedTracks}
              handleRemoveSeedTrack={handleRemoveSeedTrack}
              fetchRecs={fetchRecs}
            />
          </div>
        )} */}

        {/* {seedTracks &&
          recommendations &&
          recommendations.data &&
          navState.showRecsQueue && (
            <div className={containerStyle}>
              <RecsQueue
                recTracks={recommendations.data}
                seedTracks={seedTracks}
              />
            </div>
          )} */}

        <NavBar handleNavStateChange={handleNavStateChange} />
      </div>
      {/* {accessToken && <SpotifyPlayer accessToken={accessToken} />} */}
    </div>
  );
};
