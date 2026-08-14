
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type ContactData = {
  whatsapp: string;
  email: string;
  phone: string;
  location: string;
  facebook: string;
  tiktok: string;
  youtube: string;
};

const defaultContact: ContactData = {
  whatsapp: "0723393968",
  email: "Chumah18samuel@gmail.com",
  phone: "0723393968",
  location: "Kipsongoo, Kitale, Kenya",
  facebook: "",
  tiktok: "",
  youtube: "",
};

export default function AdminContactsPage() {
  const [contact, setContact] =
    useState<ContactData>(defaultContact);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------
  // LOAD CONTACT INFORMATION FROM FIREBASE
  // ---------------------------------------
  useEffect(() => {
    const loadContact = async () => {
      try {
        setLoading(true);
        setError("");

        const contactRef = doc(
          db,
          "settings",
          "contact"
        );

        const contactSnap = await getDoc(contactRef);

        if (contactSnap.exists()) {
          setContact({
            ...defaultContact,
            ...(contactSnap.data() as Partial<ContactData>),
          });
        }
      } catch (err) {
        console.error("Error loading contact:", err);
        setError(
          "Failed to load contact information from Firebase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  // ---------------------------------------
  // UPDATE INPUT
  // ---------------------------------------
  const updateField = (
    field: keyof ContactData,
    value: string
  ) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  // ---------------------------------------
  // SAVE TO FIRESTORE
  // ---------------------------------------
  const saveChanges = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const contactRef = doc(
        db,
        "settings",
        "contact"
      );

      await setDoc(contactRef, {
        ...contact,
        updatedAt: new Date(),
      });

      setSaved(true);
    } catch (err) {
      console.error("Error saving contact:", err);

      setError(
        "Failed to save contact information. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // LOADING SCREEN
  // ---------------------------------------
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050807] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-lime-400" />

          <p className="font-bold text-gray-400">
            Loading contact information...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* HEADER */}
      <header className="border-b border-lime-400/10 bg-[#080d09]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">

          <div>
            <Link
              href="/admin"
              className="text-sm font-bold text-gray-500 transition hover:text-lime-400"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-2 text-3xl font-black">
              Contact Information
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage the contact details displayed on
              Kipsongoo Radio.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black">
            KR
          </div>

        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-8">

          <div className="mb-8">
            <p className="text-xs font-black tracking-[0.25em] text-lime-400">
              CONTACT DETAILS
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Station Contact Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Changes made here are saved directly to
              Firebase Firestore.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">

            {/* WHATSAPP */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                WhatsApp Number
              </label>

              <input
                type="text"
                value={contact.whatsapp}
                onChange={(e) =>
                  updateField("whatsapp", e.target.value)
                }
                placeholder="0723393968"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Phone Number
              </label>

              <input
                type="text"
                value={contact.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                placeholder="0723393968"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={contact.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                placeholder="Chumah18samuel@gmail.com"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Location
              </label>

              <input
                type="text"
                value={contact.location}
                onChange={(e) =>
                  updateField("location", e.target.value)
                }
                placeholder="Kipsongoo, Kitale, Kenya"
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* FACEBOOK */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                Facebook URL
              </label>

              <input
                type="url"
                value={contact.facebook}
                onChange={(e) =>
                  updateField("facebook", e.target.value)
                }
                placeholder="https://facebook.com/..."
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* TIKTOK */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-300">
                TikTok URL
              </label>

              <input
                type="url"
                value={contact.tiktok}
                onChange={(e) =>
                  updateField("tiktok", e.target.value)
                }
                placeholder="https://tiktok.com/@..."
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

            {/* YOUTUBE */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-bold text-gray-300">
                YouTube Channel URL
              </label>

              <input
                type="url"
                value={contact.youtube}
                onChange={(e) =>
                  updateField("youtube", e.target.value)
                }
                placeholder="https://youtube.com/@..."
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-700 focus:border-lime-400"
              />
            </div>

          </div>

          {/* SAVE */}
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              {saved && (
                <p className="text-sm font-bold text-lime-400">
                  ✓ Contact information saved successfully
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={saveChanges}
              disabled={saving}
              className="rounded-xl bg-lime-400 px-7 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>

          </div>
        </div>

        {/* PREVIEW */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#080d09] p-6">

          <p className="text-xs font-black tracking-[0.25em] text-lime-400">
            LIVE PREVIEW
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Kipsongoo Radio
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            {/* WHATSAPP */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                WhatsApp
              </p>

              <p className="mt-1 font-bold text-lime-400">
                {contact.whatsapp || "Not provided"}
              </p>
            </div>

            {/* EMAIL */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="mt-1 font-bold">
                {contact.email || "Not provided"}
              </p>
            </div>

            {/* PHONE */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Phone
              </p>

              <p className="mt-1 font-bold">
                {contact.phone || "Not provided"}
              </p>
            </div>

            {/* LOCATION */}
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-gray-500">
                Location
              </p>

              <p className="mt-1 font-bold">
                {contact.location || "Not provided"}
              </p>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
