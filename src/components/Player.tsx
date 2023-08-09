/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { useState, useEffect, useRef } from "react";
import loadSpotifyScript from "~/lib/loadSpotifyScript";
import { NextIcon, PlayIcon, PreviousIcon } from "./icons";
import Image from "next/image";
import { PauseIcon } from "./icons";

export const SpotifyPlayer = (props: { accessToken: string }) => {
  const player = useRef<Spotify.Player | null>(null);

  const [deviceId, setDeviceId] = useState<string | undefined>();

  const [currentTrack, setCurrentTrack] = useState<Spotify.Track>();
  const [scriptReady, setScriptReady] = useState(false);
  const [playerState, setPlayerState] = useState<
    Spotify.PlaybackState | undefined
  >();

  const { accessToken } = props;

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      setScriptReady(true);
    };

    loadSpotifyScript();
  }, []);

  useEffect(() => {
    if (scriptReady && !player.current) {
      player.current = new Spotify.Player({
        name: "IntentionalDJ",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
      });

      player.current?.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.current?.connect();
    }

    if (player.current) {
      player.current?.addListener("player_state_changed", (state) => {
        setPlayerState(state);
      });
    }
  }, [accessToken, scriptReady]);

  useEffect(() => {
    if (deviceId) {
      const play = async () => {
        try {
          const response = await fetch(`api/playback/device?id=${deviceId}`);
          if (!response.ok) {
            throw new Error("shit!");
          }
        } catch (e) {
          setDeviceId(undefined);
        }

        const state = await player.current?.getCurrentState();
        if (state) {
          setPlayerState(state);
        }
      };

      play();
    }
  }, [deviceId]);

  useEffect(() => {
    if (playerState) {
      setCurrentTrack(playerState.track_window.current_track);
    }
  }, [playerState]);

  return (
    <div className="fixed bottom-0 w-full border-t border-purple-800 bg-[#c9761d] p-4">
      {playerState && (
        <div className="flex flex-row items-center space-x-4">
          <Image
            className="rounded-xl"
            src={currentTrack?.album.images[0]?.url ?? ""}
            alt="nowPlayingImage"
            height={120}
            width={120}
          />

          <div className="flex flex-col">
            <p className="text-2xl">{currentTrack ? currentTrack.name : ""}</p>
            <p className="text-lg">
              {currentTrack
                ? currentTrack.artists.map((artist) => artist.name).join(" | ")
                : ""}
            </p>
          </div>
          {/* player icons */}
          <div className="flex flex-row space-x-2">
            <button
              onClick={() => {
                player.current ? player.current.previousTrack() : undefined;
              }}
            >
              <PreviousIcon />
            </button>
            {playerState?.paused ? (
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
      )}
    </div>
  );
};
