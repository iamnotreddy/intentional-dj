/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { useState, useEffect, useRef } from "react";
import loadSpotifyScript from "~/lib/loadSpotifyScript";
import { NextIcon, PlayIcon } from "./icons";
import Image from "next/image";
import { PauseIcon } from "./icons";

export const SpotifyPlayer = (props: { accessToken: string }) => {
  //   const [player, setPlayer] = useState<Spotify.Player>();
  const player = useRef<Spotify.Player | null>(null);

  const { accessToken } = props;

  const [currentTrack, setCurrentTrack] = useState<Spotify.Track>();
  const [deviceId, setDeviceId] = useState<string>();
  const [scriptReady, setScriptReady] = useState(false);
  const [playerState, setPlayerState] = useState<
    Spotify.PlaybackState | undefined
  >();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      setScriptReady(true);
    };

    loadSpotifyScript();
  }, []);

  useEffect(() => {
    if (scriptReady && !player.current) {
      console.log("am i running too much??");

      if (accessToken) {
        player.current = new Spotify.Player({
          name: "IntentionalDJ",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
        });
      }

      player.current?.addListener("ready", ({ device_id }) => {
        setDeviceId(() => {
          console.log("setting device id as: ", device_id);
          return device_id;
        });
      });

      player.current?.connect();
    }
    if (player.current) {
      player.current?.addListener("player_state_changed", (state) => {
        setPlayerState(state);
        setCurrentTrack(state.track_window.current_track);
      });
    }
  }, [accessToken, scriptReady]);

  useEffect(() => {
    const playOnDevice = async () => {
      const response = await fetch(`api/playback/device?id=${deviceId}`);
      if (!response.ok) {
        console.error("invalid device id");
      }
    };

    if (deviceId) {
      // console.log("deviceId", deviceId);
      playOnDevice();
    }
  }, [deviceId]);

  return (
    <div className="fixed bottom-0 w-full border-t-2 border-black bg-green-200 p-4">
      <div className="flex flex-row items-start space-x-4">
        <Image
          src={currentTrack?.album.images[0]?.url ?? ""}
          alt="nowPlayingImage"
          height={100}
          width={100}
        />

        <div className="flex flex-col">
          <p className="text-2xl">{currentTrack ? currentTrack.name : ""}</p>
          <p className="text-md">
            {currentTrack
              ? currentTrack.artists.map((artist) => artist.name).join(" | ")
              : ""}
          </p>
          <div className="flex flex-row space-x-2">
            {!playerState?.paused ? (
              <button
                onClick={() => {
                  player.current ? player.current.togglePlay() : undefined;
                }}
              >
                <PlayIcon />
              </button>
            ) : (
              <button
                onClick={() => {
                  player.current ? player.current.togglePlay() : undefined;
                }}
              >
                <PauseIcon />
              </button>
            )}

            <button
              onClick={() => {
                player.current ? player.current.nextTrack() : undefined;
              }}
            >
              <NextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
