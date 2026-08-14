import RadioPlayer from "@/components/RadioPlayer";
import Link from "next/link";

const programs = [
  {
    time: "06:00 AM",
    title: "Morning Glory",
    description:
      "Start your day with inspiration, worship and powerful conversations.",
  },
  {
    time: "10:00 AM",
    title: "Kipsongoo Mid-Morning",
    description:
      "Music, entertainment, community stories and interaction.",
  },
  {
    time: "02:00 PM",
    title: "Afternoon Drive",
    description:
      "Your afternoon companion with music, news and entertainment.",
  },
];

const news = [
  {
    category: "COMMUNITY",
    title: "Welcome to Kipsongoo Radio",
    text: "Your new voice for the community, connecting Kipsongoo to the world.",
  },
  {
    category: "MUSIC",
    title: "Music That Connects Us",
    text: "Enjoy your favourite music and discover new sounds every day.",
  },
  {
    category: "LIVE",
    title: "Stay Connected",
    text: "Follow Kipsongoo Radio across our social media platforms.",
  },
];

const presenters = [
  {
    name: "SAMCHU",
    role: "RADIO PRESENTER",
  },
  {
    name: "CHRISPUS",
    nickname: "#PAPA SEBEN",
    role: "RADIO PRESENTER",
  },
  {
    name: "PAPA DALIS",
    role: "RADIO PRESENTER",
  },
];

export default function Home() {
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

          {/* DESKTOP NAVIGATION */}

          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">

            <Link
              href="/"
              className="text-lime-400 transition hover:text-lime-300"
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
              className="transition hover:text-lime-400"
            >
              Contact
            </Link>

          </div>

          {/* LISTEN LIVE */}

          <Link
            href="#listen"
            className="rounded-full bg-lime-400 px-5 py-2.5 text-sm font-black text-black shadow-[0_0_20px_rgba(163,230,53,0.3)] transition hover:scale-105 hover:bg-lime-300"
          >
            LISTEN LIVE
          </Link>

        </div>
      </nav>


      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* HERO TEXT */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/5 px-4 py-2 text-xs font-bold tracking-wider text-lime-400">

              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

              LIVE RADIO

            </div>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">

              YOUR

              <span className="block text-lime-400 drop-shadow-[0_0_25px_rgba(163,230,53,0.25)]">
                VOICE.
              </span>

              YOUR

              <span className="block">
                COMMUNITY.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">

              Welcome to{" "}

              <strong className="text-white">
                Kipsongoo Radio
              </strong>

              {" "}— connecting our community through music,
              conversations, inspiration and entertainment.

            </p>

            {/* BUTTONS */}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">

              <Link
                href="#listen"
                className="flex items-center justify-center gap-3 rounded-full bg-lime-400 px-8 py-4 font-black text-black shadow-[0_0_35px_rgba(163,230,53,0.3)] transition hover:scale-105 hover:bg-lime-300"
              >
                <span className="text-xl">
                  ▶
                </span>

                LISTEN LIVE
              </Link>

              <Link
                href="#programs"
                className="flex items-center justify-center rounded-full border border-white/15 px-8 py-4 font-bold transition hover:border-lime-400 hover:text-lime-400"
              >
                OUR PROGRAMS
              </Link>

            </div>

          </div>


          {/* RADIO PLAYER */}

          <div
            id="listen"
            className="relative scroll-mt-24"
          >

            <div className="absolute inset-0 rounded-[2rem] bg-lime-400/10 blur-3xl" />

            <div className="relative">
              <RadioPlayer />
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="border-y border-white/5 bg-[#080d09]">

        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-8 md:grid-cols-4 lg:px-8">

          <div className="border-white/10 text-center md:border-r">
            <div className="text-3xl font-black text-lime-400">
              24/7
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Broadcasting
            </div>
          </div>

          <div className="border-white/10 text-center md:border-r">
            <div className="text-3xl font-black text-lime-400">
              LIVE
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Radio
            </div>
          </div>

          <div className="border-white/10 text-center">
            <div className="text-3xl font-black text-lime-400">
              100%
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Community
            </div>
          </div>

          <div className="border-white/10 text-center md:border-l">
            <div className="text-3xl font-black text-lime-400">
              ∞
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Entertainment
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          PROGRAMS
      ===================================================== */}

      <section
        id="programs"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 lg:px-8"
      >

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-black tracking-[0.25em] text-lime-400">
              WHAT&apos;S ON
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              TODAY&apos;S PROGRAMS
            </h2>

          </div>

          <p className="max-w-md text-gray-500">
            Tune in and stay connected with the latest shows,
            conversations and entertainment from Kipsongoo Radio.
          </p>

        </div>


        <div className="grid gap-5 md:grid-cols-3">

          {programs.map((program, index) => (

            <div
              key={program.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-lime-400/30 hover:bg-lime-400/[0.04]"
            >

              <div className="flex items-center justify-between">

                <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-black text-lime-400">
                  {program.time}
                </span>

                <span className="text-sm font-black text-gray-700">
                  0{index + 1}
                </span>

              </div>

              <h3 className="mt-8 text-2xl font-black">
                {program.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {program.description}
              </p>

              <div className="mt-7 h-px bg-white/10 transition group-hover:bg-lime-400/30" />

              <button
                type="button"
                className="mt-5 text-sm font-black text-lime-400 transition hover:text-lime-300"
              >
                VIEW SHOW →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          PRESENTERS PREVIEW
      ===================================================== */}

      <section
        id="presenters"
        className="scroll-mt-20 bg-[#080d09] py-20"
      >

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-black tracking-[0.25em] text-lime-400">
                MEET THE TEAM
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                OUR PRESENTERS
              </h2>

            </div>

            <Link
              href="/presenters"
              className="w-fit rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
            >
              VIEW ALL PRESENTERS →
            </Link>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {presenters.map((presenter) => (

              <div
                key={presenter.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-8 transition hover:-translate-y-1 hover:border-lime-400/40"
              >

                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime-400/10 blur-2xl transition group-hover:bg-lime-400/20" />

                <div className="relative">

                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-300 to-green-700 text-2xl font-black text-black shadow-[0_0_30px_rgba(163,230,53,0.15)]">
                    {presenter.name.substring(0, 2)}
                  </div>

                  <p className="mt-7 text-xs font-black tracking-[0.2em] text-lime-400">
                    {presenter.role}
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    {presenter.name}
                  </h3>

                  {presenter.nickname && (
                    <p className="mt-1 font-bold text-gray-400">
                      {presenter.nickname}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEWS
      ===================================================== */}

      <section
        id="news"
        className="scroll-mt-20 bg-[#050807] py-20"
      >

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-12 flex items-end justify-between">

            <div>

              <p className="text-sm font-black tracking-[0.25em] text-lime-400">
                FROM THE STATION
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                LATEST UPDATES
              </h2>

            </div>

            <Link
              href="/news"
              className="hidden rounded-full border border-white/10 px-5 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400 sm:block"
            >
              VIEW ALL NEWS →
            </Link>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {news.map((item) => (

              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition hover:-translate-y-1 hover:border-lime-400/30"
              >

                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-green-900/40 to-lime-400/5">

                  <div className="text-5xl font-black text-lime-400/30">
                    KR
                  </div>

                </div>

                <div className="p-7">

                  <span className="text-xs font-black tracking-wider text-lime-400">
                    {item.category}
                  </span>

                  <h3 className="mt-3 text-xl font-black">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-500">
                    {item.text}
                  </p>

                  <Link
                    href="/news"
                    className="mt-5 inline-block text-sm font-black text-white transition hover:text-lime-400"
                  >
                    READ MORE →
                  </Link>

                </div>

              </article>

            ))}

          </div>


          <div className="mt-8 text-center sm:hidden">

            <Link
              href="/news"
              className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-bold transition hover:border-lime-400 hover:text-lime-400"
            >
              VIEW ALL NEWS →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 lg:px-8"
      >

        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>

            <p className="text-sm font-black tracking-[0.25em] text-lime-400">
              ABOUT US
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">

              MORE THAN

              <span className="block text-lime-400">
                A RADIO STATION.
              </span>

            </h2>

          </div>

          <div>

            <p className="text-lg leading-8 text-gray-400">
              Kipsongoo Radio is a community-focused digital radio
              platform created to inform, inspire, entertain and
              connect people.
            </p>

            <p className="mt-5 leading-8 text-gray-500">
              From music and conversations to community news and
              special broadcasts, we aim to give our listeners a
              platform where their voices can be heard.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-full bg-lime-400 px-6 py-3 text-sm font-black text-black transition hover:scale-105 hover:bg-lime-300"
            >
              CONTACT KIPSONGOO RADIO →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          TECH & MEDIA TEAM
      ===================================================== */}

      <section className="border-y border-white/5 bg-[#080d09] py-20">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-12">

            <p className="text-sm font-black tracking-[0.25em] text-lime-400">
              TECH & MEDIA
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              THE TEAM BEHIND THE STATION
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-gray-500">
              Kipsongoo Radio is supported by a dedicated technical,
              communications and media team working behind the scenes
              to keep the station connected.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {/* TECH TEAM */}

            <div className="rounded-3xl border border-white/10 bg-black/20 p-8 transition hover:border-lime-400/30">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-2xl text-black">
                ⚙
              </div>

              <p className="mt-7 text-xs font-black tracking-[0.2em] text-lime-400">
                TECH GUYS
              </p>

              <h3 className="mt-2 text-2xl font-black">
                KEN #FOREMAN
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Technical support, broadcasting systems and station
                infrastructure.
              </p>

            </div>


            {/* COMPANY */}

            <div className="rounded-3xl border border-white/10 bg-black/20 p-8 transition hover:border-lime-400/30">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-2xl text-black">
                📡
              </div>

              <p className="mt-7 text-xs font-black tracking-[0.2em] text-lime-400">
                COMMUNICATIONS & MEDIA
              </p>

              <h3 className="mt-2 text-2xl font-black">
                SAMCHU COMMUNICATIONS AND MEDIA LTD
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                Digital media, communications, technical support and
                creative services for Kipsongoo Radio.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTACT QUICK SECTION
      ===================================================== */}

      <section className="px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-lime-400/20 bg-gradient-to-br from-lime-400/10 to-green-900/10 p-8 sm:p-12">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <p className="text-sm font-black tracking-[0.3em] text-lime-400">
                GET IN TOUCH
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                LET&apos;S CONNECT.
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-gray-400">
                Have a story, advertisement, partnership idea,
                programme suggestion or just want to connect with
                Kipsongoo Radio? We would love to hear from you.
              </p>

              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-lime-400 px-7 py-3 font-black text-black transition hover:scale-105 hover:bg-lime-300"
              >
                CONTACT US →
              </Link>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              {/* WHATSAPP */}

              <a
                href="https://wa.me/254723393968"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:border-lime-400/40 hover:bg-lime-400/5"
              >

                <div className="text-2xl">
                  💬
                </div>

                <div className="mt-4 text-xs font-black tracking-wider text-lime-400">
                  WHATSAPP
                </div>

                <div className="mt-1 font-bold">
                  0723 393 968
                </div>

              </a>


              {/* EMAIL */}

              <a
                href="mailto:Chumah18samuel@gmail.com"
                className="rounded-2xl border border-white/10 bg-black/30 p-6 transition hover:border-lime-400/40 hover:bg-lime-400/5"
              >

                <div className="text-2xl">
                  ✉
                </div>

                <div className="mt-4 text-xs font-black tracking-wider text-lime-400">
                  EMAIL
                </div>

                <div className="mt-1 break-all text-sm font-bold">
                  Chumah18samuel@gmail.com
                </div>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CALL TO ACTION
      ===================================================== */}

      <section className="px-5 pb-20 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-lime-400 px-7 py-14 text-center text-black sm:px-12">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-green-900/10 blur-3xl" />

          <div className="relative">

            <p className="text-sm font-black tracking-[0.3em]">
              KIPSONGOO RADIO
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black sm:text-5xl">

              TURN UP THE SOUND.

              <br />

              STAY CONNECTED.

            </h2>

            <Link
              href="#listen"
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

      <footer
        id="contact"
        className="border-t border-white/10 bg-black"
      >

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

              <div className="mt-5 text-xs font-bold tracking-wider text-gray-600">
                POWERED BY
              </div>

              <div className="mt-1 text-sm font-black text-gray-400">
                SAMCHU COMMUNICATIONS AND MEDIA LTD
              </div>

            </div>


            {/* QUICK LINKS */}

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
                RADIO
              </h3>

              <div className="mt-4 space-y-3 text-sm">

                <Link
                  href="#programs"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Programs
                </Link>

                <Link
                  href="/presenters"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Our Presenters
                </Link>

                <Link
                  href="/news"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Latest News
                </Link>

                <Link
                  href="/gallery"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  Gallery
                </Link>

                <Link
                  href="#about"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  About Us
                </Link>

              </div>

            </div>


            {/* CONTACT */}

            <div>

              <h3 className="font-black">
                CONTACT
              </h3>

              <div className="mt-4 space-y-4 text-sm">

                <a
                  href="https://wa.me/254723393968"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-500 transition hover:text-lime-400"
                >
                  💬 WhatsApp
                  <span className="block text-gray-700">
                    0723 393 968
                  </span>
                </a>

                <a
                  href="mailto:Chumah18samuel@gmail.com"
                  className="block break-all text-gray-500 transition hover:text-lime-400"
                >
                  ✉ Email
                  <span className="block text-gray-700">
                    Chumah18samuel@gmail.com
                  </span>
                </a>

              </div>

            </div>

          </div>


          {/* FOOTER BOTTOM */}

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