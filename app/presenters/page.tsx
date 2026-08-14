"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

type Presenter = {
  id: string;
  name: string;
  nickname: string;
  role: string;
  program: string;
  bio: string;
  active: boolean;
};

export default function PresentersPage() {
  const [presenters, setPresenters] = useState<Presenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const presentersQuery = query(
      collection(db, "presenters"),
      where("active", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      presentersQuery,
      (snapshot) => {
        const presenterData: Presenter[] = snapshot.docs.map((item) => {
          const data = item.data();

          return {
            id: item.id,
            name: data.name || "",
            nickname: data.nickname || "",
            role: data.role || "Radio Presenter",
            program: data.program || "",
            bio: data.bio || "",
            active: data.active ?? true,
          };
        });

        setPresenters(presenterData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading public presenters:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-lime-400/10 bg-[#050807]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

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


          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">

            <Link
              href="/"
              className="transition hover:text-lime-400"
            >
              Home
            </Link>

            <Link
              href="/presenters"
              className="text-lime-400"
            >
              Presenters
            </Link>

            <Link
              href="/news"
              className="transition hover:text-lime-400"
            >
              News
            </Link>

            <Link
              href="/gallery"
              className="transition hover:text-lime-400"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-lime-400"
            >
              Contact
            </Link>

          </div>


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

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-28">

          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-5 py-2 text-xs font-black tracking-[0.2em] text-lime-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

            MEET THE TEAM

          </div>


          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-8xl">

            OUR

            <span className="block text-lime-400">
              PRESENTERS.
            </span>

          </h1>


          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400">

            Meet the voices behind Kipsongoo Radio — the people bringing
            music, conversations, entertainment and community stories
            directly to you.

          </p>

        </div>

      </section>


      {/* =====================================================
          PRESENTERS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        <div className="mb-12">

          <p className="text-sm font-black tracking-[0.25em] text-lime-400">
            ON AIR TEAM
          </p>

          <h2 className="mt-3 text-4xl font-black sm:text-5xl">
            RADIO PRESENTERS
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            The voices, personalities and energy that make Kipsongoo Radio
            what it is.
          </p>

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (

          <div className="grid gap-6 md:grid-cols-3">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >

                <div className="h-80 animate-pulse bg-white/5" />

                <div className="space-y-4 p-7">

                  <div className="h-3 w-32 animate-pulse rounded bg-white/10" />

                  <div className="h-8 w-48 animate-pulse rounded bg-white/10" />

                  <div className="h-20 animate-pulse rounded bg-white/5" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!loading && presenters.length === 0 && (

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

            <div className="text-6xl">
              🎙️
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Presenters Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
              Our Kipsongoo Radio presenters will be introduced here soon.
              Stay connected with us.
            </p>

            <Link
              href="/#listen"
              className="mt-7 inline-flex rounded-full bg-lime-400 px-7 py-3 font-black text-black transition hover:bg-lime-300"
            >
              LISTEN LIVE
            </Link>

          </div>

        )}


        {/* =====================================================
            FIREBASE PRESENTERS
        ===================================================== */}

        {!loading && presenters.length > 0 && (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {presenters.map((presenter) => (

              <article
                key={presenter.id}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-lime-400/30"
              >

                {/* PHOTO / AVATAR AREA */}

                <div className="relative flex h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-lime-300 via-green-600 to-green-950">

                  <div className="absolute inset-0 opacity-20">

                    <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border-[25px] border-black" />

                    <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border-[35px] border-black" />

                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black/30" />

                  </div>


                  <div className="relative text-center">

                    <div className="text-7xl font-black tracking-tighter text-black">
                      {presenter.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="mt-2 text-xs font-black tracking-[0.35em] text-black/70">
                      KIPSONGOO RADIO
                    </div>

                  </div>

                </div>


                {/* DETAILS */}

                <div className="p-7">

                  <span className="text-xs font-black tracking-[0.2em] text-lime-400">
                    {presenter.role.toUpperCase()}
                  </span>


                  <h3 className="mt-3 text-3xl font-black">
                    {presenter.name}
                  </h3>


                  {presenter.nickname && (

                    <p className="mt-1 text-sm font-bold text-gray-500">
                      "{presenter.nickname}"
                    </p>

                  )}


                  {/* PROGRAM */}

                  {presenter.program && (

                    <div className="mt-5 rounded-xl border border-lime-400/10 bg-lime-400/5 px-4 py-3">

                      <p className="text-[10px] font-black tracking-[0.2em] text-lime-400">
                        PROGRAM
                      </p>

                      <p className="mt-1 font-bold text-gray-300">
                        {presenter.program}
                      </p>

                    </div>

                  )}


                  {/* BIO */}

                  {presenter.bio && (

                    <p className="mt-5 leading-7 text-gray-500">
                      {presenter.bio}
                    </p>

                  )}


                  <div className="mt-6 h-px bg-white/10" />


                  <Link
                    href="/contact"
                    className="mt-5 inline-block text-sm font-black text-lime-400 transition hover:text-lime-300"
                  >
                    CONTACT TEAM →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 py-20 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-400 px-7 py-14 text-center text-black sm:px-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-black tracking-[0.3em]">
              KIPSONGOO RADIO
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">
              WANT TO CONNECT
              <br />
              WITH OUR TEAM?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-black/70">
              Get in touch with Kipsongoo Radio for programs,
              advertising, media production and partnerships.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-black text-white transition hover:scale-105"
            >
              CONTACT US →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-4">

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
                  href="/presenters"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Presenters
                </Link>

                <Link
                  href="/news"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  News
                </Link>

                <Link
                  href="/gallery"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Gallery
                </Link>

                <Link
                  href="/contact"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Contact
                </Link>

              </div>

            </div>


            {/* RADIO */}

            <div>

              <h3 className="font-black">
                KIPSONGOO RADIO
              </h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">

                <div>Morning Glory</div>
                <div>Mid-Morning</div>
                <div>Afternoon Drive</div>
                <div>Live Broadcasts</div>

              </div>

            </div>


            {/* CONTACT */}

            <div>

              <h3 className="font-black">
                CONTACT
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <a
                  href="https://wa.me/254723393968"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  WhatsApp: 0723 393 968
                </a>

                <a
                  href="mailto:Chumah18samuel@gmail.com"
                  className="block break-all text-gray-500 transition hover:text-lime-400"
                >
                  Chumah18samuel@gmail.com
                </a>

                <p className="text-gray-600">
                  Samchu Communications
                  <br />
                  and Media Ltd
                </p>

              </div>

            </div>

          </div>


          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">

            <div>
              © {new Date().getFullYear()} Kipsongoo Radio.
              All rights reserved.
            </div>

            <div className="text-gray-700">
              YOUR VOICE. YOUR COMMUNITY.
            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}