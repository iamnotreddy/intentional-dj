export type ApiResponse<T> = {
  status: "OK" | "ERROR";
  data?: T;
  error?: string;
};

export type SpotifySearchResponse = {
  href: string;
  items: Array<Spotify.Track>;
};
