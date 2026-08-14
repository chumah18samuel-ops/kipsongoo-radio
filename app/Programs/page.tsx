"use client";

import Link from "next/link";

const programs = [
  {
    time: "06:00 AM – 10:00 AM",
    title: "Morning Glory",
    host: "Kipsongoo Radio",
    category: "MORNING",
    description:
      "Start your day with inspiration, worship, encouraging conversations and the latest community stories.",
  },
  {
    time: "10:00 AM – 02:00 PM",
    title: "Kipsongoo Mid-Morning",
    host: "Kipsongoo Radio",
    category: "ENTERTAINMENT",
    description:
      "Enjoy great music, entertainment, listener interaction and stories from around the community.",
  },
  {
    time: "02:00 PM – 06:00 PM",
    title: "Afternoon Drive",
    host: "Kipsongoo Radio",
    category: "MUSIC",
    description:
      "Your afternoon companion featuring music, conversations, entertainment and community updates.",
  },
  {
    time: "06:00 PM – 09:00 PM",
    title: "Evening Connection",
    host: "Kipsongoo Radio",
    category: "TALK",
    description:
      "Connect with the community through conversations, interviews, discussions and inspiring stories.",
  },
  {
    time: "09:00 PM – 12:00 AM",
    title: "Night Vibes",
    host: "Kipsongoo Radio",
    category: "MUSIC",
    description:
      "Relax into the night with a carefully selected mix of music and entertainment.",
  },
  {
    time: "12:00 AM – 06:00 AM",
    title: "Kipsongoo After Dark",
    host: "Kipsongoo Radio",
    category: "NIGHT",
    description:
      "Keep connected throughout the night with music and selected programming from Kipsongoo Radio.",
  },
];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-lime-400/10 bg-[#050807]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          {/* LOGO */}

          <Link href="/" className="group">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.5)]">
                KR
              </div>

              <div>

                <div className="text-lg font-black tracking-wider text-lime-400">
                  KIPSONGOO
                </div>

                <div className="text-[10px] font-semibold tracking-[0.35em] text-gray-400">
                  RADIO
                </div>

              </div>

            </div>

          </Link>


          {/* DESKTOP MENU */}

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">

            <Link
              href="/"
              className="transition hover:text-lime-400"
            >
              Home
            </Link>

            <Link
              href="/programs"
              className="text-lime-400"
            >
              Programs
            </Link>

            <Link
              href="/#news"
              className="transition hover:text-lime-400"
            >
              News
            </Link>

            <Link
              href="/#about"
              className="transition hover:text-lime-400"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="transition hover:text-lime-400"
            >
              Contact
            </Link>

          </div>


          {/* LISTEN BUTTON */}

          <Link
            href="/#listen"
            className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] transition hover:scale-105 hover:bg-lime-300"
          >
            LISTEN LIVE
          </Link>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden">

        {/* GLOW */}

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />


        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">

          <div className="max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-xs font-bold tracking-wider text-lime-400">

              <span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.8)]" />

              KIPSONGOO RADIO

            </div>


            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">

              OUR

              <span className="block text-lime-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.25)]">
                PROGRAMS.
              </span>

            </h1>


            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">

              Discover the shows, conversations, music and entertainment
              coming to you from Kipsongoo Radio.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROGRAMS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">

        <div className="mb-12">

          <p className="text-sm font-black tracking-[0.25em] text-lime-400">
            ON AIR
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            TODAY&apos;S PROGRAMS
          </h2>

        </div>


        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {programs.map((program, index) => (

            <article
              key={program.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-lime-400/30 hover:bg-lime-400/[0.04]"
            >

              {/* NUMBER */}

              <div className="absolute right-6 top-5 text-5xl font-black text-white/[0.03] transition group-hover:text-lime-400/10">
                0{index + 1}
              </div>


              {/* CATEGORY */}

              <span className="inline-flex rounded-full bg-lime-400/10 px-3 py-1 text-xs font-black tracking-wider text-lime-400">
                {program.category}
              </span>


              {/* TIME */}

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-gray-400">

                <span className="text-lime-400">
                  ●
                </span>

                {program.time}

              </div>


              {/* TITLE */}

              <h3 className="mt-5 text-2xl font-black">
                {program.title}
              </h3>


              {/* HOST */}

              <p className="mt-2 text-sm font-semibold text-lime-400">
                {program.host}
              </p>


              {/* DESCRIPTION */}

              <p className="mt-4 leading-7 text-gray-500">
                {program.description}
              </p>


              {/* LINE */}

              <div className="mt-7 h-px bg-white/10 transition group-hover:bg-lime-400/30" />


              {/* ACTION */}

              <button
                type="button"
                className="mt-5 text-sm font-black text-lime-400 transition hover:text-lime-300"
              >
                VIEW PROGRAM →
              </button>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          FEATURED PROGRAM
      ===================================================== */}

      <section className="bg-[#080d09] py-20">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* ART */}

            <div className="relative">

              <div className="absolute inset-0 rounded-[2rem] bg-lime-400/10 blur-3xl" />

              <div className="relative flex aspect-square max-w-lg items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-lime-300 via-green-500 to-green-950 shadow-[0_0_70px_rgba(163,230,53,0.15)]">

                <div className="absolute inset-0 opacity-20">

                  <div className="absolute left-10 top-10 h-40 w-40 rounded-full border-[30px] border-black" />

                  <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full border-[40px] border-black" />

                </div>


                <div className="relative text-center text-black">

                  <div className="text-8xl font-black tracking-tighter">
                    KR
                  </div>

                  <div className="mt-3 text-lg font-black tracking-[0.35em]">
                    KIPSONGOO
                  </div>

                  <div className="text-xs font-bold tracking-[0.5em] opacity-70">
                    RADIO
                  </div>

                </div>

              </div>

            </div>


            {/* TEXT */}

            <div>

              <p className="text-sm font-black tracking-[0.25em] text-lime-400">
                FEATURED SHOW
              </p>


              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                MORNING
                <span className="block text-lime-400">
                  GLORY.
                </span>
              </h2>


              <p className="mt-6 text-lg leading-8 text-gray-400">
                Start your day with Kipsongoo Radio. Morning Glory brings
                inspiration, worship, conversations and positive energy
                to your morning.
              </p>


              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                    ⏰
                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      TIME
                    </p>

                    <p className="font-bold">
                      06:00 AM – 10:00 AM
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                    🎙️
                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      STATION
                    </p>

                    <p className="font-bold">
                      Kipsongoo Radio
                    </p>

                  </div>

                </div>

              </div>


              <Link
                href="/#listen"
                className="mt-9 inline-flex rounded-full bg-lime-400 px-7 py-4 font-black text-black shadow-[0_0_30px_rgba(163,230,53,0.25)] transition hover:scale-105 hover:bg-lime-300"
              >
                ▶ LISTEN LIVE
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 py-20 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-400 px-7 py-14 text-center text-black sm:px-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-green-900/10 blur-3xl" />


          <div className="relative">

            <p className="text-sm font-black tracking-[0.3em]">
              KIPSONGOO RADIO
            </p>


            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">

              YOUR SHOW.
              <br />

              YOUR VOICE.

            </h2>


            <p className="mx-auto mt-5 max-w-xl font-semibold text-black/60">
              Stay connected with Kipsongoo Radio and never miss
              your favourite programs.
            </p>


            <Link
              href="/#listen"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-black text-white transition hover:scale-105"
            >
              ▶ LISTEN LIVE
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            {/* BRAND */}

            <div>

              <div className="text-xl font-black text-lime-400">
                KIPSONGOO RADIO
              </div>

              <p className="mt-4 max-w-sm leading-7 text-gray-500">
                Your voice. Your community. Your radio.
              </p>

            </div>


            {/* LINKS */}

            <div>

              <h3 className="font-black">
                QUICK LINKS
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <Link
                  href="/"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Home
                </Link>

                <Link
                  href="/programs"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Programs
                </Link>

                <Link
                  href="/#news"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  News
                </Link>

                <Link
                  href="/#about"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  About Us
                </Link>

              </div>

            </div>


            {/* SOCIAL */}

            <div>

              <h3 className="font-black">
                CONNECT WITH US
              </h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">

                <div>
                  Facebook
                </div>

                <div>
                  TikTok
                </div>

                <div>
                  YouTube
                </div>

                <div>
                  WhatsApp
                </div>

              </div>

            </div>

          </div>


          {/* COPYRIGHT */}

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-600">

            © {new Date().getFullYear()} Kipsongoo Radio.
            All rights reserved.

          </div>

        </div>

      </footer>

    </main>
  );
}