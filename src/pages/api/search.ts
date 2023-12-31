/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-anonymous-default-export */
import { type NextApiRequest, type NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getSpotifyToken } from "~/lib/getSpotifyToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);
  const { CLERK_SECRET_KEY = "" } = process.env;

  const accessToken = await getSpotifyToken(userId ?? "", CLERK_SECRET_KEY);
  const { query } = req.query;

  const type = ["track"].join(",");

  const endpointURL = "https://api.spotify.com/v1/search";

  const finalURL = `${endpointURL}?q=${query}&type=${type}`;

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
