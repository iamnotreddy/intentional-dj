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

  if (accessToken) {
    return res.status(200).json({
      status: "OK",
      data: accessToken,
    });
  } else {
    return res.status(400).json({
      status: "Error",
      message: "Error",
    });
  }
};
