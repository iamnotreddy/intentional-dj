/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-anonymous-default-export */
import { type NextApiRequest, type NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const endpointURL = "https://api.spotify.com/v1/recommendations";

  const { tracks, accessToken } = req.query;

  // isolate track uri id
  const trackUris =
    typeof tracks === "string" ? tracks.replaceAll("spotify:track:", "") : "";

  const finalURL = `${endpointURL}?limit=5&seed_tracks=${trackUris}`;

  const response = await fetch(finalURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const { tracks } = await response.json();

    return res.status(200).json({
      status: "OK",
      data: tracks,
    });
  } else {
    return res.status(response.status).json({
      status: "Error",
      message: response.status,
    });
  }
};
