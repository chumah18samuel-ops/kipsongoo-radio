"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "../../lib/firebase";

const adminSections = [
  {
    title: "News",
    description: "Add, edit and remove Kipsongoo Radio news articles.",
    href: "/admin/news",
    icon: "📰",
  },
  {
    title: "Presenters",
    description: "Manage radio presenters, names, roles and profiles.",
    href: "/admin/presenters",
    icon: "🎙️",
  },
  {
    title: "Programs",
    description: "Manage radio programs, presenters, times and descriptions.",
    href: "/admin/programs",
    icon: "📻",
  },
  {
    title: "Gallery",
    description: "Upload, edit and remove station photos and media.",
    href: "/admin/gallery",
    icon: "🖼️",
  },
  {
    title: "Contact",
    description:
      "Manage phone, WhatsApp, email and social media details.",
    href: "/admin/contact",
    icon: "📞",
  },
  {
    title: "Settings",
    description:
      "Manage station name, logo, tagline, streaming information and website settings.",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    try {
      await signOut(auth);

      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);

      alert("Unable to logout. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050807] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-lime-400/10 bg-[#080d09]">

        <div className="mx-auto max-w-7xl px-5 py-5 lg:px-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            {/* LOGO */}

            <Link href="/" className="group">

              <div className="flex items-center gap-3">

                <div className="relative h-12 w-12 overflow-hidden rounded-xl">
  <img
    src="/images/logo.jpeg"
    alt="Kipsongoo Radio"
    className="h-full w-full object-contain"
  />
</div>

                <div>

                  <div className="text-xl font-black tracking-wider text-lime-400">
                    KIPSONGOO
                  </div>

                  <div className="text-[10px] font-semibold tracking-[0.35em] text-gray-400">
                    RADIO ADMIN
                  </div>

                </div>

              </div>

            </Link>


            {/* HEADER ACTIONS */}

            <div className="flex flex-wrap items-center gap-3">

              {/* VIEW WEBSITE */}

              <Link
                href="/"
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
              >
                ← VIEW WEBSITE
              </Link>


              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-red-400/20 px-5 py-2.5 text-sm font-bold text-red-400 transition hover:border-red-400/50 hover:bg-red-400/10"
              >
                LOGOUT
              </button>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        {/* TITLE */}

        <div className="mb-10">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-black tracking-[0.25em] text-lime-400">
                CONTROL PANEL
              </p>

              <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                RADIO ADMIN DASHBOARD
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-gray-500">
                Manage Kipsongoo Radio website content from one place.
                Add presenters, publish news, update programs, manage
                the gallery, contact information and station settings.
              </p>

            </div>

            {/* ADMIN ACCOUNT */}

            <div className="rounded-2xl border border-lime-400/10 bg-lime-400/[0.03] px-5 py-4">

              <div className="text-[10px] font-black tracking-[0.25em] text-gray-600">
                SIGNED IN AS
              </div>

              <div className="mt-1 text-sm font-bold text-lime-400">
                {auth.currentUser?.email || "Administrator"}
              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            QUICK STATS
        ===================================================== */}

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* NEWS */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20">

            <div className="text-3xl font-black text-lime-400">
              0
            </div>

            <div className="mt-2 text-sm text-gray-500">
              News Articles
            </div>

          </div>


          {/* PRESENTERS */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20">

            <div className="text-3xl font-black text-lime-400">
              4
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Presenters
            </div>

          </div>


          {/* PROGRAMS */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20">

            <div className="text-3xl font-black text-lime-400">
              3
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Programs
            </div>

          </div>


          {/* GALLERY */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/20">

            <div className="text-3xl font-black text-lime-400">
              0
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Gallery Photos
            </div>

          </div>

        </div>


        {/* =====================================================
            MANAGEMENT
        ===================================================== */}

        <div className="mb-6">

          <p className="text-xs font-black tracking-[0.25em] text-gray-600">
            WEBSITE MANAGEMENT
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Manage Your Station
          </h2>

        </div>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {adminSections.map((section) => (

            <Link
              key={section.title}
              href={section.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:bg-lime-400/[0.04] hover:shadow-[0_10px_40px_rgba(163,230,53,0.05)]"
            >

              <div className="flex items-start justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400/10 text-2xl">
                  {section.icon}
                </div>

                <span className="text-xl text-gray-700 transition group-hover:text-lime-400">
                  →
                </span>

              </div>

              <h2 className="mt-7 text-2xl font-black">
                {section.title}
              </h2>

              <p className="mt-3 leading-7 text-gray-500">
                {section.description}
              </p>

              <div className="mt-6 text-sm font-black text-lime-400">
                MANAGE {section.title.toUpperCase()} →
              </div>

            </Link>

          ))}

        </div>


        {/* =====================================================
            STATION INFORMATION
        ===================================================== */}

        <div className="mt-12 rounded-3xl border border-lime-400/10 bg-lime-400/[0.03] p-7">

          <p className="text-xs font-black tracking-[0.25em] text-lime-400">
            STATION INFORMATION
          </p>

          <h2 className="mt-3 text-2xl font-black">
            Kipsongoo Radio
          </h2>

          <p className="mt-2 max-w-2xl leading-7 text-gray-500">
            Your voice. Your community. Your radio.
          </p>

          <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">

            {/* WHATSAPP */}

            <div>

              <div className="text-gray-600">
                WhatsApp
              </div>

              <a
                href="https://wa.me/254723393968"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-bold transition hover:text-lime-400"
              >
                0723 393 968
              </a>

            </div>


            {/* EMAIL */}

            <div>

              <div className="text-gray-600">
                Email
              </div>

              <a
                href="mailto:Chumah18samuel@gmail.com"
                className="mt-1 inline-block font-bold transition hover:text-lime-400"
              >
                Chumah18samuel@gmail.com
              </a>

            </div>


            {/* COMPANY */}

            <div>

              <div className="text-gray-600">
                Media & Communications
              </div>

              <div className="mt-1 font-bold">
                SAMCHU COMMUNICATIONS AND MEDIA LTD
              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            TEAM
        ===================================================== */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-7">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <p className="text-xs font-black tracking-[0.25em] text-lime-400">
                RADIO TEAM
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Kipsongoo Radio Presenters
              </h2>

            </div>

            <Link
              href="/admin/presenters"
              className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-black text-black transition hover:bg-lime-300"
            >
              MANAGE TEAM
            </Link>

          </div>


          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* SAMCHU */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="text-2xl">
                🎙️
              </div>

              <h3 className="mt-4 font-black">
                SAMCHU
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Radio Presenter
              </p>

            </div>


            {/* CHRISPUS */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="text-2xl">
                🎙️
              </div>

              <h3 className="mt-4 font-black">
                CHRISPUS
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                PAPA SEBEN
              </p>

            </div>


            {/* PAPA DALIS */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="text-2xl">
                🎙️
              </div>

              <h3 className="mt-4 font-black">
                PAPA DALIS
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Radio Presenter
              </p>

            </div>


            {/* TECH */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

              <div className="text-2xl">
                💻
              </div>

              <h3 className="mt-4 font-black">
                KEN #FOREMAN
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Tech Guy
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            SETTINGS SHORTCUT
        ===================================================== */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-lime-400/20 bg-gradient-to-r from-lime-400/[0.08] to-transparent p-7">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-5">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-400 text-2xl text-black">
                ⚙️
              </div>

              <div>

                <p className="text-xs font-black tracking-[0.25em] text-lime-400">
                  STATION SETTINGS
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  Configure Kipsongoo Radio
                </h2>

                <p className="mt-2 max-w-2xl leading-7 text-gray-500">
                  Change your station information, logo, tagline,
                  streaming details, social media accounts and other
                  website settings.
                </p>

              </div>

            </div>

            <Link
              href="/admin/settings"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-lime-400 px-6 py-3 text-sm font-black text-black transition hover:scale-105 hover:bg-lime-300"
            >
              OPEN SETTINGS →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-center text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">

          <div>
            © {new Date().getFullYear()} Kipsongoo Radio Admin Panel
          </div>

          <div className="text-gray-700">
            YOUR VOICE. YOUR COMMUNITY. YOUR RADIO.
          </div>

        </div>

      </footer>

    </main>
  );
}