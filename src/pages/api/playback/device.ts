/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-anonymous-default-export */

import { type NextApiRequest, type NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, accessToken } = req.query;

  const deviceUrl = `https://api.spotify.com/v1/me/player/`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const requestBody = JSON.stringify({
    device_ids: [id],
  });

  const response = await fetch(deviceUrl, {
    method: "PUT",
    headers: headers,
    body: requestBody,
  });

  if (response.ok) {
    return res.status(200).json({
      status: "OK",
      message: `connected to device ${typeof id === "string" ? id : ""}`,
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
