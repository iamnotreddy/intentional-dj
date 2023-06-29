/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-anonymous-default-export */

import { type NextApiRequest, type NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { getSpotifyToken } from "~/lib/getSpotifyToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = getAuth(req);

  const { CLERK_SECRET_KEY = "" } = process.env;
  const accessToken = await getSpotifyToken(userId ?? "", CLERK_SECRET_KEY);

  const topTracksUrl = "https://api.spotify.com/v1/me/top/tracks";

  const response = await fetch(topTracksUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    const { items } = await response.json();
    return res.status(200).json({
      status: "OK",
      data: items,
    });
  } else {
    const { error } = await response.json();
    return res.status(response.status).json({
      status: "Error",
      message: "errrorrrr",
    });
  }
};
