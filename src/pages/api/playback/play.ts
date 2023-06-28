/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-anonymous-default-export */

import { type NextApiRequest, type NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tracks, accessToken } = req.query;

  const trackArray =
    tracks && typeof tracks === "string" ? tracks.split(",") : [];

  const baseUrl = `https://api.spotify.com/v1/me/player/play/`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const requestBody = JSON.stringify({
    uris: trackArray.length > 0 ? trackArray : [""],
  });

  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: headers,
    body: requestBody,
  });

  if (response.ok) {
    return res.status(200).json({
      status: "OK",
      message: "playing URIs:" + requestBody,
    });
  } else {
    return res.status(response.status).json({
      status: "Error",
      message: response.statusText,
      code: response.status,
      body: response.body,
    });
  }
};
