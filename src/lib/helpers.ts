import { type SpotifyTrack } from "./types";

export const extractIdsFromUriArray = (tracks: SpotifyTrack[]): string => {
  const ids = tracks.map((track) => {
    const uriParts = track.uri.split(":");
    return uriParts[2];
  });

  return ids.join(",");
};
