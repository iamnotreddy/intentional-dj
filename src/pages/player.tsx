import { useQuery } from "@tanstack/react-query";
import { type GetServerSideProps, type NextPage } from "next";
import { useState } from "react";
import { Header } from "~/components/Header";
import { NavBar } from "~/components/NavBar";
import { SpotifyPlayer } from "~/components/Player";
import { RecsQueue } from "~/components/RecsQueue";
import { SearchWindow } from "~/components/SearchWindow";
import { SeedTracks } from "~/components/SeedTracks";
import { extractIdsFromUriArray } from "~/lib/helpers";
import { type ApiResponse } from "~/lib/types";
import { getAuth } from "@clerk/nextjs/server";
import { getSpotifyToken } from "~/lib/getSpotifyToken";

export const MainPage: NextPage<{ accessToken: string }> = ({
  accessToken,
}) => {
  const [seedTracks, setSeedTracks] = useState<Spotify.Track[]>();

  const [navState, setNavState] = useState({
    showSearchWindow: true,
    showSeedQueue: false,
    showRecsQueue: false,
    showLikesQueue: false,
  });

  const { data: recommendations, refetch: fetchRecs } = useQuery<
    ApiResponse<Spotify.Track[]>
  >(
    ["recs"],
    () => {
      const seedUris = extractIdsFromUriArray(seedTracks ?? []);
      return fetch(
        `/api/recs?tracks=${seedUris}&accessToken=${accessToken}`
      ).then((res) => res.json());
    },
    {
      enabled: false,
    }
  );

  const getRecsFromSeeds = async () => {
    const trackRecs = await fetchRecs();
    return trackRecs;
  };

  const handleNavStateChange = (target: string) => {
    setNavState((prevState) => ({
      ...prevState,
      showSearchWindow: target === "showSearchWindow",
      showSeedQueue: target === "showSeedQueue",
      showRecsQueue: target === "showRecsQueue",
      showLikesQueue: target === "showLikesQueue",
    }));
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

  return (
    <div className="relative flex max-h-screen w-full">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>

      <div
        style={{ width: "100%", height: "80vh" }}
        className="absolute top-24 flex flex-col items-center justify-start space-y-4 "
      >
        <div className="sticky top-0">
          <NavBar handleNavStateChange={handleNavStateChange} />
        </div>

        {navState.showSearchWindow && (
          <SearchWindow
            handleAddSeedTrack={handleAddSeedTrack}
            accessToken={accessToken}
          />
        )}

        {seedTracks && navState.showSeedQueue && (
          <SeedTracks
            seedTracks={seedTracks}
            handleRemoveSeedTrack={handleRemoveSeedTrack}
            getRecsFromSeeds={getRecsFromSeeds}
          />
        )}

        {seedTracks &&
          recommendations &&
          recommendations.data &&
          navState.showRecsQueue && (
            <RecsQueue
              recTracks={recommendations.data}
              seedTracks={seedTracks}
              accessToken={accessToken}
            />
          )}
      </div>
      {accessToken && <SpotifyPlayer accessToken={accessToken} />}
    </div>
  );
};

export default MainPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);
  const { CLERK_SECRET_KEY = "" } = process.env;
  const accessToken = await getSpotifyToken(userId ?? "", CLERK_SECRET_KEY);

  if (!userId && accessToken) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }

  return {
    props: { accessToken: accessToken },
  };
};
