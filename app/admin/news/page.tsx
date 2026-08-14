"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type NewsItem = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  published: boolean;
  date: string;
  createdAt?: unknown;
};

const categories = [
  "COMMUNITY",
  "MUSIC",
  "LIVE",
  "ENTERTAINMENT",
  "SPORTS",
  "TECHNOLOGY",
  "EVENTS",
  "ANNOUNCEMENT",
];

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    category: "COMMUNITY",
    title: "",
    excerpt: "",
    content: "",
    image: "",
    published: true,
  });

  // ============================================================
  // LOAD NEWS FROM FIRESTORE
  // ============================================================

  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");

      const newsRef = collection(db, "news");

      const newsQuery = query(
        newsRef,
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(newsQuery);

      const newsData: NewsItem[] = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          category: data.category || "COMMUNITY",
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          image: data.image || "",
          published: data.published ?? true,
          date: data.date || "",
          createdAt: data.createdAt,
        };
      });

      setNews(newsData);
    } catch (error) {
      console.error("Error loading news:", error);

      setError(
        "Unable to load news from Firebase. Check your Firestore setup and security rules."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  // ============================================================
  // RESET FORM
  // ============================================================

  const resetForm = () => {
    setForm({
      category: "COMMUNITY",
      title: "",
      excerpt: "",
      content: "",
      image: "",
      published: true,
    });

    setEditingId(null);
  };

  // ============================================================
  // OPEN ADD FORM
  // ============================================================

  const openAddForm = () => {
    resetForm();
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // OPEN EDIT FORM
  // ============================================================

  const openEditForm = (item: NewsItem) => {
    setForm({
      category: item.category,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      published: item.published,
    });

    setEditingId(item.id);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // ADD / UPDATE NEWS
  // ============================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter a news title.");
      return;
    }

    if (!form.excerpt.trim()) {
      alert("Please enter a short description.");
      return;
    }

    if (!form.content.trim()) {
      alert("Please enter the full article.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      // --------------------------------------------------------
      // EDIT EXISTING ARTICLE
      // --------------------------------------------------------

      if (editingId !== null) {
        const newsDocument = doc(
          db,
          "news",
          editingId
        );

        await updateDoc(newsDocument, {
          category: form.category,
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          content: form.content.trim(),
          image: form.image.trim(),
          published: form.published,
          updatedAt: serverTimestamp(),
        });

        alert("News article updated successfully.");
      }

      // --------------------------------------------------------
      // CREATE NEW ARTICLE
      // --------------------------------------------------------

      else {
        const today = new Date().toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );

        await addDoc(collection(db, "news"), {
          category: form.category,
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          content: form.content.trim(),
          image: form.image.trim(),
          published: form.published,
          date: today,
          createdAt: serverTimestamp(),
        });

        alert("News article added successfully.");
      }

      resetForm();
      setShowForm(false);

      await loadNews();
    } catch (error) {
      console.error("Error saving news:", error);

      setError(
        "Could not save the article. Check your Firebase Firestore configuration and rules."
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // DELETE NEWS
  // ============================================================

  const deleteNews = async (id: string) => {
    const item = news.find(
      (newsItem) => newsItem.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Delete "${item.title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteDoc(
        doc(db, "news", id)
      );

      setNews((current) =>
        current.filter(
          (newsItem) => newsItem.id !== id
        )
      );

      alert("News article deleted.");
    } catch (error) {
      console.error("Error deleting news:", error);

      setError(
        "Could not delete the article."
      );
    }
  };

  // ============================================================
  // PUBLISH / UNPUBLISH
  // ============================================================

  const togglePublished = async (item: NewsItem) => {
    try {
      setError("");

      await updateDoc(
        doc(db, "news", item.id),
        {
          published: !item.published,
          updatedAt: serverTimestamp(),
        }
      );

      setNews((current) =>
        current.map((newsItem) =>
          newsItem.id === item.id
            ? {
                ...newsItem,
                published: !newsItem.published,
              }
            : newsItem
        )
      );
    } catch (error) {
      console.error(
        "Error changing publication status:",
        error
      );

      setError(
        "Could not change the publication status."
      );
    }
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredNews = news.filter((item) => {
    const queryText = search.toLowerCase();

    return (
      item.title
        .toLowerCase()
        .includes(queryText) ||
      item.category
        .toLowerCase()
        .includes(queryText) ||
      item.excerpt
        .toLowerCase()
        .includes(queryText)
    );
  });

  // ============================================================
  // STATISTICS
  // ============================================================

  const publishedCount = news.filter(
    (item) => item.published
  ).length;

  const draftCount = news.filter(
    (item) => !item.published
  ).length;

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-lime-400/10 bg-[#080d09]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.4)]">
              KR
            </div>

            <div>

              <div className="text-lg font-black tracking-wider text-lime-400">
                KIPSONGOO
              </div>

              <div className="text-[10px] tracking-[0.3em] text-gray-500">
                RADIO ADMIN
              </div>

            </div>

          </div>

          <Link
            href="/admin"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
          >
            ← DASHBOARD
          </Link>

        </div>

      </header>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">

        {/* TITLE */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              CONTENT MANAGEMENT
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              NEWS
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-gray-500">
              Publish community news, announcements,
              music updates and stories from Kipsongoo Radio.
            </p>

          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="rounded-full bg-lime-400 px-6 py-3 font-black text-black shadow-[0_0_25px_rgba(163,230,53,0.25)] transition hover:scale-105 hover:bg-lime-300"
          >
            + ADD NEWS
          </button>

        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-300">

            <div className="font-black">
              Firebase Error
            </div>

            <div className="mt-1">
              {error}
            </div>

          </div>
        )}

        {/* ====================================================
            STATISTICS
        ==================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="text-3xl font-black text-lime-400">
              {news.length}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Total Articles
            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="text-3xl font-black text-lime-400">
              {publishedCount}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Published
            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

            <div className="text-3xl font-black text-yellow-400">
              {draftCount}
            </div>

            <div className="mt-1 text-sm text-gray-500">
              Drafts
            </div>

          </div>

        </div>

        {/* ====================================================
            FORM
        ==================================================== */}

        {showForm && (

          <div className="mt-10 rounded-3xl border border-lime-400/20 bg-[#080d09] p-6 shadow-2xl sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-black tracking-[0.2em] text-lime-400">
                  {editingId !== null
                    ? "EDIT ARTICLE"
                    : "NEW ARTICLE"}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {editingId !== null
                    ? "Update News Article"
                    : "Create News Article"}
                </h2>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-red-400 hover:text-red-400"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5 md:grid-cols-2"
            >

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-lime-400"
                >

                  {categories.map((category) => (

                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>

                  ))}

                </select>

              </div>

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Image URL
                </label>

                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.value,
                    })
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>

              {/* TITLE */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  News Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter the news headline..."
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>

              {/* EXCERPT */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Short Description
                </label>

                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      excerpt: e.target.value,
                    })
                  }
                  placeholder="Short description shown on the news cards..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>

              {/* CONTENT */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold text-gray-300">
                  Full Article
                </label>

                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      content: e.target.value,
                    })
                  }
                  placeholder="Write the complete news article..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-700 focus:border-lime-400"
                />

              </div>

              {/* PUBLISH */}

              <div className="md:col-span-2">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        published: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-lime-400"
                  />

                  <span className="text-sm font-bold">
                    Publish this article
                  </span>

                </label>

                <p className="mt-2 text-xs text-gray-600">
                  Uncheck this if you want to save it as a draft.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-3 pt-3 sm:flex-row md:col-span-2">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-lime-400 px-7 py-3 font-black text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "SAVING..."
                    : editingId !== null
                    ? "SAVE CHANGES"
                    : "PUBLISH NEWS"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-white/10 px-7 py-3 font-bold text-gray-400 transition hover:border-white/30 hover:text-white"
                >
                  CANCEL
                </button>

              </div>

            </form>

          </div>

        )}

        {/* ====================================================
            SEARCH
        ==================================================== */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news..."
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none placeholder:text-gray-600 focus:border-lime-400 md:max-w-xl"
          />

          <button
            type="button"
            onClick={loadNews}
            className="rounded-2xl border border-white/10 px-6 py-4 text-sm font-black transition hover:border-lime-400 hover:text-lime-400"
          >
            ↻ REFRESH
          </button>

        </div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

            <div className="text-3xl">
              ⏳
            </div>

            <h3 className="mt-4 text-xl font-black">
              Loading news...
            </h3>

            <p className="mt-2 text-gray-600">
              Connecting to Firebase.
            </p>

          </div>

        ) : (

          /* ==================================================
             NEWS LIST
          ================================================== */

          <div className="mt-8 space-y-5">

            {filteredNews.length === 0 ? (

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

                <div className="text-4xl">
                  📰
                </div>

                <h3 className="mt-4 text-xl font-black">
                  No news found
                </h3>

                <p className="mt-2 text-gray-600">
                  {news.length === 0
                    ? "Your Firebase news collection is empty. Click ADD NEWS to create your first article."
                    : "Try another search or create a new article."}
                </p>

              </div>

            ) : (

              filteredNews.map((item) => (

                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20"
                >

                  <div className="flex flex-col gap-6 lg:flex-row">

                    {/* IMAGE */}

                    <div className="flex h-48 w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/50 to-lime-400/5 lg:w-64">

                      {item.image ? (

                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="text-5xl font-black text-lime-400/30">
                          KR
                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-black text-lime-400">
                          {item.category}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            item.published
                              ? "bg-lime-400/10 text-lime-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}
                        >
                          {item.published
                            ? "PUBLISHED"
                            : "DRAFT"}
                        </span>

                        <span className="text-xs text-gray-600">
                          {item.date}
                        </span>

                      </div>

                      <h2 className="mt-4 text-2xl font-black">
                        {item.title}
                      </h2>

                      <p className="mt-3 leading-7 text-gray-500">
                        {item.excerpt}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(item)
                          }
                          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-black transition hover:border-lime-400 hover:text-lime-400"
                        >
                          EDIT
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            togglePublished(item)
                          }
                          className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-black transition hover:border-lime-400 hover:text-lime-400"
                        >
                          {item.published
                            ? "UNPUBLISH"
                            : "PUBLISH"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteNews(item.id)
                          }
                          className="rounded-xl border border-red-400/10 px-5 py-2.5 text-sm font-black text-red-400 transition hover:bg-red-400/10"
                        >
                          DELETE
                        </button>

                      </div>

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        )}

      </section>

    </main>
  );
}