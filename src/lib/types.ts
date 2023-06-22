export type ApiResponse<T> = {
  status: "OK" | "ERROR";
  data?: T;
  error?: string;
};

export type SpotifySearchResponse = {
  href: string;
  items: Array<SpotifyTrack>;
};

export type SpotifyAlbum = {
  name: string;
  release_date: string;
  href: string;
  images: Array<{ url: string }>;
  artists: Array<SpotifyArtist>;
};

export type SpotifyArtist = {
  name: string;
  external_urls: { spotify: string };
};

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  preview_url: string;
  name: string;
  uri: string;
};
