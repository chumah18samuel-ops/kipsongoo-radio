"use client";

import { useEffect, useRef, useState } from "react";

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [error, setError] = useState("");

  /*
   * =====================================================
   * KIPSONGOO RADIO STREAM
   *
   * The URL comes from .env.local
   *
   * For now it is empty because we don't have
   * a streaming server yet.
   *
   * Later put your real stream URL in:
   *
   * NEXT_PUBLIC_RADIO_STREAM_URL=https://your-stream-url.com/live
   * =====================================================
   */

  const STREAM_URL =
    process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "";

  /*
   * =====================================================
   * SET INITIAL VOLUME
   * =====================================================
   */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  /*
   * =====================================================
   * PLAY / PAUSE
   * =====================================================
   */

  const togglePlay = async () => {
    setError("");

    /*
     * No streaming server yet
     */

    if (!STREAM_URL) {
      setError(
        "Kipsongoo Radio is currently offline. The live stream will be connected soon."
      );
      return;
    }

    if (!audioRef.current) {
      return;
    }

    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error(
        "Unable to play Kipsongoo Radio stream:",
        error
      );

      setPlaying(false);

      setError(
        "Unable to connect to the Kipsongoo Radio live stream."
      );
    }
  };

  /*
   * =====================================================
   * VOLUME
   * =====================================================
   */

  const changeVolume = (value: number) => {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-lime-400/20 bg-[#0c120e] p-7 shadow-2xl">

      {/* =====================================================
          AUDIO PLAYER

          Only render when a real stream URL exists.
      ===================================================== */}

      {STREAM_URL && (
        <audio
          ref={audioRef}
          src={STREAM_URL}
          preload="none"

          onPlay={() => {
            setPlaying(true);
            setError("");
          }}

          onPause={() => {
            setPlaying(false);
          }}

          onEnded={() => {
            setPlaying(false);
          }}

          onError={() => {
            console.error(
              "Unable to connect to Kipsongoo Radio stream."
            );

            setPlaying(false);

            setError(
              "Unable to connect to the Kipsongoo Radio stream."
            );
          }}
        />
      )}


      {/* =====================================================
          TOP STATUS
      ===================================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* LIVE DOT */}

          <span className="relative flex h-3 w-3">

            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                playing
                  ? "animate-ping bg-red-500"
                  : "bg-gray-600"
              }`}
            />

            <span
              className={`relative inline-flex h-3 w-3 rounded-full ${
                playing
                  ? "bg-red-500"
                  : "bg-gray-600"
              }`}
            />

          </span>


          {/* STATUS */}

          <span
            className={`text-xs font-black tracking-[0.2em] ${
              playing
                ? "text-red-400"
                : "text-gray-500"
            }`}
          >
            {playing ? "ON AIR" : "OFFLINE"}
          </span>

        </div>


        <span className="text-xs font-bold text-gray-500">
          KIPSONGOO RADIO
        </span>

      </div>


      {/* =====================================================
          RADIO ARTWORK
      ===================================================== */}

      <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-lime-300 via-green-500 to-green-950 shadow-[0_0_60px_rgba(163,230,53,0.15)]">

        {/* DECORATIVE CIRCLES */}

        <div className="absolute inset-0 opacity-20">

          <div className="absolute left-8 top-8 h-32 w-32 rounded-full border-[25px] border-black" />

          <div className="absolute bottom-8 right-8 h-48 w-48 rounded-full border-[35px] border-black" />

          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/30" />

        </div>


        {/* RADIO LOGO */}

        <div className="relative text-center">

          <div className="text-7xl font-black tracking-tighter text-black">
            KR
          </div>

          <div className="mt-2 text-sm font-black tracking-[0.35em] text-black">
            KIPSONGOO
          </div>

          <div className="text-xs font-bold tracking-[0.5em] text-black/70">
            RADIO
          </div>

        </div>

      </div>


      {/* =====================================================
          NOW PLAYING
      ===================================================== */}

      <div className="mt-7">

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">

          {playing
            ? "Now Playing"
            : "Kipsongoo Radio"}

        </p>


        <h2 className="mt-2 text-2xl font-black">

          {playing
            ? "Kipsongoo Radio Live"
            : "Your Voice. Your Community."}

        </h2>


        <p className="mt-1 text-sm text-gray-500">
          Music • Information • Entertainment • Community
        </p>

      </div>


      {/* =====================================================
          AUDIO VISUALIZER
      ===================================================== */}

      <div className="mt-7 flex h-12 items-end justify-center gap-1.5">

        {[
          20,
          35,
          55,
          30,
          70,
          45,
          85,
          50,
          30,
          65,
          40,
          75,
          45,
          25,
          60,
          80,
          35,
          55,
          30,
          70,
        ].map((height, index) => (

          <div
            key={index}
            className={`w-1.5 rounded-full bg-lime-400 transition-all duration-300 ${
              playing
                ? "animate-pulse"
                : "opacity-40"
            }`}
            style={{
              height: `${height}%`,
            }}
          />

        ))}

      </div>


      {/* =====================================================
          PLAYER CONTROLS
      ===================================================== */}

      <div className="mt-7 flex items-center gap-4">

        {/* PLAY BUTTON */}

        <button
          type="button"
          onClick={togglePlay}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xl font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.3)] transition hover:scale-105 hover:bg-lime-300 active:scale-95"
          aria-label={
            playing
              ? "Pause Kipsongoo Radio"
              : "Play Kipsongoo Radio"
          }
        >
          {playing ? "❚❚" : "▶"}
        </button>


        {/* VOLUME */}

        <div className="flex flex-1 items-center gap-3">

          <span className="text-sm">
            🔊
          </span>


          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) =>
              changeVolume(Number(e.target.value))
            }
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-lime-400"
            aria-label="Radio volume"
          />

        </div>


        {/* VOLUME VALUE */}

        <span className="w-10 text-right text-xs font-bold text-gray-500">
          {volume}%
        </span>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div className="mt-6 rounded-xl border border-yellow-400/10 bg-yellow-400/5 p-4 text-center">

          <div className="text-xs font-black tracking-wider text-yellow-400">
            🔧 LIVE STREAM NOT CONNECTED
          </div>

          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            {error}
          </p>

        </div>

      )}


      {/* =====================================================
          STREAM COMING SOON
      ===================================================== */}

      {!STREAM_URL && !error && (

        <div className="mt-6 rounded-xl border border-yellow-400/10 bg-yellow-400/5 p-4 text-center">

          <div className="text-xs font-black tracking-wider text-yellow-400">
            🔧 LIVE STREAM COMING SOON
          </div>

          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            Kipsongoo Radio is preparing its online broadcast.
            The live stream will be connected here.
          </p>

        </div>

      )}


      {/* =====================================================
          CONNECTED STATUS
      ===================================================== */}

      {STREAM_URL && (

        <div className="mt-6 rounded-xl border border-lime-400/10 bg-lime-400/5 p-3 text-center">

          <span className="text-xs font-bold text-lime-400">
            🎙️ KIPSONGOO RADIO LIVE STREAM
          </span>

        </div>

      )}

    </div>
  );
}