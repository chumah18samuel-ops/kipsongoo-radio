
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
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

export default function ContactPage() {
  const [contact, setContact] = useState<ContactData>(defaultContact);
  const [loading, setLoading] = useState(true);

  // Load contact information from Firebase
  useEffect(() => {
    const loadContact = async () => {
      try {
        const contactRef = doc(db, "settings", "contact");
        const contactSnap = await getDoc(contactRef);

        if (contactSnap.exists()) {
          const data = contactSnap.data();

          setContact({
            whatsapp:
              typeof data.whatsapp === "string"
                ? data.whatsapp
                : defaultContact.whatsapp,

            email:
              typeof data.email === "string"
                ? data.email
                : defaultContact.email,

            phone:
              typeof data.phone === "string"
                ? data.phone
                : defaultContact.phone,

            location:
              typeof data.location === "string"
                ? data.location
                : defaultContact.location,

            facebook:
              typeof data.facebook === "string"
                ? data.facebook
                : defaultContact.facebook,

            tiktok:
              typeof data.tiktok === "string"
                ? data.tiktok
                : defaultContact.tiktok,

            youtube:
              typeof data.youtube === "string"
                ? data.youtube
                : defaultContact.youtube,
          });
        }
      } catch (error) {
        console.error("Failed to load contact information:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  // Create WhatsApp link
  const whatsappNumber = contact.whatsapp
    .replace(/\D/g, "")
    .replace(/^0/, "254");

  const whatsappLink =
    whatsappNumber.length > 0
      ? "https://wa.me/" + whatsappNumber
      : "#";

  // Loading screen
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

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-lime-400/10 bg-[#050807]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 font-black text-black">
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

          {/* DESKTOP NAVIGATION */}
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
              className="transition hover:text-lime-400"
            >
              Gallery
            </Link>

            <Link
              href="/contact"
              className="text-lime-400"
            >
              Contact
            </Link>
          </div>

          {/* LISTEN LIVE */}
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
            GET IN TOUCH
          </p>

          <h1 className="mt-4 text-5xl font-black sm:text-7xl">
            CONTACT
            <span className="block text-lime-400">
              KIPSONGOO.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Have a story, advertisement, partnership idea or
            message for Kipsongoo Radio? We would love to hear
            from you.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* CONTACT DETAILS */}
          <div>

            <p className="text-sm font-black tracking-[0.25em] text-lime-400">
              CONTACT DETAILS
            </p>

            <h2 className="mt-4 text-4xl font-black">
              LET&apos;S CONNECT.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-gray-500">
              Reach Kipsongoo Radio for inquiries, advertising,
              partnerships, interviews, programming and community
              stories.
            </p>

            <div className="mt-10 space-y-5">

              {/* WHATSAPP */}
              {contact.whatsapp && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-400/30 hover:bg-lime-400/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
                    ☎
                  </div>

                  <div>
                    <div className="text-xs font-black tracking-widest text-lime-400">
                      WHATSAPP / PHONE
                    </div>

                    <div className="mt-1 font-bold">
                      {contact.whatsapp}
                    </div>
                  </div>
                </a>
              )}

              {/* PHONE */}
              {contact.phone &&
                contact.phone !== contact.whatsapp && (
                  <a
                    href={"tel:" + contact.phone}
                    className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-400/30 hover:bg-lime-400/[0.04]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
                      📞
                    </div>

                    <div>
                      <div className="text-xs font-black tracking-widest text-lime-400">
                        PHONE
                      </div>

                      <div className="mt-1 font-bold">
                        {contact.phone}
                      </div>
                    </div>
                  </a>
                )}

              {/* EMAIL */}
              {contact.email && (
                <a
                  href={"mailto:" + contact.email}
                  className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-lime-400/30 hover:bg-lime-400/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
                    @
                  </div>

                  <div>
                    <div className="text-xs font-black tracking-widest text-lime-400">
                      EMAIL
                    </div>

                    <div className="mt-1 break-all font-bold">
                      {contact.email}
                    </div>
                  </div>
                </a>
              )}

              {/* LOCATION */}
              {contact.location && (
                <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400 text-xl text-black">
                    📍
                  </div>

                  <div>
                    <div className="text-xs font-black tracking-widest text-lime-400">
                      LOCATION
                    </div>

                    <div className="mt-1 font-bold">
                      {contact.location}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SOCIAL MEDIA */}
            {(contact.facebook ||
              contact.tiktok ||
              contact.youtube) && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7">

                <p className="text-xs font-black tracking-widest text-lime-400">
                  FOLLOW KIPSONGOO RADIO
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  {contact.facebook && (
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
                    >
                      Facebook
                    </a>
                  )}

                  {contact.tiktok && (
                    <a
                      href={contact.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
                    >
                      TikTok
                    </a>
                  )}

                  {contact.youtube && (
                    <a
                      href={contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* COMPANY */}
            <div className="mt-8 rounded-3xl border border-lime-400/20 bg-lime-400/[0.04] p-7">

              <p className="text-xs font-black tracking-widest text-lime-400">
                TECH &amp; MEDIA PARTNER
              </p>

              <h3 className="mt-3 text-2xl font-black">
                SAMCHU COMMUNICATIONS AND MEDIA LTD
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Technology, communications and media support for
                Kipsongoo Radio and the wider community.
              </p>

              <p className="mt-4 text-sm font-bold text-gray-400">
                TECH TEAM:{" "}
                <span className="text-lime-400">
                  KEN #FOREMAN
                </span>{" "}
                &amp;{" "}
                <span className="text-lime-400">
                  SAMCHU
                </span>
              </p>
            </div>
          </div>

          {/* MESSAGE FORM */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-10">

            <p className="text-sm font-black tracking-[0.25em] text-lime-400">
              SEND US A MESSAGE
            </p>

            <h2 className="mt-3 text-3xl font-black">
              TALK TO THE STATION
            </h2>

            <form className="mt-8 space-y-5">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-400">
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-400"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-400">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-400"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-400">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="07XX XXX XXX"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-400"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-400">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-lime-400"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-lime-400 px-6 py-4 font-black text-black transition hover:scale-[1.01] hover:bg-lime-300"
              >
                SEND MESSAGE →
              </button>

              <p className="text-center text-xs text-gray-600">
                We&apos;ll get back to you as soon as possible.
              </p>
            </form>
          </div>
        </div>
      </section>

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
            BACK TO HOME
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
            © {new Date().getFullYear()} Kipsongoo Radio.
            All rights reserved.
          </div>

        </div>
      </footer>
    </main>
  );
}