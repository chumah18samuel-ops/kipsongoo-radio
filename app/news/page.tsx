"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

type NewsItem = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  date: string;
  createdAt?: any;
};

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    // Get only published news from Firebase
    const newsQuery = query(
      collection(db, "news"),
      where("published", "==", true)
    );

    const unsubscribe = onSnapshot(
      newsQuery,
      (snapshot) => {
        const newsData: NewsItem[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            category: data.category || "NEWS",
            title: data.title || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            image: data.image || "",
            published: data.published ?? true,
            date: data.date || "August 2026",
            createdAt: data.createdAt || null,
          };
        });

        // Sort newest first when createdAt exists.
        // If createdAt does not exist, keep Firebase order.
        newsData.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;

          const aTime =
            typeof a.createdAt?.toMillis === "function"
              ? a.createdAt.toMillis()
              : new Date(a.createdAt).getTime();

          const bTime =
            typeof b.createdAt?.toMillis === "function"
              ? b.createdAt.toMillis()
              : new Date(b.createdAt).getTime();

          return bTime - aTime;
        });

        setNews(newsData);
        setLoading(false);
      },
      (error) => {
        console.error("FIREBASE NEWS ERROR:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-lime-400/10 bg-[#050807]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <Link href="/" className="flex items-center gap-3">

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

          </Link>

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
              className="text-lime-400"
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
            className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-black text-black transition hover:scale-105 hover:bg-lime-300"
          >
            LISTEN LIVE
          </Link>

        </div>
      </nav>


      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5">

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">

          <p className="text-sm font-black tracking-[0.3em] text-lime-400">
            FROM THE STATION
          </p>

          <h1 className="mt-4 text-5xl font-black sm:text-7xl">
            LATEST
            <span className="block text-lime-400">
              NEWS.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Stay updated with the latest stories, announcements,
            community news and happenings from Kipsongoo Radio.
          </p>

        </div>

      </section>


      {/* NEWS */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-lime-400/20 border-t-lime-400" />

            <p className="mt-5 text-sm text-gray-500">
              Loading latest news...
            </p>

          </div>
        )}


        {/* EMPTY */}
        {!loading && news.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">

            <div className="text-6xl">
              📰
            </div>

            <h2 className="mt-6 text-2xl font-black">
              No News Available
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-gray-500">
              There are currently no published news articles.
              Check back soon for the latest updates from
              Kipsongoo Radio.
            </p>

          </div>
        )}


        {/* NEWS GRID */}
        {!loading && news.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {news.map((item) => (

              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:bg-lime-400/[0.03]"
              >

                {/* IMAGE */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-lime-400/10">

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-6xl font-black text-lime-400/20">
                      KR
                    </div>
                  )}

                  {/* CATEGORY */}
                  <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-black tracking-widest text-lime-400 backdrop-blur">
                    {item.category}
                  </div>

                </div>


                {/* CONTENT */}
                <div className="p-7">

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-black tracking-widest text-lime-400">
                      {item.category}
                    </span>

                    <span className="text-xs text-gray-600">
                      {item.date}
                    </span>

                  </div>


                  <h2 className="mt-4 text-2xl font-black leading-tight">
                    {item.title}
                  </h2>


                  <p className="mt-4 line-clamp-3 leading-7 text-gray-500">
                    {item.excerpt}
                  </p>


                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="mt-6 text-sm font-black text-lime-400 transition hover:text-lime-300"
                  >
                    READ STORY →
                  </button>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>


      {/* ARTICLE MODAL */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setSelectedNews(null)}
        >

          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-lime-400/20 bg-[#080d09] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL IMAGE */}
            {selectedNews.image ? (
              <div className="h-64 w-full overflow-hidden sm:h-80">

                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="h-full w-full object-cover"
                />

              </div>
            ) : (
              <div className="flex h-52 items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-lime-400/10">

                <div className="text-7xl font-black text-lime-400/20">
                  KR
                </div>

              </div>
            )}


            {/* MODAL CONTENT */}
            <div className="p-7 sm:p-10">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-lime-400/10 px-3 py-1.5 text-xs font-black tracking-widest text-lime-400">
                  {selectedNews.category}
                </span>

                <span className="text-xs text-gray-600">
                  {selectedNews.date}
                </span>

              </div>


              <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                {selectedNews.title}
              </h2>


              <p className="mt-5 text-lg leading-8 text-gray-400">
                {selectedNews.excerpt}
              </p>


              <div className="mt-8 whitespace-pre-line leading-8 text-gray-300">
                {selectedNews.content}
              </div>


              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="mt-8 rounded-full bg-lime-400 px-7 py-3 font-black text-black transition hover:bg-lime-300"
              >
                CLOSE ARTICLE
              </button>

            </div>

          </div>

        </div>
      )}


      {/* CTA */}
      <section className="px-5 pb-20 lg:px-8">

        <div className="mx-auto max-w-7xl rounded-[2rem] bg-lime-400 px-7 py-14 text-center text-black">

          <p className="text-sm font-black tracking-[0.3em]">
            KIPSONGOO RADIO
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            YOUR VOICE.
            <br />
            YOUR COMMUNITY.
          </h2>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 font-black text-white transition hover:scale-105"
          >
            BACK HOME
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-5 py-10 text-center lg:px-8">

          <div className="text-xl font-black text-lime-400">
            KIPSONGOO RADIO
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Your voice. Your community. Your radio.
          </p>

          <div className="mt-6 text-xs text-gray-700">
            © {new Date().getFullYear()} Kipsongoo Radio. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}