/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const getSpotifyToken = async (userId: string, secret: string) => {
  const clerkTokenUrl = `https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/spotify`;

  const clerkOAuthResponse: Array<{ token: string }> = await fetch(
    clerkTokenUrl,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    }
  ).then((res) => res.json());

  const accessToken = clerkOAuthResponse[0]?.token;

  return accessToken;
};
