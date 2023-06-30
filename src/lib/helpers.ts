export const extractIdsFromUriArray = (tracks: Spotify.Track[]): string => {
  const ids = tracks.map((track) => {
    const uriParts = track.uri.split(":");
    return uriParts[2];
  });

  return ids.join(",");
};
