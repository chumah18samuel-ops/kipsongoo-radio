"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
};

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  /*
   * =========================================================
   * LOAD GALLERY FROM FIREBASE
   * =========================================================
   */

  useEffect(() => {
    const galleryQuery = query(
      collection(db, "gallery"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      galleryQuery,
      (snapshot) => {
        const galleryData: GalleryItem[] = snapshot.docs
          .map((item) => {
            const data = item.data();

            return {
              id: item.id,
              title: data.title || "",
              category: data.category || "OTHER",
              image: data.image || "",
              date: data.date || "",
            };
          })
          // Only show items that actually have an image
          .filter((item) => item.image);

        setGalleryItems(galleryData);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading gallery:", error);
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

          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.4)]">
              KR
            </div>

            <div>

              <div className="text-lg font-black tracking-wider text-lime-400">
                KIPSONGOO
              </div>

              <div className="text-[10px] tracking-[0.35em] text-gray-400">
                RADIO
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
              className="transition hover:text-lime-400"
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
              className="text-lime-400"
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
            className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_20px_rgba(163,230,53,0.25)] transition hover:scale-105 hover:bg-lime-300"
          >
            LISTEN LIVE
          </Link>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/5">

        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">

          <p className="text-sm font-black tracking-[0.3em] text-lime-400">
            KIPSONGOO RADIO
          </p>

          <h1 className="mt-4 text-5xl font-black sm:text-7xl">

            OUR

            <span className="block text-lime-400">
              GALLERY.
            </span>

          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Explore moments from Kipsongoo Radio, our presenters,
            studio, community activities and special broadcasts.
          </p>

        </div>

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        {/* SECTION HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              MEDIA LIBRARY
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              KIPSONGOO MOMENTS
            </h2>

          </div>

          {!loading && galleryItems.length > 0 && (
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-gray-400">
              {galleryItems.length}{" "}
              {galleryItems.length === 1 ? "Photo" : "Photos"}
            </div>
          )}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              >

                <div className="aspect-[4/3] animate-pulse bg-white/5" />

                <div className="space-y-3 p-6">

                  <div className="h-3 w-20 animate-pulse rounded bg-white/10" />

                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />

                  <div className="h-3 w-24 animate-pulse rounded bg-white/10" />

                </div>

              </div>

            ))}

          </div>

        )}


        {/* =================================================
            EMPTY GALLERY
        ================================================= */}

        {!loading && galleryItems.length === 0 && (

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-24 text-center">

            <div className="text-6xl">
              🖼️
            </div>

            <h3 className="mt-5 text-2xl font-black">
              Gallery Coming Soon
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              We are preparing photos and memories from
              Kipsongoo Radio. Check back soon.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-full bg-lime-400 px-6 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300"
            >
              BACK TO HOME
            </Link>

          </div>

        )}


        {/* =================================================
            FIREBASE GALLERY
        ================================================= */}

        {!loading && galleryItems.length > 0 && (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {galleryItems.map((item) => (

              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-lime-400/40 hover:shadow-[0_20px_50px_rgba(163,230,53,0.08)]"
              >

                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden bg-[#080d09]">

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />


                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />


                  {/* CATEGORY */}

                  <div className="absolute left-4 top-4 rounded-full border border-lime-400/20 bg-black/70 px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-lime-400 backdrop-blur-md">
                    {item.category}
                  </div>

                </div>


                {/* DETAILS */}

                <div className="p-6">

                  <p className="text-xs font-black tracking-[0.2em] text-lime-400">
                    {item.category}
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    {item.title}
                  </h2>

                  {item.date && (
                    <p className="mt-3 text-xs text-gray-500">
                      {item.date}
                    </p>
                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-5 pb-20 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-400 px-7 py-14 text-center text-black sm:px-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/30 blur-3xl" />

          <div className="relative">

            <p className="text-xs font-black tracking-[0.3em]">
              KIPSONGOO RADIO
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black sm:text-5xl">
              HAVE A MOMENT TO SHARE?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-black/70">
              Connect with Kipsongoo Radio and be part of our
              growing community.
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
                  className="block text-lime-400"
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


          <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-600">

            © {new Date().getFullYear()} Kipsongoo Radio.
            All rights reserved.

          </div>

        </div>

      </footer>

    </main>
  );
}